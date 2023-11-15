import { extractObservations, mergeObservations } from '../agents/observationAgent.js';
import {
  createObservationForUser,
  setConversationProperty,
  getConversationById,
  getObservationForUser,
  updateObservationForUser,
} from "../database/index.js";
import {
  createEmbedding,
  upsertEmbeddingToPinecone,
} from "../external_apis/index.js";
import { createUID, removeStartingSubstring } from "../utils/index.js";
import {
  getOpenAIChatResponse,
  semanticSimilaritySearch,
} from "./../external_apis/index.js";

const generateObservations = async (userId, conversationId) => {
  const messages = await getConversationById(userId, conversationId);
  return await extractObservations(messages);
};

const executeObservations = async (userId, conversationId) => {
  const data = await generateObservations(userId, conversationId);
  const observations = data.split(`\n`);
  for (let i = 0; i < observations.length; i++) {
    const observation = observations[i];
    const closestObservationId = await matchObservation(userId, observation);

    if (closestObservationId) {
      await appendToObservation(userId, closestObservationId, observation);
    } else {
      await createNewObservation(userId, observation, conversationId);
    }
  }
};

const createNewObservation = async (userId, observation, conversationId) => {
  const observationId = createUID();
  const embedding = await createEmbedding(observation);
  upsertEmbeddingToPinecone(embedding, observationId);
  createObservationForUser(userId, observation, observationId, conversationId);
  console.log("## Creating Observation ##");
  console.log("# Observation:");
  console.log(observation);
};

const appendToObservation = async (userId, observationId, newObservation) => {
  const modifiedObservation =
    (await mergeObservations(userId, observationId)) + " " + newObservation;
  const embedding = await createEmbedding(modifiedObservation);
  upsertEmbeddingToPinecone(embedding, observationId);
  updateObservationForUser(userId, observationId, modifiedObservation);
};

const matchObservation = async (userId, searchString) => {
  // TODO: Add namespace by userId
  const matches = await semanticSimilaritySearch(
    await createEmbedding(searchString),
    1
  );

  if (matches && matches.length == 1 && matches[0].score >= 0.8) {
    return matches[0].id;
  }

  return undefined;
};

const searchObservations = async (userId, searchString, maxResults) => {
  // TODO: Add namespace by userId
  const matches = await semanticSimilaritySearch(
    await createEmbedding(searchString),
    maxResults
  );

  if (matches && matches.length > 0) {
    const promises = matches
      .filter((match) => {
        return match.score > 0.78;
      })
      .map((match) => getObservationForUser(userId, match.id));

    return await Promise.all(promises);
  }

  return [];
};

export { executeObservations, searchObservations };
