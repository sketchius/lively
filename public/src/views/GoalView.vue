<template>
  <div class="rows">
    <div class="row headers">
      <div>Title</div>
      <div>Progress</div>
      <div>Priority</div>
      <div>Due Date</div>
      <div>Tags</div>
    </div>

    <GoalListItem
      v-for="goal in goals"
      :key="goal.id"
      :goal="goal"
      :depth="0"
      :dist="0"
      :top="true"
    />
  </div>
</template>

<script>
import { computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import GoalListItem from "../components/GoalListItem.vue";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const goals = computed(() => store.state.goals);
    const goalListNeedsRefresh = computed(
      () => store.state.goalListNeedsRefresh
    );

    onMounted(() => {
      store.dispatch("fetchTopLevelGoals");
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
      store.commit("pushCommand", "updateGoal");
      store.commit("updateEditorGoal", goal);
      router.push("/goal-editor");
    };

    const createGoal = () => {
      store.commit("pushCommand", "createGoal");
      store.commit("resetEditorGoal");
      router.push("/goal-editor");
    };

    return { goals, deleteGoal, editGoal, createGoal };
  },
  components: {
    GoalListItem,
  },
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
  padding: 10px;
  position: relative;
  flex-direction: column;
  align-items: flex-end;
  width: fit-content;
  border: 2px solid #8592c1;
}

.goal {
  border: 1px solid black;
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 5px 15px;
}

.row {
  width: 60vw;
  display: grid;
  grid-template-columns: 20vw 1fr 1fr 1fr 1fr;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 18px;
  color: #5a6798;
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
