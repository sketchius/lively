<template>
  <div
    class="container"
    :class="{
      large: props.style == 'Large',
      selected: props.selected && !props.disabled,
      disabled: props.disabled,
    }"
    :style="{
      width: props.fullWidth ? '100%' : `${props.width || 24}ch`,
      padding: props.padding ? props.padding : `18px 30px`,
      gridGap: props.text ? 'var(--size1)' : '0',
    }"
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
  set: String,
  data: String,
  style: String,
  padding: String,
  selected: Boolean,
  disabled: Boolean,
  width: Number,
  fullWidth: Boolean,
});

const emit = defineEmits(["clickEvent"]);

const handleClick = () => {
  if (!props.disabled) {
    emit("clickEvent", { selection: props.data, set: props.set });
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: var(--size1);
  border: 3px solid var(--ink);
  border-radius: 4px;
  padding: 18px 30px;
  max-width: 25ch;
  box-sizing: border-box;
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
.disabled {
  border-color: var(--inkLight);
}

.disabled .title {
  color: var(--inkLight);
}

</style>
