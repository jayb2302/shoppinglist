<template>
  <div class="w-screen p-4 rb">
    <h2 class="text-2xl font-semibold mb-4">Shopping List</h2>

    <!-- Form to add new items -->
    <AddItemForm class="" @addItem="addItemToList" />

    <!-- List of items -->
    <ul class="divide-y divide-gray-300">
      <li v-for="item in shoppingList" :key="item.id" class="mb-2">
        <div class="flex justify-between items-center p-2 bg-white shadow-md rounded-lg">
          <div>
          <!-- Display the item name and quantity -->
            {{ item.name }} (Quantity: {{ item.quantity }})
          </div>
          <div>
            <!-- Buttons to increase/decrease quantity -->
            <button @click="updateQuantity(item, item.quantity - 1)" class="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">-</button>
            <button @click="updateQuantity(item, item.quantity + 1)" class="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">+</button>
            <!-- Button to delete the item -->
            <button @click="deleteItem(item.id)" class="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">X</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc} from 'firebase/firestore';
import { db } from '../firebase';
import { ShoppingItem } from './type';
import AddItemForm from './AddItemForm.vue';

const shoppingList = ref<ShoppingItem[]>([]);

const updateQuantity = async (item: ShoppingItem, newQuantity: number) => {
  try {
    const itemRef = doc(db, 'items', item.id);
    await updateDoc(itemRef, { quantity: newQuantity });
    console.log('Item quantity updated:', item);
  } catch (error) {
    console.error('Error updating item quantity:', error);
  }
};

const deleteItem = async (itemId: string) => {
  try {
    const itemRef = doc(db, 'items', itemId);
    await deleteDoc(itemRef);
    console.log('Item deleted:', itemId);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

const addItemToList = async (item: ShoppingItem) => {
  try {
    const itemsCollection = collection(db, 'items');
    const newItemRef = await addDoc(itemsCollection, {
      name: item.name,
      quantity: item.quantity,
    });

    // Retrieve the automatically generated ID
    const newItemId = newItemRef.id;

    // Update the item object with the generated ID
    item.id = newItemId;

    // Add the item to the local list
    // shoppingList.value.push(item);

    console.log('Item added:', item);
  } catch (error) {
    console.error('Error adding item:', error);
  }
};


onMounted(() => {
  const itemsCollection = collection(db, 'items');

  onSnapshot(itemsCollection, (querySnapshot) => {
    const items: ShoppingItem[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      items.push({
        id: doc.id,
        name: data.name,
        quantity: data.quantity,
      });
    });

    // Clear the existing items in the shoppingList array
    shoppingList.value.splice(0);

    // Add the items fetched from Firestore
    shoppingList.value.push(...items);
  });
});

</script>
