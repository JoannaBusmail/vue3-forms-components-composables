<template>
    <div>
        <h5 class="mt-5">{{ textInputLabel }}</h5>
        <InputText
            :modelValue="textInputValue"
            :placeholder="textInputPlaceholder"
            @update:modelValue="updateTextInput"
        ></InputText>
    </div>
    <div>
        <h5 class="mt-5">{{ checkboxTtitle }}</h5>
        <div class="d-flex flex-row">
            <div
                v-for="(option, index) in checkboxOptions"
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
                v-for="(option, index) in radioOptions"
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
            :modelValue="numberInputValue"
            :placeholder="numberInputPlaceholder"
            @update:modelValue="updateNumberInput"
        ></InputNumber>

    </div>

    <button
        class="mt-5 btn btn-dark"
        type="submit"
        :disabled="disableBtn"
    >{{ btnName }}</button>
</template>

<script setup>
import InputText from './InputText.vue'
import InputCheckbox from './InputCheckbox.vue'
import InputRadio from './InputRadio.vue'
import InputNumber from './InputNumber.vue'
import { computed, ref } from 'vue'

const props = defineProps({
    checkboxTtitle: String,
    radioTitle: String,
    NumTitle: String,
    btnName: String,
    textInputLabel: String,
    textInputValue: String,
    textInputPlaceholder: String,
    radioOptions: Array,
    checkboxOptions: Array,
    numberInputValue: Number,
    numberInputPlaceholder: String,
})


// Emits
const emit = defineEmits([ 'updateTextInput', 'updateRadioInput', 'updateCheckboxInput', 'updateNumberInput' ])

// Methods
const updateTextInput = (value) => emit('updateTextInput', value)
const updateRadioInput = (data) => emit('updateRadioInput', data)
const updateCheckboxInput = (data) => emit('updateCheckboxInput', data)
const updateNumberInput = (value) => emit('updateNumberInput', value)


const disableBtn = computed(() =>
{
    // Verificar si el campo de texto está vacío
    const isTextInputEmpty = !props.textInputValue.trim()
    console.log(props.textInputValue)

    // Verificar si al menos uno de los checkbox está marcado
    const isAtLeastOneCheckboxChecked = props.checkboxOptions.some(option => option.checked)
    console.log(isAtLeastOneCheckboxChecked)

    // Verificar si al menos uno de los radio está marcado
    const isAtLeastOneRadioChecked = props.radioOptions.some(option => option.checked)
    console.log(isAtLeastOneRadioChecked)
    // Deshabilitar el botón si el campo de texto está vacío, ningún checkbox está marcado
    // o ningún radio está marcado
    return isTextInputEmpty || !isAtLeastOneCheckboxChecked || !isAtLeastOneRadioChecked
});

</script>