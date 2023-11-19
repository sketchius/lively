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
  console.log("RESPONSE:");
  console.log(response.content);

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
  console.log("RESPONSE:");
  console.log(response.content);

  return await response.content;
};

export { labelContent, filterForRelevance };
