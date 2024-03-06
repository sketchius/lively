import {getOpenAIChatResponse} from "../external_apis/index.js";

const processRelativeDates = async (text, originalDate) => {
  const systemMessage = `# Task: Recalibrate past dates or time references to align with the current date.
    # CURRENT DATE: ${new Date()}
    # DATE WRITTEN: ${originalDate}`;

  const promptMessage = `# COMMAND Use relative language to convert this statement from present to past. BE SPECIFIC about how long ago. For GENERAL statements, keep present tense.
  # STATEMENT ${text}`;

  const messages = [
    {
      role: "system",
      content: systemMessage,
    },
    {
      role: "user",
      content: promptMessage,
    },
  ];

  const response = await getOpenAIChatResponse(messages, {});

  return await response.content;
};

const detectTemporalReferences = async (text) => {
  const systemMessage = `# Task: Analyze the text to determine if there are any temporal references.
    # OUTPUT: ONLY Yes or No.`;

  const promptMessage = `${text}`;

  const messages = [
    {
      role: "system",
      content: systemMessage,
    },
    {
      role: "user",
      content: promptMessage,
    },
  ];

  const response = await getOpenAIChatResponse(messages, {});

  if (!response.content.toLowerCase().contains("yes")) {
    return false;
  } else {
    return true;
  }

  return await response.content;
};


const convertDatesFromRelativeToAbsolute = async (text) => {
  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const aCoupleMonths = new Date(today);
  aCoupleMonths.setMonth(aCoupleMonths.getMonth() + 2);

  const aCoupleYearsAgo = new Date(today);
  aCoupleYearsAgo.setFullYear(aCoupleYearsAgo.getFullYear() - 2);

  const lastChristmas = new Date(`12/25/${today.getFullYear() - 1}`);

  const systemMessage = `# ROLE: You are a Relative -> Absolute Date Converter.
      # METHODOLOGY: You SEARCH text for RELATIVE DATES and REPLACE matches with ABSOLUTE DATES. ONLY change the DATES. Your response should ONLY contain the MODIFIED TEXT. Do NOT change AGES or DURATIONS.
      # CURRENT DATE: ${today.toLocaleDateString()}
      # EXAMPLE INPUT/OUTPUT
      INPUT: "Tomorrow works for me!", OUTPUT: "${tomorrow.toLocaleDateString()} works for me!",
      INPUT: "Yesterday I did.", OUTPUT: "On ${yesterday.toLocaleDateString()} I did.",
      INPUT: "Next week I'll be back", OUTPUT: "The week of  ${nextWeek.toLocaleDateString()} I'll be back.",
      INPUT: "It'll be a couple months.", OUTPUT: "It'll be around ${aCoupleMonths.toLocaleString("default", {month: "long"})}.",
      INPUT: "I haven't seen him in a couple years.", OUTPUT: "I haven't seen him since around ${aCoupleYearsAgo.getFullYear()}.",
      INPUT: "Joe was there last Christmas.", OUTPUT: "Joe was there Christmas ${lastChristmas.getFullYear()}.",
      INPUT: "3 years old", OUTPUT: "3 years old",
      INPUT: "currently", OUTPUT: "As of ${today.toLocaleDateString()}"`;


  const promptMessage = `# COMMAND: Output text with any RELATIVE dates replaced with ABSOLUTE dates.
  # TEXT:
${text}`;

  const messages = [
    {
      role: "system",
      content: systemMessage,
    },
    {
      role: "user",
      content: promptMessage,
    },
  ];

  const response = await getOpenAIChatResponse(messages, {});

  return await response.content;
};

export {convertDatesFromRelativeToAbsolute, detectTemporalReferences};


// Event extractor prompt:

// # ROLE: Event extraction agent.
// # INPUT: A CONVERSATION between User and Assistant.
// # ATTENTION: Focus attention on events referenced in the conversation by the User. Events can be past or future. Only include EVENTs that the User would be likely to include on a Calendar.

// # OUTPUT:
// -eventDesc: ALWAYS Write what happened in 3rd person from User's perspective. Refer to the User as "User".
// -JSON in this format
// [
// \t{
// \t\t"eventTime" : (required) When this event happened/will happen (rough date range ok),
// \t\t"eventLocation" : (optional) Where the event happened/will happen,
// \t\t"peopleInvolved" : (optional) People involved in the event,
// \t\t"eventName" : (required) A 1-3 word summary of the event,
// \t\t"eventDes" : (required) A description of what happened/will happen
// \t}
// ]
