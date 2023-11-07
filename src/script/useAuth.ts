import { ref, Ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, signOut, UserCredential, User as FirebaseAuthUser } from 'firebase/auth';
import { CombinedUser } from '../script/index';

const auth = getAuth(); // Initialize Firebase Auth

export const user: Ref<CombinedUser | null> = ref(null);

export async function login(email: string, password: string): Promise<void> {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser: FirebaseAuthUser = userCredential.user;
    user.value = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      username: '' , // Set the username property to an empty string
      shoppingLists: [], // Set shoppingLists to an empty array initially
      // Add other properties from the CombinedUser interface
    };
  } catch (error) {
    // Handle login error
    console.error('Login error:', error);
    throw error;
  }
}

export async function logOut(): Promise<void> {
  try {
    await signOut(auth);
    user.value = null;
  } catch (error) {
    // Handle logout error
    console.error('Logout error:', error);
  }
}
