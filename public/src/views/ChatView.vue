<template>
  <div class="chat-view">
    <MessageArea :messages="messages" />
    <ChatInput @sendMessage="handleSendMessage" />
  </div>
</template>

<script>
import MessageArea from "../components/MessageArea.vue";
import ChatInput from "../components/ChatInput.vue";
import chatService from "@/services/chatService";

export default {
  name: "ChatView",
  components: {
    MessageArea,
    ChatInput,
  },
  data() {
    return {
      messages: [],
    };
  },
  async created() {
    try {
      const response = await chatService.getConversation();
      if (response.data && response.data.length) {
        this.messages = response.data;
      }
    } catch (error) {
      console.error("Error loading conversation:", error);
    }
  },
  methods: {
    async handleSendMessage(newMessage) {
      // Add user message to the conversation
      this.messages.push({ role: "user", content: newMessage });

      try {
        // Assume sendMessageToServer is a method that sends the message to the server and waits for a response

        const response = await chatService.sendMessage(newMessage);

        // Add server (or ChatGPT) response to the conversation
        this.messages.push({ role: "assistant", content: response.data });
      } catch (error) {
        // Handle any errors, e.g., display an error message
        console.error("Error sending message:", error);
      }
    },
  },
};
</script>

<style scoped>
.chat-view {
  padding: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 60ch;
  margin: 0 auto;
  height: 100vh; /* Use full viewport height */
}

.chat-input {
  flex-shrink: 0; /* Ensures the input area doesn't shrink */
}
</style>
