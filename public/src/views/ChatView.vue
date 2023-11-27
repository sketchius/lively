<template>
  <div class="chat-view">
    <h1>Journal Chat - 11/19/23</h1>
    <MessageArea ref="messageAreaRef" :messages="messages" />
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
      this.$nextTick(() => {
        if (this.$refs.messageAreaRef) {
          this.$refs.messageAreaRef.scrollToBottom();
        }
      });
    } catch (error) {
      console.error("Error loading conversation:", error);
    }
  },
  methods: {
    async handleSendMessage(newMessage) {
      // Add user message to the conversation
      this.messages.push({ role: "user", content: newMessage });

      this.$nextTick(() => {
        if (this.$refs.messageAreaRef) {
          this.$refs.messageAreaRef.scrollToBottom();
        }
      });

      try {
        // Assume sendMessageToServer is a method that sends the message to the server and waits for a response

        const response = await chatService.sendMessage(newMessage);
        const parsedResponse = JSON.parse(response.data);
        // Add server (or ChatGPT) response to the conversation
        this.messages.push({
          role: "assistant",
          content: parsedResponse.content,
        });
        this.$nextTick(() => {
          if (this.$refs.messageAreaRef) {
            this.$refs.messageAreaRef.scrollToBottom();
          }
        });
      } catch (error) {
        // Handle any errors, e.g., display an error message
        console.error("Error sending message:", error);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #4a5d92;
  font-size: 1.4rem;
  font-weight: 100;
  align-self: flex-start;
  margin-left: 3.5rem;
}

.chat-view {
  padding: 10em;
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60ch;
  max-width: 60ch;
  margin: 0 auto;
  height: 90vh; /* Use full viewport height */
}

.chat-input {
  flex-shrink: 0; /* Ensures the input area doesn't shrink */
}
</style>
