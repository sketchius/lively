import express from "express";

const chatApp = express();
chatApp.use(express.json());

import cors from "cors";
import classification from "./classification.js";
import { getOpenAIChatResponse } from "../external_apis/openai.js";
import chatHandler from "./chatHandler.js";
import notes from "./notes.js";
chatApp.use(cors({ origin: true }));

chatApp.post("/chat/message", async (req, res) => {
  const response = await chatHandler.generateChatResponse(req.body);
  response.set('Access-Control-Allow-Origin', '*');
  res.json(response);
});

chatApp.post("/chat/conversation", async (req, res) => {
  const response = await chatHandler.generateConversationResponse(req.body);
  res.json(response);
});

chatApp.post("/chat/identify-notes", async (req, res) => {
  const response = await notes.identifyNotes(req.body.message);
  res.json(response);
});

chatApp.post("/chat/classification", async (req, res) => {
  console.log(req.body);
  const response = await classification.classifyInput(req.body.message);
  res.json(response);
});

chatApp.get("/chat/conversation", async (req, res) => {
  const response = await getConversation(true);
  res.json(response);
});

export { chatApp };
