import api from '@/services/api';
import { useMainStore } from '@/stores/main';
import { ChangePasswordForm, ChangeEmailForm, ChangePhotoForm, UploadSongForm } from '@/interfaces';

export async function changePassword(data: ChangePasswordForm) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.patch(`/user/${mainStore.$state.user?.id}/changePassword`, data, {
        headers: {
          'Authorization': `Bearer ${mainStore.$state.token}`
        }
    });
    return response.data;
};

export async function changeEmail(data: ChangeEmailForm) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();
    
    const response = await api.patch(`/user/${mainStore.$state.user?.id}/changeEmail`, data, {
        headers: {
          'Authorization': `Bearer ${mainStore.$state.token}`
        }
    });
    return response.data;
};

export async function changePhoto(data: ChangePhotoForm) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.patch(`/user/${mainStore.$state.user?.id}/upload`, data, {
        headers: {
            'Content-type': 'multipart/form-data',
            'Authorization': `Bearer ${mainStore.$state.token}`
        }
    });
    return response.data;
};