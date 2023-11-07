<template>
  <div class="bg-gray-100 min-h-screen flex">
    <!-- Sidebar -->
    <aside class=" bg-neutral-500 w-72 min-h-screen p-4">
      <h1 class="">Welcome back</h1><strong>{{ currentUser && currentUser.displayName ? currentUser.displayName : 'Loading...' }}</strong>
      <AddItemForm class="" @addItem="addItemToList" />
    </aside>

    <!-- Main Content -->
    <main class="shoppingListWrapper flex-grow p-6">
      <h2 class="text-2xl font-semibold mb-4 ">Shopping List</h2>


      <!-- ShoppingListTemplate component should go here for displaying selected template and items -->

      <!-- List of items -->
      <ItemList :items="shoppingList" @moveToPantry="moveItemToPantry" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, defineEmits } from 'vue';
import { collection, onSnapshot, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { ShoppingItem as ShoppingItemType } from '../../script/index';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import AddItemForm from './AddItemForm.vue';
import ItemList from './ItemsList.vue';


const emit = defineEmits();
const { moveItemToPantry } = defineProps(['addItem', 'moveItemToPantry']);

const shoppingList = ref<ShoppingItemType[]>([]);

// Define a variable to store the current user
const currentUser = ref(getAuth().currentUser);
const currentUserDisplayName = ref<string>('Loading...');// Separate ref for display name


const addItemToList = async (item: ShoppingItemType) => {
  try {
    const itemsCollection = collection(db, 'items');
    await addDoc(itemsCollection, item);
  } catch (error) {
    console.error('Error adding item:', error);
  }
};

onAuthStateChanged(getAuth(), (user) => {
  currentUser.value = user;
  console.log('User:', user);
  if (user) {
    const usersCollection = collection(db, 'users');
    const userDoc = doc(usersCollection, user.uid);
    getDoc(userDoc).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.data();
        if (userData?.username) {
          currentUserDisplayName.value = userData.username;
        }
      }
    });
  }
});

onMounted(async () => {

  const itemsCollection = collection(db, 'items');

  onSnapshot(itemsCollection, (querySnapshot) => {
    const items: ShoppingItemType[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      items.push({
        id: doc.id,
        name: data.name,
        quantity: data.quantity,
        checked: false,
      });
    });

    // Clear the existing items in the shoppingList array
    shoppingList.value.splice(0);

    // Add the items fetched from Firestore
    shoppingList.value.push(...items);
  });
});
</script>


<style lang="scss">
.shoppingListWrapper {

  margin: 0 auto;
  font-family: 'Rajdhani', sans-serif;
  text-transform: uppercase;

  .itemCard {
    max-width: 600px;
    margin: 0 auto;
    border-radius: 24px;
    background: linear-gradient(145deg, #2D3540, #586473);
    box-shadow: 31px 31px 74px #2D3540,
      -31px -31px 74px #586473;
    font-family: 'Rajdhani', sans-serif;
    font-size: 20px;
    text-transform: initial;
  }
}

.plus,
.minus,
.delete {
  
  width: 35px;
  font-family: 'Rajdhani', sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
  color: aliceblue;

}

.delete {
  border-radius: 0;
  background: none;
  color: gray;
}


.plus,
.minus {
  font-size: 1em;
}

.checkbox-wrapper input[type="checkbox"] {
  visibility: hidden;
  display: none;
}

.checkbox-wrapper *,
.checkbox-wrapper ::after,
.checkbox-wrapper ::before {
  box-sizing: border-box;
}

.checkbox-wrapper {
  position: relative;
  display: block;
  overflow: hidden;
}

.checkbox-wrapper .check {
  width: 50px;
  height: 50px;
  position: absolute;
  opacity: 0;
}

.checkbox-wrapper .label svg {
  vertical-align: middle;
}

.checkbox-wrapper .path1 {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  transition: .5s stroke-dashoffset;
  opacity: 0;
}

.checkbox-wrapper .check:checked+label svg g path {
  stroke-dashoffset: 0;
  opacity: 1;
}
</style>