<template>
  <div class="rows">
    <div class="row headers">
      <div class="title">Goal Title</div>
      <div>Priority</div>
      <div>Due Date</div>
      <div>Scheduled</div>
      <div>Tags</div>
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
</template>

<script setup>
import { computed, onMounted, watch, ref } from "vue";
import { useStore } from "vuex";
import GoalListItem from "../components/GoalListItem.vue";

const store = useStore();

const goals = computed(() => store.state.goals);
const goalListNeedsRefresh = computed(() => store.state.goalListNeedsRefresh);

const goalData = ref([]);

const initializeGoalData = () => {
  goalData.value = goals.value.map(() => ({ collapsed: false }));
};


onMounted(() => {
  store.dispatch("fetchTopLevelGoals");
});

const handleChildCollapse = (data) => {
  console.log(goalData.value);
  console.log(data);
  goalData.value[data.index].collapsed = data.collapsed;
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
.list-heading {
  display: flex;
  justify-content: space-between;
}

.goal-list {
  width: 80%;
  display: flex;
  flex-direction: column;
  min-height: 80%;
}

.goal-card {
  margin-bottom: 20px;
  padding: 2rem;
  border: 1px black solid;
  border-radius: 8px;
}

.goal-item p {
  margin: 0;
}

.title {
  text-align: center;
  width: 100%;
}

h3 {
  margin: 0;
  margin-right: auto;
}

.icon-button {
  padding: 5px 10px;
  color: rgb(67, 65, 80);
  background-color: rgb(188, 193, 207);
  border: 1px solid rgb(67, 65, 80);
  border-radius: 104px;
  cursor: pointer;
}

.objective-card {
  max-width: 40ch;
  padding: 0rem 1rem;
  border: 1px black solid;
  border-radius: 8px;
}
.task-item {
  margin-left: 1.5rem;
}

.rows {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-end;
  width: clamp(900px, 80vw, 1200px);
  border: 3px solid #8592c1;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 15px;
}

.goal {
  border: 1px solid black;
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 5px 15px;
}

.row {
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 0.75fr 1fr 1fr 1fr;
  padding-bottom: 2px;
  font-weight: 600;
  font-size: 18px;
  color: #5a6798;
  border-bottom: 2px #b7bfdf solid;
}

.child {
  margin-top: 10px;
}

.indent {
  margin-left: 15px;
}

.title-group {
  display: flex;
  gap: 0.5rem;
  padding-right: 1rem;
}
.title {
  margin-right: auto;
}
</style>
