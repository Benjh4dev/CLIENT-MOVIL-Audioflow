import { defineStore } from 'pinia';
import { User, AuthResponse } from '@/interfaces';
import router from '@/router';
import jwtDecode from "jwt-decode";

interface DecodedToken {
    exp: number;
    [key: string]: any;
}

export const useMainStore = defineStore({
    id: 'main',

    state: (): {
        user: User | null;
        token: string;
    } => ({
        user: null,
        token: "",
    }),

    actions: {
        loginUser(AuthResponse: AuthResponse) {
            this.user = AuthResponse.user
            this.token = AuthResponse.token
            router.push('/');
            window.location.reload();
        },

        logoutUser() {
                this.user = null;
                this.token = "";
                router.push('/');
                window.location.reload();
        },
        verifyTokenValidity() {
            if (!this.token) {
                return false;
            }
    
            const decodedToken: DecodedToken = jwtDecode(this.token);
    
            // Si el token ha expirado
            if (decodedToken.exp * 1000 < Date.now()) {
                this.logoutUser();
                return false;
            }
    
            return true;
        },
    },
    persist: true
});