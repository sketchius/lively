import { createStore } from "vuex";
import dataService from "@/services/dataService";

export default createStore({
  state() {
    return {
      currentEditorGoal: {
        title: "",
        details: "",
        timeFrame: "",
        objectives: [],
        requiresWrite: true,
      },
      currentEditorObjective: {
        title: "",
        details: "",
        timeFrame: "",
        tasks: [],
        requiresWrite: true,
      },
      currentEditorTask: {
        title: "",
        details: "",
        timeFrame: "",
        requiresWrite: true,
      },
      lastAction: "none",
      goals: [],
      currentRightPanelComponent: "CreateGoal",
      editingGoal: null,
      goalListNeedsRefresh: false,
    };
  },
  getters: {
    goals: (state) => state.goals,
  },
  mutations: {
    setGoals(state, goals) {
      state.goals = goals;
    },
    setLastAction(state, lastAction) {
      state.lastAction = lastAction;
    },
    setCurrentRightPanelComponent(state, component) {
      state.currentRightPanelComponent = component;
    },
    setEditingGoal(state, goal) {
      state.editingGoal = goal;
    },
    setGoalListNeedsRefresh(state, value) {
      state.goalListNeedsRefresh = value;
    },
    updateEditorGoal(state, goalData) {
      state.currentEditorGoal = goalData;
    },
    updateEditorObjective(state, objectiveData) {
      state.currentEditorObjective = objectiveData;
    },
    updateEditorTask(state, taskData) {
      state.currentEditorTask = taskData;
    },
    addEditorObjectiveToEditorGoal(state) {
      state.currentEditorGoal.objectives.push({
        phase: 1,
        data: state.currentEditorObjective,
      });
      state.currentEditorObjective = {
        title: "",
        details: "",
        timeFrame: "",
        tasks: [],
        requiresWrite: true,
      };
    },
    addEditorTaskToEditorObjective(state) {
      state.currentEditorObjective.tasks.push({
        phase: 1,
        data: state.currentEditorTask,
      });
      state.currentEditorTask = {
        title: "",
        details: "",
        timeFrame: "",
        requiresWrite: true,
      };
    },
  },
  actions: {
    async fetchGoals({ commit }) {
      const response = await dataService.listGoals();
      commit("setGoals", response.data);
      commit("setGoalListNeedsRefresh", false); // Reset the refresh flag
    },
    async createGoal({ commit }, goalData) {
      await dataService.createGoal(goalData);
      commit("setGoalListNeedsRefresh", true);
    },
    saveGoal({ commit, state }, goalData) {
      const action = state.editingGoal ? "updateGoal" : "createGoal";
      return dataService[action](goalData).then(() => {
        commit("setEditingGoal", null);
        commit("setGoalListNeedsRefresh", true);
      });
    },
    async deleteGoal({ dispatch }, goalId) {
      try {
        await dataService.deleteGoal(goalId);
        dispatch("fetchGoals");
      } catch (error) {
        console.error("Error deleting goal:", error);
      }
    },
    editGoal({ commit }, goal) {
      commit("setEditingGoal", goal);
      commit("setCurrentRightPanelComponent", "EditGoal");
    },
    changeRightPanelComponent({ commit }, component) {
      commit("setCurrentRightPanelComponent", component);
    },
  },
});
