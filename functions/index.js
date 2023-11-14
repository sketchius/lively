import * as functions from "firebase-functions";
import { chatApp } from "./chat/index.js";

import "dotenv/config.js";

export const chat = functions
  .runWith({
    timeoutSeconds: 300,
  })
  .https.onRequest(chatApp);
