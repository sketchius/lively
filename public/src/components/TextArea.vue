<template>
  <div class="field-pair">
    <div class="label-container">
      <label>{{ label }}</label>
      <div v-if="explanation" class="explanation">{{ explanation }}</div>
      <div
        v-if="requirement"
        :class="{
          'label-required': requirement == 'required',
          'label-optional': requirement == 'optional',
        }"
      >
        {{
          requirement == "required"
            ? "(requred)"
            : requirement == "optional"
            ? "(optional)"
            : ""
        }}
      </div>
    </div>
    <div class="textarea-container">
      <textarea
        :value="modelValue"
        @input="updateValue"
        :placeholder="placeholder"
        :name="label"
        :id="label"
        :rows="props.rows"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  label: String,
  explanation: String,
  placeholder: String,
  requirement: String,
  rows: Number,
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  console.log(event.target.value);
  emit("update:modelValue", event.target.value);
};
</script>

<style scoped>
textarea {
  position: relative;
  font-family: "Inter", sans-serif;
  color: var(--ink);
  font-size: 20px;
  font-weight: 400;
  width: 100%;
  border: 3px solid var(--ink);
  border-radius: 3px;
  padding: 18px 20px;
  background: transparent;
  resize: none;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  outline: none !important;
  border: 3px solid var(--blueDark);
}

.textarea-container {
  width: clamp(20ch,100%,40ch);
  position: relative;
}
.textarea-container::before {
  content: "";
  position: absolute;
  z-index: 0;
  top: 12px;
  left: 12px;
  right: 12px;
  bottom: 12px;
  background: var(--white);
  pointer-events: none;
}
</style>
