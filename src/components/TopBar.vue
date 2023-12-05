<template>
    <div class="flex justify-between h-[80px] bg-[#212121] sticky top-0 items-center">
        <router-link to="/">
            <button class="h-[45px] w-[45px] ml-5">
                <img src="/images/icons/audioflow-logo.png" class=" h-[45px] w-[45px]">
            </button>
        </router-link>
            <div v-if="isVisible">
                <button @click="logout" class="text-white py-2 px-4 rounded-3xl border-solid border border-white text-sm">
                    Cerrar sesión
                </button>
            </div>
        <router-link to="/login" v-if="!mainStore.user">
            <button class="h-[45px] w-[45px] ml-auto mr-5">
                <img :src="userImage" class="rounded-full h-[45px] w-[55px]">
            </button>    
        </router-link>
        <router-link to="/profile" v-else>
            <button class="h-[45px] w-[45px] ml-auto mr-5">
                <img :src="userImage" class="rounded-full h-[45px] w-[55px]">
            </button>    
        </router-link>
    </div>
</template>

<script setup lang="ts">   
import { useMainStore } from '@/stores/main';
import { usePlayerStore } from '@/stores/player';

import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const mainStore = useMainStore();
const playerStore = usePlayerStore();

const isVisible = computed(() => {
    return router.currentRoute.value.path === '/profile';
})

const logout = () => {
    mainStore.logoutUser();
    playerStore.destorePlayer();
    router.push('/login'); 
};

const userImage = computed(() => {
    if(mainStore.user === null) return '/images/icons/guest-pic.png';
    if(mainStore.user?.picture_url != '') {
        return mainStore.user?.picture_url;
    } else {
        return '/images/icons/guest-pic.png';
    }
});
</script>