import { db } from "./firebaseInit.js";
import admin from "./firebaseInit.js";

async function createObservationForUser(
  userId,
  data,
  referenceId,
  conversationId
) {
  const userRef = db.collection("users").doc(userId);
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
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return observationRef.id;
}

async function getObservationForUser(userId, referenceId) {
  const userRef = db.collection("users").doc(userId);
  const observationRef = userRef.collection("observations").doc(referenceId);
  const observationDoc = await observationRef.get();

  if (!observationDoc.exists) {
    console.log(`No observation found with UID: ${referenceId}`);
    return null;
  }

  return observationDoc.data().content;
}


export { createObservationForUser, getObservationForUser };
