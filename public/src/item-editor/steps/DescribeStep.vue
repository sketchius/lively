<template>
  <div class="component">
    <div class="heading-space">
      <button class="back" @click="handleBack">
        <svg
          width="47"
          height="47"
          viewBox="0 0 47 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M45 23L1 23" stroke="var(--ink)" stroke-linecap="round" />
          <path d="M1 23L18 6" stroke="var(--ink)" stroke-linecap="round" />
          <path d="M1 23L18 40" stroke="var(--ink)" stroke-linecap="round" />
        </svg>
      </button>
      <h1>Description</h1>
    </div>
    <div class="assistant-container"><AssistantDialogue
      :message="`Excellent! To begin with, please describe the ${
        itemType || 'item'
      } in your own words.`"
      :subtext="'Hint: Start with “I want to...” or “I need to...”.'"
    /></div>
    <form>
      <div class="textarea-container">
        <textarea
          v-model="description"
          :placeholder="`Describe your ${itemType || 'item'}.`"
          name="description"
          id="description"
          rows="2"
        ></textarea>
      </div>
      <div class="buttons">
        <button class="help minor" @click.prevent="handleNext">HELP</button>
        <button class="skip minor" @click.prevent="handleNext">SKIP</button>
        <button class="submit major" @click.prevent="handleNext">NEXT</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import AssistantDialogue from "@/components/AssistantDialogue.vue";
import { useStore } from "vuex";
import { defineEmits, ref } from "vue";
import { useRouter } from "vue-router";

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
    router.push({ name: `item-editor-1` });
  }
};
</script>

<style scoped>
.component {
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: center;
}

.heading-space {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back {
  position: absolute;
  left: 0;
  background: none;
  border: none;
  width: 45px;
  height: 45px;
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

.assistant-container {
  width: 450px;
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
