<template>
  <div class="component">
    <StepHeader :header="'Steps'" @back="handleBack" />
    <div class="layout">
      <div class="assistant-container">
        <AssistantDialogue
          :message="`Now let's add some steps to the goal!`"
          :layout="'vertical'"
        />
      </div>

      <div class="form">
        <div class="children-list">
          <draggable
            v-model="children"
            class="draggable-list"
            group="steps"
            @start="drag = true"
            @end="drag = false"
            item-key="id"
          >
            <template #item="{ element, index }">
              <div class="child list-item">{{ (index+1) + ") " + element.title }}</div>
            </template>
          </draggable>
          <input
            class="list-item"
            v-if="addingChild"
            v-focus
            @keyup="handleInput"
            type="text"
            name="newchild"
            id="newchild"
          />
          <button
            v-if="!addingChild"
            class="addChild minor"
            @click.prevent="addChild"
          >
            + ADD NEW
          </button>
          
        </div>
        <div class="buttons">
          <button class="submit major" @click.prevent="handleDone">SAVE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StepHeader from "../components/StepHeader.vue";
import AssistantDialogue from "@/components/AssistantDialogue.vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createUID } from "@/util/uuid";
import draggable from "vuedraggable";

const drag = ref("false");

// const emit = defineEmits(["submit"]);

const store = useStore();
const router = useRouter();

const addingChild = ref(false);

const children = ref(store.state.formData.children || []);

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

const handleDone = () => {
  router.push({ name: "Goals" });
};

const handleInput = (event) => {
  switch (event.key) {
    case "Enter":
      children.value.push({ title: event.target.value, id: createUID() });
      event.target.value = "";
      addingChild.value = false;
      break;

    case "Escape":
      event.target.value = "";
      addingChild.value = false;
      break;
  }
};

const addChild = () => {
  addingChild.value = true;
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

.children-list {
  border: 1px solid var(--ink);

  display: flex;
  flex-direction: column;
  min-height: 300px;
  grid-gap: var(--size1);
  padding: var(--size3);
}

.draggable-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 30px;
  align-items: center;

}

.child {
  font-size: 18px;
  font-weight: 500;
}

.addChild {
  width: fit-content;
}

.field {
  width: fit-content;
  font-size: 16px;
  font-weight: 500;
}

input {
  width: 20ch;
  font-size: 16px;
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

.form {
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
