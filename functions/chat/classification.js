import { getOpenAIChatResponse } from "../external_apis/openai.js";

export default {
  async classifyInput(input) {
    const messages = [
      {
        role: "system",
        content: `# ROLE
        You are a classifier agent.
        
        You will take input from the user.
        PAY ATTENTION to what the user wants or needs for each part of the input.
        WRAP XML-style tags around each section with a distinct classification. For example:
        
        <newTask>I need to vacuum.</newTask><chat>How are you?</chat><help>How to I log out?</help>
        
        YOU may rearrange phrases if needed but don't add content. Compound sentences that contain multiple unique needs can be extracted into multiple tags.
                
                # ENUM XML CLASSIFICATION TAGS
               [ <Chat>: "The user is simply chatting.",
                 <showTodo> : "The user needs to see their to-do list/agenda for today",
                  <newNote> : "The user asked to take note or remind them of something.", 
                   <newTask> : "The user mentioned a task that they need to do",
                   <newGoal> : "The user mentioned a goal that they want to do",
                   <help>: "The user needs help with an application feature",
                  <showTasks> : "The user wants to see all of their tasks",
                 <showGoals> : "The user wants to change the view to the goal list",
                 <showNotes>: "The user wants to see all of their notes"]
        
        # NOTE VS TASK VS GOAL
        How to distinguish user's intent.
        Goal - A desired outcome that will require multiple days effort and more than one action.
        Task - A single action or errand that can be done in one work session
        Note - A reminder or note-to-self for the user.`,
      },
      {
        role: "user",
        content: input,
      },
    ];

    return await getOpenAIChatResponse(messages, 'xml', "gpt-3.5-turbo");
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
