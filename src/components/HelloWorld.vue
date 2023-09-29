<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <router-link to="/register">Register</router-link>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
     
    
    </p>
  </div>

  
 
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
