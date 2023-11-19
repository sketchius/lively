import {
  deleteAllVectors,
} from "../external_apis/index.js";
import {
  addMessageToConversation,
  closeConversation,
  ensureConversation,
} from "./conversationManager.js";
import {
  deleteCollection,
} from "../database/index.js";
import { generateChatResponse } from "../agents/conversationAgent.js";
import { getVectorCount } from "../external_apis/pinecone.js";

const handleMessage = async (messageBody) => {
  let response;
  console.log(`messageBody:`);
  console.log(messageBody);

  switch (messageBody.trim()) {
    case "!clear":
      await deleteAllVectors();
      await deleteCollection("users");
      response = "Memory Cleared.";
      break;

    case "!end":
      await closeConversation();
      response = "Conversation Ended.";
      break;
    case "!sim":
      response = await runSim();
      break;
    default:
      response = await generateChatResponse(messageBody, "test");
      break;
  }

  return {
    content: response,
  };
};

async function runSim() {

  await deleteAllVectors();
  await deleteCollection("users");

  await sleep(1000);

  console.log(`Vectors: ${await getVectorCount()}`);

  await ensureConversation();

  let workingDate = new Date();
  await addMessageToConversation(
    "user",
    "Hi there, I'm Alex. I moved to New York from Chicago a few months ago.",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "assistant",
    "Hello Alex! How are you finding New York compared to Chicago?",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "user",
    "It's been great, but a bit overwhelming. I'm here to pursue my Master's degree in Environmental Science.",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "assistant",
    "That sounds exciting! Environmental Science is such an important field. What inspired you to choose that path?",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "user",
    "I've always been passionate about nature. Last summer, I volunteered at a wildlife sanctuary in Colorado, and it was a life-changing experience.",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "assistant",
    "Volunteering at a wildlife sanctuary sounds like a wonderful experience. It must have provided a lot of practical insights into environmental conservation.",
    { isContext: false },
    new Date(workingDate)
  );

  console.log("Closing Conversation");
  await closeConversation();
  console.log("Sleeping");
  await sleep(30000);
  console.log("Generating Chat Response.");

  const response = await generateChatResponse(
    "Do you remember where I moved from before coming to New York for my Master's?",
    "test"
  );
  return response;
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { handleMessage };
