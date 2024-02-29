<template>
  <div
    class="message-container"
    :class="{
      user: message.role === 'user',
      assistant: message.role === 'assistant',
    }"
  >
    <div class="author">
      <img :src="iconSrc" class="profile-icon" alt="Assistant's Profile" />
      <div class="name display-text">
        {{ message.author }}
      </div>
    </div>

    <div class="message">
      {{ message.content }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import userIcon from "../assets/user.svg";
import assistantIcon from "../assets/assistant.svg";

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const iconSrc = props.message.role === "user" ? userIcon : assistantIcon;
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
  gap: var(--size1);
}

.author .name {
  text-transform: uppercase;
  position: relative;
  z-index: 0;
  font-weight: 700;
  font-size: 14px;
}

.assistant .author .name::before {
  position: absolute;
  content: "";
  width: calc(100% + var(--size1));
  height: 60%;
  left: calc(-0.5 * var(--size1));
  top: 20%;
  background: linear-gradient(
    to right,
    var(--blueLight) 0%,
    var(--greenLight) 33.334%,
    var(--yellowLight) 66.667%,
    var(--redLight) 100%
  );
  z-index: -1;
}

.user .author .name::before {
  position: absolute;
  content: "";
  width: calc(100% + var(--size1));
  height: 60%;
  left: calc(-0.5 * var(--size1));
  top: 20%;
  background-color: var(--blueLight); 
  z-index: -1;
}

.profile-icon {
  width: 18px;
  height: 18px;
}

.message {
  border-radius: 5px;
  font-size: 0.9rem;
}
</style>
