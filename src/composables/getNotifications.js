import { ref } from 'vue'

export const useNotifications = () => {

    const notification = ref({
        type: '',
        message: '',
        show: false
    })

    const showNotification = (type, message, duration=3000) => {
        notification.value.type = type
        notification.value.message = message
        notification.value.show = true;

        setTimeout(()=>{
            notification.value.show =false;

        }, duration)
    }

    return {notification, showNotification}
}