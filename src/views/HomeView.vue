<template>
  <div>
    <form
      class="mt-3"
      @submit.prevent="handleUpdateForm"
    >
      <FormInputs
        textInputLabel="Tarea"
        btnName="Enviar"
        checkboxTtitle="Categorias"
        radioTitle="Estado"
        NumTitle="Cantidad"
        textInputPlaceholder="name"
        :formData="formState"
        numberInputPlaceholder="number"
        @updateTextInput="updateTextInput"
        @updateRadioInput="updateRadioOptions"
        @updateCheckboxInput="updateCheckboxOptions"
        @updateNumberInput="updateNumberInput"
      ></FormInputs>
      <ListaTareas></ListaTareas>
    </form>
  </div>
</template>

<script setup>
import FormInputs from '@/components/FormInputs.vue'
import ListaTareas from '@/components/ListaTareas.vue'
import { ref, watch, onMounted } from 'vue'
import { useTareaStore } from '@/stores/tareas'
import { storeToRefs } from 'pinia'
import { checkboxpOptions, radioOptions } from '../utils/formOptions'
import shortid from 'shortid'



const useTarea = useTareaStore()
const { addTareas } = useTarea
const { tareasList, tareasListUpdated } = storeToRefs(useTarea)

watch(tareasListUpdated, () =>
{//actualizar solo la tarea modificada no toda la lista
  localStorage.setItem('tareas', JSON.stringify(tareasList.value))

})

onMounted(() =>
{
  // Inicializar la lista de tareas al cargar la página
  tareasList.value = JSON.parse(localStorage.getItem('tareas')) || []
})

const formState = ref({
  nombre: '',
  ...checkboxpOptions,
  ...radioOptions,
  numero: 0,

})


const updateTextInput = (value) =>
{
  formState.value.nombre = value
}

const updateRadioOptions = (data) =>
{
  //marcar opcion seleccionada y desmarcar las otras
  formState.value.estado.forEach(option =>
  {
    option.checked = option.id === data.id
  })
}

const updateCheckboxOptions = (data) =>
{
  //marco o desmarco segun clico, puedo marcar varias opciones
  const option = formState.value.categorias.find(option => option.id === data.id)
  if (option) {
    option.checked = data.checked
    console.log(option)
  }
}

const updateNumberInput = (value) =>
{
  formState.value.numero = value
}

const getSelectedRadioValue = () => formState.value.estado.find((option) => option.checked)?.id
const getSelectedCheckboxValues = () => formState.value.categorias.filter((option) => option.checked).map((option) => option.id)

const resetForm = () =>
{
  formState.value.nombre = ''
  formState.value.estado.forEach((option) => (option.checked = false))
  formState.value.categorias.forEach((option) => (option.checked = false))
  formState.value.numero = 0
}

//llamar a setTareas del store tareas dentro de handleUpdateForm
const handleUpdateForm = () =>
{
  const newTarea = {
    id: shortid.generate(),
    nombre: formState.value.nombre,
    categorias: getSelectedCheckboxValues(),
    estado: getSelectedRadioValue(),
    numero: formState.value.numero

  }
  addTareas(newTarea)

  resetForm()
}


</script>



