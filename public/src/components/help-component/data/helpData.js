const helpData = {
  title: {
    name: "Title",
    body: "<p class='definition'>A short and concise name for the action.</p><p>It should be direct and easy to understand. If you need to include more information or context, you can use the Notes field.</p>",
  },
};

export const getHelpDataById = (id) => {
  return helpData[id] || null;
};
