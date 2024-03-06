import {
  addMessageToConversation,
  attemptToAddObservationReference,
  ensureConversation,
  getConversation,
} from "../chat/conversationManager.js";
import {getOpenAIChatResponse} from "../external_apis/index.js";
import {searchObservations} from "../processing/index.js";
import {extractKeywords} from "./keywordAgent.js";
import {filterForRelevance} from "./summaryAgent.js";

const generateChatResponse = async (userMessage, userId) => {
  await ensureConversation();

  const userMessateDateTime = new Date();

  let observations = [];

  const observationResults = []; // await searchObservations(userId, userMessage, 3);
  console.log("searchObservations results:");
  console.log(observationResults);
  observations = observationResults;
  // for (const result of observationResults) {
  //   if (await attemptToAddObservationReference(result.observationId)) {
  //     if (result.content.observations) {
  //       if (result.content.observations.length > 3) {
  //         observations.push(
  //           await filterForRelevance(result.content.observations, userMessage)
  //         );
  //       } else {
  //         observations.push(result.content.observations.join(". "));
  //       }
  //     }
  //   }
  // }

  const systemMessage = `# ROLE: Life Coach / Therapist. 
   # GOAL: Find out the user's goals and aspirations by acting as a curious, profession life coach / therapist.
   # METHODOLOGY: Ask leading questions.
   # IMPORTANT: ALWAYS Lead the conversation. NEVER the user what they want to talk about.
   # RESPONSE LENGTH: 20 words or less.
   # USER PROFILE:
   Name: Bryce Huhtala
   Age: 40
   Gender: Male
   Occupation: Software Developer

   # RECALLED MEMORIES: Incorporate RECALLED MEMORIES when relevant. Do NOT embellish memory details.`;

  //  # USER PROFILE: {
  //   name: "Bryce Huhtala",
  //   gender: 'M',
  //   age: 40,
  //   location: "Manhattan, KS",
  //   spouse: {
  //     name: "Cori Crumrine",
  //     gender: 'F',
  //     age: 33,
  //     livingTogether: True
  //   },
  //   occupation: "Software Developer"
  // }

  const priorKnowledge = `# RECALLED MEMORIES
  ${JSON.stringify(
      observations.map((observation) => observation.content.content),
  )}`;
  console.log("priorKnowledge");
  console.log(priorKnowledge);

  const messages = [
    {
      role: "system",
      content: systemMessage,
    },
    ...(await getConversation(true)),
    {
      role: "user",
      content: userMessage,
    },
  ];

  if (observations.length > 0) {
    messages.push({
      role: "assistant",
      content: priorKnowledge,
    });
  }

  const response = await getOpenAIChatResponse(messages);

  await addMessageToConversation(
      "user",
      userMessage,
      {
        isContext: false,
      },
      userMessateDateTime,
  );
  if (observations.length > 0) {
    await addMessageToConversation(
        "assistant",
        priorKnowledge,
        {
          isContext: true,
        },
        new Date(Date.now() - 1000),
    );
  }
  await addMessageToConversation(
      "assistant",
      response.content,
      {
        isContext: false,
      },
      new Date(),
  );

  return response.content;
};

export {generateChatResponse};
