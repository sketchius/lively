<template>
  <div class="message-area" ref="messageAreaRef">
    <ChatMessage
      v-for="(message, index) in props.messages"
      :key="index"
      :message="message"
      :lateral="messages.length > 1"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import ChatMessage from './ChatMessage.vue';

const props = defineProps({
  messages: Array,
  animationCounter: Number
});

const messageAreaRef = ref(null);

watch(() => props.messages, () => {
  nextTick(() => {
    if (messageAreaRef.value) {
      messageAreaRef.value.scrollTop = messageAreaRef.value.scrollHeight;
    }
  });
}, { deep: true });

watch(() => props.animationCounter, () => {
  nextTick(() => {
    if (messageAreaRef.value) {
      messageAreaRef.value.scrollTop = messageAreaRef.value.scrollHeight;
    }
  });
});
</script>


<style scoped>
.message-area {
  background-color: none;
  overflow-y: auto;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--size1);
  flex-grow: 1;
  margin-bottom: var(--size1);
}
</style>
