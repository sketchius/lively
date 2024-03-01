<template>
  <div class="flex">
    <div class="flex-spacer"></div>
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
.flex {
  display: flex;
  justify-content: space-between;
}

.flex-spacer {
  order: 2;
  flex-basis: var(--size5);
  flex-shrink: 1;
  flex-grow: 0;
}

.message-container {
  display: flex;
  flex-direction: column;
  gap: var(--size00);
  align-items: flex-start;
  margin-bottom: var(--size1);
  border: 2px solid var(--ink);
  border-radius: 4px;
  flex-grow: 1;
  flex-basis: 30ch;
  max-width: 50ch;
  padding: var(--size1) var(--size2);
}

.message-container.assistant {
  order: 1;
}

.message-container.user {
  order: 3;
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
    var(--blue400) 0%,
    var(--green400) 33.334%,
    var(--yellow400) 66.667%,
    var(--red400) 100%
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
  background-color: var(--blue300);
  z-index: -1;
}

.profile-icon {
  width: 16px;
  height: 16px;
}

.message {
  border-radius: 5px;
  font-size: 0.9rem;
}
</style>
