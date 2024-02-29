<template>
  <div class="chat-input">
    <textarea
      v-model="newMessage"
      @input="adjustHeight"
      @keyup.enter.prevent="send"
      placeholder="Type a message..."
      ref="textarea"
    ></textarea>
    <img @click="send" src="../assets/login.png" />
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
      textarea.style.height = "1rem"; // Temporarily collapse the textarea to reset scrollHeight
      textarea.style.height = textarea.scrollHeight + "px"; // Set height based on content

      // Scroll the textarea to the top as it grows
      textarea.scrollTop = 0;
    },
  },
  mounted() {
    // Call adjustHeight() when the component is mounted (loaded)
    this.adjustHeight();
  },
};
</script>

<style scoped>
.chat-input {
  display: flex; /* Use flexbox for layout */
  width: 100%; /* Set the maximum width */
  margin: 0 auto; /* Center the chat input */
  height: 2em;
  margin-top: 1rem;
  justify-content: stretch;
  height: fit-content;
  border: 1px solid #ccc; /* You can change the border color */
  border-radius: 10px; /* Adjust the radius for the desired roundness */
}

.chat-input textarea {
  padding: 10px;
  padding-bottom: 1rem;
  padding-left: 1rem;
  flex-grow: 1;
  margin-right: 10px;
  overflow: hidden;
  box-sizing: border-box;
  min-height: 0.5rem;
  appearance: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  resize: none; /* Prevent textarea from being resized by the user */
  border: none;
}

.chat-input img {
  width: 1.5rem;
  margin-right: 1rem;
  align-self: center;
  height: fit-content;
}
</style>
