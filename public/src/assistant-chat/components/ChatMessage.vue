<template>
  <div class="flex">
    <div class="flex-spacer"></div>
    <div
      class="message-layout"
      :class="{
        user: message.role === 'user',
        assistant: message.role === 'assistant',
      }"
    >
      <div class="border"></div>
      <div class="message-container">
        <div class="author">
          <img :src="iconSrc" class="profile-icon" alt="Assistant's Profile" />
          <div class="name display-text">
            {{ message.author }}
          </div>
        </div>
        <div v-for="block in message.blocks" v-bind:key="block" class="block">
          <div v-if="block.type == 'loading'" class="loader-container">
            <div class="loader"></div>
            <div class="loader"></div>
            <div class="loader"></div>
          </div>
          <div v-else-if="block.type == 'action'" class="action">
            <h3 class="display-text">
              <div class="action-title-container">
                <div class="action-label display-text">
                  <img class="action-icon" :src="actionIcon" alt="" /><span
                    class="title"
                    >USED AI FUNCTION</span
                  >
                </div>
                {{ block.content.title }}
              </div>
              <button class="minor compact">UNDO</button>
            </h3>
            <ul class="items">
              <li
                v-for="item in block.content.items"
                v-bind:key="item"
                class="item"
              >
                {{ item }}
                <button class="icon"><img :src="editIcon" alt="Edit" /></button>
              </li>
            </ul>
            <div class="subtext" v-if="block.content.subtext">
              {{ block.content.subtext }}
            </div>
          </div>
          <div v-else>
            {{
              message.role === "user"
                ? block.content
                : block.content?.slice(0, block.animationFrame || 1)
            }}
            <div
              class="text-animation-container"
              v-if="
                message.role === 'assistant' &&
                block.animationFrame < block.content.length - 1
              "
            >
              <div class="text-animation-icon"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import userIcon from "../assets/user.svg";
import assistantIcon from "../assets/assistant.svg";
import actionIcon from "../assets/action.svg";
import editIcon from "../assets/edit.svg";

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
  position: relative;
  display: flex;
  justify-content: space-between;
}

.flex-spacer {
  order: 2;
  flex-basis: var(--size5);
  flex-shrink: 1;
  flex-grow: 0;
}

.message-layout {
  display: flex;
  margin-bottom: var(--size1);
  flex-grow: 1;
  flex-basis: 30ch;
  max-width: 50ch;
}

.message-container {
  display: flex;
  flex-direction: column;
  gap: var(--size0);
  align-items: flex-start;
  border: 2px solid var(--ink);
  border-radius: 4px;
  width: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: var(--size1) var(--size2);
  padding-bottom: var(--size2);
}

.border {
  width: 6px;
  height: 100%;
  z-index: 0;
  border: 2px solid var(--ink);
  border-right: none;
  border-radius: 4px 0 0 4px;
  box-sizing: border-box;
}

.message-layout.assistant {
  order: 1;
}

.message-layout.user {
  order: 3;
}

.message-layout.assistant .border {
  background-color: var(--red400);
}

.message-layout.user .border {
  background-color: var(--blue400);
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

.block {
  border-radius: 5px;
  font-size: 0.9rem;
}

@keyframes loaderAnimation {
  0%,
  100% {
    width: 8px;
    height: 8px;
    background-color: var(--blue500);
  }
  25% {
    width: 2px;
    height: 2px;
    background-color: var(--green500);
  }
  50% {
    width: 8px;
    height: 8px;
    background-color: var(--yellow500);
  }
  75% {
    width: 2px;
    height: 2px;
    background-color: var(--red500);
  }
}

@keyframes textAnimation {
  0%,
  100% {
    background-color: var(--blue500);
  }
  25% {
    background-color: var(--green500);
  }
  50% {
    background-color: var(--yellow500);
  }
  75% {
    background-color: var(--red500);
  }
}

.loader-container {
  display: grid;
  padding: 4px;
  grid-template-columns: 10px 10px 10px;
  justify-items: center;
  align-items: center;
  height: 16px;
  gap: var(--size0);
}

.loader {
  display: inline-block;
  width: 8px;
  height: 8px;
  border: 2px solid var(--ink);
  background-color: var(--blue500);
  animation: loaderAnimation 2s infinite;
}

.text-animation-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.text-animation-icon {
  width: 8px;
  height: 8px;
  border: 2px solid var(--ink);
  background-color: var(--blue500);
  animation: textAnimation 2s infinite;
}

.loader:nth-child(2) {
  animation-delay: 0.2s;
}

.loader:nth-child(3) {
  animation-delay: 0.4s;
}

.block:has(.action) {
  width: 100%;
}
.action {
  padding: var(--size0);
  padding-bottom: var(--size1);
  border: 3px double var(--ink);

  padding-left: 0;
  padding-right: 0;
}

.action-title-container {
  display: flex;
  flex-direction: column;
}
.action .action-label {
  display: flex;
  font-size: 12px;
  align-items: center;
  gap: 2px;
}

.title {
  border-bottom: 1px dashed var(--ink);
}

.action-icon {
  width: 14px;
  height: 14px;
}

h3 {
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: var(--size0);
  padding: 0 var(--size1);
}

h3 button {
  margin-left: auto;
}

.action .items {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  border-top: 1px dotted var(--ink);
  margin: 0;
  padding-left: 0;
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
}

.action .item {
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 400;
  border-bottom: 1px dotted var(--ink);
  padding-bottom: var(--size0);
  padding-top: var(--size0);
  padding-left: var(--size1);
}

.action .item:last-child {
  border-bottom: none;
}

button.icon {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  background: none;
  border: none;
}

.action .subtext {
  padding: var(--size1);
  padding-bottom: 0;
  padding-top: var(--size0);
  font-style: italic;
  font-size: 12px;
}
</style>
