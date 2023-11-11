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
  methods: {
    async handleSendMessage(newMessage) {
      // Add user message to the conversation
      this.messages.push({ role: "user", content: newMessage });

      try {
        // Assume sendMessageToServer is a method that sends the message to the server and waits for a response

        const response = await chatService.sendMessage(newMessage);

        // Add server (or ChatGPT) response to the conversation
        this.messages.push({ role: "bot", content: response.data });
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
  height: 100vh; /* Use full viewport height */
}

.chat-input {
  flex-shrink: 0; /* Ensures the input area doesn't shrink */
}
</style>
