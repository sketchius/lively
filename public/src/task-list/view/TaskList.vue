<template>
  <div class="container">
    <h1 class="display-text">|| Tasks<HelpComponent :helpId="'task'" /></h1>
    <div class="list">
      <div class="rows">
        <div class="row headers display-text">
          <div class="title">Task Title</div>
          <div>Category</div>
          <div>Importance</div>
          <div>Duration</div>
          <div>Time Frame</div>
        </div>
        <TaskListItem
          v-for="(task, index) in tasks"
          :key="task.id"
          :task="task"
          :index="index"
          :top="true"
        />
      </div>
      <div class="list-spacer"></div>
    </div>

    <button class="standard" @click="handleNewItem">New Task</button>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import TaskListItem from "../components/TaskListItem.vue";

// import { useRouter } from "vue-router";
import HelpComponent from "@/components/help-component/HelpComponent.vue";

// const router = useRouter();

const store = useStore();

const tasks = computed(() => store.state.tasks);
const taskListNeedsRefresh = computed(() => store.state.taskListNeedsRefresh);

onMounted(() => {
  store.dispatch("fetchTasks");
});

const handleNewItem = () => {
  // dispatchRandomTask();
  store.commit("setAssistantEventData", { type: "new-task" });
  // store.commit("resetFormData");
  // router.push({ name: `item-editor-task` });
};

watch(taskListNeedsRefresh, (newValue) => {
  if (newValue) {
    store.dispatch("fetchTasks");
  }
});

// function dispatchRandomTask() {
//   const tasks = [
//     {
//       title: "Go to the grocery store",
//       importance: 5,
//       duration: 60,
//       timeFrame: { display: "By April 10th" },
//       category: "errand",
//     },
//     {
//       title: "Complete tax return",
//       importance: 9,
//       duration: 120,
//       timeFrame: { display: "By April 15th" },
//       category: "finance",
//     },
//     {
//       title: "Schedule dentist appointment",
//       importance: 6,
//       duration: 30,
//       timeFrame: { display: "Within a month" },
//       category: "health",
//     },
//     {
//       title: "Plan weekend getaway",
//       importance: 7,
//       duration: 240,
//       timeFrame: { display: "By May 1st" },
//       category: "leisure",
//     },
//     {
//       title: "Write project proposal",
//       importance: 8,
//       duration: 180,
//       timeFrame: { display: "By next Friday" },
//       category: "work",
//     },
//     {
//       title: "Organize garage",
//       importance: 4,
//       duration: 150,
//       timeFrame: { display: "By this weekend" },
//       category: "home",
//     },
//     {
//       title: "Prepare garden for spring",
//       importance: 5,
//       duration: 90,
//       timeFrame: { display: "By end of March" },
//       category: "gardening",
//     },
//     {
//       title: "Research new laptop models",
//       importance: 7,
//       duration: 70,
//       timeFrame: { display: "Within two weeks" },
//       category: "tech",
//     },
//     {
//       title: "Renew gym membership",
//       importance: 6,
//       duration: 20,
//       timeFrame: { display: "By next Wednesday" },
//       category: "fitness",
//     },
//     {
//       title: "Book veterinarian visit for the dog",
//       importance: 8,
//       duration: 60,
//       timeFrame: { display: "By April 20th" },
//       category: "pets",
//     },
//   ];

//   const randomIndex = Math.floor(Math.random() * tasks.length);
//   const task = tasks[randomIndex];

//   store.dispatch("createTask", task);
// }
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
  padding-left: 50px;
  width: 100%;
}

h3 {
  margin: 0;
  margin-right: auto;
}

.rows {
  display: grid;
  grid-template-columns:
    minmax(min-content, 2.5fr) minmax(min-content, 1fr) minmax(min-content, 1fr)
    minmax(min-content, 1fr)
    minmax(min-content, 2.5fr);
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
  box-sizing: border-box;
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
  font-size: 14px;
}

.title {
  margin-right: auto;
}
</style>
