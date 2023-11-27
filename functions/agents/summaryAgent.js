import { getOpenAIChatResponse } from "../external_apis/index.js";

const labelContent = async (text) => {
  const systemMessage = `# INPUT Autobiographical details.
  # OUTPUT Label for input. (25 characters or less)`;

  const messages = [
    {
      role: "system",
      content: systemMessage,
    },
    {
      role: "user",
      content: text,
    },
  ];

  const response = await getOpenAIChatResponse(messages, {});

  return await response.content;
};

const filterForRelevance = async (data, message) => {
  const systemMessage = `JSONoutput(DATA.filter( entry => isRelevantTo(USER_MESSAGE) ));`;

  const userMessage = `# DATA: \n${data}\n\n# USER_MESSAGE:\n${message}`;

  const messages = [
    {
      role: "system",
      content: systemMessage,
    },
    {
      role: "user",
      content: userMessage,
    },
  ];

  const response = await getOpenAIChatResponse(messages, {});

  return await response.content;
};

const summarizePerson = async (content) => {

  const systemMessage = `# ROLE You are a specialized agent that summarizes information about a person based on a list of observations.

  # INPUT: A list of observations about the subject.
  
  # OUTPUT: A summary of the information about this person.
  ## OUTPUT LENGTH: Output MUST be LESS THAN 100 words!`;

  const promptMessage = `# INPUT: \n${content}`;

  let errorMessage;

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

  if (errorMessage) {
    messages.push({ role: "user", content: errorMessage });
  }

  let response;
  let attempt = 0;
  const maxAttempts = 3;

  do {
    try {
      response = await getOpenAIChatResponse(messages);
      break;
    } catch (error) {
      attempt++;
      if (attempt >= maxAttempts) {
        throw new Error(
          "Failed to parse JSON after multiple attempts" + error
        );
      }
      console.log("Error: " + error);
      errorMessage = "Error: " + error;
    }
  } while (true);

  return response.content;
};

const summarizePersonShort = async (content) => {

  const systemMessage = `# ROLE You are a specialized agent that summarizes information about a person with a focus on being able to refresh someone's memory about who they were talking about, assuming there might be other people with the same name.

  # INPUT: A list of observations about the subject.
  
  # OUTPUT: Description that focus on distinguishing this person from others with the same name.
  ## OUTPUT LENGTH: Output MUST be LESS THAN 30 words!`;

  const promptMessage = `# INPUT: \n${content}`;

  let errorMessage;

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

  if (errorMessage) {
    messages.push({ role: "user", content: errorMessage });
  }

  let response;
  let attempt = 0;
  const maxAttempts = 3;

  do {
    try {
      response = await getOpenAIChatResponse(messages);
      break;
    } catch (error) {
      attempt++;
      if (attempt >= maxAttempts) {
        throw new Error(
          "Failed to parse JSON after multiple attempts" + error
        );
      }
      console.log("Error: " + error);
      errorMessage = "Error: " + error;
    }
  } while (true);

  return response.content;
};


const extractIdentifiers = async (content) => {

  if (content.length == 0) return [];

  const systemMessage = `# ROLE You are an agent that extracts identifiers/names for a person based on OBSERVATIONS about them.
  # INPUT: A list of observations about the subject.
  
  # OUTPUT:
  - A JSON array of strings. Each string should be an identifier.
  - ONLY output the JSON.
  - Only include each unique identifier once.

  ## EXAMPLES
  ### NAMES - First, last, or full
  Lacy
  Julie Smith
  Washington
  ### NICKNAMES
  Billy
  Smalls
  ### RELATIONSHIP TERMS
  Aunt
  Brother
  Friend
  Coworker`

  const promptMessage = `# OBSERVATIONS: \n${content.join('\n')}`;

  let errorMessage;

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

  if (errorMessage) {
    messages.push({ role: "user", content: errorMessage });
  }

  let response, identifiers;
  let attempt = 0;
  const maxAttempts = 3;

  do {
    try {
      response = await getOpenAIChatResponse(messages);
      identifiers = JSON.parse(response.content);
        if (!Array.isArray(identifiers)) {
          throw new Error(
            "Invalid format. Expected JSON array of strings."
          );
        }
      break;
    } catch (error) {
      attempt++;
      if (attempt >= maxAttempts) {
        throw new Error(
          "Failed to parse JSON after multiple attempts" + error
        );
      }
      console.log("Error: " + error);
      errorMessage = "Error: " + error;
    }
  } while (true);

  return identifiers;
};

export { labelContent, filterForRelevance, summarizePerson, summarizePersonShort, extractIdentifiers };
