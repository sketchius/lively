<template>
  <div
    :style="{
      gridTemplateColumns: `calc(20vw - ${depth * 15}px) 1fr 1fr 1fr 1fr`,
      width: `calc(60vw - ${depth * 15}px)`,
      '--dist': props.dist,
    }"
    class="row"
    :class="{ top: props.top, bottom: props.bottom }"
  >
    <summary
      :style="{ marginLeft: `${depth * 15}px` }"
      :class="{ child: depth > 0, subsequent: index > 0 && dist == 1 }"
    >
      <div
        :class="{
          collapsed: collapsed && props.goal.subGoals.length > 0,
          expanded: !collapsed && props.goal.subGoals.length > 0,
          childless: props.goal.subGoals.length == 0,
        }"
        class="collapsible-icon"
        @click="toggleCollapsed"
      ></div>
      <CheckboxInput :checked="checked" @click="handleCheckboxClick" />
      <div
        class="type-marker"
        :class="{
          compound: goal.type.includes('compound'),
          task: goal.type.includes('task'),
        }"
      ></div>
      <div class="title">{{ goal.title }}</div>
    </summary>
    <div>Desc: {{ childCount }}</div>
    <div>Dist: {{ props.dist }}</div>
    <div>Today</div>
    <div>Work</div>
  </div>
  <template v-for="(subGoal, index) in goal.subGoals" :key="subGoal.id">
    <GoalListItem
      :goal="subGoal"
      :depth="depth + 1"
      @count-descendants="handleCount"
      @set-collapsed="handleChildCollapse"
      :index="index"
      :top="false"
      :bottom="props.top && index == goal.subGoals.length - 1"
      :dist="childData[index].dist || 1"
      v-if="!collapsed"
    />
  </template>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref } from "vue";
import CheckboxInput from "../components/CheckboxInput.vue";

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
});

const emit = defineEmits(["count-descendants", "set-collapsed"]);
const childCount = ref(0);
const checked = ref(props.goal.complete);

const childData = ref(
  props.goal.subGoals.map(() => {
    return {};
  })
);

const collapsed = ref(false);

const handleCount = (data) => {
  childCount.value += data.count;
  childData.value[data.index].count = data.count;
  computeDists();
  emit("count-descendants", {
    index: props.index,
    count: data.count + props.goal.subGoals.length,
  });
};

const handleChildCollapse = (data) => {
  childData.value[data.index].collapsed = data.collapsed;
  computeDists();
};

const computeDists = () => {
  let dist = 1;
  for (let i = 0; i < props.goal.subGoals.length; i++) {
    childData.value[i].dist = dist;

    if (childData.value[i].count && !childData.value[i].collapsed) {
      dist += childData.value[i].count;
    }
  }
};

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
  if (collapsed.value) {
    childData.value.forEach((child) => {
      child.collapsed = true;
    });
  }
  computeDists();
  emit("set-collapsed", { index: props.index, collapsed: collapsed.value });
};

const handleCheckboxClick = () => {
  checked.value = !checked.value;
};

onMounted(() => {
  if (props.goal.subGoals.length == 0)
    emit("count-descendants", { index: props.index, count: 1 });
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
}
.row {
  display: grid;
  margin-top: 5px;
  margin-bottom: 5px;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  align-items: center;
  max-height: 35px;
}

.type-marker {
  width: 8px;
  height: 18px;
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

.title {
  margin-left: 5px;
  font-weight: 600;
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #5a6798;
}

.collapsible-icon {
  width: 20px;
  height: 20px;
  z-index: 1;
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
  top: calc(((30px * var(--dist)) * -1) + 10px);
  width: 25px;
  height: calc((30px * var(--dist)));
  border: solid #8592c1;
  border-width: 0 0 3px 3px;
  border-bottom-left-radius: 12px;
  z-index: 0;
}
summary.child.subsequent::before {
  top: calc(((40px * var(--dist)) * -1) + 10px);
  height: calc((40px * var(--dist)));
}

input[type="checkbox"] {
  margin-left: 10px;
  margin-top: 0;
  margin-bottom: 0;
  width: 20px;
  height: 20px;
}
</style>
