import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: null,
    }),
    actions: {
        async login(email: string, password: string) {
            try {
                const response = await axios.post('/api/login', { email, password })
                this.user = response.data.user
                // Save the user data to local storage
                localStorage.setItem('user', JSON.stringify(this.user))
            } catch (error) {
                console.error(error)
            }
        },
        logout() {
            this.user = null
            // Remove the user data from local storage
            localStorage.removeItem('user')
        },
        // Load the user data from local storage on app startup
        init() {
            const user = localStorage.getItem('user')
            if (user) {
                this.user = JSON.parse(user)
            }
        },
    },
})


