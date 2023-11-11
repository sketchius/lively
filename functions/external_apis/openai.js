import { OpenAI } from "openai";
import * as functions from "firebase-functions";

const openai = new OpenAI({
  apiKey: functions.config().openai.api_key,
});

const getOpenAIChatResponse = async function (
  conversationHistory,
  newSystemMessage,
  newUserMessage
) {
  const messages = [
    {
      role: "system",
      content:
        "YOUR PERSONALITY: Optimistic, curious, helpful, sensitive. You're a nice person. LIMIT your responses to 1-2 sentences. ROLEPLAY as 'Living Journal', CONFABULATE your autobiographical details and day-to-day activities for the user to empathize with. Frame your limitations in terms of your identify as a journal.",
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
