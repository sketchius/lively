import { createUID } from '../utils/index.js';
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
    referenceId: createUID()
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

async function getCurrentConversationId(userId) {
  const userRef = db.collection("users").doc(userId);
  let userDoc = await userRef.get();

  if (!userDoc.exists) {
    console.log(`No user found with UID: ${userId}`);
    return undefined; // Return an empty array if the user doesn't exist
  }

  return userDoc.data().currentConversation;
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

async function getConversationById(userId, conversationId) {
  const userRef = db.collection("users").doc(userId);
  let userDoc = await userRef.get();

  if (!userDoc.exists) {
    console.log(`No user found with UID: ${userId}`);
    return []; // Return an empty array if the user doesn't exist
  }

  const conversationRef = userRef
    .collection("conversations")
    .doc(conversationId);
  let conversationDoc = await conversationRef.get();

  if (!conversationDoc.exists) {
    console.log(
      `No conversation found with ID: ${conversationId} for user ${userId}`
    );
    return []; // Return an empty array if the conversation doesn't exist
  }

  const messagesRef = conversationRef.collection("messages");
  const messagesSnapshot = await messagesRef.orderBy("createdAt").get();

  if (messagesSnapshot.empty) {
    console.log(
      `No messages found in conversation ${conversationId} for user ${userId}`
    );
    return []; // Return an empty array if there are no messages
  }

  let messages = [];
  messagesSnapshot.forEach((doc) => {
    const message = doc.data();
    delete message.createdAt; // Remove the 'createdAt' field from each message object
    messages.push(message);
  });

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

async function setConversationProperty(
  userId,
  conversationId,
  propertyName,
  value
) {
  const userRef = db.collection("users").doc(userId);
  const conversationRef = userRef
    .collection("conversations")
    .doc(conversationId);

  try {
    await conversationRef.update({ [propertyName]: value });
    console.log(
      `Field ${propertyName} updated for conversation ${conversationId} of user ${userId}`
    );
  } catch (error) {
    console.error(
      `Error updating field ${propertyName} for conversation ${conversationId} of user ${userId}:`,
      error
    );
  }
}

async function getConversationProperty(userId, conversationId, propertyName) {
  if (!conversationId) return undefined;

  const userRef = db.collection("users").doc(userId);
  const conversationRef = userRef
    .collection("conversations")
    .doc(conversationId);

  try {
    const doc = await conversationRef.get();
    if (doc.exists) {
      const data = doc.data();
      const propertyValue = data[propertyName];
      console.log(
        `Retrieved property ${propertyName} from conversation ${conversationId} of user ${userId}: ${propertyValue}`
      );
      return propertyValue;
    } else {
      console.log(`No such conversation ${conversationId} for user ${userId}`);
      return null; // or throw an error, depending on your error handling strategy
    }
  } catch (error) {
    console.error(
      `Error retrieving field ${propertyName} for conversation ${conversationId} of user ${userId}:`,
      error
    );
    throw error; // or return null, depending on your error handling strategy
  }
}

export {
  addMessageToCurrentConversation,
  getCurrentConversation,
  getCurrentConversationId,
  getConversationById,
  setConversationProperty,
  getConversationProperty,
};
