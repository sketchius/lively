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
import {
  extractIdentifiers,
  summarizePerson,
  summarizePersonShort,
} from "../agents/summaryAgent.js";

const executeObservations = async (userId, conversationId) => {
  const messages = await getConversationById(userId, conversationId, false);
  const observationSubjects = await observationAgent.extract(messages);
  console.log(`observationSubjects:
  ${JSON.stringify(observationSubjects)}`);
  for (let i = 0; i < observationSubjects.length; i++) {
    const observationSubject = observationSubjects[i];

    if (observationSubject.subject.toLowerCase().includes("user")) {
      for (let j = 0; j < observationSubject.observations.length; j++) {
        const observation = observationSubject.observations[j];
        const category = await observationAgent.categorize(observation);
        const result = await firestore.list(`users/test/${category.name}`);
        const existingObservations = result.map((observation) => {
          return { id: observation.id, content: observation.content };
        });
        let auditResult = { code: "C", id: 0 };
        if (existingObservations.length != 0) {
          console.log("Auditing...");
          auditResult = await observationAgent.audit(
            observation,
            existingObservations
          );
        }

        if (auditResult.code.toUpperCase().includes("C")) {
          const uid = createUID();
          const data = {
            createdOn: new Date(),
            updatedAt: new Date(),
            content: observation,
          };
          firestore.create(`users/test/${category.name}/${uid}`, data);
          const embedding = await createEmbedding(observation);
          upsertEmbeddingToPinecone(
            embedding,
            `users/test/${category.name}`,
            uid
          );
        } else {
          // Handle A and B results.
        }
        await sleep(100);
      }
    } else {
      let personUID = -1;
      let updateIdentifiers = false;
      let newPerson = false;
      const newObservations = [];

      const categoryPromises = [];
      observationAgent.getCategories().forEach((category) => {
        categoryPromises.push(
          firestore.list(`users/test/people/${personUID}/${category}`)
        );
      });
      const allObservations = await Promise.all(categoryPromises);
      allObservations.map((observation) => observation.content);

      const newProfileObservations = [];
      const profileObservations = await firestore.list(
        `users/test/people/${personUID}/Profile`
      );

      let people = await firestore.list(`users/test/people/`);
      people = people.filter(
        (person) =>
          person.identifiers &&
          person.identifiers.some((identifier) =>
            identifier.includes(observationSubject.subject)
          )
      );

      if (people.length > 0) {
        personUID = await observationAgent.matchPerson(
          people,
          observationSubject.observations
        );
      }

      if (personUID == -1) {
        // We're creating a new person document.
        personUID = createUID();
        const data = {
          createdOn: new Date(),
          updatedAt: new Date(),
        };
        updateIdentifiers = true;
        newPerson = true;
        await firestore.create(`users/test/people/${personUID}`, data);
      }

      observationSubject.observations.push(
        `Person's name is ${observationSubject.subject}.`
      );

      for (let j = 0; j < observationSubject.observations.length; j++) {
        const observation = observationSubject.observations[j];
        const category = await observationAgent.categorize(observation);
        const result = await firestore.list(
          `users/test/people/${personUID}/${category.name}`
        );

        let auditResult = { code: "C", id: 0 };

        if (!newPerson) {
          const existingObservations = result.map((observation) => {
            return { id: observation.id, content: observation.content };
          });

          if (existingObservations.length != 0) {
            console.log("Auditing...");
            auditResult = await observationAgent.audit(
              observation,
              existingObservations
            );
          }
        }

        if (auditResult.code.toUpperCase().includes("C")) {
          if (category.name.includes("profile")) {
            updateIdentifiers = true;
            newProfileObservations.push(observation);
          }

          const uid = createUID();
          const data = {
            createdOn: new Date(),
            updatedAt: new Date(),
            content: observation,
          };
          firestore.create(`users/test/people/${personUID}/${category.name}/${uid}`, data);
          const embedding = await createEmbedding(observation);
          upsertEmbeddingToPinecone(
            embedding,
            `users/test/people`,
            personUID
          );

          newObservations.push(observation);
        } else {
          // Handle A and B results.
        }
      }

      allObservations.unshift(...newObservations);

      const identifyingDescription = await summarizePersonShort(
        allObservations
      );
      firestore.update(`users/test/people/${personUID}`, {
        identifyingDescription,
      });

      const summary = await summarizePerson(allObservations);
      firestore.update(`users/test/people/${personUID}`, {
        content: summary,
      });

      if (updateIdentifiers) {
        profileObservations.push(...newProfileObservations);
        const updatedIdentifiers = await extractIdentifiers(
          profileObservations
        );
        firestore.update(`users/test/people/${personUID}`, {
          identifiers: updatedIdentifiers,
        });
      }
    }
  }
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
        return match.score > 0.82;
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
