import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

export const signInAsDemoUser = () => {
  return signInAnonymously(auth);
};

export const register = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user.uid;
};

export const logIn = async (email, password) => {
  console.log("Starting login...");
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  console.log("Finished login...");
  return userCredential.user.uid;
};

export const observeAuthState = (onUserChanged) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const isDemoUser = user.isAnonymous;
      onUserChanged({ user, isDemoUser });
    } else {
      onUserChanged(null);
    }
  });
};
