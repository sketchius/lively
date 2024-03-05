import axios from "axios";

const API_URL = "http://127.0.0.1:5001/lively-ai/us-central1/data"; 

export default {
  // Goals
  createGoal(goalData) {
    return axios.post(`${API_URL}/goals`, goalData);
  },
  getGoal(goalId) {
    return axios.get(`${API_URL}/goals/${goalId}`);
  },
  listGoals() {
    return axios.get(`${API_URL}/goals/top`);
  },
  updateGoal(goalId, goalData) {
    return axios.put(`${API_URL}/goals/${goalId}`, goalData);
  },
  deleteGoal(goalId) {
    return axios.delete(`${API_URL}/goals/${goalId}`);
  },
  createGoalPlan(goalId, planData) {
    return axios.post(`${API_URL}/goals/${goalId}/plans`, planData);
  },
  getGoalPlan(goalId, planId) {
    return axios.get(`${API_URL}/goals/${goalId}/plans/${planId}`);
  },
  listGoalPlans(goalId) {
    return axios.get(`${API_URL}/goals/${goalId}/plans`);
  },
  updateGoalPlan(goalId, planId, planData) {
    return axios.put(`${API_URL}/goals/${goalId}/plans/${planId}`, planData);
  },
  deleteGoalPlan(goalId, planId) {
    return axios.delete(`${API_URL}/goals/${goalId}/plans/${planId}`);
  },

  // Tasks
  createTask(taskData) {
    return axios.post(`${API_URL}/tasks`, taskData);
  },
  getTask(taskId) {
    return axios.get(`${API_URL}/tasks/${taskId}`);
  },
  listTasks() {
    return axios.get(`${API_URL}/tasks`);
  },
  updateTask(taskId, taskData) {
    return axios.put(`${API_URL}/tasks/${taskId}`, taskData);
  },
  deleteTask(taskId) {
    return axios.delete(`${API_URL}/tasks/${taskId}`);
  },

  createNote(noteData) {
    return axios.post(`${API_URL}/notes`, noteData);
  },
  getNote(noteId) {
    return axios.get(`${API_URL}/notes/${noteId}`);
  },
  listNotes() {
    return axios.get(`${API_URL}/notes`);
  },
  updateNote(noteId, noteData) {
    return axios.put(`${API_URL}/notes/${noteId}`, noteData);
  },
  deleteNote(noteId) {
    return axios.delete(`${API_URL}/notes/${noteId}`);
  },
};
