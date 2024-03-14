<template>
  <div class="row" :class="{ top: props.top, bottom: props.bottom }">
    <summary>
      <CheckboxInput :checked="checked" @click="handleCheckboxClick" />
      <div class="title-container">
        <div class="title">{{ task.title }}</div>
      </div>
    </summary>
    <div class="cell category">
      <div class="tag">{{ capitalize(task.category) }}</div>
    </div>
    <div class="cell importance">
      <div class="tag">
        {{ getCategoryImportance(task.category) + task.importanceModifier }}
      </div>
    </div>
    <div class="cell duraction">
      <div class="tag">{{ task.duration }} min</div>
    </div>
    <div class="cell duedate">
      {{ task.timeFrame.display }}
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

const categories = [
  { name: "work", importance: 8 },
  { name: "household", importance: 6 },
  { name: "errand", importance: 6 },
  { name: "life management", importance: 7 },
  { name: "personal", importance: 3 },
];

const getCategoryImportance = (category) => {
  const item = categories.find((item) => item.name === category);
  if (item) {
    return item.importance;
  }
  return 0;
};

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
  width: 16px;
  height: 16px;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 13px;
}

.importance .tag::before {
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
}

.category .tag {
  border: 1px solid var(--ink);
  padding: 1px 4px;
  margin-right: 4px;
}

.cell {
  padding-right: 10px;
}
</style>
