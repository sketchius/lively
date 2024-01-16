import express from "express";
import cors from "cors";

import { goalData, objectiveData, taskData } from "./data.js";

const dataApp = express();
dataApp.use(express.json());
dataApp.use(cors({ origin: true }));

function getUserId() {
  return "test";
}

// Goal routes
dataApp.post("/goals", async (req, res) => {
  try {
    const userId = getUserId();
    const data = req.body;

    for (let i = 0; i < data.objectives.length; i++) {
      const objective = data.objectives[i];

      for (let j = 0; j < objective.data.tasks.length; j++) {
        const task = objective.data.tasks[j];
        task.id = await taskData.createTask(userId, task.data);
        delete task.data;
        delete task.modified;
      }

      objective.id = await objectiveData.createObjective(
        userId,
        objective.data
      );
      delete objective.data;
      delete objective.modified;
    }

    const goalId = await goalData.createGoal(userId, data);
    res.json({ goalId });
  } catch (error) {
    console.log(error);
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

    for (let i = 0; i < goals.length; i++) {
      const goal = goals[i];

      console.log(goal);

      if (goal.objectives) {
        for (let j = 0; j < goal.objectives.length; j++) {
          const objective = goal.objectives[j];

          objective.data = await objectiveData.getObjective(
            userId,
            objective.id
          );

          if (objective.data.tasks) {
            for (let k = 0; k < objective.data.tasks.length; k++) {
              const task = objective.data.tasks[k];
              console.log("Getting task data for ID " + task.id);

              task.data = await taskData.getTask(userId, task.id);
              console.log(task.data);
            }
          }
        }
      }
    }

    res.json(goals);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

dataApp.put("/goals/:goalId", async (req, res) => {
  try {
    const userId = getUserId();
    const data = req.body;

    for (let i = 0; i < data.objectives.length; i++) {
      const objective = data.objectives[i];

      for (let j = 0; j < objective.data.tasks.length; j++) {
        const task = objective.data.tasks[j];
        if (task.data.modified) {
          if (task.id) {
            await taskData.updateTask(userId, task.id, task.data);
          } else {
            const taskId = await taskData.createTask(userId, task.data);
            task.id = taskId;
          }
        }
        delete task.data;
      }

      if (objective.data.modified) {
        if (objective.id) {
          await objectiveData.updateObjective(
            userId,
            objective.id,
            objective.data
          );
        } else {
          const objectiveId = await objectiveData.createObjective(
            userId,
            objective.data
          );
          objective.id = objectiveId;
        }
      }
      delete objective.data;
    }

    await goalData.updateGoal(userId, req.params.goalId, data);
    res.status(200).send("Goal updated.");
  } catch (error) {
    console.log(error);
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

// Objective routes
dataApp.post("/objectives", async (req, res) => {
  try {
    const userId = getUserId();
    const data = req.body;

    for (let j = 0; j < data.tasks.length; j++) {
      const task = data.tasks[j];
      task.id = await taskData.createTask(userId, task.data);
      delete task.data;
    }

    const objectiveId = await objectiveData.createObjective(userId, data);
    res.json({ objectiveId });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.get("/objectives/:objectiveId", async (req, res) => {
  try {
    const userId = getUserId();
    const objective = await objectiveData.getObjective(
      userId,
      req.params.objectiveId
    );
    res.json(objective);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.get("/objectives", async (req, res) => {
  try {
    const userId = getUserId();
    const objectives = await objectiveData.listObjectives(userId);

    for (let i = 0; i < objectives.length; i++) {
      const objective = objectives[i];

      if (objective.tasks) {
        for (let j = 0; j < objective.tasks.length; j++) {
          const task = objective.tasks[j];

          task.data = await taskData.getTask(userId, task.id);
        }
      }
    }

    res.json(objectives);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

dataApp.put("/objectives/:objectiveId", async (req, res) => {
  try {
    const userId = getUserId();
    const data = req.body;

    for (let i = 0; i < data.tasks.length; i++) {
      const task = data.tasks[i];
      if (task.data.modified) {
        if (task.id) {
          await taskData.updateTask(userId, task.id, task.data);
        } else {
          const taskId = await taskData.createTask(userId, task.data);
          task.id = taskId;
        }
      }
      delete task.data;
    }

    await objectiveData.updateObjective(userId, req.params.objectiveId, data);
    res.status(200).send("Objective updated.");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

dataApp.delete("/objectives/:objectiveId", async (req, res) => {
  try {
    const userId = getUserId();
    await objectiveData.deleteObjective(userId, req.params.objectiveId);
    await goalData.removeObjectiveFromGoals(userId, req.params.objectiveId);
    res.send("Objective deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

// Task routes
dataApp.post("/tasks", async (req, res) => {
  try {
    const userId = getUserId();
    const taskId = await taskData.createTask(userId, req.body);
    res.json({ taskId });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.get("/tasks/:taskId", async (req, res) => {
  try {
    const userId = getUserId();
    const task = await taskData.getTask(userId, req.params.taskId);
    res.json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.get("/tasks", async (req, res) => {
  try {
    const userId = getUserId();
    const tasks = await taskData.listTasks(userId);
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.put("/tasks/:taskId", async (req, res) => {
  try {
    const userId = getUserId();
    await taskData.updateTask(userId, req.params.taskId, req.body);
    res.send("Task updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.delete("/tasks/:taskId", async (req, res) => {
  try {
    const userId = getUserId();
    await taskData.deleteTask(userId, req.params.taskId);
    res.send("Task deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export { dataApp };
