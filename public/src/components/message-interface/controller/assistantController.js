import chatService from "../services/chatService.js";
import { format, addDays, addWeeks, addMonths, addYears } from "date-fns";

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

    const result = await chatService.classifyMessage(
      input,
      store.state.operation
    );

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
              // isAction: true,
            },
            message: "Sorry, Goals are not implemented yet.",
            break: true,
          });
          // router.push({ name: "Goals" });
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
          await newTask(element.content, { store, router, updateUI });
          // {
          //   const minWait = new Promise((resolve) => setTimeout(resolve, 500));

          //   const resultPromise = chatService.parseTask(element.content);

          //   const [result] = await Promise.all([resultPromise, minWait]);

          //   const rawTaskData = result.data;

          //   if (!rawTaskData.valid) {
          //     updateUI({
          //       role: "assistant",
          //       data: {
          //         contentType: "text",
          //       },
          //       message: `Ok, let's create a new Task! Please describe what you need to do. Include any relevant details like when you'd like to accomplish it, how long you think it will take, and how important it is.`,
          //       break: true,
          //     });
          //   } else {
          //     let typeDisplay = "";
          //     switch (rawTaskData.timeframe_type) {
          //       case "Flexible":
          //         typeDisplay = "Around";
          //         break;
          //       case "Deadline":
          //         typeDisplay = "By";
          //         break;
          //       case "Scheduled":
          //         switch (rawTaskData.timeframe_inteval) {
          //           default:
          //           case "Day":
          //             typeDisplay = "On";
          //             break;
          //           case "Week":
          //           case "Month":
          //           case "Year":
          //             typeDisplay = "During";
          //             break;
          //         }
          //         break;
          //     }

          //     const taskData = {
          //       type: "Task",
          //       title: rawTaskData.title,
          //       category: rawTaskData.category,
          //       duration: rawTaskData.duration,
          //       timeFrame: {
          //         interval: rawTaskData.timeframe_interval,
          //         type: rawTaskData.timeframe_type,
          //         date: rawTaskData.timeframe_date,
          //         display: `${typeDisplay} ${rawTaskData.timeframe_date}`,
          //       },
          //       importanceModifier: rawTaskData.importance_modifier,
          //     };

          //     store.dispatch("createTask", taskData);

          //     updateUI({
          //       role: "assistant",
          //       data: {
          //         contentType: "text",
          //         isAction: true,
          //       },
          //       message: `Created 1 new Task.`,
          //       break: true,
          //     });

          //     router.push({ name: "Tasks" });
          //   }
          // }
          break;
        case "modifyTask":
          await modifyTask(element.content, { store, router, updateUI });
          break;
        case "newGoal":
          updateUI({
            role: "assistant",
            data: {
              contentType: "text",
            },
            message: "Sorry, I can't create Goals yet.",
          });
          break;
        // {
        //   const minWait = new Promise((resolve) => setTimeout(resolve, 500));

        //   const resultPromise = chatService.parseGoal(element.content);

        //   const [result] = await Promise.all([resultPromise, minWait]);

        //   const rawGoalData = result.data;

        //   let typeDisplay = "";
        //   switch (rawGoalData.timeframe_type) {
        //     case "Flexible":
        //       typeDisplay = "Around";
        //       break;
        //     case "Deadline":
        //       typeDisplay = "By";
        //       break;
        //     case "Scheduled":
        //       switch (rawGoalData.timeframe_inteval) {
        //         default:
        //         case "Day":
        //           typeDisplay = "On";
        //           break;
        //         case "Week":
        //         case "Month":
        //         case "Year":
        //           typeDisplay = "During";
        //           break;
        //       }
        //       break;
        //   }

        //   const goalData = {
        //     type: "Goal",
        //     title: rawGoalData.title,
        //     category: rawGoalData.category,
        //     duration: rawGoalData.duration,
        //     timeFrame: {
        //       interval: rawGoalData.timeframe_interval,
        //       type: rawGoalData.timeframe_type,
        //       date: rawGoalData.timeframe_date,
        //       display: `${typeDisplay} ${rawGoalData.timeframe_date}`,
        //     },
        //     steps: rawGoalData.steps,
        //     importanceModifier: rawGoalData.importance_modifier,
        //   };

        //   store.commit("setFormData", goalData);

        //   updateUI({
        //     role: "assistant",
        //     data: {
        //       contentType: "text",
        //     },
        //     message: `I've started a Goal called ${goalData.title}. Are there any details you want me to change?`,
        //     break: true,
        //   });

        //   router.push({ name: "Goal Editor" });
        // }
        case "help":
          break;
        case "chat": {
          const response = await chatService.sendMessage(element.content);

          const message = stripQuotes(response.data);

          updateUI({
            role: "assistant",
            data: {
              contentType: "text",
            },
            message,
            break: true,
          });
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

async function newTask(message, context) {
  context.store.commit("setOperation", "Edit Task");

  const minWait = new Promise((resolve) => setTimeout(resolve, 500));

  const resultPromise = chatService.parseTask(message);

  const [result] = await Promise.all([resultPromise, minWait]);

  const rawTaskData = result.data;

  if (rawTaskData.valid) {
    let typeDisplay = "";
    switch (rawTaskData.timeframe_type) {
      case "Flexible":
        typeDisplay = "Around";
        break;
      case "Deadline":
        typeDisplay = "By";
        break;
      case "Scheduled":
        switch (rawTaskData.timeframe_interval) {
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

    let date;
    if (rawTaskData.timeframe_format == "relative") {
      switch (rawTaskData.timeframe_interval) {
        case "Day":
          console.log(`new Date() = ${new Date()}`);
          console.log(
            `rawTaskData.timeframe_target = ${rawTaskData.timeframe_target}`
          );
          console.log(
            `Number(rawTaskData.timeframe_target) = ${Number(
              rawTaskData.timeframe_target
            )}`
          );
          console.log(`format(
            addDays(new Date(), Number(rawTaskData.timeframe_target)),
            "M/d/yyyy"
          ); = ${format(
            addDays(new Date(), Number(rawTaskData.timeframe_target)),
            "M/d/yyyy"
          )}`);
          date = format(
            addDays(new Date(), Number(rawTaskData.timeframe_target)),
            "M/d/yyyy"
          );
          break;
        case "Week":
          date = format(
            addWeeks(new Date(), Number(rawTaskData.timeframe_target)),
            "M/d/yyyy"
          );
          break;
        case "Month":
          date = format(
            addMonths(new Date(), Number(rawTaskData.timeframe_target)),
            "M/d/yyyy"
          );
          break;
        case "Year":
          date = format(
            addYears(new Date(), Number(rawTaskData.timeframe_target)),
            "M/d/yyyy"
          );
          break;
      }
    } else {
      date = format(rawTaskData.timeframe_target, "M/d/yyyy");
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
        display: `${typeDisplay} ${date}`,
      },
      importanceModifier: rawTaskData.importance_modifier,
    };

    context.store.commit("setFormData", taskData);

    context.updateUI({
      role: "assistant",
      data: {
        contentType: "text",
      },
      message: `I've started a Task called "${
        taskData.title
      }", with the category "${taskData.category}", a duration of "${
        taskData.duration
      }" minutes, and a time frame of "${taskData.timeFrame.display}".${
        taskData.details
          ? `I also added "${taskData.details}" as additional details.`
          : ""
      } Is there anything want me to change?`,
      break: true,
    });
  } else {
    context.updateUI({
      role: "assistant",
      data: {
        contentType: "text",
      },
      message:
        "Ok, let's create a new Task! Please describe what you need to do. Include any relevant details like when you'd like to accomplish it, how long you think it will take, and how important it is.",
      break: true,
    });
  }

  context.router.push({ name: "Task Editor" });
}

async function modifyTask(message, context) {
  context.store.commit("setOperation", "Edit Task");

  const existingTaskData = context.store.state.formData;

  const minWait = new Promise((resolve) => setTimeout(resolve, 500));

  const resultPromise = chatService.parseTaskModification(
    message,
    existingTaskData
  );

  const [result] = await Promise.all([resultPromise, minWait]);

  const rawTaskModData = result.data;

  let typeDisplay = "";
  switch (rawTaskModData.timeframe_type) {
    case "Flexible":
      typeDisplay = "Around";
      break;
    case "Deadline":
      typeDisplay = "By";
      break;
    case "Scheduled":
      switch (rawTaskModData.timeframe_inteval) {
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

  const modifiedData = {
    type: "Task",
    title: rawTaskModData.title,
    category: rawTaskModData.category,
    duration: rawTaskModData.duration,
    timeFrame: {
      interval: rawTaskModData.timeframe_interval,
      type: rawTaskModData.timeframe_type,
      date: rawTaskModData.timeframe_date,
      display: `${typeDisplay} ${rawTaskModData.timeframe_date}`,
    },
    importanceModifier: rawTaskModData.importance_modifier,
  };

  const mergedData = { existingTaskData, ...modifiedData };

  context.store.commit("setFormData", mergedData);

  context.updateUI({
    role: "assistant",
    data: {
      contentType: "text",
    },
    message: `Ok, the Task Editor should show the modifications. Is there anything else you want to change?`,
    break: true,
  });

  context.router.push({ name: "Task Editor" });
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
