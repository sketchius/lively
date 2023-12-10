import express from "express";
import cors from "cors";

import { goalData, objectiveData, taskData } from "./data.js";
import { getUserId } from "./user.js";

const dataApp = express();
dataApp.use(express.json());
dataApp.use(cors({ origin: true }));


dataApp.post("/goals", async (req, res) => {
    try {
      const userId = getUserId();
      const goalId = await goalData.createGoal(userId, req.body);
      res.json({ goalId });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  dataApp.get("/goals/:goalId", async (req, res) => {
    try {
      const userId = getUserId();
      const goal = await goalData.getGoal(userId, req.params.goalId);
      res.json(goal);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  dataApp.get("/goals", async (req, res) => {
    try {
      const userId = getUserId();
      const goals = await goalData.listGoals(userId);
      res.json(goals);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  dataApp.put("/goals/:goalId", async (req, res) => {
    try {
      const userId = getUserId();
      await goalData.updateGoal(userId, req.params.goalId, req.body);
      res.send("Goal updated successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  dataApp.delete("/goals/:goalId", async (req, res) => {
    try {
      const userId = getUserId();
      await goalData.deleteGoal(userId, req.params.goalId);
      res.send("Goal deleted successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

dataApp.post("/objectives", async (req, res) => {
  try {
    const userId = getUserId();
    const objectiveId = await objectiveData.createObjective(userId, req.body);
    res.json({ objectiveId });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.get("/objectives/:objectiveId", async (req, res) => {
  try {
    const userId = getUserId();
    const objective = await objectiveData.getObjective(userId, req.params.objectiveId);
    res.json(objective);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.get("/objectives", async (req, res) => {
  try {
    const userId = getUserId();
    const objectives = await objectiveData.listObjectives(userId);
    res.json(objectives);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.put("/objectives/:objectiveId", async (req, res) => {
  try {
    const userId = getUserId();
    await objectiveData.updateObjective(userId, req.params.objectiveId, req.body);
    res.send("Objective updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.delete("/objectives/:objectiveId", async (req, res) => {
  try {
    const userId = getUserId();
    await objectiveData.deleteObjective(userId, req.params.objectiveId);
    res.send("Objective deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.post("/objectives/:objectiveId/tasks", async (req, res) => {
  try {
    const userId = getUserId();
    const taskId = await taskData.createTask(userId, req.params.objectiveId, req.body);
    res.json({ taskId });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.get("/objectives/:objectiveId/tasks/:taskId", async (req, res) => {
  try {
    const userId = getUserId();
    const task = await taskData.getTask(userId, req.params.objectiveId, req.params.taskId);
    res.json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.get("/objectives/:objectiveId/tasks", async (req, res) => {
  try {
    const userId = getUserId();
    const tasks = await taskData.listTasks(userId, req.params.objectiveId);
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.put("/objectives/:objectiveId/tasks/:taskId", async (req, res) => {
  try {
    const userId = getUserId();
    await taskData.updateTask(userId, req.params.objectiveId, req.params.taskId, req.body);
    res.send("Task updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.delete("/objectives/:objectiveId/tasks/:taskId", async (req, res) => {
  try {
    const userId = getUserId();
    await taskData.deleteTask(userId, req.params.objectiveId, req.params.taskId);
    res.send("Task deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export { dataApp };
