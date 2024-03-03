// import { useRouter } from "vue-router";
// import { useStore } from "vuex";
import chatService from "../services/chatService.js";

// const router = useRouter();
// const store = useStore();

export default {
  async processInput(messages, input, updateUI) {
    updateUI({ event: "loading" });

    const result = await chatService.classifyMessage(input);

    const classification = JSON.parse(result.data).classification;

    // updateUI({ event: "classify", message: classification });

    switch (classification) {
      case "show_all_actions":
        break;
      case "show_all_notes":
        break;
      case "show_todo_list":
        break;
      case "take_notes":
        {
          updateUI({
            event: "chat",
            message: "Using my note-taking function:",
          });

          updateUI({ event: "loading" });

          const result = await chatService.identifyNotes(input);

          const notes = JSON.parse(result.data).notes;

          updateUI({ event: "create-notes", notes });

          updateUI({ event: "loading" });

          const shapedMessages = shapeMessagesForAPI(messages);

          const chatResponse = await chatService.sendConversation(
            shapedMessages
          );

          const assistantMessage = stripQuotes(chatResponse.data);

          updateUI({ event: "chat", message: assistantMessage });
        }
        break;
      case "create_actions":
        break;
      case "modify_actions":
        break;
      case "feature_help":
        break;
      case "none": {
        const response = await chatService.sendMessage(input);

        const message = stripQuotes(response.data);

        updateUI({ event: "chat", message });
        break;
      }
    }
  },
};

function stripQuotes(str) {
  return str.replace(/^"|"$/g, "");
}

function shapeMessagesForAPI(messages) {
  console.log("START OF shapeMessagesForAPI messages = ", messages);
  const shapedMessages = messages.map((message) => {
    const shapedMessage = { role: message.role };
    shapedMessage.content = message.blocks.reduce((content, block) => {
      switch (block.type) {
        default:
        case "chat":
          content += block.content;
          break;
        case "loading":
          break;
        case "action":
          content += block.content.subtext;
          break;
      }

      return content;
    }, "");

    return shapedMessage;
  });
  console.log("END OF shapeMessagesForAPI shapedMessages = ", shapedMessages);
  return shapedMessages;
}
