<template>
  <div class="appbody">
    <div class="logIn flex flex-row justify-end">
      <!-- Sign In button is only visible when the user is not logged in -->
      <button v-if="!userIsLoggedIn" @click="showLoginForm = !showLoginForm" class="clickable-text">Sign In</button>
      <!-- Register button is only visible when the user is not logged in -->
      <button v-if="!userIsLoggedIn" @click="showRegisterForm = !showRegisterForm" class="clickable-text">Register</button>
      <!-- Sign Out button is only visible when the user is logged in -->
      <button v-if="userIsLoggedIn" @click="signOut" class="clickable-text">Sign Out</button>
    </div>
    <div v-show="showLoginForm && !userIsLoggedIn" class="div">
      <UserLogIn />
    </div>

    <div v-show="showRegisterForm && !userIsLoggedIn" class="div">
      <UserRegister @userRegistered="handleSwitchToLoginForm" />
    </div>
    <div v-show="userIsLoggedIn">
      <button @click="selectShoppingList" class="clickable-text bg-stone-300 p-2 "><label class="corner m-2" for="button">Shopping List</label></button>
      <button @click="selectPantryList" class="clickable-text  bg-stone-300 p-2"><label class="corner m-2" for="button">Pantry List</label></button>

      <!-- Display the selected list component -->
      <component :is="selectedComponent" :shoppingListItems="shoppingListItems" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, markRaw, onMounted } from 'vue'; // Import onMounted
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged

import ShoppingList from './components/ShoppingList/ShoppingList.vue';
import PantryList from './components/Pantry/PantryList.vue';
import UserLogIn from './components/Auth/UserLogIn.vue';
import UserRegister from './components/Auth/UserRegister.vue';


const auth = getAuth();
const signOut = () => {
  auth.signOut();
};

const showLoginForm = ref(false);
const showRegisterForm = ref(false);
const userIsLoggedIn = ref(false);

const handleSwitchToLoginForm = () => {
  showRegisterForm.value = false;
  showLoginForm.value = true;
};
// Initialize selectedComponent as null
const selectedComponent = ref<null | typeof ShoppingList | typeof PantryList>(null);

const selectShoppingList = () => {
  selectedComponent.value = markRaw(ShoppingList);
};

const selectPantryList = () => {
  selectedComponent.value = markRaw(PantryList);
};

// Initialize shoppingListItems as an empty array
const shoppingListItems = ref([]);

// onMounted function not used in setup but required for lifecycle hooks
onMounted(() => {});


onAuthStateChanged(auth, (user) => {
  userIsLoggedIn.value = !!user;
});
</script>




<style scoped lang="scss">

.clickable-text {
  cursor: pointer;
  border-right: 1px solid #e8e8e8;
  .corner {
    background-color: #cdcaca;
  }
}
</style>
