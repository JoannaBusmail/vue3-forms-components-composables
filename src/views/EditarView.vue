<template>
    <div>
        <h5>Editar</h5>
        <div v-if="tarea">
            {{ tarea }}
            <!-- Render other properties of tarea as needed -->
        </div>
        <div v-else>
            Loading...
        </div>
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
    // Llamamos a getTarea con el ID de la tarea
    await getTarea(taskId.value)



    formState.value = {
        nombre: tarea.value.nombre || '',
        categorias: checkboxSelect.value.map(option => ({
            ...option,
            checked: tarea.value.categorias.includes(option.id),
        })),
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