import { OpenAI } from "openai";
import * as functions from 'firebase-functions';

const openai = new OpenAI({
  apiKey: functions.config().openai.api_key,
});

const getOpenAIChatResponse = async function (
  conversationHistory,
  newSystemMessage,
  newUserMessage
) {



  const messages = [
    ...conversationHistory,
    ...(newSystemMessage ? [{
      role: "system",
      content: newSystemMessage,
    },] : []),
    {
      role: "user",
      content: newUserMessage,
    },
  ];

  try {
    const openAIResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return openAIResponse.choices[0].message.content;
  } catch (error) {
    console.log("Error in API Call: ", error);
    return null;
  }
};

export { getOpenAIChatResponse };
