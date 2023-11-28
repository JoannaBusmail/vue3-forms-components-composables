<template>
    <div class="navbar navbar-dark bg-dark  mb-5">
        <router-link
            to="/"
            class="navbar-brand"
        >Formulario</router-link>
        <div class="d-flex">
            <a
                @click="scrollToTareas"
                class="btn btn-dark"
            >Tareas</a>
        </div>
    </div>
</template>

<script setup>

const scrollToTareas = () =>
{
    const tareasSection = document.getElementById('tareas')
    if (tareasSection) {
        tareasSection.scrollIntoView({ behavior: 'smooth' })
    }
}
</script>

<style>
.navbar.fixed-top {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}
</style>