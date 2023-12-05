<template>
    <div class="bg-black flex justify-between h-[100px]">
            <router-link to ="/song">
                <div class="flex h-[100px] ml-1">
                    <div class="flex items-center m-2 w-[50vw]">
                        <img class="rounded-lg shadow-2xl object-cover" :src="playerStore.player.currentSong?.coverURL" width="70" height="70" alt="Portada del álbum">
                        <div class="ml-3 md:opacity-100 group transition-all duration-300 ease-in-out">
                            <div class="text-[16px] text-white font-semibold">
                                {{playerStore.player.currentSong?.name}}
                            </div>
                            <div class="text-[11px] text-gray-400 font-semibold truncate">
                                {{playerStore.player.currentSong?.artist}}
                            </div>
                        </div>
                    </div>
                    <div class="text-[13px] text-gray-400 font-semibold truncate mt-10 ml-20 w-[10vw]">
                        {{ formatTime(playerStore.player.currentTime) }}
                    </div>
                </div>
            </router-link>
            <div class="flex justify-center items-center pr-5">
                <div class="mt-2">
                    <button @click="togglePlay">
                        <Play class="text-white" v-if="!playerStore.player.isPlaying" :size="50" />
                        <Pause class="text-white" v-if="playerStore.player.isPlaying" :size="50" />
                    </button>
                </div>
            </div>
        </div>
</template>
  
<script setup lang="ts">
import { ref, watch, onMounted, nextTick, onBeforeMount, computed } from 'vue';

import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';

import { usePlayerStore } from '@/stores/player';
import { useMainStore } from '@/stores/main';

const mainStore = useMainStore();
const playerStore = usePlayerStore();

let audio = ref();
let range = ref(0);
audio.value = playerStore.audioPlayer;

onBeforeMount(async () => {
    await nextTick();
    audio.value = playerStore.audioPlayer;
});

onMounted(async () => {
    await nextTick();
    audio.value.volume = playerStore.player.volume / 100;
    audio.value.onloadedmetadata = () => {
        if (audio.value.duration) {
            range.value = (playerStore.player.currentTime / audio.value.duration) * 100;
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
    if(mainStore.user && playerStore.player.queue.length > 0) {
        let nextSong = playerStore.player.queue[0];

    }
    playerStore.nextSong();
};

const handleSongEnd = () => {
    if (playerStore.player.queue.length === 0) {
        playerStore.player.isPlaying = false;
        if(mainStore.user) {

        }
    } else {
        nextSong();
    };
};

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const formattedCurrentTime = computed(() => formatTime(playerStore.player.currentTime));
const formattedDuration = computed(() => playerStore.player.currentSong ? formatTime(playerStore.player.currentSong.duration) : '0:00');
</script>