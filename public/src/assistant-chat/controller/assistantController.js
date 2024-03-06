// import { useRouter } from "vue-router";
import chatService from "../services/chatService.js";

// const router = useRouter();

export default {
  async processInput(messages, input, store, updateUI) {
    updateUI({ event: "loading" });

    const result = await chatService.classifyMessage(input);

    console.log("result = ", result.data);

    const classification = result.data.classification;

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
            title: `TAKE NOTES`,
            event: "create-notes",
            loading: true,
          });
          const minWait = new Promise((resolve) => setTimeout(resolve, 500));

          const resultPromise = chatService.identifyNotes(input);

          const [result] = await Promise.all([resultPromise, minWait]);

          const notesData = result.data.notes;

          const notes = Array.isArray(notesData) ? notesData : [notesData];

          console.log("NOTES: ", notesData);

          updateUI({
            title: `TAKE NOTES`,
            message: `Created ${notes.length} new notes.`,
            event: "create-notes",
            loading: false,
          });

          updateUI({ event: "loading" });

          notes.forEach((note) => {
            store.dispatch("createNote", { title: note });
          });

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
