<template>
  <div class="help-container" v-if="helpData">
    <div
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      class="icon display-text"
    >
      ?
    </div>
    <div
      v-if="tooltipVisible"
      class="tooltip"
      :class="tooltipStyle"
      @mouseenter="onTooltipMouseEnter"
      @mouseleave="onTooltipMouseLeave"
    >
      <div class="name">{{ helpData.name }}</div>
      <div class="text" v-html="helpData.body"></div>
      <!-- <button class="minor">Ask Question</button> -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps } from "vue";
import { getHelpDataById } from "./data/helpData.js";

const props = defineProps({
  helpId: String,
});

const tooltipVisible = ref(false);
const tooltipHovered = ref(false);
const iconHovered = ref(false);

const tooltipStyle = reactive({ top: "0px", left: "0px" });

const onMouseEnter = () => {
  tooltipVisible.value = true;
  iconHovered.value = true;
};

const onMouseLeave = () => {
  iconHovered.value = false;
  setTimeout(() => {
    attemptToHideTooltip();
  }, 150);
};

const onTooltipMouseEnter = () => {
  tooltipHovered.value = true;
};

const onTooltipMouseLeave = () => {
  tooltipHovered.value = false;
  setTimeout(() => {
    attemptToHideTooltip();
  }, 150);
};

const attemptToHideTooltip = () => {
  if (!tooltipHovered.value && !iconHovered.value) {
    tooltipVisible.value = false;
  }
};

const helpData = getHelpDataById(props.helpId);
console.log("ID = " + props.helpId + ", data = ", helpData);
</script>

<style>
.help-container {
  display: inline-block;
  color: var(--ink);
  margin-left: 4px;
}

.help-container .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 13px;
  height: 18px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  color: var(--ink);
  border: 1px solid var(--ink);
  box-sizing: border-box;
}

.help-container .icon:hover {
  background-color: var(--yellow500);
}

.help-container .tooltip {
  width: 400px;
  z-index: 1000;
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: var(--size2);
  padding: 20px;
  border: 5px double var(--ink);
  background-color: var(--paper);
  transform: translateX(-200px) translateY(5px);
}

.help-container .tooltip .definition {
  border-left: 1px solid var(--ink);
  padding-left: 10px;
  font-weight: 500;
}

.help-container .tooltip p {
  margin: 0;
}

.tooltip .name {
  width: fit-content;
  font-size: 24px;
  font-weight: 800;
  margin: 0;
  background-color: var(--yellow300);
}
.tooltip .text {
  display: flex;
  flex-direction: column;
  gap: var(--size1);
  font-size: 16px;
  font-weight: 400;
}
</style>
./HelpData.js
