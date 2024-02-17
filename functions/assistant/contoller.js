import { getOpenAIChatResponse } from "../external_apis/index.js";

export const assistantController = {
  async getItemFromDescription(description) {
    const messages = [
      {
        role: "system",
        content: `# INPUT A user's description of a goal.
                # OUTPUT SCHEMA:
                {
                    "title" (string): "a clear and concise name for the goal. should start with a verb. (max 20 characters)",
                    "category" (enum): ["work","household","errand","life management","fun"],
                    "timeframe" (number): "a target amount of days to finish the goal",
                    "internalNotes" (string): "additional information about the user's goal for future reference. only include data not covered by the other fields"
                }
                # FUNCTION Convert the user's description into suggestions for the fields in the output schema. If no timeframe is included in the input, provide a recommendation based on the nature of the goal. Attempt to extract the ultimate goal, but make note of any obstacles that the user mentions.`,
      },
      {
        role: "user",
        content: description,
      },
    ];

    return await getOpenAIChatResponse(messages, true);
  },

  async validateDescription(description) {
    const messages = [
      {
        role: "system",
        content: `# INPUT A user's description of a goal.
        # OUTPUT enum ["valid","invalid"] // always output one of the enum values
        # FUNCTION Determine whether a goal can be extracted from the INPUT
        `,
      },
      {
        role: "user",
        content: description,
      },
    ];

    return await getOpenAIChatResponse(messages, false);
  },
};
