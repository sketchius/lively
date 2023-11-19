import { createUID } from "../utils/index.js";
import { db } from "./firebaseInit.js";
import admin from "./firebaseInit.js";

async function createConversationForUser(userId) {
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
    observationId: createUID(),
  });

  // Update the current conversation pointer in the user document
  await userRef.update({ currentConversation: conversationRef.id });

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

async function getCurrentConversation(userId, includeIsContext) {
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
    if (!message.isContext || includeIsContext) {
      delete message.isContext;
      messages.push(message);
    }
  });

  console.log("Test");

  return messages; // Return the list of messages
}

async function setCurrentConversation(userId, id) {
  const userRef = db.collection("users").doc(userId);
  await userRef.update({ currentConversation: id });
}

async function getConversationById(userId, conversationId, includeIsContext) {
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
  console.log(`messagesSnapshot\n${JSON.stringify(messagesSnapshot)}`);
  messagesSnapshot.forEach((doc) => {
    const message = doc.data();
    delete message.createdAt; // Remove the 'createdAt' field from each message object
    if (!message.isContext || includeIsContext) {
      delete message.isContext;
     messages.push(message);

    }
  });


  console.log(`messages\n${JSON.stringify(messages)}`);

  return messages; // Return the list of messages
}

async function addMessageToCurrentConversation(
  userId,
  role,
  content,
  flags,
  datetime
) {
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
    currentConversationId = await createConversationForUser(userId);
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
    isContext: flags?.isContext,
    createdAt: datetime || admin.firestore.FieldValue.serverTimestamp(),
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

async function getAllKeywordsForConversation(userId, conversationId) {
  const userRef = db.collection("users").doc(userId);
  const conversationRef = userRef
    .collection("conversations")
    .doc(conversationId);
  const conversationDoc = await conversationRef.get();

  if (!conversationDoc.exists) {
    console.log(
      `No conversation found for ID ${conversationId} of user ${userId}`
    );
    return [];
  }

  const conversationData = conversationDoc.data();
  return conversationData.keywords || [];
}

async function addKeywordToConversation(userId, conversationId, keyword) {
  const userRef = db.collection("users").doc(userId);
  const conversationRef = userRef
    .collection("conversations")
    .doc(conversationId);

  const conversationDoc = await conversationRef.get();

  if (!conversationDoc.exists) {
    console.log(
      `No conversation found for ID ${conversationId} of user ${userId}`
    );
    return false;
  }

  const conversationData = conversationDoc.data();
  const keywords = conversationData.keywords || [];

  if (keywords.includes(keyword)) {
    console.log(
      `Keyword "${keyword}" already exists for conversation ${conversationId} of user ${userId}`
    );
    return false; // Indicate keyword already exists
  }

  await conversationRef.update({
    keywords: admin.firestore.FieldValue.arrayUnion(keyword),
  });

  console.log(
    `Keyword "${keyword}" added to conversation ${conversationId} of user ${userId}`
  );
  return true; // Indicate successful addition
}

async function isObservationReferenceInConversation(
  userId,
  conversationId,
  observationId
) {
  const userRef = db.collection("users").doc(userId);
  const conversationRef = userRef
    .collection("conversations")
    .doc(conversationId);
  const conversationDoc = await conversationRef.get();

  if (!conversationDoc.exists) {
    console.log(
      `Conversation ${conversationId} for user ${userId} does not exist`
    );
    return false;
  }

  const conversationData = conversationDoc.data();
  return (
    conversationData.readObservations &&
    conversationData.readObservations.includes(observationId)
  );
}

async function addObservationReferenceToConversation(
  userId,
  conversationId,
  observationId
) {
  const userRef = db.collection("users").doc(userId);
  const conversationRef = userRef.collection("conversations").doc(conversationId);

  const conversationSnapshot = await conversationRef.get();
  if (conversationSnapshot.exists && conversationSnapshot.data().readObservations) {
    await conversationRef.update({
      readObservations: admin.firestore.FieldValue.arrayUnion(observationId),
    });
  } else {
    await conversationRef.set({
      readObservations: [observationId],
    }, { merge: true });
  }
}


export {
  createConversationForUser,
  addMessageToCurrentConversation,
  getCurrentConversation,
  getCurrentConversationId,
  getConversationById,
  setConversationProperty,
  getConversationProperty,
  setCurrentConversation,
  getAllKeywordsForConversation,
  addKeywordToConversation,
  isObservationReferenceInConversation,
  addObservationReferenceToConversation,
};
