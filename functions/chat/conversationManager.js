import { createConversationForUser } from "../database/index.js";

const getConversation = async () => {
  await startConversation();
  return [];
};

const startConversation = async () => {
  await createConversationForUser("test");
};

export { getConversation };
