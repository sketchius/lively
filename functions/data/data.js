import { firestore } from "../firestore/firestore.js";
import { createUID } from "../utils/uid.js";

export const goalData = {
  async createGoal(userId, goalData) {
    const uid = goalData.id ? goalData.id : createUID();
    const path = `users/${userId}/goals/${uid}`;
    console.log(goalData);
    await firestore.create(path, goalData);
    return uid;
  },

  async getGoal(userId, goalId) {
    const path = `users/${userId}/goals/${goalId}`;
    return await firestore.read(path);
  },

  async listGoals(userId) {
    const path = `users/${userId}/goals`;
    return await firestore.list(path);
  },

  async updateGoal(userId, goalId, goalData) {
    const path = `users/${userId}/goals/${goalId}`;
    await firestore.update(path, goalData);
  },

  async deleteGoal(userId, goalId) {
    const path = `users/${userId}/goals/${goalId}`;
    await firestore.delete(path);
  },

  async createPlan(userId, goalData) {
    const uid = createUID();
    const path = `users/${userId}/goals/${goalId}/plans/${uid}`;
    await firestore.create(path, goalData);
    return uid;
  },

  async getPlan(userId, goalId, planId) {
    const path = `users/${userId}/goals/${goalId}/plans/${planId}`;
    return await firestore.read(path);
  },

  async listPlans(userId, goalId) {
    const path = `users/${userId}/goals/${goalId}/plans`;
    return await firestore.list(path);
  },

  async updatePlan(userId, goalId, planId, planData) {
    const path = `users/${userId}/goals/${goalId}/plans/${planId}`;
    await firestore.update(path, planData);
  },

  async deletePlan(userId, goalId, planId) {
    const path = `users/${userId}/goals/${goalId}/plans/${planId}`;
    await firestore.delete(path);
  },

  async removeObjectiveFromGoals(userId, objectiveId) {
    await firestore.removeObjectiveFromGoals(userId, objectiveId);
  }
};

export const objectiveData = {
  async createObjective(userId, objectiveData) {
    const uid = objectiveData.id ? objectiveData.id : createUID();
    const path = `users/${userId}/objectives/${uid}`;
    await firestore.create(path, objectiveData);
    return uid;
  },

  async getObjective(userId, objectiveId) {
    const path = `users/${userId}/objectives/${objectiveId}`;
    return await firestore.read(path);
  },

  async listObjectives(userId) {
    const path = `users/${userId}/objectives`;
    return await firestore.list(path);
  },

  async updateObjective(userId, objectiveId, objectiveData) {
    const path = `users/${userId}/objectives/${objectiveId}`;
    await firestore.update(path, objectiveData);
  },

  async deleteObjective(userId, objectiveId) {
    const path = `users/${userId}/objectives/${objectiveId}`;
    await firestore.delete(path);
  },

  async createPlan(userId, objectiveData) {
    const uid = createUID();
    const path = `users/${userId}/objectives/${objectiveId}/plans/${uid}`;
    await firestore.create(path, objectiveData);
    return uid;
  },

  async getPlan(userId, objectiveId, planId) {
    const path = `users/${userId}/objectives/${objectiveId}/plans/${planId}`;
    return await firestore.read(path);
  },

  async listPlans(userId, objectiveId) {
    const path = `users/${userId}/objectives/${objectiveId}/plans`;
    return await firestore.list(path);
  },

  async updatePlan(userId, objectiveId, planId, planData) {
    const path = `users/${userId}/objectives/${objectiveId}/plans/${planId}`;
    await firestore.update(path, planData);
  },

  async deletePlan(userId, objectiveId, planId) {
    const path = `users/${userId}/goals/${goalId}/plans/${planId}`;
    await firestore.delete(path);
  },
  
  async removeTaskFromObjectives(userId, taskId) {
    await firestore.removeTaskFromObjectives(userId, taskId);
  }
};

export const taskData = {
  async createTask(userId, taskData) {
    const uid = taskData.id ? taskData.id : createUID();
    const path = `users/${userId}/tasks/${uid}`;
    await firestore.create(path, taskData);
    return uid;
  },

  async getTask(userId, taskId) {
    const path = `users/${userId}/tasks/${taskId}`;
    return await firestore.read(path);
  },

  async listTasks(userId) {
    const path = `users/${userId}/tasks`;
    return await firestore.list(path);
  },

  async updateTask(userId, taskId, taskData) {
    const path = `users/${userId}/tasks/${taskId}`;
    await firestore.update(path, taskData);
  },

  async updateTaskStatus(userId, taskId, newStatus) {
    const path = `users/${userId}/tasks/${taskId}`;
    await firestore.updateField(path, "complete", newStatus);
  },

  async deleteObjective(userId, taskId) {
    const path = `users/${userId}/tasks/${taskId}`;
    await firestore.delete(path);
  },
};
