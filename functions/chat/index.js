import express from "express";
import { handleMessage } from "./messageHandler.js";
// import { getChatHistory } from './chatHistory.js';

const chatApp = express();
chatApp.use(express.json());

// Endpoint to send a message to the chatbot
chatApp.post("/message", async (req, res) => {
  const response = await handleMessage(req.body);
  res.json(response);
});

// Endpoint to retrieve a user's chat history
// app.get('/chat/history', async (req, res) => {
//   const history = await getChatHistory(req.query.userId);
//   res.json(history);
// });

export { chatApp };
