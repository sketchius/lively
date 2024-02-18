<template>
  <div class="layout">
    <div class="flex-wing"></div>
    <div class="content">
      <div class="socket">
        <component :is="currentComponent" @submit="handleSubmit"></component>
      </div>
    </div>
    <div class="flex-wing"></div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import TitleStep from "@/item-editor/steps/TitleStep.vue";
import DescribeStep from "@/item-editor/steps/DescribeStep.vue";
import TypeStep from "@/item-editor/steps/TypeStep.vue";
import PriorityStep from "@/item-editor/steps/PriorityStep.vue";
import TimeframeStep from "@/item-editor/steps/TimeframeStep.vue";
import SummaryStep from "@/item-editor/steps/SummaryStep.vue";
import ChildrenStep from "@/item-editor/steps/ChildrenStep.vue";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();

// const formData = store.state.formData;

const validateRoute = () => {
  let actualStep = getCurrentStep();
  console.log("Validating Route.");
  console.log(`Actual step = ${actualStep}`);
  console.log(`Path step = ${route.meta.editorStep}`);

  if (route.meta.editorStep > actualStep) {
    router.push({ name: `item-editor-${actualStep}` });
  }
};

const getCurrentStep = () => {
  if (!store.state.formData.type) {
    return 1;
  }
  switch (store.state.formData.type) {
    case "Task":
      if (!store.state.formData.description) {
        return 2;
      }
      if (!store.state.formData.title) {
        return 3;
      }
      if (!store.state.formData.priority) {
        return 4;
      }
      if (!store.state.formData.timeframe) {
        return 5;
      }
      if (!store.state.formData.done) {
        return 6;
      }
      break;
    case "Goal":
      if (!store.state.formData.description) {
        return 2;
      }
      if (!store.state.formData.title) {
        return 3;
      }
      if (!store.state.formData.priority) {
        return 4;
      }
      if (!store.state.formData.timeframe) {
        return 5;
      }
      if (!store.state.formData.children) {
        return 7;
      }
      if (!store.state.formData.done) {
        return 6;
      }
  }

  return 1;
};

validateRoute();

const currentComponent = computed(() => {
  switch (route.meta.editorStep) {
    default:
    case 1:
      return TypeStep;
    case 2:
      return DescribeStep;
    case 3:
      return TitleStep;
    case 4:
      return PriorityStep;
    case 5:
      return TimeframeStep;
    case 6:
      return SummaryStep;
    case 7:
      return ChildrenStep;
  }
});

const handleSubmit = () => {
  const currentStep = getCurrentStep();
  console.log("Running getCurrentStep(). Result: " + currentStep);
  router.push({ name: `item-editor-${currentStep}` });
};
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
}

.flex-wing {
  flex-grow: 1;
  flex-shrink: 1;
}

.content {
  flex-basis: 1200px;
}

.socket {
  flex-grow: 1;
  width: 100%;
  display: flex;
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
