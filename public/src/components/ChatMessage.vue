<template>
  <div
    class="message-container"
    :class="{
      user: message.role === 'user',
      assistant: message.role === 'assistant',
    }"
  >
    <div class="author">
      <img
        :src="message.profilePicture"
        class="profile-icon"
        alt="Assistant's Profile"
      />
      <div class="name display-text">
        {{ message.author }}
      </div>
    </div>

    <div class="message">
      {{ message.content }}
    </div>
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
.message-container {
  display: flex;
  flex-direction: column;
  gap: var(--size1);
  align-items: flex-start;
  margin-bottom: 1rem;
  border: 2px solid var(--ink);
  border-radius: 4px;
  padding: var(--size1) var(--size2);
}

.message-container.assistant {
  margin-right: var(--size5);
}

.message-container.user {
  margin-left: var(--size5);
}

.author {
  display: flex;
  align-items: center;
  gap: var(--size2);
}

.author .name {
  text-transform: uppercase;
  position: relative;
  z-index: 0;
  font-weight:600;
  font-size: 16px;
}

.assistant .author .name::before {
  position: absolute;
  content: "";
  width: 130%;
  height: 60%;
  left: -15%;
  top: 20%;
  background: linear-gradient(
    to right,
    var(--redLight) 0%,
    var(--yellowLight) 33.334%,
    var(--greenLight) 66.667%,
    var(--blueLight) 100%
  );
  border-left: 1px solid var(--red);
  border-right: 1px solid var(--blue);
  z-index: -1;
}

.user .author .name::before {
  position: absolute;
  content: "";
  width: 130%;
  height: 60%;
  left: -15%;
  top: 20%;
  background-color: var(--blueLight);
  border-left: 1px solid var(--blue);
  border-right: 1px solid var(--blue);
  z-index: -1;
}

.profile-icon {
  width: 16px;
  height: 16px;
  border: 3px solid var(--ink);
}

.message {
  border-radius: 5px;
  font-size: 0.9rem;
}
</style>
