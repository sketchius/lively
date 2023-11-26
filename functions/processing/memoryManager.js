import {
  convertDatesFromRelativeToAbsolute,
  detectTemporalReferences,
} from "../agents/dateAgent.js";
import { observationAgent } from "../agents/observationAgent.js";
import {
  getConversationById,
  createRecordForUser,
  getRecordForUser,
  addObservationToRecord,
  getAllObservationsInRecord,
  firestore,
} from "../database/index.js";
import {
  createEmbedding,
  upsertEmbeddingToPinecone,
} from "../external_apis/index.js";
import { createUID } from "../utils/index.js";
import { semanticSimilaritySearch } from "../external_apis/index.js";

const executeObservations = async (userId, conversationId) => {
  const messages = await getConversationById(userId, conversationId, false);
  const observationSubjects = await observationAgent.extract(messages);
  observationSubjects.forEach( subject => {
    console.log("Observations for subject: " + subject.subject);
    console.log(subject.observations.join('\n'));
  })



  // for (let i = 0; i < longFormObservations.length; i++) {
  //   const longFormObservation = longFormObservations[i];

  //   switch (longFormObservation.categoryId) {
  //     case 1: // User details
  //       {
  //         const splitObservations = await observationAgent.split(
  //           longFormObservation.content
  //         );
  //         for (let j = 0; j < splitObservations.length; j++) {
  //           const observation = splitObservations[j];
  //           const category = await observationAgent.categorize(observation);
  //           const result = await firestore.list(`users/test/${category.name}`);
  //           const existingObservations = result.map((observation) => {
  //             return { id: observation.id, content: observation.content };
  //           });
  //           let auditResult = { code: "C", id: 0 };
  //           if (existingObservations.length != 0) {
  //             console.log("Auditing...");
  //             auditResult = await observationAgent.audit(
  //               observation,
  //               existingObservations
  //             );
  //           }

  //           if (auditResult.code.toUpperCase().includes("C")) {
  //             const uid = createUID();
  //             const data = {
  //               createdOn: new Date(),
  //               updatedAt: new Date(),
  //               content: observation,
  //             };
  //             firestore.create(`users/test/${category.name}/${uid}`, data);
  //             const embedding = await createEmbedding(observation);
  //             upsertEmbeddingToPinecone(
  //               embedding,
  //               `users/test/${category.name}`,
  //               uid
  //             );
  //           } else {
  //           }
  //           await sleep(500);
  //         }
  //       }
  //       break;
  //     case 2: // Details about other people
  //       {
  //         const splitObservations = await observationAgent.split(
  //           longFormObservation.content
  //         );
  //         for (let j = 0; j < splitObservations.length; j++) {
  //           const observation = splitObservations[j];
  //           // const categoryId = await observationAgent.categorize(observation);
  //           const data = {
  //             createdOn: admin.firestore.FieldValue.serverTimestamp(),
  //             updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  //             content: observation,
  //           };
  //           firestore.create(`test/observations/${createUID()}`, data);
  //         }
  //       }
  //       break;
  //   }
  // }
};

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const searchObservations = async (userId, searchString, maxResults) => {
  // TODO: Add namespace by userId
  const embedding = await createEmbedding(searchString);

  const matches = await semanticSimilaritySearch(embedding, maxResults);
  console.log(matches);

  if (matches && matches.length > 0) {
    const promises = matches
      .filter((match) => {
        return match.score > 0.78;
      })
      .map(async (match) => ({
        content: await firestore.read(`${match.metadata.path}/${match.id}`),
        observationId: match.id,
      }));

    return await Promise.all(promises);
  }

  return [];
};

export { executeObservations, searchObservations };
