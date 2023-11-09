<template>
  <div class="appbody">
    <div class="logIn flex flex-row justify-center absolute ">
      <!-- Sign In button is only visible when the user is not logged in -->
      <button id="SignIn" v-if="!showLoginForm && showRegisterForm && !userIsLoggedIn" @click="toggleLoginForm"
        class="clickable-text button py-2 px-4">
        Sign In
      </button>
      <!-- Register button is only visible when the user is not logged in -->
      <button id="Register" v-if="showLoginForm && !showRegisterForm && !userIsLoggedIn" @click="toggleRegisterForm"
        class="clickable-text button py-2 px-4">
        Register
      </button>
    </div>
    <!-- Sign Out button is only visible when the user is logged in -->
    <button v-if="userIsLoggedIn" @click="signOut" class="clickable-text absolute right-5 top-4">
      <div class="tooltip">
        <img src="./assets/SVG/signout.svg" style="width: 30px; fill: #f2f2f2;" alt="">
        <span class="tooltiptext">Sign Out</span>
      </div>
    </button>
    <transition name="fadeIn" mode="out-in">
      <div v-show="showLoginForm && !userIsLoggedIn" class="fadeIn absolute">
        <UserLogIn />
      </div>
    </transition>
    <transition name="fadeIn" mode="out-in">
      <div v-show="showRegisterForm && !userIsLoggedIn" class="fadeIn absolute">
        <UserRegister @userRegistered="handleSwitchToLoginForm" />
      </div>
    </transition>
    <div v-show="userIsLoggedIn" class="">
      <button @click="selectShoppingList" :class="{ 'selected': selectedComponent === ShoppingList }"
        class="clickSection px-1 py-2 mx-2 my-2 rounded-lg">
        <label class="corner p-2 rounded-lg text-2xl" for="button">
          Shopping List
        </label>
      </button>
      <button @click="selectPantryList" :class="{ 'selected': selectedComponent === PantryList }"
        class="clickSection px-1 py-2 rounded-lg ">
        <label class="corner p-2 rounded-lg text-2xl" for="button">
          Pantry List
        </label>
      </button>

      <!-- Display the selected list component -->
      <Transition name="fade" mode="out-in">
        <component :is="selectedComponent" :shoppingListItems="shoppingListItems" />
      </Transition>
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

const showLoginForm = ref(true);
const showRegisterForm = ref(false);
const userIsLoggedIn = ref(false);

const toggleLoginForm = () => {
  showLoginForm.value = true;
  showRegisterForm.value = false;
};

const toggleRegisterForm = () => {
  showRegisterForm.value = true;
  showLoginForm.value = false;
};

const handleSwitchToLoginForm = () => {
  showLoginForm.value = true;
  showRegisterForm.value = false;
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
onMounted(() => { });

onAuthStateChanged(auth, (user) => {
  userIsLoggedIn.value = !!user;
});
</script>




<style scoped lang="scss">

.clickSection {
  background-color: var(--white);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  font-weight: 900;

  &:focus {
    background-color: #3e86b6;
  }

  &:hover {
    background: #3e86b69c;
    transition: background-color 0.3s;

  }

  .corner {
    background: var(--white);
  }
}


.tooltip {
  position: relative;
  display: inline-block;

  .tooltiptext {
    visibility: hidden;
    background-color: var(--tooltip);
    color: var(--white);
    text-align: center;
    width: 120px;
    border-radius: 6px;
    padding: 5px 0;
    right: -5%;
    top: 0;
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s;

  }

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
    right: 10%;
    transition: opacity 0.3s;

  }
}


.logIn {
  right: 50%;
  top: 15%;
  transform: translate(50%, 50%);
  #SignIn, #Register {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.063) 0px 15px 12px;
    font-weight: 900;

  }
}

.fadeIn {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
  transform: translateX(0px);
  transition: transform 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translatey(800px);
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.4s;
}

.fadeIn-enter-from,
.fadeIn-leave-to {
  opacity: 0;
}</style>
