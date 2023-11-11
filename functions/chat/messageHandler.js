import { getOpenAIChatResponse } from "../external_apis/index.js";
import {
  getConversation,
  addMessageToConversation,
} from "./conversationManager.js";

const handleMessage = async (messageBody) => {
  await addMessageToConversation("user", messageBody);
  const response = await getOpenAIChatResponse(
    await getConversation(),
    "",
    messageBody
  );
  await addMessageToConversation("assistant", response);
  return response;
};

export { handleMessage };
