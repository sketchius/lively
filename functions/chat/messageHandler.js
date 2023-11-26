import { deleteAllVectors } from "../external_apis/index.js";
import {
  addMessageToConversation,
  closeConversation,
  ensureConversation,
} from "./conversationManager.js";
import { deleteCollection } from "../database/index.js";
import { generateChatResponse } from "../agents/conversationAgent.js";
import { getVectorCount } from "../external_apis/pinecone.js";

const handleMessage = async (messageBody) => {
  let response;

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

  await ensureConversation();

  let workingDate = new Date();
  await addMessageToConversation(
    "user",
    "Hey there, just trying out this new chat feature. I'm Alex, but my friends call me Lex. I'm a 25-year-old woman, celebrating my birthday next month!",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "assistant",
    "Hi Alex! Nice to meet you. How can I assist you today?",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "user",
    "I've been feeling a bit under the weather lately. Probably due to my gluten allergy. It's been tough managing it.",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "assistant",
    "That sounds challenging. Managing dietary restrictions can be tough. Is there anything specific you're looking to discuss about it?",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "user",
    "Not really. Just venting, I guess. You know, I'm generally a positive person, but sometimes I get anxious about health stuff.",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "assistant",
    "It's completely normal to feel that way. Anything else on your mind?",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "user",
    "Well, I've lived in New York for about 3 years now. Moved here from California. I do miss the West Coast, especially the travels I used to have along the coast.",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "assistant",
    "Sounds like you have some great travel memories. What do you do in New York?",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "user",
    "I'm a software developer. Recently graduated with a degree in Computer Science. Before that, I was working part-time at a cafe.",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "assistant",
    "That's quite a shift in careers. How's your family taking it?",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "user",
    "They're supportive. My younger brother is still in high school, and we have a pet cat named Whiskers. My parents are always encouraging.",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "assistant",
    "That's great to hear. Do you have any financial goals or investments you're working towards?",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "user",
    "Yeah, I've started investing in stocks recently. Trying to save up for a new car and maybe a trip to Europe next year.",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "assistant",
    "Sounds like exciting plans! Do you have any hobbies or interests you pursue in your free time?",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "user",
    "I love painting and hiking. I also play the guitar. And I'm trying to get better at cooking, but it's a work in progress.",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "assistant",
    "Those are some diverse interests! Anything specific you like or dislike?",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "user",
    "Love Italian food, hate cold weather. Big fan of sci-fi movies. Not much into politics, but I do believe in climate change awareness.",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "assistant",
    "Italian food and sci-fi movies are a great combo. Have you had any memorable life events or accomplishments?",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "user",
    "Well, graduating was a big deal for me. And I once won a regional guitar competition. That felt amazing.",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "assistant",
    "Congratulations on those achievements! Looking ahead, any goals or aspirations?",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "user",
    "I'm aiming to become a senior developer in the next few years. Also, I want to travel more, maybe live abroad for a while.",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "assistant",
    "Those are solid goals. Any challenges or struggles you're facing currently?",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "user",
    "Balancing work and personal life is tough. Sometimes I regret not spending more time with family.",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "assistant",
    "It's a common struggle. Remember to give yourself some grace. By the way, do you have any cultural details or languages you speak?",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "user",
    "I'm American, with Italian and Mexican heritage. Fluent in English and Spanish, and I'm learning Italian.",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "assistant",
    "That's impressive! Anything else you'd like to share or discuss?",
    { isContext: false },
    new Date(workingDate)
  );

  workingDate.setSeconds(workingDate.getSeconds() + 1);
  await addMessageToConversation(
    "user",
    "I think that's it for now. Thanks for the chat!",
    { isContext: false },
    new Date(workingDate)
  );

  await closeConversation();
  // console.log("Sleeping");
  // await sleep(30000);
  // console.log("Generating Chat Response.");

  // const response = await generateChatResponse(
  //   "Do you remember where I moved from before coming to New York for my Master's?",
  //   "test"
  // );
  // return response;
  return "Done.";
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { handleMessage };
