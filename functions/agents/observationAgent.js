const extractObservations = async (messages) => {
  const systemMessage = `You are an AI that specializes in analyzing conversations and creating autobiographical observations from them.

    Your output should be in the form of bullet points.
    Use explicit repetition for clarity--refer to the User in each bullet point.`;

  const promptMessage = `EXTRACT all AUTOBIOGRAPHICAL INFORMATION conveyed by the User in this conversation. Do NOT include questions and commentary from the Assitant.
  
  CONVERSATION: ${messages
    .map((message) => `${message.role}:  ${message.content}`)
    .join("\n\n")}`;

  let response;
  let attempt = 0;

  do {
    response = await getOpenAIChatResponse(
      systemMessage,
      [],
      "",
      promptMessage
    );
    attempt++;
  } while (
    (response.content.startsWith("I'm sorry") ||
      response.content.startsWith("Sorry")) &&
    attempt < 3
  );

  const observations = removeStartingSubstring(
    response.content,
    "AUTOBIOGRAPHICAL INFORMATION"
  );

  return observations;
};

const mergeObservations = async (observation1, observation2) => {
  const systemMessage = `You are an AI that specializes in reading autobiographical information from two sources and merging them.

    Your output should as short as possible.
    Your output should retain all unique information from both sources.
    Your output should reorganize the information in a way that makes sense.`;
  // If there are any contractions, simply output "CONTRADICTION"`;

  const promptMessage = `MERGE the AUTOBIOGRAPHICAL INFORMATION in these TWO SOURCES:

    ["${observation1}","${observation2}"]`;

  return await getOpenAIChatResponse(systemMessage, [], "", promptMessage);
};

export { extractObservations, mergeObservations };
