<template>
  <div class="background-gradient pb-5 ">
    <!-- /** Pantry to get overview of item status */ -->
    <h2 class="mb-1 ml-3 absolute right-5 opacity-40">Pantry</h2>
    <aside class="mb-5">
      <div class="ml-5 pt-4  flex  gap-4 text-sm md:text-2xl">
        <button @click="showAllItems" :class="{ 'active-button': isActive('all') }"
          class="button  px-4 py-2 rounded-md mr-4">
          Show All
        </button>
        <button @click="showFridgeItems" :class="{ 'active-button': isActive('fridge') }"
          class="button  px-4 py-2 rounded-md mr-4">
          Show Fridge
        </button>
        <button @click="showCabinetItems" :class="{ 'active-button': isActive('cabinet') }"
          class="button  px-4 py-2 rounded-md mr-4">
          Show Cabinet
        </button>
      </div>
    </aside>
    <div class="flex md:flex-col item-background cursor-default relative  right-0 mx-1 md:mx-16 mb-5 ">
      <ul class="p-4 md:p-4 flex gap-1 md:gap-3 flex-wrap h-[75vh] md:h-[75vh] overflow-y-auto justify-evenly  md:pb-3 ">
        <li class="w-[160px]  md:w-[300px]" v-for="item in displayedItems" :key="item.id">
          <transition name="fade" mode="out-in">
            <div :key="item.id">
              <div class="md:p-4 bg-white h-48 shadow-md rounded-lg pt-2">
              <div class="flex justify-between">
                <img id="itemArrow" class="rotate-90 opacity-20 pl-1 " src="../../assets/SVG/arrow.svg" style="width: 20px;" alt=""> 
                <i>
                 {{ formatDate(item.timestamp )}}
                 </i> 
                <button id="delete" @click="deleteItemFromPantry(item)" class="pantry-button  rounded-md ">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="30" viewBox="0 0 32 32">
                    <path
                      d="M 11 2 L 11 4 L 21 4 L 21 2 L 11 2 z M 4 6 L 4 8 L 28 8 L 28 6 L 4 6 z M 7.9921875 9.875 L 6.0078125 10.125 C 6.0078125 10.125 7 18.074074 7 27 L 7 28 L 25 28 L 25 27 C 25 18.074074 25.992188 10.125 25.992188 10.125 L 24.007812 9.875 C 24.007812 9.875 23.120303 17.398914 23.042969 26 L 8.9570312 26 C 8.8796974 17.398914 7.9921875 9.875 7.9921875 9.875 z M 12.986328 10.835938 L 11.013672 11.164062 C 11.013672 11.164062 12 17.111111 12 23 L 14 23 C 14 16.888889 12.986328 10.835936 12.986328 10.835938 z M 19.013672 10.835938 C 19.013672 10.835938 18 16.888889 18 23 L 20 23 C 20 17.111111 20.986328 11.164064 20.986328 11.164062 L 19.013672 10.835938 z">
                    </path>
                  </svg>
                </button>
              </div>
                <div class="flex flex-col justify-between">
                  <h2 class="text-2xl font-semibold text-center capitalize">{{ item.name }}</h2>
                  <div class="flex items-center gap-2 mx-auto my-2">
                    <input v-model="item.quantity" type="number" class="w-16 rounded-md border itemInput text-center">
                    <select v-model="item.unit" class=" rounded-md border itemInput ">
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="pcs">pcs</option>
                    </select>

                  </div>

                  <div id="pantry" class="pantry flex mx-auto">
                    <button @click="moveItem(item, 'Cabinet')" class="cabinet py-2 md:-mr-2 rounded-md">
                      <img id="img" src="../../assets/SVG/cabinet.svg" style="width: 30px; height: 40px; " alt="">
                    </button>
                    <button @click="moveItem(item, 'Fridge')" class="fridge py-2 -ml-1 rounded-md">
                      <img id="img" src="../../assets/SVG/fridge.svg" style="width: 30px; height: 40px;" alt="">
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </transition>
        </li>
      </ul>

    </div>
  </div>
</template>

  
<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import { db } from '../../firebase';
import { onSnapshot, collection, DocumentData, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { useToast } from 'vue-toastification';

const pantryItems = ref<DocumentData[]>([]);
const displayedItems = ref<DocumentData[]>([]);
const categoryFilter = ref('');
const activeFilter = ref('');
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
          timestamp: data.timestamp,
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


const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const moveItem = async (item: DocumentData, category: string) => {
  try {
    const toast = useToast();
    const pantryItemRef = doc(db, 'pantry', item.id);
    await updateDoc(pantryItemRef, { category });
    toast.success(`${item.name} moved to ${category}`);
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
  activeFilter.value = 'fridge';

};

const showCabinetItems = () => {
  categoryFilter.value = 'Cabinet';
  displayedItems.value = pantryItems.value.filter(item => item.category === 'Cabinet');
  activeFilter.value = 'cabinet';


};

const isActive = (filter: string) => {
  return activeFilter.value === filter;
};

const deleteItemFromPantry = async (item: DocumentData) => {
  try {
    const pantryItemRef = doc(db, 'pantry', item.id);
    await deleteDoc(pantryItemRef);
    console.log('Pantry item deleted:', item);
    const toast = useToast();
    toast.success(`${item.name} removed from your pantry`, {
      timeout: 3000,
      icon: 'basket',
      hideProgressBar: true,
    });
  } catch (error) {
    console.error('Error deleting pantry item:', error);
  }
};

onMounted(() => {
  fetchPantryItems();
});
</script>

<style lang="scss">


#itemArrow {
 filter: drop-shadow(0px 2px 2px rgba(49, 48, 48, 0.585));
}
#pantry {
  .fridge {
    filter: drop-shadow(2px -2px 2px rgba(49, 48, 48, 0.365));
   
   &:hover {
    transform: scale(1.4) translateX(8px);
    transition: all 0.3s ease-in-out;
    filter: drop-shadow(-1px 2px 10px  rgba(95, 214, 95, 0.874));
    
   }
 
  }
  .cabinet {
    filter: drop-shadow(2px -2px 2px rgba(49, 48, 48, 0.365));
    &:hover {
    transform: scale(1.4) translateX(-8px);
    transition: all 0.3s ease-in-out;
    filter: drop-shadow(1px 2px 10px  rgba(95, 214, 95, 0.874));

   }  
  }
 }

#delete {
  filter: drop-shadow(2px -2px 2px rgba(49, 48, 48, 0.365));
  &:hover {
    transform: scale(1.3);
    transition: all 0.3s ease-in-out;
    fill: rgb(222, 43, 43);
  }
}
</style>