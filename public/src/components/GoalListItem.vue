<template>
  <div
    :style="{
      '--dist': props.dist,
    }"
    class="row"
    :class="{ top: props.top, bottom: props.bottom }"
  >
    <summary
      :style="{ marginLeft: `${15 + depth * 30}px` }"
      :class="{ child: depth > 0, subsequent: index > 0 && dist == 1 }"
    >
      <div
        :class="{
          collapsed: props.collapsed && props.goal.children.length > 0,
          expanded: !props.collapsed && props.goal.children.length > 0,
          childless: props.goal.children.length == 0,
        }"
        class="collapsible-icon"
        @click="handleCollapseButtonClick"
      ></div>
      <CheckboxInput :checked="checked" @click="handleCheckboxClick" />
      <div
        class="type-marker"
        :class="{
          compound: goal.type.includes('compound'),
          task: goal.type.includes('task'),
        }"
      ></div>
      <div class="title-container">
        <div class="title">{{ goal.title }}</div>
      </div>
    </summary>
    <div class="cell"><ImportanceTag :level="goal.importance" /></div>
    <div class="cell duedate">
      Dist = {{ props.dist }}, Desc = {{ descendantCount }}
    </div>
    <div class="cell scheduled">
      {{
        goal.type.includes("task")
          ? goal.scheduled
            ? new Date(goal.scheduled._seconds * 1000).toLocaleString()
            : "Unscheduled"
          : scheduledDescendantCount + "/" + descendantCount + " tasks"
      }}
    </div>
    <div class="cell tags">Depth = {{ depth }}, Index = {{ index }}</div>
  </div>
  <template v-for="(subGoal, index) in goal.children" :key="subGoal.id">
    <GoalListItem
      :goal="subGoal"
      :depth="depth + 1"
      @set-collapsed="handleChildCollapse"
      @report-descendants="handleChildReportDescendants"
      :collapsed="childData[index].collapsed"
      :index="index"
      :top="false"
      :bottom="props.top && index == goal.children.length - 1"
      :dist="childData[index].dist || 1"
      v-if="!props.collapsed"
    />
  </template>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted } from "vue";
import CheckboxInput from "../components/CheckboxInput.vue";
import ImportanceTag from "../components/ImportanceTag.vue";

const props = defineProps({
  goal: Object,
  depth: {
    type: Number,
    default: 0,
  },
  index: Number,
  dist: Number,
  top: Boolean,
  bottom: Boolean,
  collapsed: Boolean,
});

const emit = defineEmits(["set-collapsed", "report-descendants"]);
const descendantCount = ref(0);
const scheduledDescendantCount = ref(0);

const checked = ref(props.goal.complete);

const childData = ref(
  props.goal.children.map(() => {
    return { collapsed: false, descendantCount: 0 };
  })
);

const updateDescendantCount = () => {
  descendantCount.value = recursiveCountDescendants(props.goal);
  emit("report-descendants", {
    index: props.index,
    descendantCount: descendantCount.value,
  });
};

const recursiveCountDescendants = (goal) => {
  let count = 0;

  for (let subGoal of goal.children) {
    count++;
    count += recursiveCountDescendants(subGoal);
  }
  return count;
};

const updateScheduledCount = () => {
  scheduledDescendantCount.value = recursiveCountScheduledDescendants(
    props.goal
  );
};

const recursiveCountScheduledDescendants = (goal) => {
  let count = 0;

  for (let subGoal of goal.children) {
    if (subGoal.scheduled) {
      count++;
    }
    count += recursiveCountDescendants(subGoal);
  }
  return count;
};

updateDescendantCount();
updateScheduledCount();

const handleChildCollapse = (data) => {
  childData.value[data.index].collapsed = data.collapsed;
  computeDists();
};

const handleChildReportDescendants = (data) => {
  childData.value[data.index].descendantCount = data.descendantCount;
};

const computeDists = () => {
  let dist = 1;
  for (let i = 0; i < props.goal.children.length; i++) {
    childData.value[i].dist = dist;
    dist++;

    if (childData.value[i].descendantCount && !childData.value[i].collapsed) {
      dist += childData.value[i].descendantCount;
    }
  }
};

const handleCollapseButtonClick = () => {
  computeDists();
  emit("set-collapsed", { index: props.index, collapsed: !props.collapsed });
};

const handleCheckboxClick = () => {
  checked.value = !checked.value;
};

onMounted(() => {
  computeDists();
});
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
}

.row {
  display: grid;
  position: relative;
  grid-template-columns: 3fr 0.75fr 1fr 1fr 1fr;
  align-items: center;
  max-height: 35px;
  width: 100%;
}

.type-marker {
  width: 8px;
  height: 18px;
  min-width: 8px;
  margin-left: 10px;
  border: 3px solid #5a6798;
  border-radius: 2px;
  background-color: grey;
}

.type-marker.compound {
  background-color: #4bc5df;
}

.type-marker.task {
  background-color: #7fefa6;
}

.title-container {
  min-height: 30px;
  min-width: 5px;
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 1;
  border-bottom: 1px #b7bfdf solid;
}

.title {
  margin-left: 5px;
  font-weight: 600;
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #5a6798;
  width: 90%;
}

.collapsible-icon {
  width: 20px;
  height: 20px;
  z-index: 1;
  min-width: 20px;
}
.collapsible-icon.collapsed {
  background-image: url("../assets/images/icons/expand-icon.svg");
  background-size: 20px 20px;
}

.collapsible-icon.expanded {
  background-image: url("../assets/images/icons/collapse-icon.svg");
  background-size: 20px 20px;
}

.collapsible-icon.childless {
  background-image: url("../assets/images/icons/childless-icon.svg");
  background-size: 12px 12px;
  background-repeat: no-repeat;
  background-position: center;
}
summary.child::before {
  content: "";
  display: block;
  position: absolute;
  left: -22px;
  top: calc(((30px * var(--dist)) * -1) + 15px);
  width: 25px;
  height: calc((30px * var(--dist)));
  border: solid #8592c1;
  border-width: 0 0 2px 2px;
  border-bottom-left-radius: 12px;
  z-index: 0;
}
summary.child.subsequent::before {
  top: calc(((40px * var(--dist)) * -1) + 15px);
  height: calc((40px * var(--dist)));
}

input[type="checkbox"] {
  margin-left: 10px;
  margin-top: 0;
  margin-bottom: 0;
  width: 20px;
  height: 20px;
}

.cell {
  display: flex;
  align-items: center;
  min-height: 30px;
  border-bottom: 1px #b7bfdf solid;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.duedate,
.scheduled,
.tags {
  font-size: 14px;
}
</style>
