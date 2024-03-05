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
      <div class="title-container">
        <div class="title">{{ goal.title }}</div>
      </div>
    </summary>
    <div class="cell category"><div class="tag">{{capitalize(goal.category)}}</div></div>
    <div class="cell importance"><div class="tag">10</div></div>
    <div class="cell duedate">
      {{ goal.timeFrame.display }}
    </div>
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
import CheckboxInput from '@/components/CheckboxInput.vue';

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

const capitalize = (string) => {
  return `${string.slice(0,1).toUpperCase()}${string.slice(1)}`;
}

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
  background-image: url("@/assets/images/icons/expand-icon.svg");
  background-size: 20px 20px;
}

.collapsible-icon.expanded {
  background-image: url("@/assets/images/icons/collapse-icon.svg");
  background-size: 20px 20px;
}

.collapsible-icon.childless {
  background-image: url("@/assets/images/icons/childless-icon.svg");
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
  border: solid var(--ink);
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
