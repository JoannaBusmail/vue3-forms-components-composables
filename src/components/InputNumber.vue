<template>
    <!--NUMBER-->
    <input
        type="number"
        class="form-control my-4 "
        placeholder="placeholder"
        :value="modelValue"
        @input="handleInputNum"
    >
</template>

<script setup>


const props = defineProps({
    modelValue: Number,
    placeholder: String
})

const emit = defineEmits([ 'update:modelValue' ])

const handleInputNum = (event) =>
{
    emit('update:modelValue', event.target.value)
}



</script>