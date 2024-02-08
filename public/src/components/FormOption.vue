<template>
  <div
    class="container"
    :class="{ large: props.style == 'Large', selected: props.selected }"
    :style="{ width: `${(props.width || 24)}ch` }"
    @click="handleClick"
  >
    <div class="title">{{ props.title }}</div>
    <div class="text">{{ props.text }}</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  title: String,
  text: String,
  style: String,
  index: Number,
  selected: Boolean,
  width: Number
});

const emit = defineEmits(["clickEvent"]);

const handleClick = () => {
  emit("clickEvent",props.index);
}

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  grid-gap: var(--size1);
  border: 3px solid var(--ink);
  border-radius: 4px;
  padding: 18px 30px;
  max-width: 25ch;
}

.selected {
  background-color: var(--green);
}

.title {
  align-self: center;
  font-size: 20px;
  font-weight: 600;
}

.text {
  font-size: 16px;
  font-weight: 500;
}
</style>
