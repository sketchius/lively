<template>
  <div class="step-header">
    <button class="back" @click="handleBack">
      <svg
        width="47"
        height="47"
        viewBox="0 0 47 47"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M45 23L1 23" stroke="var(--ink)" stroke-linecap="round" />
        <path d="M1 23L18 6" stroke="var(--ink)" stroke-linecap="round" />
        <path d="M1 23L18 40" stroke="var(--ink)" stroke-linecap="round" />
      </svg>
    </button>
    <h1>{{ props.header }}</h1>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const emit = defineEmits(["back"]);
const props = defineProps({ header: String });

const handleBack = () => {
  emit("back");
};
</script>

<style scoped>
.step-header {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back {
  position: absolute;
  left: 0;
  background: none;
  border: none;
  width: 45px;
  height: 45px;
}

h1 {
  margin: 0;
  padding: 0px 12px;
  background: linear-gradient(
    to top,
    transparent 25%,
    var(--blueLight) 25%,
    var(--blueLight) 75%,
    transparent 75%
  );
}
</style>
