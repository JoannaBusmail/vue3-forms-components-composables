import { ref } from 'vue';



export const useGetFormInputs = (checkBoxes, radios) => {

    const formState = ref({
        nombre: '',
        categorias: [...checkBoxes.map(option => ({ ...option, checked: false }))],
        estado: [...radios.map(option => ({ ...option, checked: false }))],
        numero: 0,
      
      })
      console.log('Initial formData:', formState.value);


    const updateTextInput = (value) =>
      {
        formState.value.nombre = value
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

    return {updateTextInput, updateNumberInput, formState, getSelectedRadioValue, getSelectedCheckboxValues, resetForm}
}
