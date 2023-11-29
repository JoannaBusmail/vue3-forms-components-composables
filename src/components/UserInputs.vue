<template>
    <InputEmail
        :modelValue="email"
        placeholder="Email"
        @update:modelValue="emit('update:email', $event)"
    ></InputEmail>
    <InputPassword
        :modelValue="password"
        placeholder="Password"
        @update:modelValue="emit('update:password', $event)"
    ></InputPassword>
    <InputPassword
        v-if="props.isRegister"
        :modelValue="checkPassword"
        placeholder="Confirmar Password"
        @update:modelValue="emit('update:checkPassword', $event)"
    >
    </InputPassword>

    <button
        class="mt-3  mb-5 btn btn-dark"
        type="submit"
        :disabled="disableBtn"
    >{{ btnName }}</button>
</template>

<script setup>
import InputEmail from '../components/InputEmail.vue'
import InputPassword from '../components/InputPassword.vue'
import { computed } from 'vue'



const props = defineProps({
    email: String,
    password: String,
    checkPassword: String,
    isRegister: Boolean,
    btnName: String
})


const emit = defineEmits([ 'update:email', 'update:password', 'update:checkPassword' ])

const disableBtn = computed(() =>
{
    //disabled button should have validations and all inputs must be filled
    if (props.isRegister) {
        return !validateEmail(props.email) || !validatePassword(props.password) || !validateCheckPassword(props.password, props.checkPassword)
    }
    else {
        return !validateEmail(props.email) || !validatePassword(props.password)
    }
})

const validateEmail = (email) =>
{
    //validate email should include @ and .
    return email.includes('@') && email.includes('.')
}

const validatePassword = (password) =>
{
    //validate password should be at least 6 characters long and include at least one number
    return password.length >= 6 && /\d/.test(password)
}

const validateCheckPassword = (password, checkPassword) =>
{
    //validate check password should be equal to password
    return password === checkPassword
}
</script>