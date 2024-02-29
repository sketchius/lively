<template>
  <div
    class="container"
    :class="{
      large: props.style == 'Large',
      selected: props.selected && !props.disabled,
      disabled: props.disabled,
      yellow: props.color == 'yellow',
    }"
    @click="handleClick"
  >
    <slot name="content"></slot>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  set: String,
  data: String,
  style: String,
  color: String,
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
  justify-content: center;
  grid-gap: var(--size1);
  border: 3px solid var(--ink);
  border-radius: 4px;
  width: fit-content;
  box-sizing: border-box;
}

.selected {
  background-color: var(--green500);
}

.selected.yellow {
  background-color: var(--yellow300);
}

.disabled {
  border-color: var(--ink300);
}

.disabled .title {
  color: var(--ink300);
}
</style>
