<template>
  <div
    class="message-container"
    :class="{
      'user-message-container': message.role === 'user',
      'assistant-message-container': message.role === 'assistant',
    }"
  >
    <img
      v-if="message.role === 'assistant'"
      :src="message.profilePicture"
      @error="assignFallback"
      class="profile-icon"
      alt="Assistant's Profile"
    />

    <div
      class="message"
      :class="{
        'user-message': message.role === 'user',
        'assistant-message': message.role === 'assistant',
      }"
    >
      {{ message.content }}
    </div>

    <img
      v-if="message.role === 'user'"
      :src="message.profilePicture"
      @error="assignFallback"
      class="profile-icon"
      alt="User's Profile"
    />
  </div>
</template>

<script>
export default {
  name: "ChatMessage",
  methods: {
    assignFallback(event) {
      // Replace with your actual fallback image path
      event.target.src = require("../assets/images/profile/generic.png");
    },
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.message-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
}

.user-message-container {
  justify-content: flex-end;
}

.assistant-message-container {
  justify-content: flex-start;
}

.profile-icon {
  width: 2rem;
  height: 2rem;
  margin-top: 0.1rem;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0px 0px 1px 2px #b2aceb;
}

.message {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  max-width: 66.667%;
}

.user-message {
  background-color: #f3f1ff;
  margin-right: 0.5rem;
}

.assistant-message {
  background-color: e2e1fc;
  border: 2px solid #efedff;
  margin-left: 0.5rem;
}
</style>
