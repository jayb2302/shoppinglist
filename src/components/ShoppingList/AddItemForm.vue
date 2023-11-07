<template>
  <div class="justify-center w-full flex flex-col content-center">
    
    <form class="flex flex-col justify-center  " @submit.prevent="addItem">
      <div class="mb-4">
        <!-- <label for="itemName" class="block text-gray-700 font-semibold mb-2">Item Name:</label> -->
        <input
            v-model="itemName"
            type="text"
            id="itemName"
            class="itemInput  px-3 py-2  rounded-lg"
            required
            placeholder="Enter item name"
        />
      </div>
      <div class="mb-4">
        <!-- <label for="quantity" class="block text-gray-700 font-semibold mb-2">Quantity:</label> -->
        <input
            v-model="quantity"
            type="number"
            id="quantity"
            class="itemInput w-14 px-3 py-2 rounded-lg"
            required
        />
      </div>
      <div class="mb-4  self-center  ">
        <button
          type="submit"
          class="button w-8"
        >
          <span>+</span>
        </button>
      </div>
      
    </form>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      itemName: '',
      quantity: 1,
      checked: false,
    };
  },
  methods: {
    addItem() {
  if (this.itemName.trim() === '') {
    // Prevent adding an empty item
    return;
  }

  // Emit an event to notify the parent component to add the item to the list
  this.$emit('addItem', {
    name: this.itemName,
    quantity: this.quantity,
    checked: false, // Initialize as unchecked
  });

  // Emit an "itemAdded" event with the new item
  const newItem = {
    name: this.itemName,
    quantity: this.quantity,
    checked: false,
  };
  this.$emit('itemAdded', newItem);

  // Reset the form fields
  this.itemName = '';
  this.quantity = 1;
}


},

});
</script>

<style lang="scss">
.button {
  padding: 1px 1px;
  border: unset;
  border-radius: 15px;
  color: #212121;
  z-index: 1;
  background: #e8e8e8;
  position: relative;
  font-size: 20px;
  font-weight: 1000;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  transition: all 250ms;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    border-radius: 15px;
    background-color: #8fe673;
    z-index: -1;
    box-shadow:  31px 31px 74px #4d6b71,
                -31px -31px 74px #2D3540;
    transition: all 300ms
  }

  &:hover {
    color: #e8e8e8;
  }

  &:hover::before {
    width: 100%;
  }
}

.itemInput {
  color: white;
  background: linear-gradient(145deg, #2D3540, #586473);
  box-shadow:  31px 31px 74px #586473,
                -31px -31px 74px #2D3540;
  &::placeholder {
  color: white;
  opacity: 1;
}


}






</style>