<template>
    <h1>Login</h1>
    <form>
        <UserInputs
            v-model:email="userEmail"
            v-model:password="userPassword"
            :isRegister="false"
            btnName="Login"
        ></UserInputs>
        <h1>{{ userEmail }}
            {{ userPassword }}

        </h1>
    </form>
</template>

<script setup>
import UserInputs from '../components/UserInputs.vue'
import { ref } from 'vue'


// form inputs refs
const userEmail = ref('')
const userPassword = ref('')




</script>