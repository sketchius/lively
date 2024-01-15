<template>
  <div class="task-list">
    <div class="list-heading">
      <h2>Tasks</h2>
      <router-link to="/tasks/editor"
        ><button class="button icon">+</button></router-link
      >
    </div>
    <div v-for="task in tasks" :key="task.id" class="task-item">
      <div class="title">
        <h3>{{ task.title }}</h3>
        <button class="icon-button" @click="editTask(task)">E</button>
        <button class="icon-button delete" @click="deleteTask(task.id)">
          D
        </button>
      </div>
      <p>{{ task.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const tasks = computed(() => store.state.tasks);
const taskListNeedsRefresh = computed(() => store.state.taskListNeedsRefresh);

onMounted(() => {
  store.dispatch("fetchTasks");
});

watch(taskListNeedsRefresh, (newValue) => {
  if (newValue) {
    store.dispatch("fetchTasks");
  }
});

const deleteTask = async (taskId) => {
  await store.dispatch("deleteTask", taskId);
};

const editTask = (task) => {
  store.dispatch("editTask", task);
};
</script>

<style scoped>
.list-heading {
  display: flex;
  justify-content: space-between;
}

.task-list {
  width: 80%;
  display: flex;
  flex-direction: column;
  min-height: 80%;
}

.task-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.task-item p {
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
