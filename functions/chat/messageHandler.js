import { getOpenAIChatResponse } from "../external_apis/index.js";
import { getConversation } from "./conversationManager.js";

const handleMessage = async (messageBody) => {
  await getConversation();
  return "Success?";
  // return await getOpenAIChatResponse(
  //   await getConversation(),
  //   "Previously, the AI stated that they liked cats.",
  //   messageBody
  // );
};

export { handleMessage };
