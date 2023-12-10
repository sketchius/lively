import { db } from "./firebaseInit.js";


async function deleteCollection(collectionPath) {
  const collectionRef = db.collection(collectionPath);
  const docsSnapshot = await collectionRef.get();

  for (const doc of docsSnapshot.docs) {
    console.log("Deleting Document: " + doc.id);
    await deleteDocument(`${collectionPath}/${doc.id}`);
  }
}

async function deleteDocument(docPath) {
  const docRef = db.doc(docPath);
  const subcollections = await docRef.listCollections();

  for (const subcollection of subcollections) {
    console.log("Deleting Subcollection: " + subcollection.id);
    await deleteCollection(`${docPath}/${subcollection.id}`);
  }

  await docRef.delete();
}



export { deleteCollection };