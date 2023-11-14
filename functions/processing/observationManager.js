import {
  createObservationForUser,
  setConversationProperty,
  getConversationById,
} from "../database/index.js";
import {
  createEmbedding,
  upsertEmbeddingToPinecone,
} from "../external_apis/index.js";
import { createUID, removeStartingSubstring } from "../utils/index.js";
import { getOpenAIChatResponse } from "./../external_apis/index.js";

const generateObservations = async (userId, conversationId) => {
  const messages = await getConversationById(userId, conversationId);
  const promptMessage =
    "CONVERSATION: " +
    messages
      .map((message) => {
        return `${message.role}:  ${message.content}`;
      })
      .join("\n\n");
  const systemMessage = `EXTRACT all AUTOBIOGRAPHICAL INFORMATION conveyed by the User in this conversation. SEPERATE observations into bullet points. EACH bullet points starts with "The User". Do NOT include questions and commentary from the Assitant."`;

  console.log(systemMessage + "\n" + promptMessage);

  const response = await getOpenAIChatResponse(
    systemMessage,
    [],
    "",
    promptMessage
  );

  const observations = removeStartingSubstring(
    response.content,
    "AUTOBIOGRAPHICAL INFORMATION"
  );

  await setConversationProperty(
    userId,
    conversationId,
    "observations",
    observations
  );

  // Sometimes ChatGPT begins observations with "AUTOBIOGRAPHICAL INFORMATION"

  return observations;
};

const executeObservations = async (userId, conversationId) => {
  const data = await generateObservations(userId, conversationId);
  const observations = data.split(`\n`);
  observations.forEach(async (observation) => {
    const referenceId = createUID();
    const embedding = await createEmbedding(observation);
    upsertEmbeddingToPinecone(embedding, referenceId);
    createObservationForUser(userId, observation, referenceId, conversationId);
  });
};

export { executeObservations };
