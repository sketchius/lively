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
      currentOperation: "none",
      lastAction: "none",
      goals: [],
      currentRightPanelComponent: "CreateGoal",
      editingGoal: null,
      goalListNeedsRefresh: false,
      objectiveListNeedsRefresh: false,
      taskListNeedsRefresh: false,
    };
  },
  getters: {
    goals: (state) => state.goals,
  },
  mutations: {
    setGoals(state, goals) {
      state.goals = goals;
    },
    setObjectives(state, objectives) {
      state.objectives = objectives;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setCurrentOperation(state, operation) {
      state.currentOperation = operation;
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
    setObjectiveListNeedsRefresh(state, value) {
      state.objectiveListNeedsRefresh = value;
    },
    setTaskListNeedsRefresh(state, value) {
      state.taskListNeedsRefresh = value;
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
      commit("setGoalListNeedsRefresh", false);
    },
    async fetchObjectives({ commit }) {
      const response = await dataService.listObjectives();
      commit("setObjectives", response.data);
      commit("setObjectiveListNeedsRefresh", false);
    },
    async fetchTasks({ commit }) {
      const response = await dataService.listTasks();
      commit("setTasks", response.data);
      commit("setTaskListNeedsRefresh", false);
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
