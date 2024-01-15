<template>
  <div class="goal-list">
    <div class="list-heading">
      <h2>Goals</h2>
      <router-link to="/goals/editor"
        ><button class="button icon">+</button></router-link
      >
    </div>
    <div v-for="goal in goals" :key="goal.id" class="goal-item">
      <div class="title">
        <h3>{{ goal.title }}</h3>
        <button class="icon-button" @click="editGoal(goal)">E</button>
        <button class="icon-button delete" @click="deleteGoal(goal.id)">
          D
        </button>
      </div>
      <p>{{ goal.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const goals = computed(() => store.state.goals);
const goalListNeedsRefresh = computed(() => store.state.goalListNeedsRefresh);

onMounted(() => {
  store.dispatch("fetchGoals");
});

watch(goalListNeedsRefresh, (newValue) => {
  if (newValue) {
    store.dispatch("fetchGoals");
  }
});

const deleteGoal = async (goalId) => {
  await store.dispatch("deleteGoal", goalId);
};

const editGoal = (goal) => {
  store.dispatch("editGoal", goal);
};
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

.goal-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.goal-item p {
  margin: 0;
}

.title {
  display: flex;
  align-items: center;
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
</style>
