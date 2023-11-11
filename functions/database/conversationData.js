import { db } from "./firebaseInit.js";
import admin from "./firebaseInit.js";

async function createConversationForUser(userId) {
  const userRef = db.collection("users").doc(userId);
  let userDoc = await userRef.get();

  if (!userDoc.exists) {
    console.log(`No user found with UID: ${userId}, creating user.`);
    await userRef.set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    userDoc = await userRef.get(); // Update userDoc after creating the user
  }

  const conversationRef = userRef.collection("conversations").doc();
  await conversationRef.set({
    startedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Creating a subcollection 'messages' in the conversation document
  const messagesRef = conversationRef.collection("messages");
  await messagesRef.add({ role: "system", content: "" });

  console.log(
    `Conversation created for user ${userId} with ID: ${conversationRef.id}`
  );
}

export { createConversationForUser };
