import {firestore} from "../firestore/firestore.js";
import {createUID} from "../utils/uid.js";


export const userData = {
  async create() {
    const uid = createUID();
    const userData = {
      uid,
      createdAt: new Date(),
    };

    await firestore.create(`users/${uid}`, userData);
    return {uid};
  },

  async get(uid) {
    try {
      const userData = await firestore.read(`users/${uid}`);
      return userData;
    } catch (error) {
      console.error("Failed to get demo account:", error);
      throw error;
    }
  },
};
