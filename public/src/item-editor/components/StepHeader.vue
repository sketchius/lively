<template>
  <div class="step-header">
    <h1>{{ props.header }}</h1>
    <button class="cancel" @click="handleCancel">X</button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const emit = defineEmits([ "cancel"]);
const props = defineProps({ header: String });


const handleCancel = () => {
  emit("cancel");
};
</script>

<style scoped>
.step-header {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back {
  left: 0;
  background: none;
  border: none;
  width: 45px;
  height: 45px;
}

h1 {
  margin: 0;
  padding: 0px 12px;
}

button.cancel {
  display: flex;
  align-items: baseline;
  background: none;
  color: var(--ink);
  border: none;
  font-size: 36px;
  font-weight: 200;
}
</style>
