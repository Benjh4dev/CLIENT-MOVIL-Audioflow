<template>
    <ion-page>
        <ion-header class="shadow-none">
            <TopBar></TopBar>
        </ion-header>
        <ion-content>
            <ion-list class="bg-[#212121]">
                <h1 class="text-white text-2xl ml-5 mb-3 font-bold">
                    Recomendaciones
                </h1>

                <SongRow v-for="song in mainStore.systemSongs" :song="song" :key="song.id"></SongRow>
                
            </ion-list>
        </ion-content>
        <ion-footer class="shadow-none">
            <MusicPlayer :song ="playerStore.currentSong || mainStore.systemSongs[0]"></MusicPlayer>
        </ion-footer>
    </ion-page>
</template>


<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import { defineProps } from 'vue';
import { IonHeader } from '@ionic/vue';
import { IonFooter } from '@ionic/vue';
import { IonList } from '@ionic/vue';
import { IonContent } from '@ionic/vue';
import TopBar from '@/components/TopBar.vue';
import SongRow from '@/components/SongRow.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';

import { fetchSongs, fetchUserSongs } from '../api';
import {fetchUserPlaylists} from '../api/playlist';
import { onMounted, ref } from 'vue';
import { useMainStore } from '@/stores/main';
import { usePlayerStore } from '@/stores/player';

const mainStore = useMainStore();
const playerStore = usePlayerStore();

const isFetching = ref(true);

const props = defineProps({
    email: String || "Invitado",
});

const getSongs = async () => {
    try {
        const response = await fetchSongs('');
        isFetching.value = false;
        mainStore.loadSongs(response.songs);

        if(playerStore.currentSong === null) {
            playerStore.playSong(mainStore.systemSongs[0]);
        }
        isFetching.value = true;
    } catch (error) {
    console.error('Hubo un error al hacer fetch:', error);
    }
};
const getUserSongs = async () => {
    try {
        console.log("Intentando conseguir canciones usuario")
        const response = await fetchUserSongs();
        isFetching.value = false;
        mainStore.loadMySongs(response.songs)
        
    } catch (error) {
    console.error('El usuario no tiene canciones', error);
    }
};

const getPlaylist = async () => {
    try {
        const response = await fetchUserPlaylists();
        isFetching.value = false;
        mainStore.loadPlaylists(response.songs)
        console.log(response);
    } catch (error) {
    console.error('Hubo un error al hacer fetch:', error);
    }
};

onMounted(async () => {
    mainStore.clearSystemSongs();
    getSongs();
    getUserSongs();
    getPlaylist()
});

</script>