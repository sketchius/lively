import express from "express";
import cors from "cors";
import { assistantController } from "./contoller.js";
import { getOpenAIChatResponseFunctionTest } from "../external_apis/openai.js";

const assistantApp = express();
assistantApp.use(express.json());
assistantApp.use(cors({ origin: true }));

assistantApp.post("/chat/text-to-item/description", async (req, res) => {
  const result = await assistantController.getItemFromDescription(
    req.body.data,
    req.body.type,
  );

  res.json(result);
});

assistantApp.post("/chat/text-to-item/steps", async (req, res) => {
  const result = await assistantController.getGoalStepsFromDescription(
    req.body.data,
  );

  res.json(result);
});

assistantApp.post("/chat/general", async (req, res) => {
  const messages = [{ role: "user", content: req.body }];

  const result = await getOpenAIChatResponseFunctionTest(messages, 'text');

  res.status(200).send(result);
});

export { assistantApp };
