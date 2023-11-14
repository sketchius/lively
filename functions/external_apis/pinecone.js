import * as functions from "firebase-functions";

import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({ 
    apiKey: functions.config().pinecone.api_key,
    environment: 'YOUR_ENVIRONMENT'
})


async function upsertEmbeddingToPinecone(embedding, id) {
    const pineconeApiKey = admin.config().pinecone.api_key; // Adjust this based on your actual Firebase config structure
  
    const pineconeClient = new PineconeClient({
      apiKey: pineconeApiKey,
      environment: 'us-central1-gcp',
    });
  
    const index = pineconeClient.index('agent-memory');
  
    const upsertData = {
      id: id,
      values: embedding.vector,
      metadata: {
          upsertedAt: new Date().toISOString()
      }
    };
  
    try {
      const response = await index.upsert([upsertData]);
      console.log('Upsert response:', response);
    } catch (error) {
      console.error('Error upserting embedding:', error);
    }
  }
  
  export { upsertEmbeddingToPinecone };