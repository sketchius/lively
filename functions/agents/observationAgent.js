import { getOpenAIChatResponse } from "../external_apis/index.js";

const extractObservations = async (conversation) => {
  const logit_bias = {
    414: -20,
    5751: -20,
    584: -20,
    1226: -20,
    9837: 10,
    60: 10,
  }; // Discourage 'Our', 'our', 'We', 'we'; encourage '[', ']'

  console.log("CONVERSATION MESSAGES TO ANALYZE FOR OBSERVATIONS:");
  console.log(
    conversation
      .map(
        (conversationMessage) =>
          `${conversationMessage.role}:  ${conversationMessage.content}`
      )
      .join("\n\n")
  );

  const systemMessage = `You are an AI that specializes in analyzing conversations and creating autobiographical FACTS from them.

  - Your output should be in the form of bullet points.
  - OBSERVATION FORMAT: 3rd person perspective from User.
  - Output the OBSERVATIONS as a JSON array of strings

# EXAMPLES
"User has a car"
"User went to a concert last Thursday"`;

  const promptMessage = `EXTRACT all AUTOBIOGRAPHICAL INFORMATION shared by the User in this conversation. Do NOT include questions and commentary from the Assitant. OBSERVATION FORMAT: 3rd person perspective.
  
  CONVERSATION: \n${conversation
    .map(
      (conversationMessage) =>
        `${conversationMessage.role}:  ${conversationMessage.content}`
    )
    .join("\n\n")}`;

  const messages = [
    {
      role: "system",
      content: systemMessage,
    },
    {
      role: "user",
      content: promptMessage,
    },
  ];

  let response, observations;
  let attempt = 0;
  const maxAttempts = 3;

  do {
    try {
      response = await getOpenAIChatResponse(messages, { logit_bias });
      console.log("OBSERVATION RESPONSE:");
      console.log(response);
      observations = JSON.parse(response.content);
      break;
    } catch (error) {
      attempt++;
      if (attempt >= maxAttempts) {
        throw new Error("Failed to parse JSON after multiple attempts" + error);
      }
    }
  } while (true);

  return observations;
};

const mergeObservations = async (observation1, observation2) => {
  const systemMessage = `You are an AI that specializes in reading autobiographical information from two sources and merging them.

    Your output should as short as possible.
    Your output should retain all unique information from both sources.
    Your output should reorganize the information in a way that makes sense.`;

  const promptMessage = `MERGE the AUTOBIOGRAPHICAL INFORMATION in these TWO SOURCES:

    ["${observation1}","${observation2}"]`;

  console.log(promptMessage);
  const messages = [
    {
      role: "system",
      content: systemMessage,
    },
    {
      role: "user",
      content: promptMessage,
    },
  ];

  const response = await getOpenAIChatResponse(messages, {});
  console.log("RESPONSE:");
  console.log(response.content);

  return await response.content;
};

export { extractObservations, mergeObservations };
