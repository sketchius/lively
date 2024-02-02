import { firestore } from "../firestore/firestore.js";
import { createUID } from "../utils/uid.js";

export const goalData = {
  async createGoal(userId, goalData) {
    const uid = goalData.id ? goalData.id : createUID();
    const path = `users/${userId}/goals/${uid}`;
    await firestore.create(path, goalData);
    return uid;
  },

  async getGoal(userId, goalId) {
    const path = `users/${userId}/goals/${goalId}`;
    const goal = await firestore.read(path);
    if (goal.subGoals) {
      goal.subGoals = await Promise.all(
        goal.subGoals.map((subGoalId) => this.getGoal(userId, subGoalId))
      );
    }
    return goal;
  },

  async listGoals(userId) {
    const path = `users/${userId}/goals`;
    return await firestore.list(path);
  },

  async listTopLevelGoals(userId) {
    const path = `users/${userId}/goals`;
    let goals = await firestore.list(path);
    goals = goals.filter((goal) => goal.parentGoal == null);
    for (const goal of goals) {
      if (goal.subGoals) {
        goal.subGoals = await Promise.all(
          goal.subGoals.map((subGoalId) => this.getGoal(userId, subGoalId))
        );
      }
    }
    return goals;
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
  },

  async updateGoalStatus(userId, goalId, newStatus) {
    const path = `users/${userId}/goals/${goalId}`;
    await firestore.updateField(path, "complete", newStatus);
  },
};
