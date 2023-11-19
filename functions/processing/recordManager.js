import { convertDatesFromRelativeToAbsolute } from "../agents/dateAgent.js";
import {
  extractObservations,
  mergeObservations,
} from "../agents/observationAgent.js";
import {
  getConversationById,
  createRecordForUser,
  getRecordForUser,
  addObservationToRecord,
  getAllObservationsInRecord,
} from "../database/index.js";
import {
  createEmbedding,
  upsertEmbeddingToPinecone,
} from "../external_apis/index.js";
import { createUID, removeStartingSubstring } from "../utils/index.js";
import {
  getOpenAIChatResponse,
  semanticSimilaritySearch,
} from "../external_apis/index.js";

const executeObservations = async (userId, conversationId) => {
  const messages = await getConversationById(userId, conversationId, false);
  const observations = await extractObservations(messages);

  console.log("Hmm, observations = ");
  console.log(observations);

  for (let i = 0; i < observations.length; i++) {
    const observation = await convertDatesFromRelativeToAbsolute(
      observations[i]
    );
    const closestRecordId = await matchObservation(userId, observation);

    if (closestRecordId) {
      console.log("## Match found! ID of match = " + closestRecordId);
      await appendToRecord(userId, closestRecordId, observation);
    } else {
      console.log("## Match not found. Creating a new observation.");
      await createNewRecord(userId, observation, conversationId);
    }
  }
};

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const createNewRecord = async (userId, observation, conversationId) => {
  const recordId = createUID();
  const embedding = await createEmbedding(observation);
  upsertEmbeddingToPinecone(embedding, recordId);
  createRecordForUser(userId, recordId, observation);
  console.log("## Creating Record for Observation ##");
  console.log("# Observation:");
  console.log(observation);
};

const appendToRecord = async (userId, recordId, observation) => {
  console.log("## Adding Observation to Record ##");
  console.log("# Observation:");
  console.log(observation);
  await addObservationToRecord(userId, recordId, observation);
  const observationArray = getAllObservationsInRecord(recordId);
  const embedding = await createEmbedding(observationArray.join("\n"));
  upsertEmbeddingToPinecone(embedding, recordId);
};

const matchObservation = async (userId, searchString) => {
  // TODO: Add namespace by userId
  const matches = await semanticSimilaritySearch(
    await createEmbedding(searchString),
    1
  );
  console.log(matches);

  if (matches && matches.length == 1 && matches[0].score >= 0.82) {
    return matches[0].id;
  }

  return undefined;
};

const searchObservations = async (userId, searchString, maxResults) => {
  // TODO: Add namespace by userId
  console.log("Creating Embedding");
  const embedding = await createEmbedding(searchString);
  console.log("Embedding:");
  console.log(embedding);

  const matches = await semanticSimilaritySearch(embedding, maxResults);

  console.log("MATCHES");
  console.log(matches);

  if (matches && matches.length > 0) {
    const promises = matches
      .filter((match) => {
        return match.score > 0.25;
      })
      .map(async (match) => ({
        content: await getRecordForUser(userId, match.id),
        observationId: match.id,
      }));

    return await Promise.all(promises);
  }

  return [];
};

export { executeObservations, searchObservations };
