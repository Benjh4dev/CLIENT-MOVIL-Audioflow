<template>
    <div class="bg-green-700 flex justify-between h-[85px]">
            <router-link to ="/song">
                <div class="flex">
                    <div class="flex items-center m-2 w-[80vw]">
                        <img class="rounded-lg shadow-2xl" :src="playerStore.player.currentSong?.coverURL" width="70" alt="Portada del álbum">
                        <div class="ml-3 md:opacity-100 group transition-all duration-300 ease-in-out">
                            <div class="text-[14px] text-white hover:underline cursor-pointer">
                                {{playerStore.player.currentSong?.name}}
                            </div>
                            <div class="text-[11px] text-gray-300 font-semibold hover:underline hover:text-white cursor-pointer truncate">
                                {{playerStore.player.currentSong?.artist}}
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
            <div class="flex justify-center items-center pr-8">
                <div >
                    <button @click="togglePlay">
                        <Play class="text-white" v-if="!playerStore.player.isPlaying" :size="45" />
                        <Pause class="text-white" v-if="playerStore.player.isPlaying" :size="45" />
                    </button>
                </div>
            </div>
        </div>
</template>
  
<script setup lang="ts">
import { ref, watch, computed, onMounted, nextTick, onBeforeMount } from 'vue';

import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';

import { usePlayerStore } from '@/stores/player';
import { useMainStore } from '@/stores/main';

const mainStore = useMainStore();
const playerStore = usePlayerStore();
const player = playerStore.player;

let audio = ref();
let range = ref(0);
audio.value = playerStore.audioPlayer;

onBeforeMount(async () => {
    await nextTick();
    audio.value = playerStore.audioPlayer;
});

onMounted(async () => {
    await nextTick();
    audio.value.volume = player.volume / 100;
    audio.value.onloadedmetadata = () => {
        if (audio.value.duration) {
            range.value = (player.currentTime / audio.value.duration) * 100;
        }
    };
});

watch(() => playerStore.player.volume, (newVolume) => {
    audio.value.volume = newVolume / 100;
});

watch(() => playerStore.player.currentTime, (newCurrentTime) => {
    audio.value.onended = handleSongEnd;
    range.value = newCurrentTime / audio.value.duration * 100;
});

watch(() => playerStore.player.currentSong, (newSong) => {
    if (newSong) {
        audio.value.pause();
        playerStore.player.isPlaying = false;
        audio.value.src = newSong.audioURL;
        audio.value.load();
        audio.value.onended = handleSongEnd;
        if(playerStore.player.currentTime != 0) {
            range.value = playerStore.player.currentTime / audio.value.duration * 100;
            audio.value.currentTime = playerStore.player.currentTime;
            return;
        }
        togglePlay();
    };
});

audio.value.ontimeupdate = () => {
    playerStore.updateCurrentTime(audio.value.currentTime);
    range.value = (audio.value.currentTime / audio.value.duration) * 100;
};


const togglePlay = async () => {
    if (playerStore.player.isPlaying) {
        audio.value.pause();
        
    } else {
        try {
            audio.value.play();
            audio.value.currentTime = playerStore.player.currentTime;
        } catch (error) {
            console.error("Error al reproducir el audio:", error);
        };
    };
    playerStore.player.isPlaying = !playerStore.player.isPlaying;
};

const nextSong = () => {
    if(mainStore.user && player.queue.length > 0) {
        let nextSong = player.queue[0];

    }
    playerStore.nextSong();
};

const handleSongEnd = () => {
    if (player.queue.length === 0) {
        player.isPlaying = false;
        if(mainStore.user) {

        }
    } else {
        nextSong();
    };
};
</script>