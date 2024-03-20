import { createStore } from "vuex";
import dataService from "@/services/dataService";

const store = createStore({
  state() {
    return {
      goals: [],
      tasks: [],
      notes: [],
      goalListNeedsRefresh: false,
      taskListNeedsRefresh: false,
      noteListNeedsRefresh: false,
      formData: {},
      user: {},
      assistantEvent: null,
      operation: ""
    };
  },
  getters: {
    goals: (state) => state.goals,
    tasks: (state) => state.tasks,
    notes: (state) => state.notes,
  },
  mutations: {
    setGoals(state, goals) {
      state.goals = goals;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setNotes(state, notes) {
      state.notes = notes;
    },

    setGoalListNeedsRefresh(state, value) {
      state.goalListNeedsRefresh = value;
    },
    setTaskListNeedsRefresh(state, value) {
      state.taskListNeedsRefresh = value;
    },
    setNoteListNeedsRefresh(state, value) {
      state.noteListNeedsRefresh = value;
    },

    setOperation(state, operation) {
      state.operation = operation;
    },
    clearOperation(state) {
      state.operation = "";
    },

    setFormData(state, data) {
      state.formData = data;
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
    setUser(state, user) {
      state.user = user;
    },

    setAssistantEventData(state, payload) {
      state.assistantEvent = payload;
    },
    clearAssistantEventData(state) {
      state.assistantEvent = null;
    },
  },
  actions: {
    async fetchGoals({ commit }) {
      //const response = await dataService.listGoals();
      //commit("setGoals", response.data);
      commit("setGoalListNeedsRefresh", false);
    },
    async fetchTasks({ commit }) {
      const response = await dataService.listTasks();
      commit("setTasks", response.data);
      commit("setTaskListNeedsRefresh", false);
    },
    async fetchNotes({ commit }) {
      const response = await dataService.listNotes();
      commit("setNotes", response.data);
      commit("setNoteListNeedsRefresh", false);
    },
    async createGoal({ commit }, goalData) {
      await dataService.createGoal(goalData);
      commit("setGoalListNeedsRefresh", true);
    },
    async createTask({ commit }, taskData) {
      await dataService.createTask(taskData);
      commit("setTaskListNeedsRefresh", true);
    },
    async createNote({ commit }, noteData) {
      await dataService.createNote(noteData);
      commit("setNoteListNeedsRefresh", true);
    },
  },
});

export default store;
