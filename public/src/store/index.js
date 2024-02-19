import { createStore } from "vuex";
import dataService from "@/services/dataService";
import { createUID } from "@/util/uuid";

export default createStore({
  state() {
    return {
      currentEditorGoal: {},
      currentEditorObjective: {},
      currentEditorTask: {},
      commandStack: [],
      returnValue: { type: "null", data: null },
      goals: [],
      currentRightPanelComponent: "CreateGoal",
      editingGoal: null,
      goalListNeedsRefresh: false,
      objectiveListNeedsRefresh: false,
      taskListNeedsRefresh: false,
      formData: {},
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

    pushCommand(state, command) {
      state.commandStack.push(command);
    },
    popCommand(state) {
      state.commandStack.pop();
    },

    setReturnValue(state, value) {
      state.returnValue = value;
    },
    clearReturnValue(state) {
      state.returnValue = { type: "null", data: null };
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

    resetEditorGoal(state) {
      state.currentEditorGoal = {
        id: createUID(),
        title: "",
        details: "",
        timeFrame: "",
        objectives: [],
        modified: false,
        new: true,
        saved: false,
      };
    },
    resetEditorObjective(state) {
      state.currentEditorObjective = {
        id: createUID(),
        title: "",
        details: "",
        timeFrame: "",
        tasks: [],
        modified: false,
        new: true,
        saved: false,
      };
    },
    resetEditorTask(state) {
      state.currentEditorTask = {
        id: createUID(),
        title: "",
        details: "",
        timeFrame: "",
        modified: false,
        new: true,
        saved: false,
      };
    },

    markEditorGoalModified(state) {
      if (state.currentEditorGoal) state.currentEditorGoal.modified = true;
    },
    markEditorObjectiveModified(state) {
      if (state.currentEditorObjective)
        state.currentEditorObjective.modified = true;
    },
    markEditorTaskModified(state) {
      if (state.currentEditorTask) state.currentEditorTask.modified = true;
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

    setFormDataField(state, data) {
      state.formData[data.field] = data.payload;
      if (data.field != "type") {
        state.formData.modified = true;
      }
    },
    resetFormData(state) {
      state.formData = {};
    },
  },
  actions: {
    async fetchTopLevelGoals({ commit }) {
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
        dispatch("fetchTopLevelGoals");
      } catch (error) {
        console.error("Error deleting goal:", error);
      }
    },
    editGoal({ commit }, goal) {
      commit("setEditingGoal", goal);
      commit("setCurrentRightPanelComponent", "EditGoal");
    },

    async deleteObjective({ dispatch }, objectiveId) {
      try {
        await dataService.deleteObjective(objectiveId);
        dispatch("fetchObjectives");
      } catch (error) {
        console.error("Error deleting objective:", error);
      }
    },
    async deleteTask({ dispatch }, taskId) {
      try {
        await dataService.deleteTask(taskId);
        dispatch("fetchTask");
      } catch (error) {
        console.error("Error deleting objective:", error);
      }
    },

    changeRightPanelComponent({ commit }, component) {
      commit("setCurrentRightPanelComponent", component);
    },
  },
});
