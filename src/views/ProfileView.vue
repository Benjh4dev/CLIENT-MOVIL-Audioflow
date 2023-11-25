<template>
    <ion-page>
        <ion-header class="bg-[#212121]">
            <TopBar></TopBar>            
            
            <div class="bg-[#212121] py-5 m">
                <div class="flex space-x-5 mx-5">
                    <div>
                        <img src="/images/icons/guest-pic.png" class=" h-[70px] w-[70px]">            
                    </div>

                    <div class="text-white self-center">
                        <h1 class="text-white font-bold text-2xl"> {{ mainStore.user?.username }}</h1>
                        <h1>{{ mainStore.user?.email }}</h1>
                    </div>
                </div>

                <div class="flex space-x-4 justify-center mt-5">
                    <button class= "text-white py-2 rounded-3xl w-[120px] border-solid border border-white text-sm"> Mis canciones</button>
                    <button class="text-white py-2 rounded-3xl w-[120px] border-solid border border-white text-sm"> Mis playlist</button>
                </div>
            </div>
        </ion-header>
        <ion-content>
            
            <ion-list class="bg-[#212121]">
                <li v-for="number in 50" :key="number">
                    <SongRow v-for="song in mainStore.systemSongs" :song="song" :key="song.id"></SongRow>
                </li>
                
            </ion-list>
        </ion-content>
        <ion-footer class="shadow-none">
            <MusicPlayer v-if="playerStore.currentSong" :song ="playerStore.currentSong"></MusicPlayer>
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
import { useRouter } from 'vue-router';

const mainStore = useMainStore();
const playerStore = usePlayerStore();

const router = useRouter();


const logout = () => {
    mainStore.logoutUser();
    router.push('/login'); 
};

</script>