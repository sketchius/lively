


const extractObservations = async (messages) => {
  const logit_bias = {414: -80, 5751: -80, 584: -80, 1226: -80, 9837: 100, 60: 100} // Discourage 'Our', 'our', 'We', 'we'; encourage '[', ']'

  const systemMessage = `You are an AI that specializes in analyzing conversations and creating autobiographical observations from them.

    - Your output should be in the form of bullet points.
    - OBSERVATION FORMAT: \`<"I" or "My"> <statement>\`.
    - Output the OBSERVATIONS as a JSON array of strings`;

  const promptMessage = `EXTRACT all AUTOBIOGRAPHICAL INFORMATION shared by the User in this conversation. Do NOT include questions and commentary from the Assitant. OBSERVATION FORMAT: \`<"I" or "My"> <statement>\`
  
  CONVERSATION: \n${messages
    .map((message) => `${message.role}:  ${message.content}`)
    .join("\n\n")}`;

  let response;
  let attempt = 0;

  do {
    response = await getOpenAIChatResponse(
      systemMessage,
      [],
      "",
      promptMessage,
      {logit_bias}
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