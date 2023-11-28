

<template>
  <NavBar></NavBar>
  <div class="container mt-2">



    <RouterView />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import { onMounted } from 'vue'
import { useTareaStore } from './stores/tareas'



const useTarea = useTareaStore()
const { fetchTareasDataBase } = useTarea



// Fetch tasks from Firestore when the store is created
onMounted(async () =>
{
  await fetchTareasDataBase()
})
</script>