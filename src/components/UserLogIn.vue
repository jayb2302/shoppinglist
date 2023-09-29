<script setup lang="ts">
import { ref} from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'vue-router'
const email = ref("");
const password = ref("")
const errMsg = ref()
const router = useRouter()

const UserLog = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Successfully signed in!")
            router.push('/adminhome')
            console.log("data", data)
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
<template>
    <div  class="w-screen  pb-5  
        content-center justify-center  ">
        <div class="container-login flex 
             mt-6 pt-5 top-20">
            <div class="card-login gap-6  flex flex-col 
               items-center">
                <h1 class="signup pt-5">Log in</h1>
                <div class="inputBox1">
                    <input type="text" v-model="email" required>
                    <span class="user">Email</span>
                </div>

                <div class="inputBox">
                    <input v-model="password" 
                        type="password" 
                        required>
                    <span>Password</span>
                </div>

                <button 
                    @click="UserLog" class="enter">
                    Log in
                </button>

            </div>
        </div>
    </div>
</template>

