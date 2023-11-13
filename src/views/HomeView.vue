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
            <MusicPlayer v-if="playerStore.currentSong"  :song ="playerStore.currentSong"></MusicPlayer>
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

import { fetchSongs } from '../api';
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
        console.log(response);
    } catch (error) {
    console.error('Hubo un error al hacer fetch:', error);
    }
};

onMounted(async () => {
    mainStore.clearSystemSongs();
    getSongs();
});

</script>