import { ref, Ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, signOut, UserCredential, User as FirebaseAuthUser } from 'firebase/auth';
import { CombinedUser } from '../script/index';

const auth = getAuth(); // Initialize Firebase Auth

export const user: Ref<CombinedUser | null> = ref(null);

// Firebase error codes mapped to human readable strings
const errorCodeMap: Record<string, string> = {
  "auth/invalid-email": "Invalid email",
  "auth/user-not-found": "No account with that email was found",
  "auth/wrong-password": "Incorrect password",
};
export const logUserIn = async (email: string, password: string): Promise<boolean | string> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser: FirebaseAuthUser = userCredential.user;
    user.value = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      username: '',
      shoppingLists: [],
    };
    return true;
  } catch (error: any) {
    console.error('Firebase Authentication Error:', error);
    const errorMessage = errorCodeMap[error.code] || 'Unknown error';
    console.error('Mapped Error Message:', errorMessage);
    return errorMessage;
  }
};


export async function logOut(): Promise<void> {
  try {
    await signOut(auth);
    user.value = null;
  } catch (error) {
    // Handle logout error
    console.error('Logout error:', error);
  }
}



