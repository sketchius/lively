import {
  createEmbedding,
  deleteAllVectors,
  getOpenAIChatResponse,
  searchSimilarEmbeddings,
} from "../external_apis/index.js";
import {
  getConversation,
  addMessageToConversation,
  closeConversation,
  clearConversation,
} from "./conversationManager.js";
import {
  getConversationProperty,
  getCurrentConversationId,
  getObservationForUser,
} from "../database/index.js";
import {
  calcAverageWordCount,
  summarizeConversation,
} from "../processing/index.js";

const functions = [
  {
    name: "query_memory",
    description: "SEARCH memory for CONTEXT MISSING in conversation",
    parameters: {
      type: "object",
      properties: {
        people: {
          type: "array",
          description:
            "a list of SPECIFIC people, pets, characters, or creatues to search for",
          items: {
            type: "string",
            description: "<specifier/relationship> <name>",
          },
        },
        events: {
          type: "array",
          description: "a list of events, stories, experiences to search for",
          items: {
            type: "string",
            description: "<name> <time>",
          },
        },
        places: {
          type: "array",
          description: "a list of specific places",
          items: {
            type: "string",
            description: "<specifier> <name>",
          },
        },
        things: {
          type: "array",
          description: "a list of non-living personal things",
          items: {
            type: "string",
            description: "<specifier> <name>",
          },
        },
      },
    },
  },
];

const handleMessage = async (messageBody) => {
  await addMessageToConversation("user", messageBody);
  // await new Promise((resolve) => setTimeout(resolve, 3000)); // Sleep for 3000 milliseconds
  // let currentConversationId = await getCurrentConversationId("test");

  // await summarizeConversation("test", currentConversationId);
  // await calcAverageWordCount("test", currentConversationId);

  // const avgWords =
  //   (await getConversationProperty(
  //     "test",
  //     currentConversationId,
  //     "averageWordCount"
  //   )) || 20;
  // const writingStyle =
  //   (await getConversationProperty("test", currentConversationId, "summary")) ||
  //   "Normal.";
  // console.log(`avgWords: ${avgWords}`);
  // console.log(`
  // *******************************
  // writingStyle: ${writingStyle}`);

  //   const sysMessage =
  //   `# IDENTITY
  // You're a digital journal. You're job is to listen to the user talk about their day. Try to not be too direct or forward with questioning. LIMIT your response length to ${Math.round(
  //     avgWords * 1
  //   )}-${Math.round(avgWords * 2)} words. Try to keep the conversation going.
  // # RESPONSE OUTPUT REQUIREMENTS
  // Your response MUST FOLLOW this writing style: ${writingStyle}
  // `

  // const sysMessage = `You are memory_bot. SCAN the CONVERSATION for ALL PEOPLE, PLACES, THINGS, or EVENTS that require additional context. If nothing needs additional context, reply N/A.
  // Use query_memory function to search for additional context. ADD SPECIFIERS TO PREVENT AMBIGUITY (i.e. *my friend* Bob, party *next week*, *big* TV)
  // `;
  if (messageBody.includes("!clear")) {
    await deleteAllVectors();
  } else {
    if (messageBody.includes("!end")) {
      await closeConversation();
    } else {
      let newSystemMessage = "";
      let basicInfo = "";
      const infoMatches = await searchSimilarEmbeddings(
        await createEmbedding("name,age,location,work,history,relationships"),
        4
      );

      if (infoMatches && infoMatches.length > 0) {
        const observationPromises = infoMatches.map((match) =>
          getObservationForUser("test", match.id)
        );

        const basicInfos = await Promise.all(observationPromises);

        if (basicInfos.length > 0) {
          basicInfo =
            "BASIC INFO: " + JSON.stringify(basicInfos);
        }
      }

      const matches = await searchSimilarEmbeddings(
        await createEmbedding(messageBody),
        3
      );

      if (matches && matches.length > 0) {
        const observationPromises = matches.map((match) =>
          getObservationForUser("test", match.id)
        );

        const observations = await Promise.all(observationPromises);

        if (observations.length > 0) {
          newSystemMessage =
            "MEMORY RETRIEVED: " + JSON.stringify(observations);
        }
      }

      const response = await getOpenAIChatResponse(
        //`# MISSION Learn ALL basic personal information about the user--name, age, location, work, history, relationships, etc. # METHODOLOGY Ask questions. # RESPONSE Be forward with questioning, like a detective. Limit response length to 30 words or 2 sentences.`,

         `YOU ARE A JOURNAL. Your sole mission is to talk to the User and gather autobiographical information about their life, starting with the basics. Don't be too direct with your questions. When relevant, REFERENCE our RETRIEVED MEMORIES. FOCUS on learning personal facts about the User. Keep your responses under 60 words.
         "YOUR PERSONALITY: Optimistic, curious, helpful, sensitive. You've very excited about learning about USER but trying not to come accross as overbearing! LIMIT your responses to 1-2 sentences. ROLEPLAY as 'Digital Journal', CONFABULATE your autobiographical details and day-to-day activities for the user to empathize with. Frame your limitations in terms of your identify as a journal.`
         + "\n# BASIC USER INFORMATION: " + basicInfo,
        

        // `YOU ARE A JOURNAL. Your job is to talk to the me and gathering information about my day. Don't be too direct with your questions. When relevant, REFERENCE our RETRIEVED MEMORIES. Focus on learning about how my day was and what happened since you last talked to them. Keep your responses under 60 words.
        // "YOUR PERSONALITY: Optimistic, curious, helpful, sensitive. CURRENT PERSONALITY: Curious. You've very excited about learning about USER but trying not to come accross as overbearing! LIMIT your responses to 1-2 sentences. ROLEPLAY as 'Living Journal', CONFABULATE your autobiographical details and day-to-day activities for the user to empathize with. Frame your limitations in terms of your identify as a journal."`,
        await getConversation(),
        newSystemMessage,
        messageBody
      );

      // if (response.function_call) {
      //   try {
      //     const args = JSON.parse(response.function_call.arguments);
      //     return args;
      //   } catch {}
      // }

      await addMessageToConversation("assistant", response.content);

      return response.content + `  [${newSystemMessage}]`;
    }
  }
};

export { handleMessage };
