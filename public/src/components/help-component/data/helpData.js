const helpData = {
  title: {
    name: "Title",
    body: "<p class='definition'>A short and concise name for the action.</p><p>It should be direct and easy to understand. If you need to include more information or context, you can use the Notes field.</p>",
  },
  details: {
    name: "Details",
    body: "<p class='definition'>Additional information or context.</p><p>Use this field to provide yourself with any details you'll need in the future.</p>",
  },
  category: {
    name: "Category",
    body: "<p class='definition'>The area of your life this item pertains to.</p><p>This is used to prioritize and organize your tasks and goals.</p>",
  },
  duration: {
    name: "Duration",
    body: "<p class='definition'>An estimated amount of time the task will take.</p><p>It doesn't have to be exact or accurate. It will help you create a manageable To-Do List.</p>",
  },
  relativeImportance: {
    name: "Relative Importance",
    body: "<p class='definition'>How important this item is compared to the overall category.</p><p>Importance is inhereted from the Category's importance, but you can assign a modifier for each item to indicate that it is more or less important.</p>",
  },
  timeFrame: {
    name: "Time Frame",
    body: "<p class='definition'>When you would like to complete the item.</p><p>You can choose how strict the time frame is, how narrow narrow of a time period, and a date.</p>",
  },
  steps: {
    name: "Steps",
    body: "<p class='definition'>The steps you'll need to do in order to complete this goal.</p><p>You.</p>",
  },
};

export const getHelpDataById = (id) => {
  return helpData[id] || null;
};
