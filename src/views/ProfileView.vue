<template>
    <ion-page class="bg-[#212121]">
        <ion-header class="bg-[#212121]">
            <TopBar></TopBar>            
            
            <div class="bg-[#212121] py-5 m">
                <div class="flex space-x-5 mx-5">
                    <div>
                        <img :src="userImage" class="rounded-full h-[70px] w-[70px]">            
                    </div>

                    <div class="text-white self-center">
                        <h1 class="text-white font-bold text-2xl"> {{ mainStore.user?.username }}</h1>
                        <h1>{{ mainStore.user?.email }}</h1>
                    </div>
                </div>

                <div class="flex space-x-4 justify-center mt-5">
                    <button class= "text-white py-2 rounded-3xl w-[120px] border-solid border border-white text-sm" @click="toggleList('songs')">
                        Mis canciones
                    </button>
                    <button class="text-white py-2 rounded-3xl w-[120px] border-solid border border-white text-sm" @click="toggleList('playlists')">
                        Mis playlist
                    </button>
                </div>
            </div>
        </ion-header>
        <ion-content style="--background: #212121">
            <ion-list class="bg-[#212121]" >
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
import { onMounted, ref, computed } from 'vue';
import { useMainStore } from '@/stores/main';
import { usePlayerStore } from '@/stores/player';
import { useRouter } from 'vue-router';

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

const router = useRouter();

const userImage = computed(() => {
    if(mainStore.user === null) return '/images/icons/guest-pic.png';
    if(mainStore.user?.picture_url != '') {
        return mainStore.user?.picture_url;
    } else {
        return '/images/icons/guest-pic.png';
    }
});

const logout = () => {
    mainStore.logoutUser();
    router.push('/login'); 
};

const getUserSongs = async () => {
    try {
        const response = await fetchUserSongs();
        mainStore.loadMySongs(response);
    } catch (error) {
        console.error('Hubo un error al hacer fetch:', error);
    }
};

onMounted(() => {
    getUserSongs();
});
</script>