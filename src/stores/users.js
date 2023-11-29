import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useUsersStore = defineStore('users', () => { 
// refs
const usersList = ref([])

const addUser = async (user) => {

}


return { usersList, addUser }
  })
