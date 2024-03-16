import express from "express";
import cors from "cors";
import { userData } from "./userData.js";

const userApp = express();
userApp.use(express.json());
userApp.use(cors({ origin: true }));

userApp.post("/support/query", async (req, res) => {
  try {
  const result = await userData.create(req.body.uid);
  res.status(201).json(result);
 } catch (error) {
  res.status(500).send(error.message);
 }
});




export { userApp };
