<template>
  <div class="component">
    <StepHeader :header="'Item Type'" @back="handleBack" />
    <div class="assistant">
      <AssistantDialogue
        :message="`First, let's choose a type of item to create.`"
      />
    </div>
    <form>
      <div class="options">
        <FormOption
          :data="'task'"
          :text="'A singular action that you need to complete.'"
          @click-event="handleClickEvent"
          :selected="selectedOption == 'task'"
          ><template #content
            ><div class="icon"></div><div class="option-name">(option name)</div>
            <div class="option-description">
              This is where we will put a simple definition for the item type.
            </div>
            <ul>
              <li>Bullet points</li>
              <li>At least three items</li>
              <li>Presents key characteristics</li>
              <li>Focus on helping the user choose</li>
            </ul></template
          >
        </FormOption>
        <FormOption
          :data="'goal'"
          :text="'Something you want to accomplish that requires a series of steps.'"
          @click-event="handleClickEvent"
          :selected="selectedOption == 'goal'"
          ><template #content><div class="icon"></div><div class="option-name">(option name)</div>
            <div class="option-description">
              This is where we will put a simple definition for the item type.
            </div>
            <ul>
              <li>Bullet points</li>
              <li>At least three items</li>
              <li>Presents key characteristics</li>
              <li>Focus on helping the user choose</li>
            </ul></template>
        </FormOption>
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

.icon {
  width: 40px;
  height: 40px;
  background-color: rgba(107, 107, 107, 0.3);
  border-radius: 100px;
}

.option-name {
  align-self: center;
  font-size: 20px;
  font-weight: 600;
}

.text {
  font-size: 16px;
  font-weight: 500;
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
