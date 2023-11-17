<template>
    <div class="my-2">
        <div class="form-check form-check-inline">
            <input
                type="checkbox"
                class="form-check-input"
                :id="id"
                :checked="checked"
                @change="handleCheckbox"
            >
            <label
                :for="id"
                class="form-check-label"
            >{{ label }}</label>
        </div>
    </div>
</template>

<script setup>


const props = defineProps({
    label: String,
    id: String,
    checked: Boolean
})



const emit = defineEmits([ 'update:checked' ])

const handleCheckbox = (event) =>
{
    emit('update:checked', { id: props.id, checked: event.target.checked })
}

</script>