<template>
    <div class="flex  pb-5 justify-center">
      <div class="container-login flex flex-col item-background mt-6 pt-5 top-20  p-5">
             <div class="card-login background-gradient p-4 gap-6 flex flex-col items-center">
                <h2 class="pt-5">Sign Up Now!</h2>
                <form @submit.prevent="registerUser">
                  <div class="flex flex-col gap-5">
                  <input
                    class="px-3 py-2  rounded-lg flex  "
                    v-model="email"
                    type="email"
                    placeholder="Email"
                  />
                  <input
                    class="px-3 py-2  rounded-lg flex "
                    v-model="password"
                    type="password"
                    placeholder="Password"
                  />
                  <input
                  class="px-3 py-2  rounded-lg flex "
                  v-model="displayName"
                  type="text"
                  placeholder="Display Name"
                  />
                  <div class="flex justify-center">
                  <button class="button enter px-4" type="submit">Sign Up</button>
                  </div>
                  </div>
                  
                </form>
             </div>
      </div>
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
