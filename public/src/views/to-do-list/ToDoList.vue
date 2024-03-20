<template>
  <div class="container">
    <h1 class="display-text">
      || To-Do List<HelpComponent :helpId="'to-do'" />
    </h1>
      <div class="rows">
        <div class="row headers display-text">
          <div class="title">Task Title</div>
          <div>Category</div>
          <div>Priority</div>
          <div>Duration</div>
          <div>Time Frame</div>
        </div>
        <ToDoListItem
          v-for="(task, index) in tasks"
          :key="task.id"
          :task="task"
          :index="index"
          :top="true"
        />
      </div>

    <button class="standard" @click="handleNewItem">New Task</button>
  </div>
</template>

<script setup>
import { computed, onMounted, watch, ref } from "vue";
import { useStore } from "vuex";
import ToDoListItem from "./components/ToDoListItem.vue";
import { parse, differenceInDays, startOfDay } from "date-fns";
// import { useRouter } from "vue-router";
import HelpComponent from "@/components/help-component/HelpComponent.vue";

// const router = useRouter();

const store = useStore();

const tasks = ref([]);
const taskListNeedsRefresh = computed(() => store.state.taskListNeedsRefresh);

const categories = [
  { name: "work", importance: 8, colorClass: "green" },
  { name: "household", importance: 6, colorClass: "orange" },
  { name: "errand", importance: 6, colorClass: "yellow" },
  { name: "life management", importance: 7, colorClass: "purple" },
  { name: "personal", importance: 3, colorClass: "blue" },
  { name: "wellness", importance: 6, colorClass: "teal" },
];

const getCategoryImportance = (category) => {
  const item = categories.find((item) => item.name === category.toLowerCase());
  if (item) {
    return item.importance;
  }
  return 0;
};

const getCategoryColor = (category) => {
  const item = categories.find((item) => item.name === category.toLowerCase());
  if (item) {
    return item.colorClass;
  }
  return "";
};

const processUrgency = (task) => {
  const dateDifference = getDateDifference(task.timeFrame.date);
  task.urgencyImportance = 0;
  switch (task.timeFrame.type) {
    case "Deadline":
      if (dateDifference < 0) {
        task.urgencyImportance = 3;
        task.timeFrameLabelClass = "late";
      }
      if (dateDifference == 0) {
        task.urgencyImportance = 2;
        task.timeFrameLabelClass = "urgent";
      }
      if (dateDifference >= 1 && dateDifference <= 3) {
        task.urgencyImportance = 1;
        task.timeFrameLabelClass = "imminent";
      }
      break;
    case "Scheduled":
      if (dateDifference < 0) {
        task.urgencyImportance = 3;
        task.timeFrameLabelClass = "late";
      }
      if (dateDifference == 0) {
        task.urgencyImportance = 2;
        task.timeFrameLabelClass = "urgent";
      }
      break;
  }
  console.log("For Task: " + task.title);
  console.log("urgencyImportance = " + task.urgencyImportance);
  console.log("dateDifference = " + dateDifference);
  console.log("task.timeFrame.date = " + task.timeFrame.date);
  console.log("timeFrameLabelClass = " + task.timeFrameLabelClass);
};

const getDateDifference = (dateString) => {
  // function removeOrdinal(day) {
  //   return day.replace(/(st|nd|rd|th)/, "");
  // }

  const dateFormat = "M/d/yyyy";

  // const normalizedDateString = dateString.replace(
  //   /(\d+)(st|nd|rd|th)/,
  //   (match, p1) => removeOrdinal(p1)
  // );
  const date = startOfDay(parse(dateString, dateFormat, new Date()));

  const today = startOfDay(new Date());

  return differenceInDays(date, today);
};

onMounted(async () => {
  await store.dispatch("fetchTasks");
  tasks.value = [...store.state.tasks];
  tasks.value.forEach((task) => {
    processUrgency(task);
    task.priority =
      getCategoryImportance(task.category) +
      task.importanceModifier +
      task.urgencyImportance;
    task.categoryColorClass = getCategoryColor(task.category);
  });
  console.log("Sorting...");
  tasks.value = tasks.value.sort((a, b) => b.priority - a.priority);
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
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  grid-gap: var(--size1);
  width: 100%;
  height: 100%;
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

.list {}

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
  max-height: 100%;
  overflow-y: auto;
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
