<template>
  <div class="component">
    <StepHeader :header="'Summary'" @back="handleBack" />
    <div class="layout">
      <div class="assistant-container">
        <AssistantDialogue
          :message="`Here's what we came up with. Would you like to change anything?`"
          :layout="'vertical'"
        />
      </div>

      <form>
        <div class="field-grid">
          <label class="horizontal" for="title">TYPE</label>
          <div class="field type">{{ type }}</div>
          <label class="horizontal" for="title">TITLE</label>
          <div class="field">{{ title }}</div>
          <label class="horizontal" for="title">DETAILS</label>
          <div class="field">{{ details }}</div>
          <label class="horizontal" for="title">PRIORITY</label>
          <div class="field">{{ priority }}</div>
          <label class="horizontal" for="title">TIMEFRAME</label>
          <div class="field">{{ timeframe }}</div>
        </div>
        <div class="buttons">
          <button class="submit major" @click.prevent="handleSave">SAVE</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import StepHeader from "../components/StepHeader.vue";
import AssistantDialogue from "@/components/AssistantDialogue.vue";
import { useStore } from "vuex";
import { defineEmits, ref } from "vue";
import { useRouter } from "vue-router";
import dataService from "@/services/dataService.js";
import { createUID } from "@/util/uuid";

const emit = defineEmits(["submit"]);

const store = useStore();
const router = useRouter();

const type = ref(store.state.formData.type || "");
const title = ref(store.state.formData.title || "");
const details = ref(store.state.formData.details || "");
const priority = ref(store.state.formData.priority || "");
const timeframe = ref(store.state.formData.timeframe || "");

const handleSave = async () => {
  await dataService.createGoal({ id: createUID(), ...store.state.formData });
  if (store.state.formData.type == "task") {
    router.push({ name: `Goals` });
    store.commit("resetFormData");
  } else {
    if (store.state.formData.type == "goal") {
      store.commit("setFormDataField", {
        field: "done",
        payload: true,
      });
    }
  }

  emit("submit");
};

// const save = async () => {
//     if (editing) {
//       await dataService.updateGoal(goal.value.id, goal.value);
//     } else {
//       await dataService.createGoal(goal.value);
//     }
//     router.back();
//   };

const handleBack = () => {
  router.push({ name: `item-editor-5` });
};
</script>

<style scoped>
.component {
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: center;
}

.layout {
  height: 400px;
  margin-top: var(--size5);
  display: grid;
  align-content: center;
  grid-template-columns: 3fr 4fr;
  grid-gap: var(--size4);
}

.assistant-container {
  width: 380px;
}

.field-grid {
  display: grid;
  grid-template-columns: min-content 1fr;
  align-items: center;
  grid-row-gap: var(--size2);
  grid-column-gap: var(--size1);
  border: 1px solid var(--ink);
  padding: var(--size4) var(--size4);
}

.field {
  width: fit-content;
  font-size: 16px;
  font-weight: 500;
}

.field.type {
  border: 1px solid var(--ink);
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0 10px;
}

label {
  justify-self: flex-end;
}

form {
  display: flex;
  flex-direction: column;
  grid-gap: var(--size2);
}

textarea {
  width: 45ch;
}

.textarea-container {
  display: flex;
}

.buttons {
  display: flex;
  width: 100%;
}

.submit {
  margin-left: auto;
}

.help {
  margin-right: auto;
}
.skip {
  margin-right: var(--size1);
  margin-left: auto;
}
</style>
