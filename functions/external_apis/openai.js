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
  functions,
  functionCall
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

  try {
    const openAIResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: messages,
      functions,
      function_call: functionCall,
    });
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
