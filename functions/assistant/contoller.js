import { getOpenAIChatResponse } from "../external_apis/index.js";

export const assistantController = {
  async getItemFromDescription(description, type) {
    const messages = [

      {
        role: "system",
        content: `# INPUT A user's description of a goal.
        # OUTPUT SCHEMA:
        {
           "valid" (boolean): "Whether a goal can be extracted from the INPUT. If *false*, exclude all other fields."
            "title" (string): "a clear and concise name for the goal. should start with a verb. (max 20 characters)",
            "category" (enum): ["work","household","errand","life management","fun"],
            "timeframe" (number): "a target amount of days to finish the goal",
            ${type == "Task" ? `"duration" (number): "an estimated time in minutes the task with take"`:''}
        }
        # FUNCTION Convert the user's description into suggestions for the fields in the output schema. If no timeframe is included in the input, provide a recommendation based on the nature of the goal.
        `,
      },
      {
        role: "user",
        content: description,
      },
    ];

    return await getOpenAIChatResponse(messages, true);
  },
};
