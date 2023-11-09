<template>
  <div class="justify-center px-2 flex flex-col content-center">
    <form class="flex flex-col  " @submit.prevent="addItem">
    <h3 class="pb-1" >Today is {{ currentDate }}</h3>
    <p class="pb-3">What is missing today?</p>
      <div class="mb-4">
        <!-- <label for="itemName" class="block text-gray-700 font-semibold mb-2">Item Name:</label> -->
        <input
            v-model="itemName"
            type="text"
            id="itemName"
            class="itemInput w-full px-3 py-2  rounded-lg"
            required
            placeholder="Enter item name"
        />
      </div>
      <div class="mb-4 flex  gap-2 justify-between">
        <img src="../../assets/SVG/quantity.svg" style="width: 30px;" alt="">
        <!-- <label for="quantity" class="block text-gray-700 font-semibold mb-2">Quantity:</label> -->
        <input
            v-model="quantity"
            type="number"
            id="quantity"
            class="itemInput w-14 px-3 py-2 rounded-lg"
            required
        />

        <select id="unit" v-model="unit"  class="rounded-lg itemInput border p-2">
          <option value="pcs">pcs</option>
          <option value="kg">kg</option>
          <option value="g">g</option>
          <!-- Add other unit options as needed -->
        </select>
        <select id="store" v-model="store"  class="rounded-lg itemInput border p-2">
          <option value="Netto">Netto</option>
          <option value="Lidl">Lidl</option>
          <option value="Spar">Spar</option>
          <option value="Føtex">Føtex</option>
          <option value="365">365</option>
          <option value="...">....</option>
          <!-- Add other unit options as needed -->
        </select>
      </div>
        <input
         v-model="notes"
         class="itemInput textarea px-3 py-2  rounded-lg h-20" 
         type="textarea"
         placeholder="Add notes ..."
        />
      <div class="mb-4  self-center  ">
        <button
        id="submitItem"
          type="submit"
          class="button add m-2 p-3 rotate-90 "
        >
         <img src="../../assets/SVG/arrow.svg" style="width: 30px;" alt="">
        </button>
        <span class="message absolute capitalize ml-1 invisible left-20 top-1/2 opacity-0 pt-7">Add to list</span>
      </div>
      
    </form>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, ref} from 'vue';
import { useToast } from 'vue-toastification';

export default defineComponent({
  setup() {
    const currentDate = ref<string>(new Date().toDateString());
    
    onMounted(() => {
      // Update the date periodically, e.g., every second
      setInterval(() => {
        currentDate.value = new Date().toDateString();
      }, 1000);
    });

    return {
      currentDate,
    };
  },
  data() {
    return {
      itemName: '',
      quantity: 1,
      checked: false,
      unit: 'pcs',
      notes: '',
      store: 'Netto',
    };
  },

  methods: {
    addItem() {
      if (this.itemName.trim() === '') {
        const toast = useToast();
        // Prevent adding an empty item
        toast.error('Please enter an item name');
        return;
      }

      // Emit an event to notify the parent component to add the item to the list
      this.$emit('addItem', {
        name: this.itemName,
        quantity: this.quantity,
        unit: this.unit,
        checked: false,
        notes: '',
        store: 'Netto',
      });

      // Emit an "itemAdded" event with the new item
      const newItem = {
        name: this.itemName,
        quantity: this.quantity,
        checked: false,
        unit: this.unit,
        notes: '',
        store: 'Netto',
      };
      this.$emit('itemAdded', newItem);

      // Reset the form fields
      this.itemName = '';
      this.quantity = 1;
      this.unit = 'pcs';
      this.notes = '';
      this.store = '...';
  }

},

});
</script>

<style lang="scss">
.button {
  padding: 1px 1px;
  border: unset;
  border-radius: 15px;
  color: var(--text);
  z-index: 1;
  background: var(--lightgray);
  position: relative;
  font-size: 20px;  
  box-shadow: 4px 8px 19px -3px rgba(98, 97, 97, 0.27), inset 0px 0px 0px 1px rgba(161, 160, 160, 0.1);
  transition: all 250ms;
  overflow: hidden;

  &:hover.add{
    transform: rotate(90deg)  translatey(20px) ;
    transition: all ease-in-out 1s;
    box-shadow: 4px 8px 19px -3px rgba(153, 152, 152, 0.27), inset 0px 0px 0px 1px rgba(200, 199, 199, 0.1);

    & + .message {
      visibility: visible;
      transition: all ease-in-out 2s;
      transform:  translateX(90px);
      opacity: 1;
      
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background-color: var(--lightgray);
    z-index: -1;
    box-shadow:  31px 31px 74px #dadbdd,
                -31px -31px 74px #d9dbdc;
    transition: all 300ms;
  }

  &:hover {
    transform: scale(1.1) ; 
  }

  &:hover::before {
    width: 100%;
  }
}

.itemInput {
  color: var(--text);
  background: linear-gradient(0deg, #fdfdfd , #dadbdd 60% , #ffffffc4 100%);
  box-shadow:  31px 31px 74px #e6e8eb,
                -31px -31px 74px #d5d8da, rgba(251, 251, 251, 0.592) 0px 30px 30px -12px inset, rgb(206, 200, 200) 17px 16px 13px -20px inset;
  &::placeholder {
  color: var(--text);
  opacity: 1;
  .textarea {
    resize: none;
    border-radius: 15px;
  }
  }
}

</style>