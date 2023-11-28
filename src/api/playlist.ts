import api from '@/services/api';
import { useMainStore } from '@/stores/main';

export async function fetchPlaylists() {
    const response = await api.get('/playlist');
    return response.data;
};

export async function fetchUserPlaylists() {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.get(`/playlist/user/${mainStore.$state.user?.id}`,{
        headers: {
            'Authorization': `Bearer ${mainStore.$state.token}`,
        }
    });
    if (response.data.length === 0) {
        return [];
    }   
    const userPlaylists = response.data.sort((a: any, b: any) => {
        return a.timestamp._seconds - b.timestamp._seconds;
    });

    return userPlaylists;
};