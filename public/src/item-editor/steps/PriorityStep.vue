<template>
    <div class="component">
      <StepHeader :header="'Item Type'" @back="handleBack"/>
      <div class="assistant">
        <AssistantDialogue
          :message="`Let’s assign a priority to the ${itemType || 'task'}.`"
        />
      </div>
      <form>
        <div class="options">
          <FormOption
            :title="'Minimal'"
            :data="'minimal'"
            :width="12"
            @click-event="handleClickEvent"
            :selected="selectedOption == 'minimal'"
          />
          <FormOption
            :title="'Low'"
            :data="'low'"
            :width="12"
            @click-event="handleClickEvent"
            :selected="selectedOption == 'low'"
          />
          <FormOption
            :title="'Medium'"
            :data="'medium'"
            :width="12"
            @click-event="handleClickEvent"
            :selected="selectedOption == 'medium'"
          />
          <FormOption
            :title="'High'"
            :data="'high'"
            :width="12"
            @click-event="handleClickEvent"
            :selected="selectedOption == 'high'"
          />
          <FormOption
            :title="'Critical'"
            :data="'crictial'"
            :width="12"
            @click-event="handleClickEvent"
            :selected="selectedOption == 'cricial'"
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
  import { useRouter } from 'vue-router';
  import { defineEmits } from "vue";
  const emit = defineEmits(["submit"]);
  
  const store = useStore();
    const router = useRouter();
  
  const selectedOption = ref("medium");

  const hasSelected = ref("false");
  
  const handleClickEvent = (data) => {
    selectedOption.value = data.selection;
    hasSelected.value = true;
  };
  
    const existingData = store.state.formData.priority;

  const handleNext = () => {
    store.commit("setFormDataField", {
      field: "priority",
      payload: selectedOption.value,
    });
    emit("submit");
  };

  
const handleBack = () => {
  if (!existingData && hasSelected.value) {
    store.commit("setFormDataField", {
      field: "priority",
      payload: selectedOption.value,
    });
  }
  router.push({ name: `item-editor-3` });
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
  