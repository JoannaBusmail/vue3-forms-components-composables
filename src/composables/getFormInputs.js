import { ref } from 'vue';


// pass in the checkbox and radio options as arguments
export const useGetFormInputs = (checkBoxes, radios) => {

    // create a ref for the form state
    // initialize the form state with the checkbox and radio options by spreading them into the form state object
    // and adding a checked property to each option
    const formState = ref({
        nombre: '',
        categorias: [...checkBoxes.map(option => ({ ...option, checked: false }))],
        estado: [...radios.map(option => ({ ...option, checked: false }))],
        numero: 0,
      
      })
 

// update the form state when the text input changes
    const updateTextInput = (value) =>
      {
        formState.value.nombre = value
      }
// update the form state when the number input changes
    const updateNumberInput = (value) =>
     {
        formState.value.numero = value
     }


//  get the selected radio value
// find the radio option that has the checked property set to true and return the id of that option (the value of the radio button)
// if no option is checked, return undefined
    const getSelectedRadioValue = () => {
        const checkedRadio = formState.value.estado.find(option => option.checked);
        return checkedRadio?.id;
    };

    // get the selected checkbox values
    // filter the checkbox options to only include the options that have the checked property set to true
    // map over the filtered options and return the id of each option (the value of the checkbox)
    const getSelectedCheckboxValues = () => {
        return formState.value.categorias
        .filter(option => option.checked)
        .map(option => option.id);
    };

    const resetForm = () =>
    {
        formState.value.nombre = ''
        formState.value.estado.forEach((option) => (option.checked = false))
        formState.value.categorias.forEach((option) => (option.checked = false))
        formState.value.numero = 0
    }

    return {updateTextInput, updateNumberInput, formState, getSelectedRadioValue, getSelectedCheckboxValues, resetForm}
}
