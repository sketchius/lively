import {
  getCurrentConversation,
  addMessageToCurrentConversation,
  getCurrentConversationId,
  setConversationProperty,
  setCurrentConversation,
} from "../database/index.js";
import { executeObservations } from '../processing/index.js';

const getConversation = async () => {
  return await getCurrentConversation("test");
};

const addMessageToConversation = async (role, message) => {
  addMessageToCurrentConversation("test", role, message);
};

const closeConversation = async () => {
  const currentConversationId = await getCurrentConversationId("test");
  // summarizeConversation("test", currentConversationId);
  executeObservations("test",currentConversationId);
  setCurrentConversation("test",null);
};

const clearConversation = async () => {
  setCurrentConversation("test",null);
};


export { getConversation, addMessageToConversation, closeConversation, clearConversation };
