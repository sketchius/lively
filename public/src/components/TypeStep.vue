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
          :text="'A singular action that you need to complete.'"
          :index="0"
          :width="20"
          @click-event="handleClickEvent"
          :selected="selectedOption == 0"
        />
        <FormOption
          :title="'Goal'"
          :text="'Something you want to accomplish that requires a series of steps.'"
          :index="1"
          :width="20"
          @click-event="handleClickEvent"
          :selected="selectedOption == 1"
        />
      </div>
      <button class="major">NEXT</button>
    </form>
  </div>
</template>

<script setup>
import AssistantDialogue from "./AssistantDialogue.vue";
import FormOption from "./FormOption.vue";
import { ref } from "vue";

const selectedOption = ref(0);

const handleClickEvent = (index) => {
  selectedOption.value = index;
};
</script>

<style scoped>
.component {
  display: flex;
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

.options {
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
