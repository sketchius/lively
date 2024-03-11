import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export const signInAsDemoUser = () => {
  return signInAnonymously(auth);
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
