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
        @update:textInputValue="updateTextInput"
        @update:numberInputValue="updateNumberInput"
      ></FormInputs>
      <ListaTareas></ListaTareas>
    </form>
  </div>
</template>

<script setup>
import FormInputs from '@/components/FormInputs.vue'
import ListaTareas from '@/components/ListaTareas.vue'
import { watch, onMounted } from 'vue'
import { useTareaStore } from '@/stores/tareas'
import { storeToRefs } from 'pinia'
import { checkboxpOptions, radioOptions } from '../utils/formOptions'
import { useGetFormInputs } from '../composables/getFormInputs'
import shortid from 'shortid'


//composable
const { formState, updateTextInput, updateNumberInput, getSelectedRadioValue, getSelectedCheckboxValues, resetForm } = useGetFormInputs(checkboxpOptions.categorias, radioOptions.estado)

//store
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



