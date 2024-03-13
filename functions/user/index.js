import express from "express";
import cors from "cors";
import { userData } from "./userData.js";

const userApp = express();
userApp.use(express.json());
userApp.use(cors({ origin: true }));

userApp.post("/user/demo", async (req, res) => {
  try {
  const result = await userData.create(req.body.uid);
  res.status(201).json(result);
 } catch (error) {
  res.status(500).send(error.message);
 }
});

userApp.get("/user/demo", async (req, res) => {
  const result = await userData.get(req.body.uid, 'demo');

  res.json(result);
});

userApp.post("/user/free", async (req, res) => {
  const result = await userData.create(req.body.uid, 'free');

  res.status(201).json(result);
});



export { userApp };
