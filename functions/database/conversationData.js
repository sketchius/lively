import { db } from "./firebaseInit.js";
import admin from "./firebaseInit.js";

async function createConversationForUser(userId, initialMessage) {
  const userRef = db.collection("users").doc(userId);
  let userDoc = await userRef.get();

  if (!userDoc.exists) {
    console.log(`No user found with UID: ${userId}, creating user.`);
    await userRef.set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      currentConversation: null, // Initialize with no active conversation
    });
    userDoc = await userRef.get(); // Update userDoc after creating the user
  }

  const conversationRef = userRef.collection("conversations").doc();
  await conversationRef.set({
    startedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Update the current conversation pointer in the user document
  await userRef.update({ currentConversation: conversationRef.id });

  const messagesRef = conversationRef.collection("messages");
  initialMessage.createdAt = admin.firestore.FieldValue.serverTimestamp();
  await messagesRef.add(initialMessage);

  console.log(
    `Conversation created for user ${userId} with ID: ${conversationRef.id}`
  );

  return conversationRef.id;
}

async function getCurrentConversation(userId) {
  const userRef = db.collection("users").doc(userId);
  let userDoc = await userRef.get();

  if (!userDoc.exists) {
    console.log(`No user found with UID: ${userId}`);
    return []; // Return an empty array if the user doesn't exist
  }

  const currentConversationId = userDoc.data().currentConversation;

  if (!currentConversationId) {
    console.log(`No active conversation found for user ${userId}`);
    return []; // Return an empty array if there's no active conversation
  }

  const messagesRef = userRef
    .collection("conversations")
    .doc(currentConversationId)
    .collection("messages");
  const messagesSnapshot = await messagesRef.orderBy("createdAt").get();

  if (messagesSnapshot.empty) {
    console.log(
      `No messages found in conversation ${currentConversationId} for user ${userId}`
    );
    return []; // Return an empty array if there are no messages
  }

  let messages = [];
  messagesSnapshot.forEach((doc) => {
    const message = doc.data();
    delete message.createdAt; // Remove the 'createdAt' field from each message object
    messages.push(message);
  });

  console.log("Test");

  return messages; // Return the list of messages
}

async function addMessageToCurrentConversation(userId, role, content) {
  const userRef = db.collection("users").doc(userId);
  let userDoc = await userRef.get();

  if (!userDoc.exists) {
    await userRef.set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      currentConversation: null, // Initialize with no active conversation
    });
    userDoc = await userRef.get(); // Update userDoc after creating the user
  }

  let currentConversationId = userDoc.data().currentConversation;

  if (currentConversationId) {
    const conversationRef = userRef
      .collection("conversations")
      .doc(currentConversationId);
    const conversationDoc = await conversationRef.get();

    if (!conversationDoc.exists) {
      console.log(
        `Current conversation ${currentConversationId} does not exist, creating new conversation.`
      );
      currentConversationId = null; // Reset currentConversationId to trigger new conversation creation
    }
  }

  if (!currentConversationId) {
    // Create a new conversation if there's no active conversation or if it doesn't exist
    currentConversationId = await createConversationForUser(userId, {
      content: content,
      role: role,
    });
    await userRef.update({ currentConversation: currentConversationId }); // Update the user's current conversation
    return true;
  }

  // Adding the message to the conversation
  const messagesRef = userRef
    .collection("conversations")
    .doc(currentConversationId)
    .collection("messages");
  await messagesRef.add({
    content: content,
    role: role,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log(
    `Message added to conversation ${currentConversationId} for user ${userId}`
  );
  return true; // Return true to indicate success
}

export { addMessageToCurrentConversation, getCurrentConversation };
