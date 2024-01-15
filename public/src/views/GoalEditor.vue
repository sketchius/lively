<template>
  <div class="goal-form-container">
    <h2>{{ operation == "create" ? "New Goal" : "Edit Goal" }}</h2>
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
      <label for="objective-map">Objective List</label>
      <div 
        class="objective-map">
      <div
        v-for="objective in goal.objectives"
        :key="objective.id"
      >
        <span>{{ objective.title }}</span>
      </div>
    </div>
    </div>
    <div class="buttons">
      <button class="button" @click="addObjective">New Objective</button>
      <button class="button" @click="editObjective">Edit Objective</button>
      <button class="button" @click="deleteObjective">Delete Objective</button>
    </div>

    <button class="button" @click="save">Save</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
import dataService from "../services/dataService.js";

export default {
  name: "GoalEditor",
  setup() {
    const router = useRouter();
    const store = useStore();
    const goal = ref(store.state.currentEditorGoal);

    const operation = store.state.currentOperation;
    const lastAction = store.state.lastAction;

    if (lastAction === "createObjective") {
      store.commit("addEditorObjectiveToEditorGoal");
    }

    const updateNewGoal = () => {
      store.commit("updateEditorGoal", goal.value);
      // Logic for saving
    };

    const addObjective = () => {
      updateNewGoal();
      router.push("/objectives/editor");
    };

    const editObjective = () => {
      // Logic for editing a objective
    };

    const deleteObjective = () => {
      // Logic for deleting a objective
    };

    const save = async () => {
      await dataService.createGoal(goal.value);
      router.back();
    };

    return { goal, operation, addObjective, editObjective, deleteObjective, save };
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
