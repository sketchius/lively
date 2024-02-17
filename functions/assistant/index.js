import express from "express";
import cors from "cors";
import { assistantController } from "./contoller.js";

const assistantApp = express();
assistantApp.use(express.json());
assistantApp.use(cors({ origin: true }));

function getUserId() {
  return "test";
}

assistantApp.post("/text-to-item/description", async (req, res) => {
  const result = await assistantController.getItemFromDescription(req.body);

  res.json(result);
  // if (result.status == "success") {
  //   res.json(result.data);
  // } else {
  //   if (result.status == "internal-error") {
  //     res.status(500).send(result.error);
  //   } else {
  //     res.status(400).send(result.error);
  //   }
  // }
});

assistantApp.post("/text-to-item/validate", async (req, res) => {
  const result = await assistantController.validateDescription(req.body);

  res.status(200).send(result == 'valid');
});

export { assistantApp };
