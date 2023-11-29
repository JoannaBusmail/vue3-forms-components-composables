<template>
    <h1>Registro</h1>
    <form @submit.prevent="handleRegisterUser">
        <UserInputs
            v-model:email="userEmail"
            v-model:password="userPassword"
            v-model:checkPassword="userCheckPassword"
            :isRegister="true"
            btnName="Registrarse"
        ></UserInputs>
        <h1>{{ userEmail }}
            {{ userPassword }}
            {{ userCheckPassword }}
        </h1>
    </form>
</template>

<script setup>
import UserInputs from '../components/UserInputs.vue'
import { ref } from 'vue'


// form inputs refs
const userEmail = ref('')
const userPassword = ref('')
const userCheckPassword = ref('')

const handleRegisterUser = () =>
{

}

</script>