<template>
    <div class="w-screen justify-center flex flex-col align-center">
      <h2 class="text-xl font-semibold mb-4">Add Item to Shopping List</h2>
      <form @submit.prevent="addItem">
        <div class="mb-4">
          <label for="itemName" class="block text-gray-700 font-semibold mb-2">Item Name:</label>
          <input
            v-model="itemName"
            type="text"
            id="itemName"
            class="w-54 px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div class="mb-4">
          <label for="quantity" class="block text-gray-700 font-semibold mb-2">Quantity:</label>
          <input
            v-model="quantity"
            type="number"
            id="quantity"
            class="w-54 px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Item
        </button>
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
          quantity: this.quantity.toString(),
        });
  
        // Reset the form fields
        this.itemName = '';
        this.quantity = 1;
      },
    },
  });
  </script>