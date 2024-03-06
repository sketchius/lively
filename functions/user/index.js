import express from "express";
import cors from "cors";
import { userData } from "./userData.js";

const userApp = express();
userApp.use(express.json());
userApp.use(cors({ origin: true }));

userApp.post("/demo", async (req, res) => {
  const result = await userData.create();

  res.status(201).json(result);
});

userApp.get("/demo", async (req, res) => {
  const result = await userData.get(req.body.uid);

  res.json(result);
});

export { userApp  };
