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
    return axios.get(`${API_URL}/goals`);
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
  createObjectivePlan(objectiveId, planData) {
    return axios.post(`${API_URL}/objectives/${objectiveId}/plans`, planData);
  },
  getObjectivePlan(objectiveId, planId) {
    return axios.get(`${API_URL}/objectives/${objectiveId}/plans/${planId}`);
  },
  listObjectivePlans(objectiveId) {
    return axios.get(`${API_URL}/objectives/${objectiveId}/plans`);
  },
  updateObjectivePlan(objectiveId, planId, planData) {
    return axios.put(`${API_URL}/objectives/${objectiveId}/plans/${planId}`, planData);
  },
  deleteObjectivePlan(objectiveId, planId) {
    return axios.delete(`${API_URL}/objectives/${objectiveId}/plans/${planId}`);
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
  }
};
