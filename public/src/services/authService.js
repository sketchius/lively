import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
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
