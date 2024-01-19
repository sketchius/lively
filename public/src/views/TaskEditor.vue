<template>
  <div class="task-form-container">
    <h2>
      {{ editing ? "Edit Task" : "New Task" }}
    </h2>
    <div class="input-wrapper">
      <label for="title">Title</label>
      <input type="text" id="title" v-model="task.title" placeholder="Title" />
    </div>
    <div class="input-wrapper">
      <label for="details">Details</label>
      <textarea
        id="details"
        v-model="task.details"
        placeholder="Details"
      ></textarea>
    </div>
    <div class="input-wrapper">
      <label for="timeFrame">Timeframe</label>
      <input
        type="text"
        id="timeFrame"
        v-model="task.timeFrame"
        placeholder="Timeframe"
      />
    </div>

    <button class="button" @click="save">
        {{ editing ? "Save" : "Create" }}
      </button>
    <button class="button" @click="cancel">Cancel</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
import dataService from "../services/dataService.js";

export default {
  name: "TaskEditor",
  setup() {
    const router = useRouter();
    const store = useStore();
    const task = ref(store.state.currentEditorTask);

    const editing = task.value.title != "";

    const updateNewTask = () => {
      store.commit("updateEditorTask", task.value);
      store.commit("markEditorTaskModified");
    };

    const save = async () => {
      if (editing) {
        if (router.currentRoute.value.meta.level == 1) {
          await dataService.updateTask(task.value.id, task.value);
        } else {
          updateNewTask();
          store.commit("setReturnValue", {
            data: task,
            type: editing ? "update":"create",
          });
        }
      } else {
        if (router.currentRoute.value.meta.level == 1) {
          await dataService.createTask(task.value);
        } else {
          updateNewTask();
          store.commit("setReturnValue", {
            data: task,
            type: editing ? "update":"create",
          });
        }
      }

      router.back();
    };

    const cancel = () => {
      store.commit("resetEditorTask");
      router.back();
    };

    return { task, editing, save, cancel };
  },
};
</script>

<style scoped>
.task-form-container {
  background: #ffffff;
  padding: 20px;
  width: 300px;
  box-sizing: border-box;
  margin: auto;
}

.input-wrapper {
  margin-bottom: 1rem;
}

.input-wrapper label {
  display: block; /* Ensure the label is above the input */
  margin-bottom: 5px; /* Space between label and input */
  font-weight: bold; /* Bold label text */
}

.task-map {
  border: 1px solid #d1d5da;
  min-height: 3rem;
}

.input-wrapper input,
.input-wrapper textarea {
  font-family: "Montserrat", sans-serif;
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5da;
  border-radius: 4px; /* Rounded borders for inputs and textareas */
  font-size: 16px;
  color: #586069;
  background-color: #f6f8fa; /* Slightly gray background for inputs */
}

.buttons {
  display: flex;
  gap: 1rem;
}
.button {
  display: inline-block; /* Align buttons next to each other */
  margin-right: 10px; /* Space between buttons */
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #2cbe4e;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.button:hover {
  background-color: #239639; /* Darker shade on hover */
}
</style>
