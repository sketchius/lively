import {
  getCurrentConversation,
  addMessageToCurrentConversation,
} from "../database/index.js";

const getConversation = async () => {
  return await getCurrentConversation("test");
};

const addMessageToConversation = async (role, message) => {
  addMessageToCurrentConversation("test", role, message);
};

export { getConversation, addMessageToConversation };
