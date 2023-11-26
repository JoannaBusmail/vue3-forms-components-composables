<template>
    <div>
        <h5 class="mt-5">{{ textInputLabel }}</h5>
        <InputText
            :modelValue="formData.nombre"
            :placeholder="textInputPlaceholder"
            @update:modelValue="emit('update:textInputValue', $event)"
        ></InputText>

    </div>
    <div>
        <h5 class="mt-5">{{ checkboxTtitle }}</h5>
        <div class="d-flex flex-row">
            <InputCheckbox
                v-for="(option, index) in formData.categorias"
                :key="index"
                :label="option.label"
                :id="option.id"
                :checked="option.checked"
                @update:checked="updateCheckboxInput"
            ></InputCheckbox>
        </div>
    </div>

    <div>
        <h5 class="mt-5">{{ radioTitle }}</h5>
        <div class="d-flex flex-row">

            <InputRadio
                v-for="(option, index) in formData.estado"
                :key="index"
                :label="option.label"
                :id="option.id"
                :checked="option.checked"
                @update:checked="updateRadioInput"
            ></InputRadio>
        </div>
    </div>

    <div>
        <h5 class="mt-5">{{ NumTitle }}</h5>

        <InputNumber
            :modelValue="parseInt(formData.numero)"
            :placeholder="numberInputPlaceholder"
            @update:modelValue="emit('update:numberInputValue', $event)"
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
const emit = defineEmits([ 'update:textInputValue', 'updateRadioInput', 'updateCheckboxInput', 'update:numberInputValue', 'btnClick' ])


const updateRadioInput = (id) =>
{
    props.formData.estado.forEach((option) =>
    {
        //if id is equal to option.id then set checked to true
        //can only be one radio button checked at a time
        option.checked = option.id === id
    })
}

const updateCheckboxInput = (id, checked) =>
{
    //if id is equal to option.id then set checked to true
    // can be multiple checkboxes checked at a time
    const option = props.formData.categorias.find(option => option.id === id)
    if (option) {
        option.checked = checked
    }
}


const disableBtn = computed(() =>
{
    const isTextInputEmpty = !props.formData.nombre || !props.formData.nombre.trim()

    const isAtLeastOneCheckboxChecked = props.formData.categorias.some(option => option.checked)

    const isAtLeastOneRadioChecked = props.formData.estado.some(option => option.checked)

    const isDisabled = isTextInputEmpty || !isAtLeastOneCheckboxChecked || !isAtLeastOneRadioChecked

    return isDisabled
})

</script>