import { OpenAI } from "openai";
import * as functions from "firebase-functions";

const openai = new OpenAI({
  apiKey: functions.config().openai.api_key,
});

const getOpenAIChatResponse = async function (
  masterSystemMessage,
  conversationHistory,
  newSystemMessage,
  newUserMessage,
  options
) {
  const messages = [
    {
      role: "system",
      content: masterSystemMessage,
    },
    ...conversationHistory,
    ...(newSystemMessage
      ? [
          {
            role: "system",
            content: newSystemMessage,
          },
        ]
      : []),
    {
      role: "user",
      content: newUserMessage,
    },
  ];

  console.log("messages");

  const requestOptions = {
    model: "gpt-3.5-turbo-1106",
    messages: messages
  };

  if (options?.logit_bias) {
    requestOptions.logit_bias = options.logit_bias;
  }
  if (options?.functions) {
    requestOptions.functions = options.functions;
  }
  if (options?.functionCall) {
    requestOptions.functionCall = options.functionCall;
  }

  try {
    const openAIResponse = await openai.chat.completions.create(requestOptions);
    return openAIResponse.choices[0].message;
  } catch (error) {
    console.log("Error in API Call: ", error);
    return null;
  }
};

async function createEmbedding(data) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: data,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getOpenAIChatResponse, createEmbedding };
