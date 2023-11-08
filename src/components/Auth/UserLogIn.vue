
<template>
    <div class="background-gradient flex py-3 content-center justify-center px-3  ">
        <div class="container-login flex item-background
               top-20  p-2">
            <div class="card-login background-gradient cursor-default p-4 gap-6  flex flex-col 
               items-center">
                <h2 class="signup pt-5">Log in</h2>
                <div class="inputBox1 flex flex-col">
                    <input
                    class=" px-3 py-2  rounded-lg"
                    type="text"
                    v-model="email"
                    placeholder="Email"
                    required>                
                </div>

                <div class="inputBox flex flex-col">
                    <input
                    class=" px-3 py-2  rounded-lg"
                    v-model="password" 
                    placeholder="Password"
                    type="password" 
                    required>
                </div>

                <button
                    :class="{'disabled': !email || !password}" 
                    @click="UserLog" class="enter button px-4">
                    Log in
                </button>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref} from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
const email = ref("");
const password = ref("")
const errMsg = ref()


const UserLog = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((_data) => {
            console.log("Successfully signed in!")

        })
        .catch((error) => {
            console.log(error.code)
            switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value = "Invalid email";
                    break;
                case "auth/user-not-found":
                    errMsg.value = "No account with that email was found";
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Incorrect password";
                    break;
                default:
                    errMsg.value = "Email or password was incorrect"
            }
        })
}

</script>

