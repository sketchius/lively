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
import { onMounted, onUnmounted, ref, reactive, nextTick } from "vue";
import MessageArea from "../components/MessageArea.vue";
import ChatInput from "../components/ChatInput.vue";
import assistantController from "../controller/assistantController.js";
import assistantAvatar from "../assets/assistant-avatar.svg";

const messages = reactive([]);
const timerIntervalId = ref(null);

let lastFrameTime = 0;
const frameDelay = 26;

const scrollToBottom = () => {
  nextTick(() => {
    const messageAreaRef = ref(null);
    if (messageAreaRef.value) {
      messageAreaRef.value.scrollToBottom();
    }
  });
};

const handleInput = async (input) => {
  // Add user message to the conversation
  addMessage("user", input, "chat");
  scrollToBottom();

  await assistantController.processInput(messages, input, handleUIEvent);

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

const handleUIEvent = async (data) => {
  switch (data.event) {
    case "loading":
      addMessage("assistant", "loading", "loading");
      break;
    case "chat":
      addMessage("assistant", data.message, "chat");
      break;
    case "create-notes": {
      const actionData = {
        title: `Create Note${data.notes.length > 1 ? "s" : ""}`,
        items: data.notes,
        subtext: `${data.notes.length} notes have been saved.`,
      };
      addMessage("assistant", actionData, "action");
      break;
    }
  }
};

const addMessage = async (role, content, type) => {
  if (messages.length > 0 && messages[messages.length - 1]?.role == role) {
    const message = messages[messages.length - 1];
    if (
      message.blocks.length > 0 &&
      message.blocks[message.blocks.length - 1].type == "loading"
    ) {
      message.blocks[message.blocks.length - 1] = {
        type,
        content,
        animationFrame: 1,
      };
    } else {
      message.blocks.push({ type, content, animationFrame: 1 });
    }
  } else {
    const message = {
      role,
      blocks: [{ type, content, animationFrame: 1 }],
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
      message.blocks.forEach((block) => {
        if (block.animationFrame < block.content.length) {
          block.animationFrame++;
        }
      });
    });
  }
  timerIntervalId.value = requestAnimationFrame(animateText);
};

onMounted(async () => {
  try {
    // const response = await chatService.getConversation();
    // if (response.data && response.data.length) {
    //   messages = response.data;
    // }
    addMessage("assistant", "Hello! What can I do for you today?", "push");
    scrollToBottom();
  } catch (error) {
    console.error("Error loading conversation:", error);
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
  min-width: 30ch;
  width: 100%;
  max-width: 45ch;
  margin: 0 auto;
  height: 100vh;
}

.chat-input {
  flex-shrink: 0; /* Ensures the input area doesn't shrink */
}
</style>
