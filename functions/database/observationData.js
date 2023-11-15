import { db } from "./firebaseInit.js";
import admin from "./firebaseInit.js";

async function createObservationForUser(
  userId,
  data,
  observationId,
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

  const observationRef = userRef.collection("observations").doc(observationId);
  await observationRef.set({
    content: data,
    conversationId: conversationId,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return observationRef.id;
}

async function getObservationForUser(userId, observationId) {
  const userRef = db.collection("users").doc(userId);
  const observationRef = userRef.collection("observations").doc(observationId);
  const observationDoc = await observationRef.get();

  if (!observationDoc.exists) {
    console.log(`No observation found with UID: ${observationId}`);
    return null;
  }

  return observationDoc.data().content;
}

async function updateObservationForUser(userId, observationId, updatedData) {
  const userRef = db.collection("users").doc(userId);
  const observationRef = userRef.collection("observations").doc(observationId);

  await observationRef.update({
    content: updatedData,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return observationRef.id;
}

export {
  createObservationForUser,
  getObservationForUser,
  updateObservationForUser,
};
