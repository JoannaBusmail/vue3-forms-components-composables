<template>
    <!--TEXT-->

    <input
        type="text"
        class="form-control my-4 "
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput"
    >
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: String,
    placeholder: String,

})

const emit = defineEmits([ 'update:modelValue' ])

const handleInput = (event) =>
{
    emit('update:modelValue', event.target.value)
}

</script>