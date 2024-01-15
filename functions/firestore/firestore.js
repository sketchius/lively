import { db } from "./firebaseInit.js";

export const firestore = {
  async create(path, data) {
    const ref = this.getPathRef(path);
    if (!ref) throw new Error("Invalid path for create operation");
    await ref.set(data);
  },

  async read(path) {
    const ref = this.getPathRef(path);
    if (ref.id && ref.path) {
  } else if (ref.doc) {
  } else {
  }
    if (!ref) throw new Error("Invalid path for read operation");
    const docSnap = await ref.get();

    if (!docSnap.exists) throw new Error("Document not found");
    return docSnap.data();
  },

  async list(path) {
    const ref = db.collection(path);
    const querySnapshot = await ref.get();
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async update(path, data) {
    const ref = this.getPathRef(path);
    if (!ref) throw new Error("Invalid path for update operation");
    await ref.update(data);
  },

  async delete(path) {
    const ref = this.getPathRef(path);
    if (!ref) throw new Error("Invalid path for delete operation");
    await ref.delete();
  },

  getPathRef(path) {
    const segments = path.split("/").filter(Boolean);
    if (segments.length % 2 !== 0) throw new Error("Invalid path structure");

    let ref = db;
    segments.forEach((segment, index) => {
      if (index % 2 === 0) {
        ref = ref.collection(segment);
      } else {
        ref = ref.doc(segment);
      }
    });

    return ref;
  },
};
