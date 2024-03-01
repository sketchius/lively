import express from "express";
import { handleMessage } from "./messageHandler.js";

const chatApp = express();
chatApp.use(express.json());

import cors from "cors";
import { getConversation } from "./conversationManager.js";
import classification from './classification.js';
chatApp.use(cors({ origin: true }));

// Endpoint to send a message to the chatbot
chatApp.post("/message", async (req, res) => {
  // const response = await handleMessage(req.body);
  const response = await classification.classifyInput(req.body);
  res.json(response);
});

chatApp.get("/conversation", async (req, res) => {
  const response = await getConversation(true);
  res.json(response);
});

export { chatApp };
