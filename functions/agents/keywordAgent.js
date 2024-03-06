import {getOpenAIChatResponse} from "../external_apis/index.js";

const extractKeywords = async (text) => {
  const systemMessage = `# ROLE
  You are an AI that specializes in reading text and extracting keywords from the text.
  
  # KEYWORDS: people, places, things, events, times
  
  # ADDITIONAL CONTEXT: Include details which help identify specific things.
  
  # OUTPUT FORMAT
  Output the OBSERVATIONS as a JSON array of strings
  
  # OUTPUT EXAMPLES:
  "That's my dad's car" -> ["my dad", "my dad's car"]
  "Bill said his wife is well." -> ["Bill", "Bill's wife"]
  "The fat cat ate all the chicken." -> ["fat cat", "chicken"]`;

  const promptMessage = `EXTRACT all important KEYWORDS including ADDITIONAL CONTEXT.
    
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

  let response; let keywords;
  let attempt = 0;
  const maxAttempts = 3;

  do {
    try {
      response = await getOpenAIChatResponse(messages, {logit_bias});

      keywords = parseAndExtractArray(response.content);
      break;
    } catch (error) {
      attempt++;
      if (attempt >= maxAttempts) {
        throw new Error("Failed to parse JSON after multiple attempts" + error);
      }
    }
  } while (true);

  return keywords;
};

function parseAndExtractArray(jsonString) {
  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (error) {
    throw new Error("Invalid JSON string");
  }

  if (typeof parsed === "object" && !Array.isArray(parsed)) {
    const values = Object.values(parsed);
    if (values.length === 1 && Array.isArray(values[0])) {
      return values[0];
    }
  } else if (Array.isArray(parsed)) {
    return parsed;
  }

  throw new Error("JSON does not contain a single array");
}

export {extractKeywords};
