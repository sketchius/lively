<template>
  <div class="goal-form-container">
    <h2>New Goal</h2>
    <div class="input-wrapper">
      <label for="title">Title</label>
      <input type="text" id="title" v-model="goal.title" placeholder="Title" />
    </div>
    <div class="input-wrapper">
      <label for="details">Details</label>
      <textarea
        id="details"
        v-model="goal.details"
        placeholder="Details"
      ></textarea>
    </div>
    <div class="input-wrapper">
      <label for="timeFrame">Timeframe</label>
      <input
        type="text"
        id="timeFrame"
        v-model="goal.timeFrame"
        placeholder="Timeframe"
      />
    </div>
    <div class="input-wrapper">
      <label for="taskmap">Tasks</label>
      <div class="task-map">
        <!-- Task Map could go here -->
      </div>
    </div>
    <div class="buttons">
      <button class="button" @click="addTask">New Task</button>
      <button class="button" @click="editTask">Edit Task</button>
      <button class="button" @click="deleteTask">Delete Task</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "GoalForm",
  setup() {
    const goal = ref({
      title: "",
      details: "",
      timeFrame: "",
      tasks: [],
    });

    const addTask = () => {
      // Logic for adding a task
    };

    const editTask = () => {
      // Logic for editing a task
    };

    const deleteTask = () => {
      // Logic for deleting a task
    };

    return { goal, addTask, editTask, deleteTask };
  },
};
</script>

<style scoped>
.goal-form-container {
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
