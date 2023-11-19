import {
  addMessageToConversation,
  attemptToAddObservationReference,
  ensureConversation,
  getConversation,
} from "../chat/conversationManager.js";
import { getOpenAIChatResponse } from "../external_apis/index.js";
import { searchObservations } from "../processing/index.js";
import { extractKeywords } from "./keywordAgent.js";
import { filterForRelevance } from "./summaryAgent.js";

const generateChatResponse = async (userMessage, userId) => {
  await ensureConversation();

  const userMessateDateTime = new Date();

  const observations = [];

  const observationResults = await searchObservations(userId, userMessage, 1);

  console.log("OBSERVATIONS (MATCHED)");
  console.log(JSON.stringify(observationResults));

  for (const result of observationResults) {
    if (await attemptToAddObservationReference(result.observationId)) {
      if (result.content.observations) {
        if (result.content.observations.length > 3) {
          observations.push(
            await filterForRelevance(result.content.observations, userMessage)
          );
        } else {
          observations.push(result.content.observations.join(". "));
        }
      }
    }
  }
  console.log("OBSERVATIONS (FINAL)");
  console.log(JSON.stringify(observations));
  const systemMessage = `# ROLE: Interactive Journal. 
   MISSION: Be someone nice to talk to.
   PERSONALITY:  reserved.
   RECALLED MEMORIES:
   Incorporate RECALLED MEMORIES when relevant. Do NOT embellish memory details.`;

  const priorKnowledge = `# RECALLED MEMORIES
  ${JSON.stringify(observations)}`;

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
    userMessateDateTime
  );
  if (observations.length > 0) {
    await addMessageToConversation(
      "assistant",
      priorKnowledge,
      {
        isContext: true,
      },
      new Date(Date.now() - 1000)
    );
  }
  await addMessageToConversation(
    "assistant",
    response.content,
    {
      isContext: false,
    },
    new Date()
  );

  return `MEMORIES USED: ${priorKnowledge}. MESSAGE: ${response.content}`;
};

export { generateChatResponse };
