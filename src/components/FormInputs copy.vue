<template>
    <!--TEXT-->
    <input
        type="text"
        class="form-control my-4 "
        placeholder="Igrese nombre"
        :value="nombre"
        @input="(event) => $emit('update:nombre', event.target.value)"
    >
    <!-- CHECKBOX-->
    <!--<div class="my-2">
        <div class="form-check form-check-inline">
            <input
                type="checkbox"
                class="form-check-input"
                id="check-1"
                :checked="tarea.categorias === 'Javascript'"
                value="Javascript"
                @change="(event) => $emit('update:categorias', event.target.value)"
            >
            <label
                for="check-1"
                class="form-check-label"
            >Javascript</label>
        </div>


        <div class="form-check form-check-inline">
            <input
                type="checkbox"
                class="form-check-input"
                id="check-2"
                :checked="tarea.categorias === 'Node'"
                value="Node"
                @change="(event) => $emit('update:categorias', event.target.value)"
            >
            <label
                for="check-2"
                class=" form-check-label"
            >Node</label>
        </div>
    </div>-->

    <!--RADIO-->
    <!--<div class="my-2">
        <div class="form-check form-check-inline">
            <input
                class="form-check-input"
                type="radio"
                id="radio-1"
                value="urgente"
                :checked="tarea.estado === 'Urgente'"
                @change="(event) => $emit('update:estado', event.target.value)"
            >
            <label
                class="form-check-label"
                for="radio-1"
            >Urgente</label>
        </div>

        <div class="form-check form-check-inline">
            <input
                class="form-check-input"
                type="radio"
                id="radio-2"
                value="relax"
                :checked="tarea.estado === 'relax'"
                @change="(event) => $emit('update:estado', event.target.value)"
            >
            <label
                class="form-check-label"
                for="radio-2"
            >Relax</label>
        </div>
    </div>-->

    <!--NUMBER-->
    <!--<div class="my-2">
        <input
            type="number"
            class="form-control"
            placeholder="Número"
            :value="tarea.numero"
            @input="(event) => $emit('update:numero', event.target.value)"
        >
    </div>-->

    <button
        class="mt-5 btn btn-dark"
        type="submit"
        :disabled="disableBtn"
    >Agregar</button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    nombre: String
})




//Deshabilitar boton si el input text está vacío
/*const disableBtn = computed(() =>
{
    return props.tarea.nombre.trim() === '' ? true : false
}
)*/




/* 

FORM ---
--> Este lleva el método SUBMIT
--> @submit.prevent="método"

TEXT ------
.TRIM
--> Limpia el campo de espacios vacíos


CHECKBOX Y RADIO ----
--> V-MODEL: Asocio la variable reactiva donde interactua el usuario, es el valor del input
--> LABEL  e INPUT: Asociamos con el input mediante el for en label y el id en el input
--> : VALUE --> Es el valor del checkbox. cuando clico sobre uno agrega este valor al v-model


TAREA REF ----
--> Si pongo que es [] me permite tener varios valores checkeados a la vez
--> si pongo que es string solo me permite un unico valor seleccionado


BUTTON ----
--> type = "submit"
*/
</script>