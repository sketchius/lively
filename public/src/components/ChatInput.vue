<template>
  <div class="chat-input">
    <textarea
      v-model="newMessage"
      @input="adjustHeight"
      @keyup.enter.prevent="send"
      placeholder="Type a message..."
      ref="textarea"
    ></textarea>
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
        this.$nextTick(() => this.adjustHeight()); // Adjust height after clearing
      }
    },
    adjustHeight() {
      const textarea = this.$refs.textarea;
      textarea.style.height = "auto"; // Temporarily collapse the textarea to reset scrollHeight
      textarea.style.height = textarea.scrollHeight + "px"; // Set height based on content
    },
  },
};
</script>

<style scoped>
.chat-input {
  display: flex; /* Use flexbox for layout */
  width: 100%; /* Set the maximum width */
  margin: 0 auto; /* Center the chat input */
  height: 2em;
  justify-content: stretch;
}

.chat-input textarea {
  padding: 10px;
  padding-bottom: 0;
  flex-grow: 1;
  margin-right: 10px;
  resize: none;
  overflow: hidden;
  box-sizing: border-box;
  min-height: 38px;
}

.chat-input button {
  height: 38px;
}
</style>
