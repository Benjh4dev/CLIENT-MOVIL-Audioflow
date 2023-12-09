<template>
    <ion-page>
        <ion-content class="ion-padding">
            <ion-grid v-if="playerStore.player.currentSong">
                <ion-row>
                    <ion-col class ="flex justify-center items-center" size="2">
                        <router-link to="/" ><img  class = "w-1/2" src="/images/icons/chevron-down-outline.png" style="filter: invert(1)" /></router-link>
                    </ion-col>
                    <ion-col size="8" class="pt-2">
                        <h4 class="text-white text-center">Reproduciendo Canción</h4>
                    </ion-col>
                </ion-row>

                <ion-row class="pt-10">
                    <ion-col class="flex justify-center items-center min-h-[350px]">
                        <ion-img :src="playerStore.player.currentSong.coverURL" alt="Song Image" />
                    </ion-col>
                </ion-row>

                <ion-row class="pt-10 pl-1">
                    <ion-col>
                        <h1 class="text-white text-left font-bold text-2xl"> {{ playerStore.player.currentSong.name }}</h1>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="10" class="pt-2 pl-2">
                        <h1 class="text-gray-400 text-left text-sm"> {{ playerStore.player.currentSong.artist }} </h1>
                    </ion-col>
                </ion-row>
                <ion-row class="pt-6">
                    <!-- Slider del reproductor -->
                    <div class="flex items-center w-[100vw]">
                        <div class="text-white text-[12px] pr-2 pt-[11px] pl-2">{{ formattedCurrentTime }}</div>
                        <div
                            ref="seekerContainer"
                            class="w-full relative mt-2 mb-3"
                        >
                            <input
                                v-model="range"
                                ref="seeker"
                                type="range"
                                class="absolute rounded-full my-2 w-full h-0 z-40 appearance-none bg-opacity-100 focus:outline-none accent-white"
                                @input="updateAudioTime"
                            >
                            <div
                                class="pointer-events-none mt-[6px] absolute h-[4px] z-10 inset-y-0 left-0 w-0 bg-green-500"
                                :style="`width: ${range}%;`"></div>
                            <div class="absolute h-[4px] z-[-0] mt-[6px] inset-y-0 left-0 w-full bg-gray-700 rounded-full"></div>
                        </div>
                        <div class="text-white text-[12px] pl-2 pt-[11px] pr-3">{{ formattedDuration }}</div>
                    </div>

                </ion-row>
                <ion-row class="pt-10">
                    <ion-col size="3" class="flex justify-center items-center">
                        <ion-button fill="clear" @click="prevSong">
                            <SkipBackward class="text-white" :size="40" />
                        </ion-button>
                    </ion-col>
                    <ion-col size="6" class="flex justify-center items-center">
                        <ion-button fill="clear" @click="togglePlay">
                            <Play class="text-white" v-if="!playerStore.player.isPlaying" :size="50" />
                            <Pause class="text-white" v-if="playerStore.player.isPlaying" :size="50" />
                        </ion-button>
                    </ion-col>
                    <ion-col size="3" class="flex justify-center items-center">
                        <ion-button fill="clear" @click="nextSong">
                            <SkipForward class="text-white" :size="40" />
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonImg, IonRange, IonGrid, IonRow, IonCol} from '@ionic/vue';
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import SkipBackward from 'vue-material-design-icons/SkipBackward.vue';
import SkipForward from 'vue-material-design-icons/SkipForward.vue';
import { ref, watch, computed, onMounted, nextTick, onBeforeMount } from 'vue';

import { usePlayerStore } from '@/stores/player';
import { useMainStore } from '@/stores/main';

const mainStore = useMainStore();
const playerStore = usePlayerStore();

let audio = ref();
audio.value = playerStore.audioPlayer;

let range = ref(0);

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

const updateAudioTime = () => {
    if (audio.value.duration) {
        const newTime = (range.value / 100) * audio.value.duration;
        audio.value.currentTime = newTime;
        playerStore.updateCurrentTime(newTime);
    };
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

const prevSong = () => {
    if(playerStore.lastPlayed.length === 0) {
        audio.value.currentTime = 0;
        if(mainStore.user) {

        }
        return;
    }

    if(mainStore.user && playerStore.lastPlayed.length > 0) {
        let nextSong = playerStore.lastPlayed[0];
    }
    playerStore.prevSong();
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

<style scoped>
ion-content {
    --background: #000;
    --overflow: hidden;
    height: 100vh;
}

ion-range {
    --bar-background: #ffffff;
    --bar-background-active: #ffffff;
    --bar-height: 4px;
    --bar-border-radius: 6px;
    --knob-background: #ffffff;
    --knob-size: 20px;
    --pin-background: #ffffff;
    --pin-color: #ffffff;
}

ion-icon {
  font-size: 64px;
  color:#ffffff;
}
</style>