<template>
  <div class="component">
    <StepHeader :header="'Summary'" @back="handleBack" />
      <div class="assistant-container">
        <AssistantDialogue
          :message="`Here's what we came up with. Would you like to change anything?`"
        />
      </div>

        <form>
      <div class="layout">
          <div class="column">
            <label  for="title">TITLE</label>
            <input type="text" name="title" id="title" v-model="title">
            <label  for="category">CATEGORY</label>
            <div>To be implemented</div>
            <TextArea
          :label="'NOTES'"
          v-model="notes"
          :requirement="'optional'"
          :rows="3"
        />
          </div>
          <div class="column">
              <label  for="title">IMPORTANCE</label>
            <div class="importance-container"><div class="value">
              
                <div class="importance">7</div>
                <div class="math">(6+1)</div>
            </div>
            <div class="flex-column">
              <div class="explanation">Importance value has been inherited by the category importance. You can add a modifier to give this [item] more or less importance.</div>
              <button class="minor">Edit Modifer</button>
            </div>
            </div>
            <label  for="title">TIMEFRAME</label>
            <div class="field">By the end of the Month<button class="minor">EDIT</button></div>
          </div>
      </div>
      
      <div class="buttons">
            <button class="submit major" @click.prevent="handleSave">SAVE</button>
          </div>
        </form>
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
import TextArea from '@/components/TextArea.vue';

const emit = defineEmits(["submit"]);

const store = useStore();
const router = useRouter();

// const type = ref(store.state.formData.type || "");
const title = ref(store.state.formData.title || "");
// const details = ref(store.state.formData.details || "");
// const priority = ref(store.state.formData.priority || "");
// const timeframe = ref(store.state.formData.timeframe || "");

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
  max-width: 800px;
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: center;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--size3);
}

.assistant-container {
  width: 380px;
}

.column {
  display: flex;
  flex-direction: column;
  grid-column-gap: var(--size1);
}

label {
  margin-top: var(--size2);
}

.field {
  width: fit-content;
  font-size: 16px;
  font-weight: 500;
}

.importance-container {
  display: flex;
  border: 1px solid var(--ink);
  padding: 5px;
}

.value {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 24px;
}

.importance {
  font-size: 48px;
}

textarea {
  width: 20px !important;
}

.math {
  font-style: italic;
}

.explanation {
  font-size: smaller;
}

.importance-container button {
  align-self: center;
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
