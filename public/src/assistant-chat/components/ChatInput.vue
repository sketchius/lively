<template>
  <div class="textarea-container">
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
        this.$nextTick(() => this.adjustHeight());
      }
    },
    adjustHeight() {
      const textarea = this.$refs.textarea;
      textarea.style.height = "1rem";
      textarea.style.height = textarea.scrollHeight + 5 + "px";

      textarea.scrollTop = 0;
    },
  },
  mounted() {
    this.adjustHeight();
  },
};
</script>

<style scoped>
.textarea-container {
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
  border: 3px solid var(--ink);
  box-sizing: border-box;
  min-height: 50px;
  border-radius: 4px;
  margin-top: var(--size1);
}

textarea {
  width: 100%;
  overflow: hidden;
  border: none;
  margin-right: var(--size3);
}

.textarea-container:focus-within {
  border: 3px solid var(--blue700);
}

textarea:focus {
  border: none;
}

img {
  position: absolute;
  right: var(--size1);
  width: var(--size3);
  align-self: center;
  height: fit-content;
}
</style>
