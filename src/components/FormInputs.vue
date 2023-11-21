<template>
    <div>
        <h5 class="mt-5">{{ textInputLabel }}</h5>
        <InputText
            :modelValue="formData.nombre"
            :placeholder="textInputPlaceholder"
            @update:modelValue="updateTextInput"
        ></InputText>
    </div>
    <div>
        <h5 class="mt-5">{{ checkboxTtitle }}</h5>
        <div class="d-flex flex-row">
            <div
                v-for="(option, index) in formData.categorias"
                :key="index"
            >
                <InputCheckbox
                    :label="option.label"
                    :id="option.id"
                    :checked="option.checked"
                    @update:checked="updateCheckboxInput"
                ></InputCheckbox>
            </div>
        </div>
    </div>
    <div>
        <h5 class="mt-5">{{ radioTitle }}</h5>
        <div class="d-flex flex-row">
            <div
                v-for="(option, index) in formData.estado"
                :key="index"
            >
                <InputRadio
                    :label="option.label"
                    :id="option.id"
                    :checked="option.checked"
                    @update:checked="updateRadioInput"
                ></InputRadio>
            </div>
        </div>
    </div>
    <div>
        <h5 class="mt-5">{{ NumTitle }}</h5>

        <InputNumber
            :modelValue="formData.numero"
            :placeholder="numberInputPlaceholder"
            @update:modelValue="updateNumberInput"
        ></InputNumber>

    </div>

    <button
        class="mt-3  mb-5 btn btn-dark"
        type="submit"
        :disabled="disableBtn"
    >{{ btnName }}</button>
</template>

<script setup>
import InputText from './InputText.vue'
import InputCheckbox from './InputCheckbox.vue'
import InputRadio from './InputRadio.vue'
import InputNumber from './InputNumber.vue'
import { computed } from 'vue'

const props = defineProps({
    checkboxTtitle: String,
    radioTitle: String,
    NumTitle: String,
    btnName: String,
    textInputLabel: String,
    textInputPlaceholder: String,
    numberInputPlaceholder: String,
    formData: Object
})


// Emits
const emit = defineEmits([ 'updateTextInput', 'updateRadioInput', 'updateCheckboxInput', 'updateNumberInput', 'btnClick' ])

// Methods
const updateTextInput = (value) => emit('updateTextInput', value)
const updateRadioInput = (data) => emit('updateRadioInput', data)
const updateCheckboxInput = (data) => emit('updateCheckboxInput', data)
const updateNumberInput = (value) => emit('updateNumberInput', value)


const disableBtn = computed(() =>
{
    // Verificar si el campo de texto está vacío
    const isTextInputEmpty = !props.formData.nombre || !props.formData.nombre.trim()

    // Verificar si al menos uno de los checkbox está marcado
    const isAtLeastOneCheckboxChecked = props.formData.categorias.some(option => option.checked)

    // Verificar si al menos uno de los radio está marcado
    const isAtLeastOneRadioChecked = props.formData.estado.some(option => option.checked)

    // Deshabilitar el botón si el campo de texto está vacío, ningún checkbox está marcado
    // o ningún radio está marcado
    const isDisabled = isTextInputEmpty || !isAtLeastOneCheckboxChecked || !isAtLeastOneRadioChecked

    return isDisabled
})

</script>