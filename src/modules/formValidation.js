import { useNotifications } from '../composables/getNotifications'
import { NotificationMsg } from '../utils/notificationMessages'

const { notification, showNotification } = useNotifications()



// VALIDATE EMAIL
export const validateEmail = (email) =>
{
    const isValidEmail = email.includes('@') && email.includes('.')
    if (!isValidEmail) { showNotification(NotificationMsg.invalidEmail.type, NotificationMsg.invalidEmail.message) }
    return isValidEmail
}

// VALIDATE PASSWORD
export const validatePassword = (password) =>
{
    const isValidPassqord = password.length >= 6 && /\d/.test(password)
    if (!isValidPassqord) { showNotification(NotificationMsg.invalidPassword.type, NotificationMsg.invalidPassword.message) }
    return isValidPassqord
}

// VALIDATE CHECK PASSWORD
export const validateCheckPassword = (password, checkPassword) =>
{
    const isValidChckPassword = password === checkPassword
    if (!isValidChckPassword) { showNotification(NotificationMsg.invalidCheckPassword.type, NotificationMsg.invalidCheckPassword.message) }
    return isValidChckPassword
}
