<template>
  <div class="component">
    <StepHeader :header="'Item Type'" @back="handleBack"/>
    <div class="assistant">
      <AssistantDialogue
        :message="`First, let's choose a type of item to create.`"
      />
    </div>
    <form>
      <div class="options">
        <FormOption
          :title="'Task'"
          :data="'task'"
          :text="'A singular action that you need to complete.'"
          :width="20"
          @click-event="handleClickEvent"
          :selected="selectedOption == 'task'"
        />
        <FormOption
          :title="'Goal'"
          :data="'goal'"
          :text="'Something you want to accomplish that requires a series of steps.'"
          :width="20"
          @click-event="handleClickEvent"
          :selected="selectedOption == 'goal'"
        />
      </div>
      <button class="major" @click.prevent="handleNext">NEXT</button>
    </form>
  </div>
</template>

<script setup>
import StepHeader from "../components/StepHeader.vue";
import AssistantDialogue from "@/components/AssistantDialogue.vue";
import FormOption from "@/components/FormOption.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { defineEmits } from "vue";

const emit = defineEmits(["submit"]);

const store = useStore();

const selectedOption = ref("task");

const handleClickEvent = (data) => {
  selectedOption.value = data.selection;
};

const handleNext = () => {
  store.commit("setFormDataField", {
    field: "type",
    payload: selectedOption.value,
  });
  emit("submit");
};
</script>

<style scoped>
.component {
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: center;
}


form {
  display: flex;
  flex-direction: column;
  grid-gap: var(--size2);
}

.assistant {
  width: 450px;
}

.options {
  width: 100%;
  display: flex;
  grid-gap: var(--size4);
}

textarea {
  width: 60ch;
  border: 2px solid var(--ink);
  border-radius: 3px;
}

form button {
  align-self: flex-end;
}
</style>
