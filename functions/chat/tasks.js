import { getOpenAIChatResponse } from "../external_apis/openai.js";

export default {
  async parseTask(input) {
    const messages = [
      {
        role: "system",
        content: `# INPUT A user message regarding the creation of a task.
        # OUTPUT SCHEMA:
        {
            "valid" (boolean): "true if there is some information about the task (even a name), false if the message only requests a task. omit all other fields if false",
            "title" (varchar(10)): "a 2-3 word clear and concise name for the task. should start with a verb. max 10 characters",
            "details" (string, optional): "Extra details from INPUT about the task not present in title. Write in short hand. Should be short and concise. Do not add details or sentiments. Do not duplicate information in title. If none are present, omit field,
            "category" (enum): ["Work" (relating to professional duties),"Household" (chores, maintanence),"Errand" (minor things that require going to specific places),"Wellness" (mental + physical health, diet, exercise, medical),"Life Management" (handling adult responsiblities),"Personal" (fun, hobbies, interests)],
            "duration" (integer): "estimated number of minutes the task will take",
            "timeframe_interval" (enum [Day,Week,Month,Year]): "the unit used to specify \`timeframe_target\`",
            "timeframe_type" (enum [Flexible,Deadline,Scheduled]): "flexible - around time frame (for task that are not strictly bound to a certain time), deadline - before or on time frame (for tasks that have a hard due date), scheduled - Must be done exactly within time frame (for tasks that can only be done within a certain time window); the type should fit the nature of the task or the user's message",
            "timeframe_format: (enum [relative, absolute]) "how the timeframe_target is expressed (default to relative unless the user specifies an absolute date)"
            "timeframe_target" : "if (timeframe_format == relative) { an amount of the chosen timeframe_unit to get the task done (0 for today/this week, 1 for 1 days/1 month, etc) } else { an absolute date in MM/DD/YYYY format }",
            "importance_modifier" (integer, optional): "ranges from -2 to +2. importance comes from the category, but a modifier can be assigned for task that are clearly less or more important. omit field if 0"
        }
        # FUNCTION Convert the user's description into suggestions for the fields in the output schema. If the input provides guidance for the fields, do your best to choose corresponding values. Otherwise, make an educated guess or suggestion.
       # CURRENT DATE = ${new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" })}`,
      },
      {
        role: "user",
        content: input,
      },
    ];

    return await getOpenAIChatResponse(messages, "json");
  },
  async parseTaskModification(input, taskData) {
    const messages = [
      {
        role: "system",
        content: `# INPUT A user message regarding the modification of a task AND an input JSON object.
        # OUTPUT: Output a JSON object as detailed below. Only include fields that have changed from the input.
        # OUTPUT SCHEMA:
        {
            "title" (varchar(10)): "a 2-3 word clear and concise name for the task. should start with a verb. max 10 characters",
            "details" (string, optional): "Extra details from INPUT about the task not present in title. Write in short hand. Should be short and concise. Do not add details or sentiments. Do not duplicate information in title. If none are present, omit field,
            "category" (enum): ["Work" (relating to professional duties),"Household" (chores, maintanence),"Errand" (minor things that require going to specific places),"Wellness" (mental + physical health, diet, exercise, medical),"Life Management" (handling adult responsiblities),"Personal" (fun, hobbies, interests)],
            "duration" (integer): "estimated number of minutes the task will take",
            "timeframe_interval" (enum [Day,Week,Month,Year]): "the unit used to specify \`timeframe_target\`",
            "timeframe_type" (enum [Flexible,Deadline,Scheduled]): "flexible - around time frame (for task that are not strictly bound to a certain time), deadline - before or on time frame (for tasks that have a hard due date), scheduled - Must be done exactly within time frame (for tasks that can only be done within a certain time window); the type should fit the nature of the task or the user's message",
            "timeframe_format: (enum [relative, absolute]) "how the timeframe_target is expressed (default to relative unless the user specifies an absolute date)"
            "timeframe_target" : "if (timeframe_format == relative) { an amount of the chosen timeframe_unit to get the task done (0 for today/this week, 1 for 1 days/1 month, etc) } else { an absolute date in MM/DD/YYYY format }",
            "importance_modifier" (integer, optional): "ranges from -2 to +2. importance comes from the category, but a modifier can be assigned for task that are clearly less or more important. omit field if 0"

        # FUNCTION Process the modification instructions, perform them on the input JSON object and output a modified JSON object, including only modified fields.
       # CURRENT DATE = ${new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" })}`,
      },
      {
        role: "user",
        content: `# MODIFICATION INSTRUCTIONS
        ${input}
        # INPUT JSON OBJECT
        ${taskData}`,
      },
    ];

    return await getOpenAIChatResponse(messages, "json");
  },
};

function validate(data) {
  if (!data.valid) {
    return "valid";
  }
  if (!data.title) {
    return "Error: Response must include a 'title' field.";
  }
  if (!data.category) {
    return "Error: Response must include a 'category' field.";
  }
}
