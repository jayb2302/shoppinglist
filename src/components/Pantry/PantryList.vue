<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Pantry List</h2>
    <div class="mb-4">
      <button @click="showAllItems" class="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md mr-4">
        Show All
      </button>
      <button @click="showFridgeItems" class="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md mr-4">
        Show Fridge
      </button>
      <button @click="showCabinetItems" class="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md">
        Show Cabinet
      </button>
    </div>

    <ul class="p-4">
      <li v-for="item in displayedItems" :key="item.id">
        <transition name="fade" mode="out-in">
          <div :key="item.id">
            <div class="mb-4 p-4 bg-white shadow-md rounded-lg">
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="text-xl font-semibold">{{ item.name }}</h3>
                  <div class="flex items-center space-x-2">
                    <input v-model="item.quantity" type="number" class="w-16 rounded-md border p-2">
                    <select v-model="item.unit" class="rounded-md border p-2">
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="pcs">pcs</option>
                      <!-- Add other unit options as needed -->
                    </select>
                  </div>
                </div>
                <div class="space-x-4">
                  <button @click="moveItem(item, 'Fridge')" class="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md">
                    Move to Fridge
                  </button>
                  <button @click="moveItem(item, 'Cabinet')" class="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md">
                    Move to Cabinet
                  </button>
                  <button @click="deleteItemFromPantry(item)">Delete from Pantry</button>

                </div>
              </div>
            </div>
          </div>
        </transition>
      </li>
    </ul>
  </div>
</template>

  
<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import { db } from '../../firebase';
import { onSnapshot, collection, DocumentData, updateDoc, doc, deleteDoc} from 'firebase/firestore';

const pantryItems = ref<DocumentData[]>([]);
const displayedItems = ref<DocumentData[]>([]);
const categoryFilter = ref('');
const emit = defineEmits(['moveToShoppingList']);

const fetchPantryItems = async () => {
  try {
    const pantryCollection = collection(db, 'pantry');
    onSnapshot(pantryCollection, (querySnapshot) => {
      const items: DocumentData[] = [];
      querySnapshot.forEach((pantryDoc) => {
        const data = pantryDoc.data();
        items.push({
          id: pantryDoc.id,
          name: data.name,
          quantity: data.quantity,
          checked: data.checked,
          category: data.category,
          // Add other properties as needed
        });
      });
      pantryItems.value = items;
      displayedItems.value = items;
    });
  } catch (error) {
    console.error('Error fetching pantry items:', error);
  }
};

const moveItem = async (item: DocumentData, category: string) => {
  try {
    const pantryItemRef = doc(db, 'pantry', item.id);
    await updateDoc(pantryItemRef, { category });
    console.log('Pantry item moved to', category);
  } catch (error) {
    console.error('Error moving pantry item:', error);
  }
};

const showAllItems = () => {
  categoryFilter.value = 'All';
  displayedItems.value = pantryItems.value;
};

const showFridgeItems = () => {
  categoryFilter.value = 'Fridge';
  displayedItems.value = pantryItems.value.filter(item => item.category === 'Fridge');
};

const showCabinetItems = () => {
  categoryFilter.value = 'Cabinet';
  displayedItems.value = pantryItems.value.filter(item => item.category === 'Cabinet');
};


const deleteItemFromPantry = async (item: DocumentData) => {
  try {
    const pantryItemRef = doc(db, 'pantry', item.id);
    await deleteDoc(pantryItemRef);
    console.log('Pantry item deleted:', item);
  } catch (error) {
    console.error('Error deleting pantry item:', error);
  }
};

onMounted(() => {
  fetchPantryItems();
});
</script>
