<template>
  <div>
    <FormInputs
      textInputLabel="Tarea"
      btnName="Enviar"
      checkboxTtitle="Categorias"
      radioTitle="Estado"
      NumTitle="Cantidad"
      :textInputValue="name"
      textInputPlaceholder="name"
      :radioOptions="radioOptions"
      :checkboxOptions="checkboxOptions"
      :numberInputValue="0"
      numberInputPlaceholder="number"
      @updateTextInput="updateTextInput"
      @updateRadioInput="updateRadioOptions"
      @updateCheckboxInput="updateCheckboxOptions"
      @updateNumberInput="updateNumberInput"
    ></FormInputs>
  </div>
</template>

<script setup>
import FormInputs from '@/components/FormInputs.vue'
import { ref } from 'vue'

const name = ref('')
const radioOptions = ref([
  { label: 'Urgente', id: 'Urgente', checked: false },
  { label: 'Relax', id: 'Relax', checked: false },
])
const checkboxOptions = ref([
  { label: 'Angular', id: 'Angular', checked: false },
  { label: 'React', id: 'React', checked: false },
  { label: 'Vue', id: 'Vue', checked: false },
])
const numberInputValue = ref(0)

const updateTextInput = (value) =>
{
  name.value = value
}

const updateRadioOptions = (data) =>
{
  //marcar opcion seleccionada y desmarcar las otras
  radioOptions.value.forEach(option =>
  {
    option.checked = option.id === data.id
  })
}

const updateCheckboxOptions = (data) =>
{
  //marco o desmarco segun clico, puedo marcar varias opciones
  const option = checkboxOptions.value.find(option => option.id === data.id)
  if (option) {
    option.checked = data.checked
  }
}

const updateNumberInput = (value) =>
{
  numberInputValue.value = value
}
</script>




