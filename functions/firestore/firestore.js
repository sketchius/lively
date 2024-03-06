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
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  },

  async update(path, data) {
    const ref = this.getPathRef(path);
    if (!ref) throw new Error("Invalid path for update operation");
    await ref.update(data);
  },

  async updateField(path, fieldName, value) {
    const ref = this.getPathRef(path);
    if (!ref) throw new Error("Invalid path for updateField operation");
    await ref.update({ [fieldName]: value });
  },

  async delete(path) {
    const ref = this.getPathRef(path);
    if (!ref) throw new Error("Invalid path for delete operation");
    await ref.delete();
  },

  async removeFromArrayField(path, arrayFieldName, elementToRemove) {
    const ref = this.getPathRef(path);
    if (!ref)
      throw new Error("Invalid path for removeFromArrayField operation");
    const docSnap = await ref.get();
    if (!docSnap.exists) throw new Error("Document not found");

    const currentArray = docSnap.data()[arrayFieldName] || [];
    const updatedArray = currentArray.filter(
      (element) => JSON.stringify(element) !== JSON.stringify(elementToRemove)
    );

    await ref.update({ [arrayFieldName]: updatedArray });
  },

  async removeObjectiveFromGoals(userId, objectiveId) {
    const goalsRef = db.collection(`users/${userId}/goals`);
    const snapshot = await goalsRef
      .where("objectives", "array-contains", { id: objectiveId })
      .get();

    if (!snapshot.empty) {
      snapshot.forEach(async (doc) => {
        await this.removeFromArrayField(
          `users/${userId}/goals/${doc.id}`,
          "objectives",
          { id: objectiveId }
        );
      });
    }
  },

  async removeTaskFromObjectives(userId, taskId) {
    const goalsRef = db.collection(`users/${userId}/objectives`);
    const snapshot = await goalsRef
      .where("tasks", "array-contains", { id: taskId })
      .get();

    if (!snapshot.empty) {
      snapshot.forEach(async (doc) => {
        await this.removeFromArrayField(
          `users/${userId}/objectives/${doc.id}`,
          "tasks",
          { id: taskId }
        );
      });
    }
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
