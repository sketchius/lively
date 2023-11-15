import {
  createEmbedding,
  deleteAllVectors,
  getOpenAIChatResponse,
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
  searchObservations,
  summarizeConversation,
} from "../processing/index.js";


const handleMessage = async (messageBody) => {
  await addMessageToConversation("user", messageBody);

  if (messageBody.includes("!clear")) {
    await deleteAllVectors();
  } else {
    if (messageBody.includes("!end")) {
      await closeConversation();
    } else {
      const infoArray = [
        ...(await searchObservations("test", "name", 1)),
        ...(await searchObservations("test", "age", 1)),
        ...(await searchObservations("test", "interests", 1)),
        ...(await searchObservations("test", "home", 1)),
      ];

      const info = await JSON.stringify(infoArray);
      const newSystemMessage = `MEMORIES FOUND: ${await JSON.stringify(
        await searchObservations("test", messageBody, 2)
      )}`;

      const response = await getOpenAIChatResponse(
        //`# MISSION Learn ALL basic personal information about the user--name, age, location, work, history, relationships, etc. # METHODOLOGY Ask questions. # RESPONSE Be forward with questioning, like a detective. Limit response length to 30 words or 2 sentences.`,

        `Talk to the user. Incorporate any MEMORIES FOUND into the conversation. Explain this as remembering from past conversations.` +
          "\n# BASIC MEMORIES: " +
          info,

          // `YOU ARE A JOURNAL. Your sole mission is to talk to the User and gather autobiographical information about their life, starting with the basics. Don't be too direct with your questions. MEMORIES WILL BE PROVIDED. When relevant, MENTION MEMORIES. FOCUS on learning personal facts about the User. Keep your responses under 60 words.
          // "YOUR PERSONALITY: Optimistic, curious, helpful, sensitive. You've very excited about learning about USER but trying not to come accross as overbearing! LIMIT your responses to 1-2 sentences. ROLEPLAY as 'Digital Journal', CONFABULATE your autobiographical details and day-to-day activities for the user to empathize with. Frame your limitations in terms of your identify as a journal.` +
          //  "\n# BASIC USER INFORMATION: " +
          //  info,
 

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

      const result = {
        content: response.content,
        info,
        newSystemMessage,
      };

      return result;
    }
  }
};

export { handleMessage };
