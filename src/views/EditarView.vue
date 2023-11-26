<template>
    <h5>Editar</h5>
    <div v-if="tarea">
        <form @submit.prevent="updateTareaForm">
            <FormInputs
                textInputLabel="Tarea"
                btnName="Editar"
                checkboxTtitle="Categorias"
                radioTitle="Estado"
                NumTitle="Cantidad"
                textInputPlaceholder="name"
                :formData="formState"
                numberInputPlaceholder="number"
                @update:textInputValue="updateTextInput"
                @update:numberInputValue="updateNumberInput"
            >
            </FormInputs>
        </form>
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<script setup>
import FormInputs from '@/components/FormInputs.vue'
import { checkboxpOptions, radioOptions } from '../utils/formOptions'
import { onMounted, ref } from 'vue'
import { useTareaStore } from '@/stores/tareas'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useGetFormInputs } from '../composables/getFormInputs'


const useTarea = useTareaStore()
const { getTarea, updateTarea } = useTarea
const { tarea } = storeToRefs(useTarea)

const route = useRoute()
const taskId = ref('')

// Cargar opciones dinámicas
const checkboxSelect = ref(checkboxpOptions.categorias)
const radioSelect = ref(radioOptions.estado)


//composable
const { formState, updateTextInput, updateNumberInput, getSelectedRadioValue, getSelectedCheckboxValues } = useGetFormInputs(checkboxpOptions.categorias, radioOptions.estado)


onMounted(async () =>
{
    taskId.value = route.params.id
    await getTarea(taskId.value)

    formState.value = {
        nombre: tarea.value.nombre || '',
        //get the options from the store and set the checked property
        //to true if the option is in the tarea.categorias array

        categorias: checkboxSelect.value.map(option => ({
            ...option,
            checked: tarea.value.categorias.includes(option.id),
        })),
        //get the options from the store and set the checked property
        //to true if the option is in the tarea.estado array
        estado: radioSelect.value.map(option => ({
            ...option,
            checked: option.id === tarea.value.estado,
        })),
        numero: tarea.value.numero || 0,
    }
})


const updateTareaForm = () =>
{
    const updatedTarea = {
        id: tarea.value.id,
        nombre: formState.value.nombre,
        categorias: getSelectedCheckboxValues(),
        estado: getSelectedRadioValue(),
        numero: formState.value.numero,
    }

    updateTarea(updatedTarea)

};

</script>