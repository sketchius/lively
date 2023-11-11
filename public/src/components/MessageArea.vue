<template>
  <div class="message-area">
    <ChatMessage
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
    />
  </div>
</template>

<script>
import ChatMessage from "./ChatMessage.vue";

export default {
  name: "MessageArea",
  components: {
    ChatMessage,
  },
  props: {
    messages: Array,
  },
};
</script>

<style scoped>
.message-area {
  background-color: white;
  flex-grow: 1; /* Takes up the remaining space */
  overflow-y: auto; /* Adds a scrollbar if content overflows */
  width: 100%;
}
</style>
