import * as functions from "firebase-functions";
import { chatApp } from "./chat/index.js";

import { dataApp } from "./data/index.js";
import { userApp } from "./user/index.js";
import { assistantApp } from "./assistant/index.js";

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

export const assistant = functions
  .runWith({
    timeoutSeconds: 300,
  })
  .https.onRequest(assistantApp);

export const user = functions
  .runWith({
    timeoutSeconds: 300,
  })
  .https.onRequest(userApp);
