import api from '@/services/api';
import { useMainStore } from '@/stores/main';

export async function fetchPlaylists(searchQuery: string) {
    const response = await api.get(`/playlist/?search=${searchQuery}`);
    return response.data;
};

export async function fetchUserPlaylists() {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();
    console.log("mainStore.$state.user?.id",mainStore.$state.user?.id);
    const response = await api.get(`/playlist/${mainStore.$state.user?.id}`, {
        headers: {
        'Authorization': `Bearer ${mainStore.$state.token}`,
        }
    });

    return response.data;
};
