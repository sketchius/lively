import { getOpenAIChatResponse } from "../external_apis/index.js";

const convertDatesFromRelativeToAbsolute = async (text) => {
  const systemMessage = `# ROLE: You are a Relative -> Absolute Date Converter.
  # METHODOLOGY: You SEARCH text for RELATIVE DATES and REPLACE matches with ABSOLUTE DATES. ONLY change the DATES. Your response should ONLY contain the MODIFIED TEXT.
  # CURRENT DATE: 11/18/23
  # EXAMPLE INPUT/OUTPUT
  INPUT: "Tommorow works for me!", OUTPUT: "11/19/23 works for me!",
  INPUT: "Yesterday I did.", OUTPUT: "On 11/17/23 I did";
  INPUT: "Next week I'll be back", OUTPUT: "The week of  11/20/23 I'll be back.";
  INPUT: "It'll be a couple months.", OUTPUT: "It'll be around January.";
  INPUT: "I haven't seen him in a couple years.", OUTPUT: "I haven't seen him since around 2021.";
  INPUT: "Joe was there last Christmas.", OUTPUT: "Joe was there Christmas 2022."`;
  // If there are any contractions, simply output "CONTRADICTION"`;

  const promptMessage = `# COMMAND: Output text with any RELATIVE dates replaced with ABSOLUTE dates.
  # TEXT:
${text}`;

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

export { convertDatesFromRelativeToAbsolute };
