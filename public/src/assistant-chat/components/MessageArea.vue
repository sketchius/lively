<template>
  <div class="message-area" ref="messageArea">
    <ChatMessage
      v-for="(message, index) in props.messages"
      :key="index"
      :message="message"
    />
  </div>
</template>

<script setup>
import ChatMessage from "./ChatMessage.vue";
// import { computed } from 'vue';

const props = defineProps({
  messages: Array,
});


// const decoratedMessages = computed( () => {
//     return props.messages && props.messages.length > 0 ? [] : props.messages.map((message) => ({
//       ...message,
//       profilePicture: getProfilePicture(message.role),
//     }));
// });
// const getProfilePicture = (role) => {
//     const userImagePath = "../assets/images/profile/generic.png";
//     const assistantImagePath = require("../assets/images/profile/journal6.png");
//     return role === "user" ? userImagePath : assistantImagePath;
//   };

// const scrollToBottom = () => {
//     const container = this.$refs.messageArea;
//     container.scrollTop = container.scrollHeight;
//   };
</script>

<style scoped>
.message-area {
  background-color: none;
  flex-grow: 1;
  overflow-y: auto;
  width: 100%;
  margin: 0 auto;
  border: 3px solid var(--ink);
  padding: var(--size2);
  box-sizing: border-box;
}
</style>
