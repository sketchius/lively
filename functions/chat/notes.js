import { getOpenAIChatResponse } from "../external_apis/openai.js";

export default {
  async identifyNotes(input) {
    const messages = [
      {
        role: "system",
        content: `# ROLE
        You are a note-taker agent. You will take input from the user and output only a JSON object with a single property: notes. The notes field should be an array of names for the notes.
        
        # JSON OUTPUT FORMAT
        {
            "notes": (string) "The name of a note. Should start with a verb. Should be clear and concise and 3-5 words or less than 20 characters."
        }`,
      },
      {
        role: "user",
        content: input,
      },
    ];

    return await getOpenAIChatResponse(messages, 'json');
  },
};
