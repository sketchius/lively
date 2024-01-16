<template>
  <div class="objective-list">
    <div class="list-heading">
      <h2>Objectives</h2>
      <button class="button icon" @click="createObjective()">+</button>
    </div>
    <div
      v-for="objective in objectives"
      :key="objective.id"
      class="objective-item"
    >
      <div class="title">
        <h3>{{ objective.title }}</h3>
        <button class="icon-button" @click="editObjective(objective)">E</button>
        <button
          class="icon-button delete"
          @click="deleteObjective(objective.id)"
        >
          D
        </button>
      </div>
      <p>{{ objective.description }}</p>
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
    const objectives = computed(() => store.state.objectives);
    const objectiveListNeedsRefresh = computed(
      () => store.state.objectiveListNeedsRefresh
    );

    onMounted(() => {
      store.dispatch("fetchObjectives");
    });

    watch(objectiveListNeedsRefresh, (newValue) => {
      if (newValue) {
        store.dispatch("fetchObjectives");
      }
    });

    const deleteObjective = async (objectiveId) => {
      await store.dispatch("deleteObjective", objectiveId);
    };

    const editObjective = (objective) => {
      store.commit("setGlobalCommand", "updateObjective");
      store.commit("updateEditorObjective", objective);
      router.push("/objectives/editor");
    };

    const createObjective = () => {
      store.commit("setGlobalCommand", "createObjective");
      store.commit("resetEditorObjective");
      router.push("/objectives/editor");
    };

    return { objectives, deleteObjective, editObjective, createObjective };
  },
};
</script>

<style scoped>
.list-heading {
  display: flex;
  justify-content: space-between;
}

.objective-list {
  width: 80%;
  display: flex;
  flex-direction: column;
  min-height: 80%;
}

.objective-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.objective-item p {
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
