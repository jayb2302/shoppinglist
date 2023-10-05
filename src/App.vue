<script setup lang="ts">
import ShoppingList from './components/ShoppingList.vue';
import UserLogIn from './components/UserLogIn.vue';
import UserRegister from './components/UserRegister.vue';

let showLoginForm = false;
let showRegisterForm = false;

</script>

<template>
  <div class="appbody">
    <div class="logIn flex flex-row">
      <!-- Log In -->
      <div @click="showLoginForm = !showLoginForm" class="clickable-text">Log In</div>
      <!-- Register -->
      <div @click="showRegisterForm = !showRegisterForm" class="clickable-text">Register</div>
      
      <!-- Login Form -->
      <UserLogIn class="w-1/2 flex justify-center content-center" v-if="showLoginForm" />
      
      <!-- Register Form -->
      <UserRegister class="w-1/2 flex justify-center content-center" v-if="showRegisterForm" />
      
      
    </div>
   
    <ShoppingList />
  </div>
</template>

<style scoped>

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.clickable-text {
  cursor: pointer;
  margin-right: 20px;
}
</style>
