<template>
    <div class="flex justify-between h-[70px] bg-[#212121] sticky top-0 items-center">
        <router-link to="/">
            <button class="h-[35px] w-[35px] ml-5">
                <img src="/images/icons/audioflow-logo.png" class=" h-[35px] w-[35px]">
            </button>
        </router-link>
            <div v-if="isVisible">
                    <button @click="logout" class="text-white py-2 px-4 rounded-3xl border-solid border border-white text-sm">
                        Cerrar sesión
                    </button>
            </div>
        <router-link to="/profile">
            <button class="h-[35px] w-[35px] ml-auto mr-5">
                <img src="/images/icons/guest-pic.png" class=" h-[35px] w-[35px]">
            </button>    
        </router-link>
    </div>
</template>

<script setup lang="ts">   
import { useMainStore } from '@/stores/main';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
const mainStore = useMainStore();

const isVisible = computed(() => {
    console.log(router.currentRoute.value.path);
    return router.currentRoute.value.path === '/profile';
})

const router = useRouter();
const logout = () => {
    mainStore.logoutUser();
    router.push('/login'); 
};
</script>
```