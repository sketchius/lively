<template>
  <div class="component">
    <h1>Item Type</h1>
    <AssistantDialogue
      :message="`First, let's choose a type of item to create.`"
    />
    <form>
      <div class="options">
        <FormOption
          :title="'Task'"
          :data="'task'"
          :text="'A singular action that you need to complete.'"
          :index="0"
          :width="20"
          @click-event="handleClickEvent"
          :selected="selectedOption == 'task'"
        />
        <FormOption
          :title="'Goal'"
          :data="'goal'"
          :text="'Something you want to accomplish that requires a series of steps.'"
          :index="1"
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
import AssistantDialogue from "@/components/AssistantDialogue.vue";
import FormOption from "@/components/FormOption.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { defineEmits } from "vue";

const emit = defineEmits(["submit"]);

const store = useStore();

const selectedOption = ref("task");

const handleClickEvent = (data) => {
  selectedOption.value = data;
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

form {
  display: flex;
  flex-direction: column;
  grid-gap: var(--size2);
}

.dialogue-container {
  width: 60%;
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
