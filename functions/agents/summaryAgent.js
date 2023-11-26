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

const summarizePerson = async (content, categoryId) => {
  const logit_bias = {
    9837: 10,
    60: 10,
  }; // Encourage '[', ']' tokens

  if (!content) return [];

  const systemMessage = `# ROLE You are a specialized agent that summarizes information about a person with a focus on being able to refresh someone's memory about who they were talking about, assuming there might be other people with the same name.

  # INPUT: A list of observations about the subject.
  
  # OUTPUT: Description that focus on distinguishing this person from others with the same name.
  ## OUTPUT LENGTH: Output MUST be LESS THAN 30 words!`;

  const promptMessage = `# INPUT\n${content}`;

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

  let response, observations;
  let attempt = 0;
  const maxAttempts = 3;

  do {
    try {
      response = await getOpenAIChatResponse(messages, { logit_bias });
      observations = JSON.parse(response.content);
      if (!Array.isArray(observations)) {
        throw new Error("Invalid format. Output must be a JSON array.");
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

  return observations;
};

export { labelContent, filterForRelevance };
