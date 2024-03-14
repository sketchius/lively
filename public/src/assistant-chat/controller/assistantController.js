import chatService from "../services/chatService.js";

const loading = {
  role: "assistant",
  data: {
    contentType: "text",
  },
  message: "",
  loading: true,
};

export default {
  async processInput(messages, input, store, router, updateUI) {
    updateUI(loading);

    const result = await chatService.classifyMessage(input);

    console.log("result = ", result.data);

    const elements = result.data;

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      switch (element.tag) {
        case "showTasks":
          updateUI({
            role: "assistant",
            data: {
              contentType: "text",
              isAction: true,
            },
            message: "Switching View to Task List.",
            break: true,
          });
          router.push({ name: "Tasks" });
          break;
        case "showGoals":
          updateUI({
            role: "assistant",
            data: {
              contentType: "text",
              isAction: true,
            },
            message: "Switching View to Goal List.",
            break: true,
          });
          router.push({ name: "Goals" });
          break;
        case "showNotes":
          updateUI({
            role: "assistant",
            data: {
              contentType: "text",
              isAction: true,
            },
            message: "Switching View to Note List.",
            break: true,
          });
          router.push({ name: "Notes" });
          break;
        case "showTodo":
          updateUI({
            role: "assistant",
            data: {
              contentType: "text",
            },
            message: "Sorry, the To-Do List is not yet implemented.",
            break: true,
          });
          break;
        case "newNote":
          {
            const minWait = new Promise((resolve) => setTimeout(resolve, 500));

            const resultPromise = chatService.identifyNotes(element.content);

            const [result] = await Promise.all([resultPromise, minWait]);

            const notesData = result.data.notes;

            const notes = Array.isArray(notesData) ? notesData : [notesData];

            notes.forEach((note) => {
              store.dispatch("createNote", { title: note });
            });

            updateUI({
              role: "assistant",
              data: {
                contentType: "text",
                isAction: true,
              },
              message: `Created ${notes.length} new note${
                notes.length > 1 ? "s" : ""
              }.`,
              break: true,
            });

            router.push({ name: "Notes" });
          }
          break;
        case "newTask":
          {
            const minWait = new Promise((resolve) => setTimeout(resolve, 500));

            const resultPromise = chatService.parseTask(element.content);

            const [result] = await Promise.all([resultPromise, minWait]);

            const rawTaskData = result.data;

            let typeDisplay = "";
            switch (rawTaskData.timeframe_type) {
              case "Flexible":
                typeDisplay = "Around";
                break;
              case "Deadline":
                typeDisplay = "By";
                break;
              case "Scheduled":
                switch (rawTaskData.timeframe_inteval) {
                  default:
                  case "Day":
                    typeDisplay = "On";
                    break;
                  case "Week":
                  case "Month":
                  case "Year":
                    typeDisplay = "During";
                    break;
                }
                break;
            }

            const taskData = {
              type: "Task",
              title: rawTaskData.title,
              category: rawTaskData.category,
              duration: rawTaskData.duration,
              timeFrame: {
                interval: rawTaskData.timeframe_interval,
                type: rawTaskData.timeframe_type,
                date: rawTaskData.timeframe_date,
                display: `${typeDisplay} ${rawTaskData.timeframe_date}`,
              },
              importanceModifier: rawTaskData.importance_modifier,
            };

            store.dispatch("createTask", taskData);

            updateUI({
              role: "assistant",
              data: {
                contentType: "text",
                isAction: true,
              },
              message: `Created 1 new Task.`,
              break: true,
            });

            router.push({ name: "Tasks" });

          }
          break;
        case "newGoal":
          updateUI({
            role: "assistant",
            data: {
              contentType: "text",
            },
            message: "Sorry, I am not able to create Goals yet.",
            break: true,
          });
          break;
        case "help":
          break;
        case "chat": {
          const response = await chatService.sendMessage(element.content);

          const message = stripQuotes(response.data);

          updateUI({ role: "assistant", message });
          break;
        }
      }
    }
  },

  async processEvent(event, updateUI) {
    switch (event.type) {
      case "create-account":
        updateUI({
          role: "assistant",
          data: {
            contentType: "text",
            contentTag: "h2",
          },
          message: "Welcome!",
        });
        updateUI({
          role: "assistant",
          data: {
            contentType: "text",
          },
          message:
            "I'm Lively, your AI companion designed to simplify your life. With me, you'll effortlessly manage tasks and achieve your goals through smart, prioritized to-do lists tailored just for you.",
          break: true,
        });
        break;
      case "log-in":
        updateUI({
          role: "assistant",
          data: {
            contentType: "text",
            contentTag: "h2",
          },
          message: "Welcome Back!",
        });
        updateUI({
          role: "assistant",
          data: {
            contentType: "text",
          },
          message: "How can I help you today?",
          break: true,
        });
        break;

      case "new-task":
        updateUI({
          role: "user",
          data: {
            contentType: "text",
            isAction: true,
          },
          message: `Start New Task`,
          break: true,
        });
        updateUI(loading);
        await new Promise((resolve) => setTimeout(resolve, 750));
        updateUI({
          role: "assistant",
          data: {
            contentType: "text",
          },
          message:
            "Ok, let's create a new Task! Please describe what you need to do. Include any relevant details like when you'd like to accomplish it, how long you think it will take, and how important it is.",
          break: true,
        });
        break;
    }
  },
};

function stripQuotes(str) {
  return str.replace(/^"|"$/g, "");
}

// function shapeMessagesForAPI(messages) {
//   console.log("START OF shapeMessagesForAPI messages = ", messages);
//   const shapedMessages = messages.map((message) => {
//     const shapedMessage = { role: message.role };
//     shapedMessage.content = message.blocks.reduce((content, block) => {
//       switch (block.type) {
//         default:
//         case "chat":
//           content += block.content;
//           break;
//         case "loading":
//           break;
//         case "action":
//           content += block.content.subtext;
//           break;
//       }

//       return content;
//     }, "");

//     return shapedMessage;
//   });
//   console.log("END OF shapeMessagesForAPI shapedMessages = ", shapedMessages);
//   return shapedMessages;
// }
