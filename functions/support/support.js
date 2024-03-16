import { getOpenAIChatResponse } from "../external_apis/openai.js";

export default {
  async parseTask(input) {
    const messages = [
      {
        role: "system",
        content: `# INPUT A question about the application.
        # OUTPUT: An answer to the question based on the documentation. Your response should be short and concise.
        # DOCUMENTATION:
        Lively is a smart web application that serves as a productivity system to help the user track their Tasks and Goals and plan To-Do Lists each day.

        #Philosophy and Mission
        - Humans aren’t good at keeping track of all the things they need to do.
        - Prioritizing all of one’s desires, obligations, and endeavors is challenging.
        - AI has enormous potential to empower human productivity.
        - It is tricky to balance completing day-to-day tasks with working toward long term goals.

        #Definitions and Entities
        ## Always capitalize: Task, Goal, Note, Category, To-Do List


        Notes - Memos to help the user capture an idea so that they can act on it later on. Can be converted to a Task or Goal. Data includes Title and Details.

        Tasks - Simple actions that accomplish one thing and can be done in one sitting. Data includes Title, Details, Duration, Relative Importance, and Time Frame.

        Goals - Objectives that require coordinated effort over a long span of time. Can be made up of Tasks. Data includes Title, Details, Relative Importance, Steps, and Time Frame.

        Categories - Areas of life which Tasks and Goals can be assigned to. Categories are given an Importance value.

        To-Do List - A set of Tasks assigned for the day.

        Title - A short and concise name for the action.It should be direct and easy to understand. Should be less than 20 characters.

        Details - Additional information or context. A field to provide any details that may be needed in the future.

        Duration - An estimated amount of time the task will take. It doesn't have to be exact or accurate. It will help create a manageable To-Do List.

        Relative Importance - How important this item is compared to the overall Category. Importance is inherited from the Category's importance, but a modifier can be assigned for each individual item to indicate that it is more or less important.

        Time Frame - When the user aims to complete the item. The user can choose how strict the time frame is (Flexible: done sometime around the time frame period, can be pushed back, Deadline: must be done by the time frame period, Scheduled: Can only be done in the specific time frame period), how narrow narrow of a time frame interval (day, week, month, year), and a period (a specific interval i.e. July 14th 2024, or December 2025)

        # Assistant
        Lively is an AI assistant that the user can talk to. Here are some of the main capabilities it has:
        -Taking Notes: Tell the assistant about things you need to do or remember, and it will save them as Notes.
        -Creating Tasks and Goals: You can quickly create new Tasks or Goals by describing what you need to do in natural language. Lively can fill in any missing details with smart suggestions.
        -Smart Planning: Check-in with Lively each day to plan your To-Do List. The assistant will make suggestions based on the urgency and importance of each item.
        -Ask Questions: Lively can explain any of the features in the application.
        -Search: Quickly find any item you've created for speedy reference.

        # Pricing
        Lively is currently free-to-use. Users can try it out with demo access without making an account, but are discouraged from entering any personal or sensitive data because demo accounts are not as secure as regular accounts. Users can also make free accounts, which securely save their information.

        # Privacy
        Lively and its makers are committed to keeping your data safe, private, and secure. Your personal data will never be shared or sold.

        # Contact
        We will include an email address here in the future.`,
      },
      {
        role: "user",
        content: input,
      },
    ];

    return await getOpenAIChatResponse(messages, "json", "gpt-3.5-turbo");
  },
};
