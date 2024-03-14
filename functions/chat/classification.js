import { getOpenAIChatResponse } from "../external_apis/openai.js";

export default {
  async classifyInput(input) {
    const messages = [
      {
        role: "system",
        content: `# ROLE
        You are a classifier agent. You will take input from the user and output only a JSON object with a single property: classifications. Err on the side of more classfications.
        
        # JSON OUTPUT FORMAT
        {
            "classifications": (array of strings) "The names of all relevant classification categories'"
        }
        
        
        # CLASSIFICATION CATEGORIES
          "show_all_tasks" : "The user wants to see all of their tasks",
          "show_all_goals" : "The user wants to see all of their goals",
          "show_all_notes" : "The user wants to see all of their notes",
          "show_todo_list" : "The user needs to see their to-do list/agenda for today",
          "save_note" : "The user mentioned something they want to remember for later", 
          "create_task" : "The user mentioned a task that they need to do",
          "create_goal" : "The user mentioned a goal that they want to do",
          "feature_help" : "The user needs help with an application feature",
          "none" : "No other classification fits"

# NOTE VS TASK VS GOAL
How to distinguish user's intent.
Goal - A desired outcome that will require multiple days effort and more than one action.
Task - A single action or errand that can be done in one work session
Note - A recording of a thought that isn't expressed as a Task or Goal.`,
      },
      {
        role: "user",
        content: input,
      },
    ];

    return await getOpenAIChatResponse(messages, true, "gpt-3.5-turbo");
  },
};

// # ROLE
// You are a classifier agent. You will take input from the user and output only a JSON object with a single property: classifications. Don't use the same category twice.

//         # JSON OUTPUT FORMAT
//         {
//             "classifications": (array of strings) "The names of all relevant classification categories'"
//         }

//         # CLASSIFICATION CATEGORIES
//           "show_all_tasks" : "The user wants to see all of their tasks",
//           "show_all_goals" : "The user wants to see all of their goals",
//           "show_all_notes" : "The user wants to see all of their notes",
//           "show_todo_list" : "The user needs to see their to-do list/agenda for today",
//           "save_note" : "The user mentioned something they want to remember for later",
//           "create_task_or_goal" : "The user mentioned a task or goal that they need to do",
//           "feature_help" : "The user needs help with an application feature",
//           "none" : "No other classification fits"

// # NOTE VS TASK VS GOAL
// How to distinguish user's intent.
// Goal - A desired outcome that will require multiple days effort and more than one action.
// Task - A single action or errand that can be done in one work session
// Note - A recording of a thought that isn't expressed as a Task or Goal.
