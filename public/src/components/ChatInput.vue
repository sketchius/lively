<template>
  <div class="chat-input">
    <input
      type="text"
      v-model="newMessage"
      @keyup.enter="send"
      placeholder="Type a message..."
    />
    <button @click="send">Send</button>
  </div>
</template>

<script>
export default {
  name: "ChatInput",
  data() {
    return {
      newMessage: "",
    };
  },
  methods: {
    send() {
      if (this.newMessage.trim()) {
        this.$emit("sendMessage", this.newMessage);
        this.newMessage = "";
      }
    },
  },
};
</script>

<style scoped>
.chat-input {
  /* Styles for the chat input container */
}

.chat-input input {
  /* Styles for the input field */
}

.chat-input button {
  /* Styles for the send button */
}
</style>
