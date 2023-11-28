import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import router from '../router'
import axios from 'axios'

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
 /*if(localStorage.getItem('tareas')){
  tareasList.value = JSON.parse(localStorage.getItem('tareas'))
 }*/


  // ACTIONS

  // we need GET METHOD to fetch data from the database
  // save the response in data
  // if data is not null, update the local tasksList with the fetched data
  // Object.values() method is used to extract the values of an object and return them as an array.
  // const myObject = { a: 1, b: 2, c: 3 };
  //                const valuesArray = Object.values(myObject);
  //                     Output: [1, 2, 3]
  // use in App.vue
  const fetchTareasDataBase = async () => {
    try {
      // Fetch tasks from Firestore
      const response = await axios.get('https://tareas-1-6a805-default-rtdb.europe-west1.firebasedatabase.app/tareas.json');

      // Update the local tasksList with the fetched data
      const data = response.data;
      console.log(data)
      tareasList.value = data ? Object.values(data) : [];
    } catch (error) {
      console.error('Error fetching tasks from data base:', error);
    }
  };

 
//actions
/*const addTareas = (tarea) =>{
  tareasList.value.push(tarea)
  localStorage.setItem('tareas', JSON.stringify(tareasList.value))

  console.log(tareasList.value)

}*/

const addTareas = async (tarea) => {
  try {
    // Agrega la tarea a la lista local
    tareasList.value.push(tarea);

    // Actualiza la lista local en el local storage
    localStorage.setItem('tareas', JSON.stringify(tareasList.value));

    // Envia la tarea a la base de datos de Firebase en tiempo real
    //https://tareas-1-6a805-default-rtdb.europe-west1.firebasedatabase.app me lo da realtiem database de firebase
    // /tareas.json es el nombre de la colección--> se puede poner cualquier nombre
    //axios no necesita body para pasarle los datos transformados en json, ya lo hace el solo
    // recibe objeto con las configuraciones de axios en este caso solo el header
    //el metodo put se usa directamente axios.put
    // Si usaramos POST Nos generaria un id aleatorio
    //pero ya tenemos id en la tarea, por eso usamos PUT--> agregando ${tarea.id} en la url pasamos el id po cada tarea y asi no se sobreescriben

    const response= await axios.put(`https://tareas-1-6a805-default-rtdb.europe-west1.firebasedatabase.app/tareas/${tarea.id}.json`, tarea, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

  const dataDb = await response.data;
  console.log(dataDb);
  } catch (error) {
    console.error('Error al añadir la tarea:', error);
  }
};

//usando fetch
/* 
const addTareas = async (tarea) => {
  try {
    // Agrega la tarea a la lista local
    tareasList.value.push(tarea);

    // Actualiza la lista local en el local storage
    localStorage.setItem('tareas', JSON.stringify(tareasList.value));

  //con fetch en el objeto que le pasamos a fetch le pasamos:
  // method, headers y  el body con los datos transformados en json
    const response= await fetch(`https://tareas-1-6a805-default-rtdb.europe-west1.firebasedatabase.app/tareas/${tarea.id}.json`, tarea, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tarea)
    });

  const dataDb = await response.json();
  console.log(dataDb);
  } catch (error) {
    console.error('Error al añadir la tarea:', error);
  }
}
*/


/*const removeTarea = (id) =>{
  tareasList.value = tareasList.value.filter(tarea => tarea.id !== id)
  localStorage.setItem('tareas', JSON.stringify(tareasList.value))
}*/

const removeTarea = async (id) => {
  try {
    // Remove the task from the local list
    // filter the tasksList and return all the tasks that don't have the id of the task we want to remove
    tareasList.value = tareasList.value.filter(tarea => tarea.id !== id);

    // Update the local storage
    localStorage.setItem('tareas', JSON.stringify(tareasList.value));

    // Delete the task from Firestore
    await axios.delete(`https://tareas-1-6a805-default-rtdb.europe-west1.firebasedatabase.app/tareas/${id}.json`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(`Task with id ${id} removed from the database`);
  } catch (error) {
    console.error('Error removing task:', error);
  }
};



const getTarea = (id) =>{
  tarea.value = tareasList.value.find(tarea => tarea.id === id)
  console.log(tarea.value)
}

/*const updateTarea = (tarea) =>{
  tareasList.value = tareasList.value.map(t => t.id === tarea.id ? tarea : t)
  localStorage.setItem('tareas', JSON.stringify(tareasList.value))
  tareasListUpdated.value = !tareasListUpdated.value;
  router.push('/')
}*/

const updateTarea = async (updatedTarea) => {
  try {
    // Update the task in the local list
    // map over the tasksList and return the updated task if the task id matches the updated task id, otherwise return the task as is
    tareasList.value = tareasList.value.map(t => t.id === updatedTarea.id ? updatedTarea : t);

    // Update the local storage
    localStorage.setItem('tareas', JSON.stringify(tareasList.value));

    // Update the task in Firestore
    await axios.put(`https://tareas-1-6a805-default-rtdb.europe-west1.firebasedatabase.app/tareas/${updatedTarea.id}.json`, updatedTarea, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    tareasListUpdated.value = !tareasListUpdated.value;
    router.push('/');
  } catch (error) {
    console.error('Error updating task:', error);
  }
};


  return { tareasList, tarea, addTareas, removeTarea, getTarea, updateTarea, tareasListUpdated, fetchTareasDataBase}
})
