<template>
  <div class="checkbox" @click="handleClick()">
    <svg
      width="34"
      height="28"
      viewBox="0 0 34 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="6.5"
        y="3.5"
        width="21"
        height="21"
        rx="3.5"
        fill="none"
        stroke="#5A6798"
        stroke-width="3"
      />
      <path
        class="checkmark"
        :class="{ checked: props.checked, unchecked: !props.checked }"
        d="M12 11.5L18 17.5L31.5 4"
        stroke="#5A6798"
        stroke-width="5"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  checked: Boolean,
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click");
};
</script>

<style scoped>
.checkbox {
  margin-left: 10px;
  margin-right: 2px;
  min-width: 20px;
  width: 20px;
  height: 20px;
  z-index: 2;
}

svg {
  width: 20px;
  height: 20px;
  transform: scale(1.5);
}

.checked.checkmark {
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: drawCheckmark 0.3s ease forwards;
}

.unchecked.checkmark {
  display: none;
  animation: none;
}

@keyframes drawCheckmark {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
