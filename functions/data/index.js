import express from "express";
import cors from "cors";

import { goalData, taskData, noteData } from "./data.js";

const dataApp = express();
dataApp.use(express.json());
dataApp.use(cors({ origin: true }));

function getUserId(req) {
  console.log(`req.headers = `, req.headers);
  const uid = req.headers["x-demo-uid"];
  return uid || "test";
}

// Goal routes


dataApp.post("/data/goals", async (req, res) => {
  try {
    console.log(`req.body = `, req.body);
    const userId = getUserId(req);
    const data = req.body;

    const goalId = await goalData.createGoal(userId, data);
    res.json({ goalId });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

dataApp.get("/data/goals/top", async (req, res) => {
  try {
    const userId = getUserId(req);
    const goals = await goalData.listTopLevelGoals(userId);

    res.json(goals);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

dataApp.get("/data/goals/:goalId", async (req, res) => {
  try {
    const userId = getUserId(req);
    const goal = await goalData.getGoal(userId, req.params.goalId);
    res.json(goal);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.get("/data/goals", async (req, res) => {
  try {
    const userId = getUserId(req);
    const goals = await goalData.listGoals(userId);

    for (let i = 0; i < goals.length; i++) {
      const goal = goals[i];

      console.log(goal);

      if (goal.objectives) {
        for (let j = 0; j < goal.objectives.length; j++) {
          const objective = goal.objectives[j];

          objective.data = await objectiveData.getObjective(
            userId,
            objective.id,
          );
          objective.data.new = false;

          if (objective.data.tasks) {
            for (let k = 0; k < objective.data.tasks.length; k++) {
              const task = objective.data.tasks[k];
              console.log("Getting task data for ID " + task.id);

              task.data = await taskData.getTask(userId, task.id);
              task.data.new = false;
              console.log(task.data);
            }
          }
        }
      }
      goal.new = false;
    }

    res.json(goals);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

dataApp.put("/data/goals/:goalId", async (req, res) => {
  try {
    const userId = getUserId(req);
    const data = req.body;

    for (let i = 0; i < data.objectives.length; i++) {
      const objective = data.objectives[i];

      for (let j = 0; j < objective.data.tasks.length; j++) {
        const task = objective.data.tasks[j];
        if (task.data.modified) {
          if (task.data.new) {
            task.data.new = false;
            const taskId = await taskData.createTask(userId, task.data);
            task.id = taskId;
          } else {
            await taskData.updateTask(userId, task.id, task.data);
          }
        }
        delete task.data;
      }

      if (objective.data.modified) {
        if (objective.data.new) {
        } else {
          objective.data.new = false;
          const objectiveId = await objectiveData.createObjective(
            userId,
            objective.data,
          );
          objective.id = objectiveId;
          await objectiveData.updateObjective(
            userId,
            objective.id,
            objective.data,
          );
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

dataApp.delete("/data/goals/:goalId", async (req, res) => {
  try {
    const userId = getUserId(req);
    await goalData.deleteGoal(userId, req.params.goalId);
    res.send("Goal deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.put("/data/goals/:goalId/completion", async (req, res) => {
  try {
    const userId = getUserId(req);
    await goalData.updateGoalStatus(userId, req.params.goalId, req.body);
    res.send("Goal updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.post("/data/notes", async (req, res) => {
  try {
    console.log(`req.body = `, req.body);
    const userId = getUserId(req);
    const data = req.body;

    res.set('Access-Control-Allow-Origin', '*');
    const noteId = await noteData.createNote(userId, data);
    res.json({ noteId });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

dataApp.get("/data/notes/:noteId", async (req, res) => {
  try {
    const userId = getUserId(req);
    const note = await noteData.getNote(userId, req.params.noteId);
    res.json(note);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.get("/data/notes", async (req, res) => {
  try {
    const userId = getUserId(req);
    const notes = await noteData.listNotes(userId);

    res.set('Access-Control-Allow-Origin', '*');
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

dataApp.put("/data/notes/:noteId", async (req, res) => {
  try {
    const userId = getUserId(req);
    const data = req.body;

    await noteData.updateNote(userId, data);
    res.status(200).send("Note updated.");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

dataApp.delete("/data/notes/:noteId", async (req, res) => {
  try {
    const userId = getUserId(req);
    await noteData.deleteNote(userId, req.params.noteId);
    res.send("Note deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.post("/data/tasks", async (req, res) => {
  try {
    const userId = getUserId(req);
    const data = req.body;

    const taskId = await taskData.createTask(userId, data);
    res.json({ taskId });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

dataApp.get("/data/tasks/:taskId", async (req, res) => {
  try {
    const userId = getUserId(req);
    const task = await taskData.getTask(userId, req.params.taskId);
    res.json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dataApp.get("/data/tasks", async (req, res) => {
  try {
    const userId = getUserId(req);
    const tasks = await taskData.listTasks(userId);

    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

dataApp.put("/data/tasks/:taskId", async (req, res) => {
  try {
    const userId = getUserId(req);
    const data = req.body;

    await taskData.updateTask(userId, data);
    res.status(200).send("Task updated.");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

dataApp.delete("/data/tasks/:taskId", async (req, res) => {
  try {
    const userId = getUserId(req);
    await taskData.deleteTask(userId, req.params.taskId);
    res.send("Task deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export { dataApp };
