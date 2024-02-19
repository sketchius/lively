import express from "express";
import cors from "cors";
import { assistantController } from "./contoller.js";

const assistantApp = express();
assistantApp.use(express.json());
assistantApp.use(cors({ origin: true }));

assistantApp.post("/text-to-item/description", async (req, res) => {
  const result = await assistantController.getItemFromDescription(req.body.data, req.body.type);

  res.json(result);
});

assistantApp.post("/text-to-item/steps", async (req, res) => {
  const result = await assistantController.getGoalStepsFromDescription(req.body.data);

  res.json(result);
});

export { assistantApp };
