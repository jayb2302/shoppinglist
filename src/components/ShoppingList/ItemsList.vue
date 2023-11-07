<template>
  <ul class="itemCard p-5 divide-y divide-gray-300">
    <li v-for="item in shoppingList" :key="item.id" class="mb-2">
      <div class="flex justify-between items-center p-1 bg-white shadow-md rounded-lg">
        <div class="checkbox-wrapper">
          <input :id="'check-' + item.id" class="check" type="checkbox" :checked="item.checked"
            @click="toggleItemState(item)" />
          <label :for="'check-' + item.id" class="label">
            <svg viewBox="0 0 95 95" height="45" width="45">
              <rect fill="none" stroke="black" height="50" width="50" y="20" x="30"></rect>
              <g transform="translate(0,-952.36222)">
                <path class="path1" fill="none" stroke-width="3" stroke="black"
                  d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"></path>
              </g>
            </svg>
          </label>
        </div>
        <button @click="updateQuantity(item, -1)" class="button px-2  bg-[#BF9775] text-black hover:bg-blue-600">
          <span>- </span></button>

        <div class="flex gap-1 mt-3 mb-3 text text-center" :class="{ 'line-through text-gray-100': item.checked }">
          <p class="itemp text-slate-700 pt-1">
            {{ item.name }}
            <span class="devide-y-2 border-2 border-slate-400 border-b-indigo-500 mr-2"></span>
            ({{ item.quantity }})
          </p>
        </div>
        <button @click="updateQuantity(item, 1)" class="button  px-2  bg-[#A65729] text-black hover:bg-slate-600">
          <span>+</span>
        </button>

        <div class=" flex">
          <button v-if="item.checked" @click="moveItemToPantry(item)"
            class="move-to-pantry p-2 background-gradient  text-white hover:bg-green-800">
            <img src="../../assets/SVG/Pantry.svg" alt="" class="w-10">
          </button>
          <button @click="deleteItem(item.id)" class="delete p-2 bg-gray-400 text-white hover:bg-[#733122]">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="30" viewBox="0 0 32 32">
              <path
                d="M 11 2 L 11 4 L 21 4 L 21 2 L 11 2 z M 4 6 L 4 8 L 28 8 L 28 6 L 4 6 z M 7.9921875 9.875 L 6.0078125 10.125 C 6.0078125 10.125 7 18.074074 7 27 L 7 28 L 25 28 L 25 27 C 25 18.074074 25.992188 10.125 25.992188 10.125 L 24.007812 9.875 C 24.007812 9.875 23.120303 17.398914 23.042969 26 L 8.9570312 26 C 8.8796974 17.398914 7.9921875 9.875 7.9921875 9.875 z M 12.986328 10.835938 L 11.013672 11.164062 C 11.013672 11.164062 12 17.111111 12 23 L 14 23 C 14 16.888889 12.986328 10.835936 12.986328 10.835938 z M 19.013672 10.835938 C 19.013672 10.835938 18 16.888889 18 23 L 20 23 C 20 17.111111 20.986328 11.164064 20.986328 11.164062 L 19.013672 10.835938 z">
              </path>
            </svg>
          </button>


        </div>
      </div>
    </li>
  </ul>
</template>
  
<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import { ShoppingItem } from '../../script/index'; // Import your item type if you have it
import { db } from '../../firebase'; // Import your Firebase configuration
import { doc, deleteDoc, updateDoc, onSnapshot, collection, addDoc } from 'firebase/firestore';

const shoppingList = ref<ShoppingItem[]>([]);

defineProps({
  shoppingListItems: Array, // You can adjust the type as needed
});

const deleteItem = async (itemId: string) => {
  try {
    const itemRef = doc(db, 'items', itemId);
    await deleteDoc(itemRef);
    console.log('Item deleted:', itemId);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

const toggleItemState = async (item: ShoppingItem) => {
  try {
    const newCheckedState = !item.checked; // Reverse the checked state
    const itemRef = doc(db, 'items', item.id);
    await updateDoc(itemRef, { checked: newCheckedState });

    // Update the item's checked state in the shopping list immediately
    item.checked = newCheckedState;
  } catch (error) {
    console.error('Error toggling item state:', error);
  }
};

const updateQuantity = async (item: ShoppingItem, delta: number) => {
  try {
    const newQuantity = item.quantity + delta;

    if (newQuantity >= 0) {
      const itemRef = doc(db, 'items', item.id);
      await updateDoc(itemRef, { quantity: newQuantity });
      console.log('Item quantity updated:', newQuantity);
    }
  } catch (error) {
    console.error('Error updating item quantity:', error);
  }
};

const moveItemToPantry = async (item: ShoppingItem) => {
  try {
    // Create a reference to the pantry collection
    const pantryCollection = collection(db, 'pantry');

    // Create a reference to the shopping list collection
    const shoppingListCollection = collection(db, 'shoppingList');

    // Add the item to the pantry collection with a pantry property set to true
    const pantryItem = {
      name: item.name,
      quantity: item.quantity,
      pantry: true, // Set pantry property to true
    };
    await addDoc(pantryCollection, pantryItem);

    // Delete the item from the shopping list collection
    const shoppingItemRef = doc(shoppingListCollection, item.id);
    await deleteDoc(shoppingItemRef);

    console.log('Item moved to pantry:', item);

    // If you also want to remove the item from the Items collection, you can do it here
    const itemsCollection = collection(db, 'items');
    const itemRef = doc(itemsCollection, item.id);
    await deleteDoc(itemRef);
    console.log('Item removed from the Items collection:', item);
  } catch (error) {
    console.error('Error moving item to pantry:', error);
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
        checked: data.checked || false, // Initialize with the value from Firestore
      });
    });

    shoppingList.value = items;
  });
});
</script>
  
<style lang="scss">
.background-gradient {

  &:hover {
    background: linear-gradient(05deg, #af9ea0, #96a4b9, #586473);
    filter: brightness(1.2);

  }
}
</style>
