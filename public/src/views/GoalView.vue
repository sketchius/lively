<template>
  <div class="outer-grid">
    <div class="row headers">
      <div>Title</div>
      <div>Progress</div>
      <div>Priority</div>
      <div>Due Date</div>
      <div>Tags</div>
    </div>

    <div v-for="goal in goals" :key="goal.id" class="goal">
      <div @click="goal.isExpanded = !goal.isExpanded" class="row">
        <div>{{ goal.title }}</div>
        <div>{{ goal.progress }}%</div>
        <div>{{ goal.priority }}</div>
        <div>{{ goal.dueDate }}</div>
        <div>
          <span v-for="tag in goal.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
      <div v-if="goal.isExpanded">
        <div
          v-for="objective in goal.objectives"
          :key="objective.id"
          class="row child"
        >
          <div class="indent">{{ objective.data.title }}</div>
          <div>{{ objective.data.progress }}%</div>
          <div>{{ objective.data.priority }}</div>
          <div>{{ objective.data.dueDate }}</div>
          <div>
            <span v-for="tag in objective.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const goals = computed(() => store.state.goals);
    const goalListNeedsRefresh = computed(
      () => store.state.goalListNeedsRefresh
    );

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

.outer-grid {
  width: 100ch;
}

.headers {
  padding: 0 15px;
}

.goal {
  border: 1px solid black;
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 5px 15px;
}

.row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
}

.child {
  margin-top: 10px;
}

.indent {
  margin-left: 15px;
}
</style>
