<template>
    <div>
      <h2>User Registration</h2>
      <form @submit.prevent="registerUser">
      
        <input
          class="block mb-2 text-lg font-medium text-gray-900 bg-slate-100 dark:text-white"
          v-model="email"
          type="email"
          placeholder="Email"
        />
        <input
          class="block mb-2 text-lg font-medium text-gray-900 bg-slate-100 dark:text-white"
          v-model="password"
          type="password"
          placeholder="Password"
        />
        <input
        class="block mb-2 text-lg font-medium text-gray-900 bg-slate-100 dark:text-white"
        v-model="displayName"
        type="text"
        placeholder="Display Name"
        />
        <button type="submit">Register</button>
      </form>
    </div>
</template>
  
<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { firebaseApp, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

const auth = getAuth(firebaseApp);

const email = ref('');
const password = ref('');
const displayName = ref('');
const  emit = defineEmits(); // Define 'emit' using defineEmits



const registerUser = async () => {
    try {
      // Use Firebase Authentication to register the user
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;
      if (userCredential) {
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: displayName.value,
        });
      }
      // After user registration, create a Firestore document to store additional user data
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        email: user.email,
        displayName: displayName.value, // Use the displayName ref
        shoppingLists: [],
        pantryLists: [],
      });

      // Emit the 'switchToLoginForm' event to notify the parent component
      emit('switchToLoginForm');
    } catch (error: any) {
      console.error('Error registering user:', error.message);
    }
  };
</script>
