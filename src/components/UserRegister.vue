<template>
    <div>
        <h2>User Registration</h2>
        <form @submit.prevent="registerUser">
            <input
                class="block mb-2 text-lg font-medium text-gray-900  bg-slate-100 dark:text-white"
                v-model="email"
                type="email"
                placeholder="Email"
            />
            <input
                class="block mb-2 text-lg font-medium text-gray-900  bg-slate-100 dark:text-white"
                v-model="password"
                type="password"
                placeholder="Password"
            />
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../firebase"; // Import the firebaseApp instance

const auth = getAuth(firebaseApp);

const email = ref("");
const password = ref("");

const registerUser = async () => {
    try {
        // Use Firebase Authentication to register the user
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );

        const user = userCredential.user;
        console.log("User registered:", user);
    } catch (error: any) {
        console.error("Error registering user:", error.message);
    }
};
</script>
   

  