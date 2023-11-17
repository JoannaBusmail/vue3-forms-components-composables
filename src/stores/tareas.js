import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTareaStore = defineStore('tareas', () => {

  //refs
  const tareas = ref([])
  const tarea = ref({
    id: '',
    nombre: '',
    categorias: [],
    estado: '',
    numero: 0
  })

//actions
const setTareas = (tarea) =>{
  tareas.value.push(tarea)

  console.log(tarea)
}


  return { tareas, tarea, setTareas }
})
