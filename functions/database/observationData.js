import { db } from "./firebaseInit.js";
import admin from "./firebaseInit.js";

async function createObservationForUser(userId, data, referenceId, conversationId) {
    let userDoc = await userRef.get();
  
    if (!userDoc.exists) {
      console.log(`No user found with UID: ${userId}, creating user.`);
      await userRef.set({
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        currentConversation: null,
      });
      userDoc = await userRef.get();
    }
  
    const observationRef = userRef.collection("observations").doc(referenceId);
    await observationRef.set({
      content: data,
      conversationId: conversationId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return observationRef.id;
  }

export {createObservationForUser}