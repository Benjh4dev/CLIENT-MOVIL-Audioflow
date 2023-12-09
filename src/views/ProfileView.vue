<template>
    <ion-page class="bg-[#121212]">
        <ion-header class="bg-[#121212]">
            <TopBar></TopBar>            
            
            <div class="bg-green-600 py-5 m">
                <div class="flex space-x-5 mx-5">
                    <div>
                        <img :src="userImage" class="rounded-full h-[70px] w-[70px] shadow-2xl">            
                    </div>

                    <div class="text-white self-center">
                        <h1 class="text-white font-bold text-2xl"> {{ mainStore.user?.username }}</h1>
                        <h1 class="text-white">{{ mainStore.user?.email }}</h1>
                    </div>
                </div>

                <div class="flex space-x-4 justify-center mt-5">
                    <button :class="{ 'bg-green-700 border-green-800 text-gray-800 text-opacity-50 transition-all ease-in-out duration-200': showMyPlaylists }" class="text-white py-2 rounded-3xl w-[120px] border-solid border border-white font-bold" @click="toggleList('songs')">
                        Mis canciones
                    </button>
                    <button :class="{ 'bg-green-700 border-green-800 text-gray-800 text-opacity-50 transition-all ease-in-out duration-200': showMySongs }" class="text-white py-2 rounded-3xl w-[120px] border-solid border border-white font-bold" @click="toggleList('playlists')">
                        Mis playlist
                    </button>
                </div>
            </div>
        </ion-header>
        <ion-content style="--background: #121212">
            <ion-list class="bg-[#121212] mt-4">
                <div v-if="showMySongs" >
                    <h1 class="text-white text-2xl ml-5 mb-3 font-bold">
                        Tus canciones
                    </h1>
                    <SongRow v-for="song in mainStore.mySongs" :song="song" :key="song.id"></SongRow>
                </div>
                <div v-else>
                    <h1 class="text-white text-2xl ml-5 mb-3 font-bold">
                        Tus playlists
                    </h1>
                    <PlaylistRow v-for="playlist in mainStore.myPlaylists" :playlist="playlist" :key="playlist.id" ></PlaylistRow>
                </div>
            </ion-list>
        </ion-content>
        <ion-footer class="shadow-none">
            <MusicPlayer v-if="playerStore.player.currentSong" :song ="playerStore.player.currentSong"></MusicPlayer>
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonFooter, IonList, IonContent } from '@ionic/vue';

import TopBar from '@/components/TopBar.vue';
import SongRow from '@/components/SongRow.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
import PlaylistRow from '@/components/PlaylistRow.vue';

import { fetchUserSongs } from '@/api';
import { onMounted, ref, computed, watch } from 'vue';
import { useMainStore } from '@/stores/main';
import { usePlayerStore } from '@/stores/player';

const mainStore = useMainStore();
const playerStore = usePlayerStore();

const showMySongs = ref(true);
const showMyPlaylists = ref(false);

const toggleList = (list: string) => {
    if(list === 'songs') {
        showMySongs.value = true;
        showMyPlaylists.value = false;
    } else {
        showMySongs.value = false;
        showMyPlaylists.value = true;
    }
};

const userImage = computed(() => {
    if(mainStore.user === null) return '/images/icons/guest-pic.png';
    if(mainStore.user?.picture_url != '') {
        return mainStore.user?.picture_url;
    } else {
        return '/images/icons/guest-pic.png';
    }
});

const getUserSongs = async () => {
    try {
        const response = await fetchUserSongs();
        mainStore.loadMySongs(response);
        console.log('Se obtuvieron las canciones del usuario')
    } catch (error: any) {
    if(error.response.status === 404) {
        console.log('No se encontraron canciones del usuario')
    } else
        console.error('Hubo un error al hacer fetch:', error);
    }
};

watch(() => mainStore.user, (newUser) => {
    if(newUser === null) return;
    getUserSongs();
});

onMounted(() => {
    getUserSongs();
});
</script>