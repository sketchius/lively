import { db } from "./firebaseInit.js";
import admin from "./firebaseInit.js";

// Function to create a new record for a user
async function createRecordForUser(userId, recordId, observation) {
  const userRef = db.collection("users").doc(userId);
  const recordRef = userRef.collection("records").doc(recordId);

  await recordRef.set({
    observations: [observation],
  });

  return recordRef.id;
}

// Function to add an observation to a user's record

async function addObservationToRecord(userId, recordId, observation) {
  const userRef = db.collection("users").doc(userId);
  const recordRef = userRef.collection("records").doc(recordId);

  await recordRef.update({
    observations: admin.firestore.FieldValue.arrayUnion(observation),
  });

  return recordRef.id;
}

// Function to retrieve a specific record for a user
async function getRecordForUser(userId, recordId) {
  const userRef = db.collection("users").doc(userId);
  const recordRef = userRef.collection("records").doc(recordId);
  const recordDoc = await recordRef.get();

  if (!recordDoc.exists) {
    console.log(`No record found with ID: ${recordId}`);
    return null;
  }

  return recordDoc.data();
}

// Function to update an observation in a user's record
async function updateObservationInRecord(
  userId,
  recordId,
  observationIndex,
  updatedObservation
) {
  const userRef = db.collection("users").doc(userId);
  const recordRef = userRef.collection("records").doc(recordId);
  const recordDoc = await recordRef.get();

  if (!recordDoc.exists) {
    console.log(`No record found with ID: ${recordId}`);
    return null;
  }

  const recordData = recordDoc.data();
  recordData.observations[observationIndex] = {
    ...recordData.observations[observationIndex],
    ...updatedObservation,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await recordRef.set(recordData);

  return recordRef.id;
}

async function getAllObservationsInRecord(userId, recordId) {
  const userRef = db.collection("users").doc(userId);
  const recordRef = userRef.collection("records").doc(recordId);
  const recordDoc = await recordRef.get();

  if (!recordDoc.exists) {
    console.log(`No record found with ID: ${recordId}`);
    return null;
  }

  const recordData = recordDoc.data();
  return recordData.observations || [];
}

export {
  createRecordForUser,
  addObservationToRecord,
  getRecordForUser,
  updateObservationInRecord,
  getAllObservationsInRecord,
};
