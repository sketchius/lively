import {
  getCurrentConversation,
  addMessageToCurrentConversation,
  getCurrentConversationId,
  setConversationProperty,
} from "../database/index.js";
import {
  summarizeConversation,
  summarizeInformation,
} from "../processing/summarizer.js";

const getConversation = async () => {
  return await getCurrentConversation("test");
};

const addMessageToConversation = async (role, message) => {
  addMessageToCurrentConversation("test", role, message);
};

const closeConversation = async () => {
  const currentConversationId = await getCurrentConversationId("test");
  summarizeConversation("test", currentConversationId);
  const autobioInformation = await summarizeAutobioInformation("test", currentConversationId);
  
};

export { getConversation, addMessageToConversation, closeConversation };
