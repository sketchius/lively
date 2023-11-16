const extractKeywords = async (text) => {
  const logit_bias = { 9837: 100, 60: 100 }; // Discourage 'Our', 'our', 'We', 'we'; encourage '[', ']'

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

  let response, keywords;
  let attempt = 0;
  const maxAttempts = 3;

  do {
    try {
      response = await getOpenAIChatResponse(
        systemMessage,
        [],
        "",
        promptMessage,
        { logit_bias }
      );
      keywords = JSON.parse(response);
      break;
    } catch (error) {
      attempt++;
      if (attempt >= maxAttempts) {
        throw new Error("Failed to parse JSON after multiple attempts");
      }
    }
  } while (true);
  
  return keywords;
};
