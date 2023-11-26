<template>
  <div class="message-area" ref="messageArea">
    <ChatMessage
      v-for="(message, index) in decoratedMessages"
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
  computed: {
    decoratedMessages() {
      return this.messages.map((message) => ({
        ...message,
        profilePicture: this.getProfilePicture(message.role),
      }));
    },
  },
  methods: {
    getProfilePicture(role) {
      const userImagePath = "../assets/images/profile/generic.png";
      const assistantImagePath = require("../assets/images/profile/journal6.png");
      return role === "user" ? userImagePath : assistantImagePath;
    },
    scrollToBottom() {
      const container = this.$refs.messageArea;
      container.scrollTop = container.scrollHeight;
    },
  },
};
</script>

<style scoped>
.message-area {
  background-color: none;
  flex-grow: 1;
  overflow-y: auto;
  width: 100%;
  margin: 0 auto;
}
</style>
