import api from '@/services/api';
import { useMainStore } from '@/stores/main';

export async function fetchSongs(searchQuery: string) {
    const response = await api.get(`/song/?search=${searchQuery}`);
    return response.data;
};

export async function fetchUserSongs() {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.get(`/song/${mainStore.$state.user?.id}/`, {
        headers: {
        'Authorization': `Bearer ${mainStore.$state.token}`,
        }
    });

    return response.data;
};