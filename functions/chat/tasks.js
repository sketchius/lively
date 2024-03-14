import { getOpenAIChatResponse } from "../external_apis/openai.js";


export default {
  async parseTask(input) {
    const messages = [
      {
        role: "system",
        content: `# INPUT A message regarding the creation of a task.
        # OUTPUT SCHEMA:
        {
            "title" (string): "a clear and concise name for the task. should start with a verb. (max 20 characters)",
            "notes" (string, optional): "Details from INPUT about the task not present in title. Write in short hand. Should be short and concise. Do not add details or sentiments. If none are present, it must be an empty string",
            "category" (enum): ["work" (relating to professional duties),"household" (chores, maintanence),"errand" (minor things that require going to specific places),"life management" (handling adult responsiblities),"personal" (fun, hobbies, interests)],
            "duration" (integer): "estimated number of minutes the task will take",
            "timeframe_interval" (enum [Day,Week,Month,Year]): "the temporal range to set the timeframe",
            "timeframe_type" (enum [Flexible,Deadline,Scheduled]): "flexible - around time frame (for task that are not strictly bound to a certain time), deadline - before or on time frame (for tasks that have a hard due date), scheduled - Must be done exactly within time frame (for tasks that can only be done within a certain time window); the type should fit the nature of the task",
            "timeframe_date" (specific day, week, month, or year): "an absolute date (refer to CURRENT DATE to set dates in the future), corresponds to interval selection. i.e. for day 'July 2nd 2024'; for week 'Week of Week of Mar 10th - Mar 16th 2024'; for month: 'December 2024', for year: '2024'",
            "importance_modifier" (integer): "ranges from -2 to +2. importance comes from the category, but a modifier can be assigned for task that are clearly less or more important"

        # FUNCTION Convert the user's description into suggestions for the fields in the output schema. If the input provides guidance for the fields, do your best to choose corresponding values. Otherwise, make an educated guess or suggestion.
       # CURRENT DATE = ${new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}`,
      },
      {
        role: "user",
        content: input,
      },
    ];

    return await getOpenAIChatResponse(messages, 'json');
  },
};


// # ROLE
// You are a task/goal/note identifier agent. The user seems to want to create one or more tasks/goals/notes. You will parse their input and output only a JSON object with a single property: items. Items will be an array documenting ALL tasks, goals, and notes.
        
// Disregard questions, requests to change interface.

//         # JSON OUTPUT FORMAT
//         {
//             "items": (array of objects) {
//        "type" : (enum [task, goal, note]), "isolation" : "only the parts of the input talking about this item"
// }
//         }

// #  TASK VS GOAL
// How to distinguish user's intent.
// Goal - A desired outcome that will require multiple days effort and more than one action.
// Task - A single action or errand that can be done in one work session
// Note - The user has specifically requested to make note or remind them about something.