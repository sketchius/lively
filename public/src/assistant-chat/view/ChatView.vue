<template>
  <div class="chat-view">
    <div class="spacer"></div>
    <img :src="assistantAvatar" />
    <h1 class="display-text">AI Assistant</h1>
    <MessageArea ref="messageAreaRef" :messages="messages" />
    <ChatInput @sendMessage="handleInput" />

    <div class="spacer"></div>
  </div>
</template>

<script setup>
import {
  onMounted,
  onUnmounted,
  ref,
  reactive,
  nextTick,
  watch,
  computed,
} from "vue";
import MessageArea from "../components/MessageArea.vue";
import ChatInput from "../components/ChatInput.vue";
import assistantController from "../controller/assistantController.js";
import assistantAvatar from "../assets/assistant-avatar.svg";

import { useStore } from "vuex";

const store = useStore();

const messages = reactive([]);
const timerIntervalId = ref(null);

const assistantEvent = computed(() => store.state.assistantEvent);

let lastFrameTime = 0;
const frameDelay = 29;

const scrollToBottom = () => {
  nextTick(() => {
    const messageAreaRef = ref(null);
    if (messageAreaRef.value) {
      messageAreaRef.value.scrollToBottom();
    }
  });
};

const handleAssistantEvent = async () => {
  if (assistantEvent.value) {
    assistantController.processEvent(assistantEvent.value, handleUIEvent);
  }
  store.commit("clearAssistantEvent");
};

watch(
  assistantEvent,
  (newValue) => {
    if (newValue !== null) {
      console.log("watch");
      handleAssistantEvent();
    }
  },
  { immediate: false }
);

const handleInput = async (input) => {
  // Add user message to the conversation
  addMessage("user", { content: input }, "chat");
  scrollToBottom();

  await assistantController.processInput(messages, input, store, handleUIEvent);

  // try {
  //   const response = await chatService.sendMessage(input);
  //   const parsedResponse = JSON.parse(response.data);

  //   messages.push({
  //     role: "assistant",
  //     content: parsedResponse.classification,
  //   });
  //   scrollToBottom();
  // } catch (error) {
  //   console.error("Error sending message:", error);
  // }
};

const handleUIEvent = async (payload) => {
  switch (payload.event) {
    case "chat": {
      const blockData = {
        content: payload.message,
        loading: payload.loading,
        data: payload.data,
      };
      addMessage("assistant", blockData, "chat");
      break;
    }
    case "create-notes": {
      const blockData = {
        title: payload.title,
        content: payload.message,
        loading: payload.loading,
        data: payload.data,
      };
      addMessage("assistant", blockData, "action");
      break;
    }
  }
};

const addMessage = async (role, data, type) => {
  if (messages.length > 0 && messages[messages.length - 1]?.role == role) {
    const message = messages[messages.length - 1];
    if (
      message.blocks.length > 0 &&
      message.blocks[message.blocks.length - 1].loading
    ) {
      message.blocks[message.blocks.length - 1] = {
        ...data,
        animationFrame: 0,
        type,
      };
    } else {
      message.blocks.push({ ...data, animationFrame: 0, type });
    }
  } else {
    const message = {
      role,
      blocks: [{ ...data, animationFrame: 0, type }],
      author: role === "assistant" ? "Lively" : "You",
    };
    messages.push(message);
  }
};

const animateText = (timestamp) => {
  const timeSinceLastFrame = timestamp - lastFrameTime;

  if (timeSinceLastFrame > frameDelay) {
    lastFrameTime = timestamp;
    messages.forEach((message) => {
      for (let i = 0; i < message.blocks.length; i++) {
        const block = message.blocks[i];
        const previousBlock = i > 0 ? message.blocks[i - 1] : null;
        const isLastBlock = i == message.blocks.length - 1;
        if (
          block.content &&
          block.animationFrame < block.content.length &&
          (!previousBlock || previousBlock.animationFinished)
        ) {
          const rate = Math.max(
            1,
            Math.min(
              i == 0 ? block.animationFrame / 3 : 99,
              isLastBlock
                ? (block.content.length - block.animationFrame) / 3
                : 99,
              3
            )
          );
          block.animationFrame = block.animationFrame + rate;
        }
        if (
          block.animationFrame >= block.content.length &&
          (!previousBlock || previousBlock.animationFinished)
        ) {
          block.animationFinished = true;
        }
      }
    });
  }
  timerIntervalId.value = requestAnimationFrame(animateText);
  scrollToBottom();
};

onMounted(async () => {
  try {
    // const response = await chatService.getConversation();
    // if (response.data && response.data.length) {
    //   messages = response.data;
    // }
  } catch (error) {
    console.error("Error loading conversation:", error);
  }
  if (assistantEvent.value !== null) {
    handleAssistantEvent();
  }
  timerIntervalId.value = requestAnimationFrame(animateText);
});

onUnmounted(() => {
  // Cancel the animation frame request when the component unmounts
  cancelAnimationFrame(timerIntervalId.value);
});
</script>

<style scoped>
h1 {
  font-size: 36px;
  font-weight: 200;
  align-self: center;
  margin: 0;
}

.spacer {
  flex-shrink: 1;
  flex-basis: 5vh;
}

.chat-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 45ch;
  width: 100%;
  max-width: 60ch;
  margin: 0 auto;
  height: 100vh;
}

.chat-input {
  flex-shrink: 0; /* Ensures the input area doesn't shrink */
}
</style>
