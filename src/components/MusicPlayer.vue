<template>
    <div class="bg-green-700 flex justify-between">
    <div class="flex">
        <router-link to ="/song">
        <div class="flex items-center ml-4 mt-2 mb-2">
            <img class="rounded-lg shadow-2xl" :src="props.song.coverURL" width="70" alt="Portada del álbum">
            <div class="ml-3 md:opacity-100 group transition-all duration-300 ease-in-out">
            <div class="text-[14px] text-white hover:underline cursor-pointer">
                {{props.song.name}}
            </div>
            <div class="text-[11px] text-gray-400 font-semibold hover:underline hover:text-white cursor-pointer">
                {{props.song.artist}}
            </div>
            </div>
        </div>
        </router-link>
    </div>
    <div class="flex justify-center items-center pr-8">
        <div class="pr-4" >
            <button @click="prevSong">
                <SkipBackward class="text-white" :size="40" />
            </button>
        </div>
        <div >
            <button @click="togglePlay">
                <Play class="text-white" v-if="!player.isPlaying" :size="45" />
                <Pause class="text-white" v-if="player.isPlaying" :size="45" />
            </button>
        </div>
        <div class="pl-4">
            <button @click="nextSong">
                <SkipForward class="text-white" :size="40" />
            </button>
        </div>
    </div>
    </div>
</template>
  
<script setup lang="ts">
import { Song } from '../interfaces';
import { usePlayerStore } from '@/stores/player';
import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonImg, IonRange, IonGrid, IonRow, IonCol} from '@ionic/vue';
import SkipBackward from 'vue-material-design-icons/SkipBackward.vue';
import SkipForward from 'vue-material-design-icons/SkipForward.vue';
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import { ref } from 'vue';

const props = defineProps({
    song: {
        type: Object as () => Song,
        required: true
    }
});
const playerStore = usePlayerStore();
const player = playerStore.player;
let audio = ref(new Audio(player.currentSong?.audioURL));
let isHover = ref(false);
let range = ref(0);

const nextSong = () => {
    playerStore.nextSong();
}

const prevSong = () => {
    playerStore.prevSong();
}   
const togglePlay = async () => {
    if (player.isPlaying) {
        audio.value.pause();
    } else {
        try {
            await audio.value.play();
            audio.value.currentTime = player.currentTime;
        } catch (error) {
            console.error("Error al reproducir el audio:", error);
        }
    }
    player.isPlaying = !player.isPlaying;
} 
</script>