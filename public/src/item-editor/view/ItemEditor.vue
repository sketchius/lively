<template>
  <div class="layout">
    <div class="cancel-modal" v-show="cancelModalVisible">
      <p>Are you sure you want to discard your item?</p>
      <div class="buttons">
        <button class="minor" @click="setCancelModalVisibility(false)">
          Keep</button
        ><button class="standard" @click="handleDiscard">Discard</button>
      </div>
    </div>
    <div class="flex-wing"></div>
    <div class="content">
      <div class="top-flex"></div>
      <div class="socket">
        <StepHeader :header="`|| ${title}`" @back="handleBack" @cancel="handleCancel" />

        <component
          :is="currentComponent"
          @back="handleBack"
          @cancel="handleCancel"
          @submit="handleSubmit"
          @setTitle="handleSetTitle"
        ></component>
      </div>
      <div class="bottom-flex"></div>
    </div>
    <div class="flex-wing"></div>
  </div>
</template>

<script setup>
import StepHeader from "../components/StepHeader.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
// import SummaryStep from "@/item-editor/steps/SummaryStep.vue";
import GoalEditor from "@/item-editor/steps/GoalEditor.vue";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();

const itemType = route.meta.itemType;

store.commit("setFormDataField", {
  field: "type",
  payload: itemType,
});

const title = ref("");

const cancelModalVisible = ref(false);

const currentComponent = computed(() => {
  return GoalEditor;
});

const handleSetTitle = (data) => {
  title.value = data;
};

const handleCancel = () => {
  if (store.state.formData.modified) {
    setCancelModalVisibility(true);
  } else {
    handleDiscard();
  }
};

const handleDiscard = () => {
  setCancelModalVisibility(false);
  store.commit("resetFormData");
  router.push({ name: `Goals` });
};

const handleBack = () => {
  router.go(-1);
};

const handleSubmit = () => {
  switch (route.meta.itemType) {
    case "Goal":
      router.push({ name: `Goals` });
      break;
    case "Task":
      router.push({ name: `Tasks` });
      break;
  }
};

const setCancelModalVisibility = (visible) => {
  cancelModalVisible.value = visible;
};
</script>

<style scoped>
.layout {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}

.cancel-modal {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--size3);
  background-color: var(--paper);
  border: 8px solid var(--ink);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}

.cancel-modal p {
  font-size: 20px;
}

.cancel-modal .buttons {
  display: flex;
  grid-gap: var(--size1);
}

.flex-wing {
  flex-grow: 1;
  flex-shrink: 1;
}

.content {
  flex-basis: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow-y: auto;
}

.top-flex {
  flex-grow: 2;
  flex-shrink: 1;
}

.bottom-flex {
  flex-grow: 3;
  flex-shrink: 2;
}

.socket {
  flex-grow: 1;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

header {
  display: flex;
  align-items: center;
}

.progress-container {
  display: flex;
  margin-top: var(--size6);
  margin-bottom: var(--size6);
  height: fit-content;
  width: 100%;
}

.progress {
  height: var(--size5);
  width: 600px;
}

button.cancel {
  height: var(--size5);
  width: var(--size5);
  background: none;
  border: none;
  color: var(--ink);
  font-size: 24px;
  font-weight: 500;
  border-radius: 15px;
  margin-left: auto;
}
</style>
