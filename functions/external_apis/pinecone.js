import * as functions from "firebase-functions";

import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: functions.config().pinecone.api_key,
  environment: "gcp-starter",
});

const index = pinecone.index("agent-memory");


async function upsertEmbeddingToPinecone(embedding, path, id) {

  const upsertData = {
    id: id,
    values: embedding,
    metadata: {
      upsertedAt: new Date().toISOString(),
      path
    },
  };

  try {
    const response = await index.upsert([upsertData]);
  } catch (error) {
    console.error("Error upserting embedding:", error);
  }
}

async function semanticSimilaritySearch(embedding, topK) {


  try {
    const searchResults = await index.query({
      vector: embedding,
      topK,
      includeValues: false,
      includeMetadata: true
    });
    return searchResults.matches;
  } catch (error) {
    console.error("Error searching for similar embeddings:", error);
  }
}

async function deleteAllVectors() {

  const vector = [];
  for (let i = 0; i < 1536; i++) {
    vector.push(0.0);
  }

  try {
    const searchResults = await index.query({
      vector,
      topK: 50,
      includeValues: false,
    });
    const idsToDelete = searchResults.matches.map((match) => match.id);
    const response = await index.deleteMany(idsToDelete);
    return searchResults.matches;
  } catch (error) {
    console.error("Error searching for similar embeddings:", error);
  }
}


async function getVectorCount() {
  try {
    const stats = await index.describeIndexStats();
    const namespaceStats = stats.namespaces[""] || {}; // Accessing stats for namespace ""
    const vectorCount = namespaceStats.vectorCount || 0;
    return vectorCount;
  } catch (error) {
    console.error("Error getting index stats:", error);
    return 0;
  }
}

export {
  upsertEmbeddingToPinecone,
  semanticSimilaritySearch,
  deleteAllVectors,
  getVectorCount
};
