<template>
    <h5>Lista de Tareas</h5>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categorias</th>
                <th scope="col">Estado</th>
                <th scope="col">Número</th>
                <th scope="col">Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(tarea, index) in tareasList"
                :key="tarea.id"
            >
                <th scope="row">{{ tarea.id }}</th>
                <td>{{ tarea.nombre }}</td>
                <td>{{ tarea.categorias.join(', ') }}</td>
                <td>{{ tarea.estado }}</td>
                <td>{{ tarea.numero }}</td>
                <td> <button
                        class="btn btn-danger btn-sm"
                        @click="removeTarea(tarea.id)"
                    >Eliminar</button>
                </td>
                <td> <router-link
                        class="btn btn-warning btn-sm"
                        :to="`/editar/${tarea.id}`"
                    >Editar</router-link>
                </td>
            </tr>
        </tbody>


    </table>
</template>


<script setup>

import { useTareaStore } from '@/stores/tareas'
import { storeToRefs } from 'pinia'


const useTarea = useTareaStore()
const { removeTarea } = useTarea
const { tareasList } = storeToRefs(useTarea)




</script>
