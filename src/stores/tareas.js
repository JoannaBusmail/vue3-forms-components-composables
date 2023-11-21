import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '../router'

export const useTareaStore = defineStore('tareas', () => {

  //refs
  const tareasList = ref([])
  const tarea = ref({
    id: '',
    nombre: '',
    categorias: [],
    estado: '',
    numero: 0
  })

  const tareasListUpdated = ref(false);
 if(localStorage.getItem('tareas')){
  tareasList.value = JSON.parse(localStorage.getItem('tareas'))
 }
//actions
const addTareas = (tarea) =>{
  tareasList.value.push(tarea)
  localStorage.setItem('tareas', JSON.stringify(tareasList.value))

  console.log(tareasList.value)

}

const removeTarea = (id) =>{
  tareasList.value = tareasList.value.filter(tarea => tarea.id !== id)
  localStorage.setItem('tareas', JSON.stringify(tareasList.value))
}

const getTarea = (id) =>{
  tarea.value = tareasList.value.find(tarea => tarea.id === id)
  console.log(tarea.value)
}

const updateTarea = (tarea) =>{
  tareasList.value = tareasList.value.map(t => t.id === tarea.id ? tarea : t)
  localStorage.setItem('tareas', JSON.stringify(tareasList.value))
  tareasListUpdated.value = !tareasListUpdated.value;
  router.push('/')
}

  return { tareasList, tarea, addTareas, removeTarea, getTarea, updateTarea, tareasListUpdated}
})
