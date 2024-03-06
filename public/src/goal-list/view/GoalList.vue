<template>
  <div class="container">
    <h1 class="display-text">|| Goals<HelpComponent :helpId="'goal'" /></h1>
    <div class="list">
      <div class="rows">
        <div class="row headers display-text">
          <div class="title">Goal Title</div>
          <div>Category</div>
          <div>Importance</div>
          <div>Time Frame</div>
        </div>
        <GoalListItem
          v-for="(goal, index) in goals"
          :key="goal.id"
          :goal="goal"
          :depth="0"
          :index="index"
          :dist="0"
          :top="true"
          @set-collapsed="handleChildCollapse"
          :collapsed="goalData[index].collapsed"
        />
      </div>
      <div class="list-spacer"></div>
    </div>

    <button class="standard" @click="handleNewItem">New Goal</button>
  </div>
</template>

<script setup>
import { computed, onMounted, watch, ref } from "vue";
import { useStore } from "vuex";
import GoalListItem from "../components/GoalListItem.vue";

import { useRouter } from "vue-router";
import HelpComponent from "@/components/help-component/HelpComponent.vue";

const router = useRouter();

const store = useStore();

const goals = computed(() => store.state.goals);
const goalListNeedsRefresh = computed(() => store.state.goalListNeedsRefresh);

const goalData = ref([]);

const initializeGoalData = () => {
  goalData.value = goals.value.map(() => ({ collapsed: false }));
};

onMounted(() => {
  store.dispatch("fetchGoals");
});

const handleChildCollapse = (data) => {
  console.log(goalData.value);
  console.log(data);
  goalData.value[data.index].collapsed = data.collapsed;
};

const handleNewItem = () => {
  store.commit("resetFormData");
  router.push({ name: `item-editor-goal` });
};

watch(goalListNeedsRefresh, (newValue) => {
  if (newValue) {
    store.dispatch("fetchGoals");
  }
});

watch(
  goals,
  () => {
    initializeGoalData();
  },
  { immediate: true }
);

// const deleteGoal = async (goalId) => {
//   await store.dispatch('deleteGoal', goalId);
// };

// const editGoal = (goal) => {
//   store.commit('pushCommand', 'updateGoal');
//   store.commit('updateEditorGoal', goal);
//   router.push('/goal-editor');
// };

// const createGoal = () => {
//   store.commit('pushCommand', 'createGoal');
//   store.commit('resetEditorGoal');
//   router.push('/goal-editor');
// };
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  grid-gap: var(--size1);
  width: 100%;
}

.container button {
  align-self: flex-start;
}

.title {
  padding-left: 72px;
  width: 100%;
}

h3 {
  margin: 0;
  margin-right: auto;
}

.rows {
  display: grid;
  grid-template-columns: minmax(min-content, 2.5fr) minmax(min-content, 1fr) minmax(
      min-content,
      1fr
    ) minmax(min-content, 2.5fr);
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  align-content: start;
  width: 100%;
  border: 4px solid var(--ink);
  border-radius: 10px;
  padding-top: 5px;
  padding-bottom: 15px;
  min-height: 150px;
}

.row {
  width: 100%;
  display: contents;
  padding-bottom: 2px;
  font-weight: 500;
  font-size: 16px;
  color: var(--ink);
  min-height: 30px;
}

.row div {
  border-bottom: 3px double var(--ink);
  padding-right: 18px;
  font-weight: 600;
}

.title {
  margin-right: auto;
}
</style>
