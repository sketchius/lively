<template>
  <div class="component">
    <StepHeader :header="'Description'" @back="handleBack" />
    <div class="assistant-container">
      <AssistantDialogue
        :message="`Based on your description, I've recommended a ${
          itemType || 'item'
        } title and description.`"
        :subtext="'Please edit the fields as needed.'"
      />
    </div>
    <form>
      <div class="fields">
        <TextArea
          :label="'TITLE'"
          v-model="title"
          :explanation="`A clear and concise name for the ${
            itemType || 'item'
          }.`"
          :requirement="'required'"
          :rows="1"
        />
        <TextArea
          :label="'DETAILS'"
          v-model="details"
          :explanation="`Additional information about the ${
                itemType || 'item'
              }.`"
          :requirement="'optional'"
          :rows="2"
        />
      </div>
      <div class="buttons">
        <button class="help minor" @click.prevent="handleNext">HELP</button>
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
import TextArea from "@/components/TextArea.vue";

const emit = defineEmits(["submit"]);

const store = useStore();
const router = useRouter();

const itemType = ref(store.state.formData.type);
const title = ref(store.state.formData.title || "");
const details = ref(store.state.formData.details || "");

const existingData = store.state.formData.title;

const handleNext = () => {
  store.commit("setFormDataField", {
    field: "title",
    payload: title.value,
  });
  store.commit("setFormDataField", {
    field: "details",
    payload: details.value,
  });
  emit("submit");
};

const handleBack = () => {
  if (!existingData) {
    store.commit("setFormDataField", {
      field: "title",
      payload: title.value,
    });
  }
  router.push({ name: `item-editor-2` });
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

form {
  display: flex;
  flex-direction: column;
  grid-gap: var(--size2);
}

.fields {
  display: flex;
  flex-direction: column;
  grid-gap: var(--size3);
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
