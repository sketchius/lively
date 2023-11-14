import * as functions from "firebase-functions";

import { Pinecone } from "@pinecone-database/pinecone";

async function upsertEmbeddingToPinecone(embedding, id) {
  const pinecone = new Pinecone({
    apiKey: functions.config().pinecone.api_key,
    environment: "gcp-starter",
  });

  const index = pinecone.index("agent-memory");

  const upsertData = {
    id: id,
    values: embedding,
    metadata: {
      upsertedAt: new Date().toISOString(),
    },
  };

  try {
    const response = await index.upsert([upsertData]);
    console.log("Upsert response:", response);
  } catch (error) {
    console.error("Error upserting embedding:", error);
  }
}

async function searchSimilarEmbeddings(embedding, topK) {
  const pinecone = new Pinecone({
    apiKey: functions.config().pinecone.api_key,
    environment: "gcp-starter",
  });

  const index = pinecone.index("agent-memory");

  try {
    const searchResults = await index.query({
      vector: embedding,
      topK,
      includeValues: false,
    });
    console.log("Search results:", searchResults);
    return searchResults.matches;
  } catch (error) {
    console.error("Error searching for similar embeddings:", error);
  }
}

async function deleteAllVectors() {
  const pinecone = new Pinecone({
    apiKey: functions.config().pinecone.api_key,
    environment: "gcp-starter",
  });

  const index = pinecone.index("agent-memory");

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
    console.log("Search results:", searchResults);
    return searchResults.matches;
  } catch (error) {
    console.error("Error searching for similar embeddings:", error);
  }
}

export { upsertEmbeddingToPinecone, searchSimilarEmbeddings, deleteAllVectors };
