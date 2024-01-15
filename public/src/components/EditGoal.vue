<template>
  <div class="create-goal-container">
    <h2>Edit Goal</h2>
    <div class="input-wrapper">
      <label for="title">TITLE</label>
      <input
        type="text"
        id="title"
        v-model="goal.title"
        placeholder="Learn Japanese"
      />
    </div>
    <div class="input-wrapper">
      <label for="description">DESCRIPTION</label>
      <textarea
        id="description"
        v-model="goal.description"
        placeholder="Achieve fluency in Japanese through continuous study and practice."
      ></textarea>
    </div>
    <button class="save-button" @click="saveGoal">SAVE</button>
  </div>
</template>

<script>
import goalService from "@/services/dataService";

import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: "EditGoal",
  setup() {

    const store = useStore();

    const goal = computed(() => store.state.editingGoal);

    const saveGoal = async () => {
      try {
        if (goal.value.id) {
          await goalService.updateGoal(goal.value.id, goal.value);
          // Handle update success
        } else {
          console.error("Goal ID is missing.");
          // Handle error - goal ID is missing
        }
      } catch (error) {
        console.error("Error updating goal:", error);
        // Handle error - e.g., show an error message
      }
    };

    return { goal, saveGoal };
  },
};
</script>

<style scoped>
.create-goal-container {
  background: #f9faff;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid rgb(145, 145, 197);
  border-bottom: 1px solid rgb(145, 145, 197);
  margin: auto;
}

.create-goal-container h2 {
  text-align: center;
  margin-bottom: 20px;
  margin-top: 0px;
  color: #35313f;
  font-size: 24px;
  font-weight: 400;
  text-shadow: 1px 0px 0px var(--primaryteal), -1px 0px 0px var(--primaryviolet);
}

.input-wrapper {
  margin-bottom: 20px;
}

.input-wrapper label {
  display: block;
  margin-bottom: 5px;
  color: #9792a5;
  font-size: 16px;
  font-weight: 600;
  text-shadow: -0.5px 0px 0px var(--primaryteal),
    0.5px 0px 0px var(--primaryviolet);
}

.input-wrapper input,
.input-wrapper textarea {
  font-family: "Montserrat", sans-serif;
  width: 100%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid #d1d5da;
  font-size: 14px;
  color: #586069;
  background-color: transparent;
  outline: none;
}

.input-wrapper input::placeholder,
.input-wrapper textarea::placeholder {
  color: #87858f;
  font-weight: 400;
}

.save-button {
  display: block;
  width: 100%;
  padding: 10px 15px;
  background-color: #545163; /* Adjusted to match the screenshot */
  color: white;
  letter-spacing: 2px;
  text-shadow: -1px 0px 0px var(--primaryteal), 1px 0px 0px var(--primaryviolet);
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  border-left: 2px var(--primaryteal) solid;
  border-right: 2px var(--primaryviolet) solid;
}

.save-button:hover {
  background-color: #807ca3;
  border-left: 4px var(--primaryteal) solid;
  border-right: 4px var(--primaryviolet) solid;
}
</style>
