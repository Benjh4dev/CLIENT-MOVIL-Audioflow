<template>
    <ion-page>
        <ion-header class="shadow-none">
            <TopBar></TopBar>
        </ion-header>
        <ion-content style="--background: #212121">
            <ion-list class="bg-[#121212]">
                <h1 class="text-white text-2xl ml-5 mb-3 font-bold mt-4">
                    Recomendaciones
                </h1>
                <SongRow v-for="song in mainStore.systemSongs" :song="song"></SongRow>
            </ion-list>
        </ion-content>
        <ion-footer class="shadow-none">
            <MusicPlayer></MusicPlayer>
        </ion-footer>
    </ion-page>
</template>


<script setup lang="ts">
import { IonPage, IonHeader, IonFooter, IonList, IonContent, IonRouterOutlet } from '@ionic/vue';

import TopBar from '@/components/TopBar.vue';
import SongRow from '@/components/SongRow.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';

import { useMainStore } from '@/stores/main';

const mainStore = useMainStore();
</script>