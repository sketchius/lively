import { OpenAI } from "openai";
import * as functions from "firebase-functions";
import xml2js from "xml2js";

const openai = new OpenAI({
  apiKey: functions.config().openai.api_key,
});

const getOpenAIChatResponse = async function (
  messages,
  outputType = "text",
  model = "gpt-3.5-turbo-0125"
) {
  const requestOptions = {
    model: model,
    messages,
  };

  const timeout = (ms) =>
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    );

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const openAIResponse = await Promise.race([
        openai.chat.completions.create(requestOptions),
        timeout(60000), // 10 seconds timeout
      ]);
      switch (outputType) {
        case "json":
          return JSON.parse(openAIResponse.choices[0].message.content);
        case "xml":
          return await parseXML(openAIResponse.choices[0].message.content);
        default:
        case "text":
          return openAIResponse.choices[0].message.content;
      }
    } catch (error) {
      console.log(`Attempt ${attempt}: `, error.message);
      if (attempt === 3) {
        throw new Error("Failed to get response after 3 attempts");
      }
    }
  }
};

const parseXML = (content) => {
  return new Promise((resolve, reject) => {
    const parser = new xml2js.Parser({
      explicitChildren: true,
      preserveChildrenOrder: true,
      charsAsChildren: true,
    });

    const xml = `<root>${content}</root>`;

    parser.parseString(xml, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        reject(err); 
      } else {
        if (result?.root?.$$) {
          const elements = result.root.$$.map((element) => ({
            tag: element['#name'],
            content: element._ || 'N/A'
          }));
          resolve(elements);
        } else {
          resolve([]);
        }
      }
    });
  });
};

const getOpenAIChatResponseFunctionTest = async function (messages) {
  // Define your tools (functions the model can call)
  const tools = [
    {
      type: "function",
      function: {
        name: "list_goals", // Example function name
        description: "Lists the user's goals",
      },
    },
    {
      type: "function",
      function: {
        name: "acknowledgement", // Example function name
        description:
          "Sends a message informing the user of the function being used. REQUIRED WHEN USING ANY OTHER FUNCTION",
      },
      parameters: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "The message to send to the user.",
          },
        },
        required: ["message"],
      },
    },
    // You can define multiple functions here
  ];

  const requestOptions = {
    model: "gpt-3.5-turbo-0125",
    messages,
    tools, // Include the tools parameter
    tool_choice: "auto", // Set tool_choice to auto, none, or specify a function
  };

  const timeout = (ms) =>
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    );

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const openAIResponse = await Promise.race([
        openai.chat.completions.create(requestOptions),
        timeout(60000), // 60 seconds timeout
      ]);

      // Check if the response includes a function call
      return openAIResponse.choices[0];
    } catch (error) {
      console.log(`Attempt ${attempt}: `, error.message);
      if (attempt === 3) {
        throw new Error("Failed to get response after 3 attempts");
      }
    }
  }
};

async function createEmbedding(data) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: data,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export {
  getOpenAIChatResponse,
  getOpenAIChatResponseFunctionTest,
  createEmbedding,
};
