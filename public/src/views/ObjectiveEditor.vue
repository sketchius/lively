<template>
  <div class="objective-form-container">
    <h2>
      {{ command == "createObjective" ? "New Objective" : "Edit Objective" }}
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

      <button class="button" @click="save">Save</button>
      <button class="button" @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
import dataService from "../services/dataService.js";

export default {
  name: "ObjectiveEditor",
  setup() {
    const router = useRouter();
    const store = useStore();
    const objective = ref(store.state.currentEditorObjective);

    const currentCommand =
      store.state.commandStack[store.state.commandStack.length - 1];
    const primaryCommand = store.state.commandStack[0];

    let selectedTask = ref(null);

    const updateNewObjective = () => {
      store.commit("updateEditorObjective", objective.value);
      store.commit("markEditorObjectiveModified");
    };

    const addTask = () => {
      updateNewObjective();
      router.push("/tasks/editor");
    };

    const selectTask = (task) => {
      selectedTask.value = task;
    };

    const editTask = () => {
      store.commit("updateEditorTask", selectedTask.value.data);
      router.push("/tasks/editor");
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

    const save = async () => {
      switch (currentCommand) {
        case "createObjective":
          if (primaryCommand == currentCommand) {
            await dataService.createObjective(objective.value);
          } else {
            console.log("Updating objective");
            updateNewObjective();
            store.commit("setReturnValue", {
              data: objective,
              type: currentCommand,
            });
          }
          break;
        case "updateObjective":
          if (primaryCommand == currentCommand) {
            await dataService.updateObjective(
              objective.value.id,
              objective.value
            );
          } else {
            updateNewObjective();
            store.commit("setReturnValue", {
              data: objective,
              type: currentCommand,
            });
          }
          break;
      }
      router.back();
    };

    const cancel = () => {
      router.back();
    };

    return {
      objective,
      selectedTask,
      selectTask,
      addTask,
      editTask,
      deleteTask,
      save,
      cancel,
      currentCommand,
      primaryCommand,
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
