<template>
  <div
    class="message"
    :class="{
      'user-message': message.role === 'user',
      'assistant-message': message.role === 'assistant',
    }"
  >
    {{ message.content }}
  </div>
</template>

<script>
export default {
  name: "ChatMessage",
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.message {
  /* Common styles for all messages */
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
}

.user-message {
  /* Specific styles for user messages */
  background-color: #f7f7f7;
  text-align: right;
}

.assistant-message {
  /* Specific styles for assistant (bot) messages */
  background-color: #f6f6ff;
  text-align: left;
}
</style>
