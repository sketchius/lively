<template>
  <div class="objective-form-container">
    <h2>
      {{ editing ? "Edit Objective" : "New Objective" }}
    </h2>
    <div class="input-wrapper">
      <label for="title">Title</label>
      <input
        type="text"
        id="title"
        v-model="objective.title"
        placeholder="Title"
      />
    </div>
    <div class="input-wrapper">
      <label for="details">Details</label>
      <textarea
        id="details"
        v-model="objective.details"
        placeholder="Details"
      ></textarea>
    </div>
    <div class="input-wrapper">
      <label for="timeFrame">Timeframe</label>
      <input
        type="text"
        id="timeFrame"
        v-model="objective.timeFrame"
        placeholder="Timeframe"
      />
    </div>
    <div class="input-wrapper">
      <label for="task-map">Task List</label>
      <div class="task-map">
        <div v-for="task in objective.tasks" :key="task.id">
          <span
            :class="{
              selected:
                selectedTask && selectedTask.data.title == task.data.title,
            }"
            @click="selectTask(task)"
            >{{ task.data.title }}</span
          >
        </div>
      </div>
      <div class="buttons">
        <button class="button" @click="addTask">New Task</button>
        <button class="button" @click="editTask">Edit Task</button>
        <button class="button" @click="deleteTask">Delete Task</button>
      </div>

      <button class="button" @click="save">
        {{ editing ? "Save" : "Create" }}
      </button>
      <button class="button" @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
import dataService from "../services/dataService.js";
import { createUID } from '@/util/uuid';


export default {
  name: "ObjectiveEditor",
  setup() {
    const router = useRouter();
    const store = useStore();
    const objective = ref(store.state.currentEditorObjective);
    
    const returnValue = store.state.returnValue;
    const editing = objective.value.title != "";

    let selectedTask = ref(null);

    const updateNewObjective = () => {
      store.commit("updateEditorObjective", objective.value);
      store.commit("markEditorObjectiveModified");
    };

    const addTask = () => {
      updateNewObjective();
      store.commit("resetEditorTask");
      if (router.currentRoute.value.path == "/goal-editor/objective-editor")
        router.push("/goal-editor/objective-editor/task-editor");
      else router.push("/objective-editor/task-editor");
    };

    const selectTask = (task) => {
      selectedTask.value = task;
    };

    const editTask = () => {
      store.commit("updateEditorTask", selectedTask.value.data);
      if (router.currentRoute.value.path == "/goal-editor/objective-editor")
        router.push("/goal-editor/objective-editor/task-editor");
      else router.push("/objective-editor/task-editor");
    };

    const deleteTask = async () => {
      if (selectedTask.value.data.new) {
        objective.value.tasks = objective.value.tasks.filter((task) => {
          return task.data.title != selectedTask.value.data.title;
        });
      } else {
        await store.dispatch("deleteTask", selectedTask.value.data.id);
      }
    };

    switch (returnValue.type) {
      case "create":
        objective.value.tasks.push({
          phase: 1,
          data: {id: createUID(), ...store.state.currentEditorTask},
        });
        store.commit("resetEditorTask");
        updateNewObjective();
        break;
      case "update":
        store.commit("resetEditorTask");
        updateNewObjective();
        break;
      case null:
        break;
    }

    const save = async () => {
      if (editing) {
        if (router.currentRoute.value.meta.level == 1) {
          await dataService.updateObjective(
            objective.value.id,
            objective.value
          );
        } else {
          updateNewObjective();
          store.commit("setReturnValue", {
            data: objective,
            type: editing ? "update":"create",
          });
        }
      } else {
        if (router.currentRoute.value.meta.level == 1) {
          await dataService.createObjective(objective.value);
        } else {
          updateNewObjective();
          store.commit("setReturnValue", {
            data: objective,
            type: editing ? "update":"create",
          });
        }
      }


      router.back();
    };

    const cancel = () => {
      store.commit("resetEditorObjective");
      router.back();
    };

    return {
      objective,
      editing,
      selectedTask,
      selectTask,
      addTask,
      editTask,
      deleteTask,
      save,
      cancel,
    };
  },
};
</script>

<style scoped>
.objective-form-container {
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

.selected {
  background-color: #586069;
}

.objective-map {
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
  margin: 1rem;
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
