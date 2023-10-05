<template>
  <div class="shoppingListWrapper w-screen p-4 ">
    <h2 class="text-2xl text-center font-semibold mb-4">Shopping List</h2>

    <!-- Form to add new items -->
    <AddItemForm class="" @addItem="addItemToList" />

    <!-- List of items -->
    <ul class="itemCard p-10 divide-y divide-gray-300">
      <li v-for="item in shoppingList" :key="item.id" class="mb-2">
        <div class="flex justify-between items-center p-2 bg-white shadow-md rounded-lg">
          <div class="checkbox-wrapper ">
            <input
              :id="'check-' + item.id"
              class="check"
              type="checkbox"
              :v-model="getCheckboxModel(item)"
              @click="toggleItemState(item)"
            />
            <label :for="'check-' + item.id" class="label">
              <svg viewBox="0 0 95 95" height="45" width="45">
                <rect fill="none" stroke="black" height="50" width="50" y="20" x="30"></rect>
                <g transform="translate(0,-952.36222)">
                  <path class="path1" fill="none" stroke-width="3" stroke="black" d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"></path>
                </g>
              </svg>
            </label>
          </div>
          <button @click="updateQuantity(item, item.quantity - 1)" class="minus px-1 py-1 bg-[#BF9775] text-black  hover:bg-blue-600">-</button>

          <div class="flex gap-1 mt-3 mb-3 text text-center" :class="{ 'line-through text-gray-100': item.disabled }">
              <p class="itemp text-slate-700 pt-1"> {{ item.name }} <span class="devider border-2 border-slate-400 border-b-indigo-500 mr-2 "> </span> ( {{ item.quantity }} ) </p>
          </div>
          <button @click="updateQuantity(item, item.quantity + 1)" class="plus px-1 py-1 bg-[#A65729] text-black hover:bg-slate-600">
            <span> +</span>
          </button>

          <div class="gap-2 flex">
            <!-- Buttons to increase/decrease quantity -->
            <!-- Button to delete the item -->
            <button @click="deleteItem(item.id)" class="delete p-2 bg-red-700 text-white hover:bg-[#733122]"><span class="x">X</span></button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc} from 'firebase/firestore';
import { db } from '../firebase';
import { ShoppingItem } from './type';
import AddItemForm from './AddItemForm.vue';

const shoppingList = ref<ShoppingItem[]>([]);

const updateQuantity = async (item: ShoppingItem, newQuantity: number) => {
  try {
    const itemRef = doc(db, 'items', item.id);
    await updateDoc(itemRef, { 
      quantity: newQuantity
     });
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
    item.disabled = false;
    console.log('Item added:', item);
  } catch (error) {
    console.error('Error adding item:', error);
  }
};


const toggleItemState = (item: ShoppingItem) => {
  item.disabled = !item.disabled;
};
const getCheckboxModel = (item: ShoppingItem) => computed(() => item.disabled);


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
        disabled: false,
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
  max-width: 600px;
  margin: 0 auto;
  font-family: 'Rajdhani', sans-serif;
  text-transform: uppercase;

  .itemCard {
  max-width: 600px;
    margin: 0 auto;
    border-radius: 24px;
    background: linear-gradient(145deg, #2D3540, #586473);
    box-shadow:  31px 31px 74px #2D3540,
                -31px -31px 74px #586473;
    font-family: 'Rajdhani', sans-serif;
    font-size: 20px;
    text-transform: initial;
  }
}

.plus, .minus, .delete {
  border-radius: 100%;
  width: 35px;
  font-family: 'Rajdhani', sans-serif;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
  color: aliceblue;
 
}

.delete {
  border-radius: 0;
  background: none;
  color: gray;
}


.plus, .minus {
  font-size: 22px;
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

.checkbox-wrapper .check:checked + label svg g path {
  stroke-dashoffset: 0;
  opacity: 1;
}


  
</style>