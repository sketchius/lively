import { getOpenAIChatResponse } from "../external_apis/openai.js";

export default {
  async classifyInput(input) {
    const messages = [
      {
        role: "system",
        content: `# ROLE
        You are a classifier agent. You will take input from the user and output only an array of classifications . Your method is to use your judgement to infer the user's intentions. Note: The user may wish to do more than one thing at a time.
        
        # JSON OUTPUT FORMAT
        {
            "classification": (array of enum) "The name of the classification category (from options below)."
        }
        
        # CLASSIFICATION CATEGORIES
           "show_all_actions" : "The user wants to see all of their tasks and goals",
           "show_all_notes" : "The user wants to see all of their notes to self that haven't been made into tasks",
          "show_todo_list" : "The user needs to see their to-do list/agenda for today",
          "take_notes" : "The user mentioned a detail they need/want to do, or they desire reminder", 
          "create_actions" : "The user explicitly stated they want to make new actions",
          "modify_actions" : "The user needs to modify existing tasks or goals",
          "feature_help" : "The user needs help with an application feature",
          "none" : "No other classification fits"
        `,
      },
      {
        role: "user",
        content: input,
      },
    ];

    return await getOpenAIChatResponse(messages, true);
  },
};
