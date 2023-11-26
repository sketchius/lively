export { deleteCollection } from "./userData.js";

export {
  createConversationForUser,
  getCurrentConversation,
  setCurrentConversation,
  getCurrentConversationId,
  addMessageToCurrentConversation,
  getConversationById,
  setConversationProperty,
  getConversationProperty,
  getAllKeywordsForConversation,
  addKeywordToConversation,
  isObservationReferenceInConversation,
  addObservationReferenceToConversation,
} from "./conversationData.js";

export {
  createRecordForUser,
  addObservationToRecord,
  getRecordForUser,
  updateObservationInRecord,
  getAllObservationsInRecord,
} from "./recordData.js";

export { firestore as firestore } from "./firestore.js";
