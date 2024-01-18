<template>
  <div class="goal-form-container">
    <h2>{{ command == "createGoal" ? "New Goal" : "Edit Goal" }}</h2>
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
      <div class="objective-map">
        <div v-for="objective in goal.objectives" :key="objective.id">
          <span
            :class="{
              selected:
                selectedObjective &&
                selectedObjective.data.title == objective.data.title,
            }"
            @click="selectObjective(objective)"
            >{{ objective.data.title }}</span
          >
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
import { createUID } from '@/util/uuid';

export default {
  name: "GoalEditor",
  setup() {
    const router = useRouter();
    const store = useStore();
    const goal = ref(store.state.currentEditorGoal);

    const command = store.state.commandStack[0];
    const returnValue = store.state.returnValue;
    store.commit("clearReturnValue");

    let selectedObjective = ref(null);

    const updateNewGoal = () => {
      store.commit("updateEditorGoal", goal.value);
      store.commit("markEditorGoalModified");
    };

    const addObjective = () => {
      updateNewGoal();
      store.commit("pushCommand", "createObjective");
      store.commit("resetEditorObjective");
      router.push("/objectives/editor");
    };

    const selectObjective = (objective) => {
      selectedObjective.value = objective;
    };

    const editObjective = () => {
      store.commit("updateEditorObjective", selectedObjective.value.data);
      store.commit("pushCommand", "updateObjective");
      router.push("/objectives/editor");
    };

    const deleteObjective = async () => {
      if (selectedObjective.value.data.new) {
        goal.value.objectives = goal.value.objectives.filter((objective) => {
          return objective.data.title != selectedObjective.value.data.title;
        });
      } else {
        await store.dispatch(
          "deleteObjective",
          selectedObjective.value.data.id
        );
      }
    };

    console.log("Entering GoalEditor...");
    console.log("Return value =");
    console.log(returnValue);

    switch (returnValue.type) {
      case "createObjective":
        goal.value.objectives.push({
          phase: 1,
          data: {id: createUID(), ...store.state.currentEditorObjective},
        });
        store.commit("resetEditorObjective");
        updateNewGoal();
        break;
      case "updateObjective":
        // console.log(goal.value.objectives);
        // goal.value.objectives = goal.value.objectives.map((objective) => {
        //   console.log("Objective in map (old)");
        //   console.log(objective.data);
        //   console.log("Objective in store (new)");
        //   console.log(store.state.currentEditorObjective);
        //   if (objective.data.id == store.state.currentEditorObjective.id) {
        //     objective.data = store.state.currentEditorObjective;
        //   }
        // });
        store.commit("resetEditorObjective");
        updateNewGoal();
        break;
      case null:
        break;
    }

    const save = async () => {
      switch (command) {
        case "createGoal":
          await dataService.createGoal(goal.value);
          break;
        case "updateGoal":
          await dataService.updateGoal(goal.value.id, goal.value);
          break;
      }
      router.back();
    };

    return {
      goal,
      command,
      selectedObjective,
      selectObjective,
      addObjective,
      editObjective,
      deleteObjective,
      save,
    };
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
