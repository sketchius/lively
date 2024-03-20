<template>
  <div class="message-interface">
    <MessageArea :messages="messages" :animationCounter="animationCounter" />
    <ChatInput @sendMessage="handleInput" />
    <div class="footer">
      <div class="demo-notice" v-if="currentUser && currentUser.isDemoUser">
        Warning: You are using demo access. Please avoid entering any private or
        sensitive information. You can
        <RouterLink :to="{ path: '/create-account' }"
          >create an account</RouterLink
        >
        or <RouterLink to="login">log in</RouterLink> for secure access.
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, reactive, watch, computed } from "vue";
import MessageArea from "./components/MessageArea.vue";
import ChatInput from "./components/ChatInput.vue";
import assistantController from "./controller/assistantController.js";

import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const currentUser = ref(store.state.user);

const messages = reactive([]);
const timerIntervalId = ref(null);

const animationCounter = ref(0);

const assistantEvent = computed(() => store.state.assistantEvent);

let lastFrameTime = 0;
const frameDelay = 29;

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

  addMessage(
    "user",
    { content: input, loading: false, data: { contentType: "text" } },
    "chat"
  );

  await assistantController.processInput(
    messages,
    input,
    store,
    router,
    handleUIEvent
  );

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
  console.log(payload);
  const blockData = {
    content: payload.message || "",
    loading: payload.loading || false,
    data: payload.data || {},
  };
  addMessage(payload.role, blockData, "chat");
  if (payload.break) {
    addMessage(
      payload.role,
      { content: "", loading: false, data: { contentType: "break" } },
      "chat"
    );
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
  let animating = false;

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
          animating = true;
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

  if (animating) {
    animationCounter.value++;
  }
  timerIntervalId.value = requestAnimationFrame(animateText);
};

onMounted(async () => {
  addMessage(
    "assistant",
    {
      content: "Hello, how can I assist you today?",
      loading: false,
      data: { contentType: "text" },
    },
    "chat"
  );
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
.spacer {
  flex-shrink: 1;
  flex-basis: 5vh;
}

.message-interface {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  flex-basis: 28vh;
  min-height: 28vh;
  flex-grow: 1;
  box-sizing: border-box;
}

.chat-input {
  flex-shrink: 0; /* Ensures the input area doesn't shrink */
}

.demo-notice {
  text-align: center;
  font-size: 12px;
  font-style: italic;
  color: var(--yellow700);
}

.footer {
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
