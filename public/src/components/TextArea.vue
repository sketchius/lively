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
