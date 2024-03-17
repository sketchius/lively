<template>
  <div class="row" :class="{ top: props.top, bottom: props.bottom }">
    <summary>
      <CheckboxInput :checked="checked" @click="handleCheckboxClick" />
      <div class="title-container">
        <div class="title">{{ task.title }}</div>
      </div>
    </summary>
    <div class="cell category">
      <div class="category-icon" :class="task.categoryColorClass"></div>
      <div class="tag">{{ capitalize(task.category) }}</div>
    </div>
    <div class="cell importance">
      <div class="tag">
        {{ task.priority }}
      </div>
    </div>
    <div class="cell duraction">
      <div class="tag">{{ task.duration }} min</div>
    </div>
    <div class="cell duedate">
      <div class="text" :class="task.timeFrameLabelClass">
        {{ task.timeFrame.display }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import CheckboxInput from "@/components/CheckboxInput.vue";

const props = defineProps({
  task: Object,
  index: Number,
  top: Boolean,
  bottom: Boolean,
  collapsed: Boolean,
});

const checked = ref(props.task.complete);

const handleCheckboxClick = () => {
  checked.value = !checked.value;
};

const capitalize = (string) => {
  return `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;
};
</script>

<style scoped>
.tree {
  --spacing: 1.5rem;
  --radius: 10px;
}

summary {
  display: flex;
  position: relative;
  align-items: center;
  min-height: 30px;
  padding-left: var(--size2);
}

.row {
  display: contents;
  width: 100%;
  position: relative;
  align-items: center;
  max-height: 35px;
}

.title-container {
  min-height: 30px;
  min-width: 5px;
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 1;
  border-bottom: 1px solid var(--ink);
}

.title {
  margin-left: 5px;
  font-weight: 600;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #5a6798;
  width: 90%;
}

input[type="checkbox"] {
  margin-left: 10px;
  margin-top: 0;
  margin-bottom: 0;
  width: 20px;
  height: 20px;
}

.cell {
  font-size: 14px;
  display: flex;
  align-items: center;
  min-height: 30px;
  border-bottom: 1px var(--ink) solid;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.importance .tag {
  position: relative;
  width: 36px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 16px;
  border: 1px dotted var(--ink);
  border-radius: 2px;
}

/* .importance .tag::before {
  content: "";
  position: absolute;
  border: 2px solid var(--ink);
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transform: rotate(45deg);
} */

.category {
  display: flex;
  gap: var(--size0);
}

.category-icon {
  height: 16px;
  width: 6px;
  border: 2px solid var(--ink);
}

.category-icon.red {
  background-color: var(--red500);
}
.category-icon.orange {
  background-color: var(--orange500);
}
.category-icon.yellow {
  background-color: var(--yellow500);
}
.category-icon.green {
  background-color: var(--green500);
}
.category-icon.teal {
  background-color: var(--teal500);
}
.category-icon.blue {
  background-color: var(--blue500);
}
.category-icon.purple {
  background-color: var(--purple500);
}

.cell {
  padding-right: 10px;
}

.duedate .text {
  width: fit-content;
}

.tentative::after {
  content: "Flex";
  background-color: var(--purple300);
  border: 1px solid var(--purple700);
  padding: 0 4px;
  font-size: 12px;
  font-weight: 600;
  margin-left: var(--size1);
}

.imminent::after {
  content: "Due Soon";
  background-color: var(--yellow300);
  border: 1px solid var(--yellow700);
  padding: 0 4px;
  font-size: 12px;
  font-weight: 600;
  margin-left: var(--size1);
}

.urgent::after {
  content: "Due Today";
  background-color: var(--orange300);
  border: 1px solid var(--orange700);
  padding: 0 4px;
  font-size: 12px;
  font-weight: 600;
  margin-left: var(--size1);
}

.late::after {
  content: "Overdue";
  background-color: var(--red300);
  border: 1px solid var(--red700);
  padding: 0 4px;
  font-size: 12px;
  font-weight: 600;
  margin-left: var(--size1);
}
</style>
