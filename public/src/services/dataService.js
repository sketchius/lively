import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your actual API URL

export default {
  // Goals
  createGoal(goalData) {
    return axios.post(`${API_URL}/goals`, goalData);
  },
  getGoal(goalId) {
    return axios.get(`${API_URL}/goals/${goalId}`);
  },
  listGoals() {
    return axios.get(`${API_URL}/goals`);
  },
  updateGoal(goalId, goalData) {
    return axios.put(`${API_URL}/goals/${goalId}`, goalData);
  },
  deleteGoal(goalId) {
    return axios.delete(`${API_URL}/goals/${goalId}`);
  },

  // Objectives
  createObjective(objectiveData) {
    return axios.post(`${API_URL}/objectives`, objectiveData);
  },
  getObjective(objectiveId) {
    return axios.get(`${API_URL}/objectives/${objectiveId}`);
  },
  listObjectives() {
    return axios.get(`${API_URL}/objectives`);
  },
  updateObjective(objectiveId, objectiveData) {
    return axios.put(`${API_URL}/objectives/${objectiveId}`, objectiveData);
  },
  deleteObjective(objectiveId) {
    return axios.delete(`${API_URL}/objectives/${objectiveId}`);
  },

  // Tasks
  createTask(objectiveId, taskData) {
    return axios.post(`${API_URL}/objectives/${objectiveId}/tasks`, taskData);
  },
  getTask(objectiveId, taskId) {
    return axios.get(`${API_URL}/objectives/${objectiveId}/tasks/${taskId}`);
  },
  listTasks(objectiveId) {
    return axios.get(`${API_URL}/objectives/${objectiveId}/tasks`);
  },
  updateTask(objectiveId, taskId, taskData) {
    return axios.put(`${API_URL}/objectives/${objectiveId}/tasks/${taskId}`, taskData);
  },
  deleteTask(objectiveId, taskId) {
    return axios.delete(`${API_URL}/objectives/${objectiveId}/tasks/${taskId}`);
  }
};
