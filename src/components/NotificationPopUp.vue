<template>
    <div
        :show="show"
        :class="[type]"
    >{{ message }}</div>
</template>

<script setup>


const props = defineProps({
    message: String,
    type: String,
    show: Boolean
})

</script>

<style scoped>
.success {
    background-color: green;
    color: white
}

.error {
    background-color: red;
    color: white
}
</style>