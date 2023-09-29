import { ref, Ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';

const auth = getAuth(); // Initialize Firebase Auth

export const user: Ref<UserCredential | null> = ref(null);

export async function login(email: string, password: string): Promise<void> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    user.value = userCredential;
  } catch (error) {
    // Handle login error
    console.error('Login error:', error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth);
    user.value = null;
  } catch (error) {
    // Handle logout error
    console.error('Logout error:', error);
  }
}
