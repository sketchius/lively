import { getOpenAIChatResponse } from "../external_apis/openai.js";


export default {
  async parseGoal(input) {
    const messages = [
      {
        role: "system",
        content: `# INPUT A message regarding the creation of a goal.
        # OUTPUT SCHEMA:
        {
            "title" (string): "a clear and concise name for the goal. should start with a verb. (max 20 characters)",
            "details" (string, optional): "Details from INPUT about the goal not present in title. Write in short hand. Should be short and concise. Do not add details or sentiments. If none are present, it must be an empty string",
            "category" (enum): ["Work" (relating to professional duties),"Household" (chores, maintanence),"Errand" (minor things that require going to specific places),"Health" (diet, exercise, medical),"Life management" (handling adult responsiblities),"Personal" (fun, hobbies, interests)],
            "timeframe_interval" (enum [Day,Week,Month,Year]): "the temporal range to set the timeframe",
            "timeframe_type" (enum [Flexible,Deadline,Scheduled]): "flexible - around time frame (for goal that are not strictly bound to a certain time), deadline - before or on time frame (for goals that have a hard due date), scheduled - Must be done exactly within time frame (for goals that can only be done within a certain time window); the type should fit the nature of the goal",
            "timeframe_date" (specific day, week, month, or year): "an absolute date (refer to CURRENT DATE to set dates in the future), corresponds to interval selection. i.e. for day 'July 2nd 2024'; for week 'Week of Week of Mar 10th - Mar 16th 2024'; for month: 'December 2024', for year: '2024'",
            "importance_modifier" (integer): "ranges from -2 to +2. importance comes from the category, but a modifier can be assigned for goal that are clearly less or more important"
            "steps" (array of strings) : "Each item is a step to do in order to complete the goal. names should follow naming convention of goal titles. choose 3 steps unless the user mentions otherwise. focus on steps that are actionable and can be done in less than 1 hour" 

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

