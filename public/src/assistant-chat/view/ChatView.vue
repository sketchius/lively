<template>
  <div class="chat-view">
    <h1 class="display-text">Assistant</h1>
    <MessageArea ref="messageAreaRef" :messages="messages" />
    <ChatInput @sendMessage="handleSendMessage" />
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import MessageArea from "../components/MessageArea.vue";
import ChatInput from "../components/ChatInput.vue";
// import chatService from "@/services/chatService";

const messages = ref([
  { role: "user", content: "Hello!", author:"You" },
  {
    role: "assistant",
    content: "Greetings, {{USER_NAME}}. How are you doing today?", author: "Lively"
  },
]);

const scrollToBottom = () => {
  nextTick(() => {
    const messageAreaRef = ref(null);
    if (messageAreaRef.value) {
      messageAreaRef.value.scrollToBottom();
    }
  });
};

onMounted(async () => {
  try {
    // const response = await chatService.getConversation();
    // if (response.data && response.data.length) {
    //   messages.value = response.data;
    // }
    scrollToBottom();
  } catch (error) {
    console.error("Error loading conversation:", error);
  }
});

const handleSendMessage = async (newMessage) => {
  // Add user message to the conversation
  messages.value.push({ role: "user", content: newMessage });
  scrollToBottom();

  // try {
  //   // Assume sendMessageToServer is a method that sends the message to the server and waits for a response

  //   const response = await chatService.sendMessage(newMessage);
  //   const parsedResponse = JSON.parse(response.data);
  //   // Add server (or ChatGPT) response to the conversation
  //   messages.value.push({
  //     role: "assistant",
  //     content: parsedResponse.content,
  //   });
  //   scrollToBottom();
  // } catch (error) {
  //   // Handle any errors, e.g., display an error message
  //   console.error("Error sending message:", error);
  // }
};
</script>

<style scoped>
h1 {
  font-size: 36px;
  font-weight: 200;
  align-self: center;
  margin: 0;
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
