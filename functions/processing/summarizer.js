import { getOpenAIChatResponse } from "./../external_apis/index.js";

import {
  getConversationById,
  getConversationProperty,
  setConversationProperty,
} from "../database/index.js";

const summarizeConversation = async (userId, conversationId) => {
  const messages = await getConversationById(userId, conversationId);
  const promptMessage =
    "CONVERSATION: " +
    messages
      .map((message) => {
        return `${message.role}:  ${message.content}`;
      })
      .join("\n\n");
  const systemMessage = `Summarize this conversation."`;

  const response = await getOpenAIChatResponse(
    systemMessage,
    [],
    "",
    promptMessage
  );

  await setConversationProperty(
    userId,
    conversationId,
    "summary",
    response.content
  );
};

const summarizeConversation2 = async (userId, conversationId) => {
  const messages = await getConversationById(userId, conversationId);
  const userMessages = messages
    .map((message) => {
      return `${
        message.role == "user" ? 'MESSAGE: "' + message.content + '"\n' : ""
      }`;
    })
    .join("\n");
  const promptMessage = "MESSAGES: " + userMessages;

  await setConversationProperty(userId, conversationId, "convo", userMessages);

  const systemMessage = `MAKE a list of UNIQUE OBSERVATIONS about the GRAMMAR and PUNCTUATION in the messages. The list should use IMPERATIVE MOOD as if it were WRITING STYLE GUIDELINES. ONLY include NONSTANDARD GRAMMAR and PUNCTUATION. DO NOT include any elements not PRESENT in text.`;
  //  Do NOT make note of word choice or jargon/slang. DO NOT include SPECIFIC EXAMPLES.
  //`;

  const observations = await getOpenAIChatResponse(
    systemMessage,
    [],
    "",
    promptMessage
  );

  const response = await getOpenAIChatResponse(
    `Combine SAMPLE B into SAMPLE A, favoring SAMPLE A. Do NOT include SAMPLE NAME in the output. LIMIT output to 120 words.`,
    [],
    "",

    `SAMPLE A:
    ${await getConversationProperty(userId, conversationId, "summary")}
    SAMPLE B:
    ${observations.content}`
  );

  await setConversationProperty(
    userId,
    conversationId,
    "summary",
    response.content
  );
};

const createJournalEntry = async (userId, conversationId) => {
  const messages = await getConversationById(userId, conversationId);
  const promptMessage =
    "CONVERSATION: " +
    messages
      .map((message) => {
        return `${message.role == "user" ? message.content : ""}`;
      })
      .join("\n");
  const systemMessage = `Based on the information said by 'USER' in this conversation, create a journal entry where user talks about their day in first person perspective, using the same langauge USER used. Do NOT start with "Dear Journal"`;

  const response = await getOpenAIChatResponse(
    systemMessage,
    [],
    "",
    promptMessage
  );

  await setConversationProperty(
    userId,
    conversationId,
    "summary",
    response.content
  );
};

const calcAverageWordCount = async (userId, conversationId) => {
  const userMessages = (
    await getConversationById(userId, conversationId)
  ).filter((message) => message.role == "user");

  let totalWords = 0;
  userMessages.forEach((message) => {
    totalWords += message.content.split(" ").length;
  });

  await setConversationProperty(
    userId,
    conversationId,
    "averageWordCount",
    totalWords / userMessages.length
  );
};

export { summarizeConversation, calcAverageWordCount };
