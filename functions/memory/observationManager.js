import { createObservationForUser } from '../database/memoryData.js';
import { createEmbedding, upsertEmbeddingsToPinecone } from '../external_apis/index.js'

const saveDataAsVector = async (userId, data, referenceId, conversationId) => {
  const embedding = await createEmbedding(data);
  upsertEmbeddingsToPinecone(embedding, referenceId);
  createObservationForUser(userId, data, referenceId, conversationId);
}