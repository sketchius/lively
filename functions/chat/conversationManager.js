import {
  getCurrentConversation,
  addMessageToCurrentConversation,
  getCurrentConversationId,
  setCurrentConversation,
  getAllKeywordsForConversation,
  isObservationReferenceInConversation,
  addObservationReferenceToConversation,
  createConversationForUser,
  addKeywordToConversation,
} from "../firestore/index.js";
import { executeObservations } from "../processing/index.js";

const ensureConversation = async () => {
  if (!(await getCurrentConversationId("test"))) {
    return await createConversationForUser("test");
  }
};

const getConversation = async (includeIsContext) => {
  return await getCurrentConversation("test", includeIsContext);
};

const addMessageToConversation = async (role, message, flags, datetime) => {
  addMessageToCurrentConversation("test", role, message, flags, datetime);
};

const closeConversation = async () => {
  const currentConversationId = await getCurrentConversationId("test");
  await executeObservations("test", currentConversationId);
  await setCurrentConversation("test", null);
};

const clearConversation = async () => {
  await setCurrentConversation("test", null);
};

const filterConversationKeywords = async (keywords) => {
  const existingKeywords = await getAllKeywordsForConversation(
    "test",
    await getCurrentConversationId("test")
  );
  return keywords.filter(
    (keyword) =>
      !existingKeywords.some(
        (existingKeyword) =>
          existingKeyword.toLowerCase() === keyword.toLowerCase()
      )
  );
};

const addKeywordsToConversation = async (keywords) => {
  const conversationId = await getCurrentConversationId("test");
  for (const keyword of keywords) {
    await addKeywordToConversation("test", conversationId, keyword);
  }
};

const attemptToAddObservationReference = async (observationId) => {
  const conversationId = await getCurrentConversationId("test");
  if (
    !(await isObservationReferenceInConversation(
      "test",
      conversationId,
      observationId
    ))
  ) {
    await addObservationReferenceToConversation(
      "test",
      conversationId,
      observationId
    );
    return true;
  } else {
    return false;
  }
};

export {
  ensureConversation,
  getConversation,
  addMessageToConversation,
  closeConversation,
  clearConversation,
  filterConversationKeywords,
  addKeywordsToConversation,
  attemptToAddObservationReference,
};
