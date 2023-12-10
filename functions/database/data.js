import { firestore } from "./firestore.js";

export const goalData = {
  async createGoal(userId, goalData) {
    const path = `users/${userId}/goals`;
    const newGoalRef = firestore.getPathRef(path).doc();
    await newGoalRef.set(goalData);
    return newGoalRef.id;
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
  }
};

export const objectiveData = {
  async createObjective(userId, objectiveData) {
    const path = `users/${userId}/objectives`;
    const newObjectiveRef = firestore.getPathRef(path).doc();
    await newObjectiveRef.set(objectiveData);
    return newObjectiveRef.id;
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
};


export const taskData = {
  async createTask(userId, objectiveId, taskData) {
    const path = `users/${userId}/objectives/${objectiveId}/tasks`;
    const newTaskRef = firestore.getPathRef(path).doc();
    await newTaskRef.set(taskData);
    return newTaskRef.id;
  },

  async getTask(userId, objectiveId, taskId) {
    const path = `users/${userId}/objectives/${objectiveId}/tasks/${taskId}`;
    return await firestore.read(path);
  },

  async listTasks(userId, objectiveId) {
    const path = `users/${userId}/objectives/${objectiveId}/tasks`;
    return await firestore.list(path);
  },

  async updateTask(userId, objectiveId, taskId, taskData) {
    const path = `users/${userId}/objectives/${objectiveId}/tasks/${taskId}`;
    await firestore.update(path, taskData);
  },

  async deleteTask(userId, objectiveId, taskId) {
    const path = `users/${userId}/objectives/${objectiveId}/tasks/${taskId}`;
    await firestore.delete(path);
  }
};
