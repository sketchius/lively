<template>
  <div class="message-area">
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
      const userImagePath = "path/to/user/image.jpg";
      const assistantImagePath = require("@/assets/images/profile/journal6.png");
      return role === "user" ? userImagePath : assistantImagePath;
    },
  },
};
</script>

<style scoped>
.message-area {
  background-color: none;
  flex-grow: 1;
  overflow-y: scroll;
  width: 100%;
  margin: 0 auto;
}
</style>
