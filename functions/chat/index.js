import express from "express";

const chatApp = express();
chatApp.use(express.json());

import cors from "cors";
import classification from "./classification.js";
import chatHandler from "./chatHandler.js";
import notes from "./notes.js";
import goals from "./goals.js";
import tasks from './tasks.js';
chatApp.use(cors({ origin: true }));

chatApp.post("/chat/message", async (req, res) => {
  const response = await chatHandler.generateChatResponse(req.body.message);
  res.json(response);
});

chatApp.post("/chat/conversation", async (req, res) => {
  const response = await chatHandler.generateConversationResponse(req.body.message);
  res.json(response);
});

chatApp.post("/chat/identify-notes", async (req, res) => {
  const response = await notes.identifyNotes(req.body.message);
  res.json(response);
});

chatApp.post("/chat/parse-task", async (req, res) => {
  const response = await tasks.parseTask(req.body.message);
  res.json(response);
});

chatApp.post("/chat/parse-task-modification", async (req, res) => {
  const response = await tasks.parseTaskModification(req.body.message, req.body.taskData);
  res.json(response);
});

chatApp.post("/chat/parse-goal", async (req, res) => {
  const response = await goals.parseGoal(req.body.message);
  res.json(response);
});

chatApp.post("/chat/classification", async (req, res) => {
  console.log(req.body);
  const response = await classification.classifyInput(req.body.message, req.body.operation);
  res.json(response);
});

chatApp.get("/chat/conversation", async (req, res) => {
  const response = await getConversation(true);
  res.json(response);
});

export { chatApp };
