import { OpenAI } from "openai";
import * as functions from "firebase-functions";

const openai = new OpenAI({
  apiKey: functions.config().openai.api_key,
});

const getOpenAIChatResponse = async function (messages, options) {
  const requestOptions = {
    model: "gpt-3.5-turbo",
    messages,
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

  const timeout = (ms) =>
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    );

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const openAIResponse = await Promise.race([
        openai.chat.completions.create(requestOptions),
        timeout(60000), // 10 seconds timeout
      ]);
      return openAIResponse.choices[0].message;
    } catch (error) {
      console.log(`Attempt ${attempt}: `, error.message);
      if (attempt === 3)
        throw new Error("Failed to get response after 3 attempts");
    }
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
