<script setup lang="ts">
import { ref } from 'vue';
import ShoppingList from './components/ShoppingList.vue';
import UserLogIn from './components/UserLogIn.vue';
import UserRegister from './components/UserRegister.vue';

const showLoginForm = ref(false);
const showRegisterForm = ref(false);
</script>

<template>
  <div class="appbody">
    <div class="logIn flex flex-row">
      <!-- Log In -->
      <div @click="showLoginForm = !showLoginForm" class="clickable-text">Sign In</div>
      <div @click="showRegisterForm = !showRegisterForm" class="clickable-text">Register</div>
    </div>
    <div v-show="showLoginForm" class="div">
      <UserLogIn/>
    </div>
    
    
      <div v-show="showRegisterForm" class="div">
        <UserRegister/>
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
