<template>
  <div class=" flex">
    <!-- Sidebar -->
    <aside class="background-gradient w-72 min-h-screen p-2">
      <h1 class="text-2xl">Welcome back</h1><strong>{{ currentUser && currentUser.displayName ? currentUser.displayName : 'Loading...' }}</strong>
      <AddItemForm class="mt-5" @addItem="addItemToList" />
    </aside>

    <!-- Main Content -->
    <main class="shoppingListWrapper background-gradient flex-grow p-6 mt-1">
      <h2 class="text-2xl font-semibold mb-4 text-center">Shopping List</h2>
      <!-- List of items -->
      <ItemList :items="shoppingList" @moveToPantry="moveItemToPantry" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, defineEmits} from 'vue';
import { collection, onSnapshot, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { ShoppingItem as ShoppingItemType } from '../../script/index';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import AddItemForm from './AddItemForm.vue';
import ItemList from './ItemsList.vue';
import { useToast } from 'vue-toastification';

const emit = defineEmits();
const { moveItemToPantry } = defineProps(['addItem', 'moveItemToPantry']);

const shoppingList = ref<ShoppingItemType[]>([]);

// Define a variable to store the current user
const currentUser = ref(getAuth().currentUser);
const currentUserDisplayName = ref<string>('Loading...');// Separate ref for display name


const addItemToList = async (item: ShoppingItemType) => {
  try {
    const toast = useToast();
    const itemsCollection = collection(db, 'items');
    await addDoc(itemsCollection, item);
    toast.success('Item added');
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
        timestamp: data.timestamp,
        unit: data.unit,
        notes: data.notes,
        store: data.store,
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


.plus,
.minus,
.delete {
  width: 35px;
  text-shadow: 1px 1px 2px rgba(115, 111, 111, 0.6);
  color: var(--text);

}

.delete {
  border-radius: 0;
  background: none;
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