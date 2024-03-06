import {getOpenAIChatResponse} from "../external_apis/index.js";

export const categoryNames = [
  "Profile",
  "Physical",
  "Mental",
  "Residence",
  "Professional",
  "Family",
  "Financial",
  "Activities",
  "Views",
  "Events",
  "Goals",
  "Challenges",
  "Culture",
];


export const observationAgent = {
  getCategories() {
    return categoryNames;
  },

  async extract(conversation) {
    const logit_bias = {
      414: -20,
      5751: -20,
      584: -20,
      1226: -20,
      9837: 10,
      60: 10,
    }; // Discourage 'Our', 'our', 'We', 'we'; encourage '[', ']'

    const systemMessage = `# ROLE
    You are an AI that specializes in analyzing conversations and creating autobiographical FACTS from them.
    
    # OUTPUT REQUIREMENTS
    - ONE SUBJECT MUST BE "User".
    - ALWAYS refer to User by "User" EXCEPT in OBSERVATIONS about their name.
     - EACH observation should contain ONLY ONE SINGLE fact.
   - GROUP observations by SUBJECT (unique individual). Include OUTPUT for every subject mentioned.
    - Perspective: ALWAYS USE 3rd person perspective from the subject.
    - Identify subjects other than User with relation to user (i.e. "User's friend Joe", "User's aunt Lisa")
   - Include observation about relationship to User for non-user subjects.
    - Do not include duplicate observations.
    - User should only include observations primarily about User, not other people.
   - Include relative and absolute dates.
    - Output the data as a JSON array of objects with schema:
  \t[
  \t\t{
  \t\t\t"subject" : <string> Subject's name ,
  \t\t\t"observations" : [
  \t\t\t\t<string> Observations about the subject
  \t\t\t],
  \t\t}
  \t]`;

    const promptMessage = `#COMMAND: EXTRACT all AUTOBIOGRAPHICAL INFORMATION shared by the User in this conversation. ORGANIZE it by the PRIMARY SUBJECT of the FACT. Do not include observations about OTHER SUBJECTS in USER observations. Include observation about relationship to User for non-user subjects. Do NOT include references to, questions by, or commentary from the Assitant. OBSERVATION FORMAT: Singular statements in 3rd person perspective. CONVERSATION: \n${conversation
        .map(
            (conversationMessage) =>
              `${conversationMessage.role}:  ${conversationMessage.content}`,
        )
        .join("\n\n")}`;

    console.log(`${conversation
        .map(
            (conversationMessage) =>
              `${conversationMessage.role}:  ${conversationMessage.content}`,
        )
        .join("\n\n")}`);

    let errorMessage;

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

    if (errorMessage) {
      messages.push({role: "user", content: errorMessage});
    }

    let response; let subjects;
    let attempt = 0;
    const maxAttempts = 3;

    do {
      try {
        response = await getOpenAIChatResponse(messages, {logit_bias});
        subjects = JSON.parse(response.content);
        if (!Array.isArray(subjects)) {
          throw new Error(
              "Invalid format. Expected array of JSON object with subject, observations fields.",
          );
        }
        subjects.forEach((subject) => {
          if (
            !subject.subject ||
            !subject.observations ||
            !Array.isArray(subject.observations)
          ) {
            throw new Error(
                "Invalid format. JSON objects must ALL have subject, observations fields. Observations must be an array of strings.",
            );
          }
        });
        break;
      } catch (error) {
        attempt++;
        if (attempt >= maxAttempts) {
          throw new Error(
              "Failed to parse JSON after multiple attempts. Error: " + error,
          );
        }
        console.log("Error: " + error);
        errorMessage = "Error: " + error;
      }
    } while (true);

    return subjects;
  },

  async categorize(observation) {
    const logit_bias = {
      9837: 10,
      60: 10,
    }; // Discourage 'Our', 'our', 'We', 'we'; encourage '[', ']'

    const systemMessage = `# FUNCTION Analyze the given observation and categorize it into one of the categories.

    # CATEGORIES
    ID\tDescription
    1\tName, Nicknames, Sex, Gender, Race, Age, Birthday
    2\tPhysical Description / Health & Dietary Information
    3\tPersonality and Mental Health
    4\tCurrent and Past Places of Residence, Travel History
    5\tSchool and Educational Information, Current and Past Occupations / Professional Work
    6\tGeneral Family, Household, Pets, and Relationship Information
    7\tFinancial Details, Economic Status, Investments
    8\tHobbies, Interests, Leisure activities, Skills and Aptitudes, Habits, Routines, and Practices
    9\tLikes, Dislikes, General Opinions, Preferences, Political Opinions, Religious/Spiritual Views
    10\tLife Events, Experiences, Stories, General Achievements and Accomplishments
    11\tGoals, Tasks, and Aspirations
    12\tChallenges, Regrets, and Struggles
    13\tCultural Details, Citizenship, Nationality, Ethnicity, Languages


      
    # OUTPUT REQUIREMENTS
    Output ONLY a single integer representing the category ID. Do NOT include commentary, explanation, or apology.`;

    const promptMessage = observation;

    let errorMessage;

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

    if (errorMessage) {
      messages.push({role: "user", content: errorMessage});
    }

    let response;
    let attempt = 0;
    const maxAttempts = 3;
    let id;

    do {
      try {
        response = await getOpenAIChatResponse(messages, {logit_bias});
        if (!/^\d+$/.test(response.content)) {
          throw new Error(
              `Invalid format. Output must be an integer. Received <${response.content}>`,
          );
        }
        id = parseInt(response.content);

        if (id <= 0 || id > 20) {
          throw new Error(
              `Index out of bounds. The given statement ID (${id}) was not an option.`,
          );
        }

        break;
      } catch (error) {
        attempt++;
        if (attempt >= maxAttempts) {
          return -1;
        }
        console.log("Error: " + error);
        errorMessage = "Error: " + error;
      }
    } while (true);


    return {
      name: categoryNames[id - 1].toLowerCase() || null,
      id: id,
    };
  },

  async audit(observation, existingObservations) {
    const logit_bias = {
      9837: 10,
      60: 10,
    }; // Discourage 'Our', 'our', 'We', 'we'; encourage '[', ']'

    const systemMessage = `# INPUT
    NEW STATEMENT: A statement to compare with existing statements.
    EXISTING STATEMENTS: A list of established statements.
    
    # OUTPUT FORMAT: LETTER + NUMBER
    If any statements are INCOMPATIBLE (different data for the same concept), output A followed by the ID of the existing incompatble statement (i.e. A2).
    If any statements are REDUNDANT (same data for the same concept), output B followed by the ID of the existing redundant statement (i.e. B1).
    If statements are UNIQUE, output C1.
    ## NOTE Do NOT include commentary, explanation, or apology.
    
    ##  EXAMPLES
    ### INCOMPATIBLE
    "User is 42" vs. "User is 20" (age contradiction - same concept)
    "User likes ham" vs. "User doesn't like ham" (preference contradiction - same concept)
    "User's name is Jeff" vs. "User's name is Rob" (identity contradiction - same concept)
    ### REDUNDANT
    "User is 2 years old" vs "User is 24 months old" (exact same information, same concept)
    ### UNIQUE
    "User is from Kentucky" vs. "User lives in California" (origin vs. current residence -- different concepts)
    "User's name is Jeff" vs. "User's nickname is Jeffry" (formal name vs. nickname -- different concepts)
    "User's name is Jack" vs. "User is female" (name vs. gender -- different concepts)
    
    # NOTE Identifing the indivudal as "User" is arbitrary. Do not consider this as incompatible.`;

    const promptMessage = `# NEW STATMENT:
    ${observation}
    
    # EXISTING STATMENTS
    ID\tContent
    ${existingObservations
      .map((observation, index) => `${index + 1}\t${observation.content}`)
      .join("\r\n")}`;

    let errorMessage;

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

    if (errorMessage) {
      messages.push({role: "user", content: errorMessage});
    }

    let response; let result;
    let attempt = 0;
    const maxAttempts = 3;

    do {
      try {
        response = await getOpenAIChatResponse(messages, {logit_bias});

        // console.log(`Audit response preprocessed: ${response.content}`);
        if (!/^[ABC]\d+$/.test(response.content)) {
          throw new Error(
              "Invalid format. The input must start with 'A', 'B', or 'C' followed by an integer.",
          );
        }
        const index = parseInt(response.content.slice(1));
        if (index <= 0 || index > existingObservations.length) {
          throw new Error(
              `Index out of bounds. The given statement ID (${index}) was not an option.`,
          );
        }

        const code = response.content.charAt(0);
        const id = code.toUpperCase().includes("C") ?
          -1 :
          existingObservations[index - 1].id;

        result = {
          code,
          id,
        };

        break;
      } catch (error) {
        attempt++;
        if (attempt >= maxAttempts) {
          return -1;
        }
        console.log("Error: " + error);
        errorMessage = "Error: " + error;
      }
    } while (true);

    return result;
  },

  getCategories() {
    return categoryNames;
  },

  async matchPerson(people, observations) {
    const systemMessage = `# ROLE
    Your job is match the description of NEW PERSON to one of the descriptions of EXISTING PERSONS.
    
    # OUTPUT REQUIREMENTS
    - Consider all of the details and whether there is a clear match.
    - If there is a clear match, output the ID of the matching EXISTING PERSON.
    - If there is no clear match, output -1.
    - Output ONLY integers.`;

    const promptMessage = `#COMMAND: Match the NEW PERSON with one of the EXITING PERSONS (or -1 if none match).
    #NEW PERSON: \n${observations.join("\n")}
    #EXISTING PERSONS:
    ID\tDescription\n
    ${people.map((person, index) => `${index + 1}\t${person.content}`).join("\n")}`;

    let errorMessage;

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

    if (errorMessage) {
      messages.push({role: "user", content: errorMessage});
    }

    let response; let subjects;
    let attempt = 0;
    const maxAttempts = 3;
    let matchId;

    do {
      try {
        response = await getOpenAIChatResponse(messages);
        if (!/^-?\d+$/.test(response.content)) {
          throw new Error(
              `Invalid format. Output must be an integer. Received <${response.content}>`,
          );
        }
        matchId = parseInt(response.content);

        if (matchId == 0 || matchId > people.length || matchId < -1) {
          throw new Error(
              `Index out of bounds. The given statement ID (${matchId}) was not an option.`,
          );
        }

        break;
      } catch (error) {
        attempt++;
        if (attempt >= maxAttempts) {
          throw new Error(
              "Failed to parse JSON after multiple attempts. Error: " + error,
          );
        }
        console.log("Error: " + error);
        errorMessage = "Error: " + error;
      }
    } while (true);

    if (matchId != -1) {
      return people[matchId-1].id;
    }
    return matchId;
  },
};
