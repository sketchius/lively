<template>
  <div class="component">
    <StepHeader :header="'Description'" @back="handleBack"/>
    <div class="assistant-container"><AssistantDialogue
      :message="`Excellent! To begin with, please describe the ${
        itemType || 'item'
      } in your own words.`"
      :subtext="'Hint: Start with “I want to...” or “I need to...”.'"
    /></div>
    <div class="helper-text">
      <h2>How to describe your item</h2>
      <div class="row">
        <div class="item">Expected input</div><div class="help-icon">?</div>
      </div>
      <div class="row">
        <div class="item">Additional nice-to-have</div><div class="help-icon">?</div>
      </div>
      <div class="row">
        <div class="item">Additional nice-to-have</div><div class="help-icon">?</div>
      </div>
    </div>
    <form>
      <TextArea
          :label="'DESCRIPTION'"
          v-model="description"
          :explanationz="`A description of the ${
            itemType || 'item'
          } in your own words.`"
          :requirement="'optional'"
          :rows="3"
        />
      <div class="buttons">
        <button class="help minor" @click.prevent="handleNext">HELP</button>
        <button class="skip minor" @click.prevent="handleNext">SKIP</button>
        <button class="submit major" @click.prevent="handleNext">NEXT</button>
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
import TextArea from '@/components/TextArea.vue';

const emit = defineEmits(["submit"]);

const store = useStore();
const router = useRouter();

const itemType = ref(store.state.formData.type);
const description = ref(store.state.formData.description || "");

const existingData = store.state.formData.description;

const handleNext = () => {
  console.log(`description.value = ${description.value}`);
  store.commit("setFormDataField", {
    field: "description",
    payload: description.value,
  });
  emit("submit");
};

const handleBack = () => {
  if (!existingData) {
    store.commit("setFormDataField", {
      field: "description",
      payload: description.value,
    });
  }
  router.push({ name: `item-editor-1` });
};
</script>

<style scoped>
.component {
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: center;
}

.assistant-container {
  width: 450px;
}

.helper-text .row {
  display: flex;
  grid-gap: 5px;
}

.help-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font-size: 14px;
  font-weight: 900;
  border: solid 2px var(--ink);
  border-radius: 100px;
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

.help {
  margin-right: auto;
}
.skip {
  margin-right: var(--size1);
  margin-left: auto;
}
</style>
