import * as functions from "firebase-functions";
import { chatApp } from "./chat/index.js";

import "dotenv/config.js";
import { dataApp } from "./data/index.js";

export const chat = functions
  .runWith({
    timeoutSeconds: 300,
  })
  .https.onRequest(chatApp);

export const data = functions
  .runWith({
    timeoutSeconds: 300,
  })
  .https.onRequest(dataApp);
