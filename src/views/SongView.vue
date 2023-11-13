<template>
    <ion-page>
        <ion-content class="ion-padding" fullscreen>
            <ion-grid v-if="player.currentSong">
                <ion-row class="pt-16">
                    <ion-col class ="flex justify-center items-center" size="2">
                    <router-link to="/" ><img  class = "w-1/2" src="/images/icons/chevron-down-outline.png" style="filter: invert(1)" /></router-link>
                    </ion-col>
                    <ion-col size="8"><h4 class="text-white text-center">Reproduciendo Canción</h4> </ion-col>
                </ion-row>

                <ion-row class="pt-16">
                    <ion-col class="flex justify-center items-center"><ion-img :src ="player.currentSong.coverURL"  alt="Song Image" /></ion-col>
                </ion-row>

                <ion-row class="pt-6">
                    <ion-col><h1 class="text-white text-left font-bold"> {{ player.currentSong.name }} </h1></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="10"><h1 class="text-white text-left text-sm"> {{ player.currentSong.artist }} </h1></ion-col>
                </ion-row>
                <ion-row>
                    <ion-range v-model.number="range" :min="0" :max="100"></ion-range>
                </ion-row>
                <ion-row>
                    <ion-col size="3" class="flex justify-center items-center">
                        <ion-button fill="clear" @click="prevSong">
                            <SkipBackward class="text-white" :size="30" />
                        </ion-button>
                    </ion-col>
                    <ion-col size="6" class="flex justify-center items-center">
                        <ion-button fill="clear" @click="togglePlay">
                            <Play class="text-white" v-if="!player.isPlaying" :size="40" />
                            <Pause class="text-white" v-if="player.isPlaying" :size="40" />
                        </ion-button>
                    </ion-col>
                    <ion-col size="3" class="flex justify-center items-center">
                        <ion-button fill="clear" @click="nextSong">
                            <SkipForward class="text-white" :size="30" />
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <ion-grid v-else>
                <ion-row class="pt-16">
                    <ion-col class ="flex justify-center items-center" size="2"><img  class = "w-1/2" src="/images/icons/chevron-down-outline.png" style="filter: invert(1)" /></ion-col>
                    <ion-col size="8"><h4 class="text-white text-center">Reproduciendo Canción</h4> </ion-col>
                    <ion-col class ="flex justify-center items-center" size="2"><img class ="w-1/2" src="/images/icons/icon-2.png" style="filter:invert(1)" /></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonImg, IonRange, IonGrid, IonRow, IonCol} from '@ionic/vue';
import { playCircleOutline, pauseCircleOutline} from 'ionicons/icons';
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import SkipBackward from 'vue-material-design-icons/SkipBackward.vue';
import SkipForward from 'vue-material-design-icons/SkipForward.vue';
import { ref, watch, computed, onMounted, nextTick } from 'vue';

import { usePlayerStore } from '@/stores/player';

export default {
    name: 'SongView',
    components: {
        SkipBackward,
        SkipForward,
        Play,
        Pause,
        IonButton,
        IonContent,
        IonHeader,
        IonIcon,
        IonPage,
        IonTitle,
        IonToolbar,
        IonImg,
        IonRange,
        IonGrid,
        IonRow, 
        IonCol,
    },
    setup() {
        const player = usePlayerStore();
        let audio = ref(new Audio(player.currentSong?.audioURL));
        let isHover = ref(false);
        let range = ref(0);
        
        onMounted(async () => {
            await nextTick();
            audio.value.volume = player.volume / 100;
            audio.value.onloadedmetadata = () => {
                if (audio.value.duration) {
                    range.value = (player.currentTime / audio.value.duration) * 100;
                }
            };
        });

        watch(() => player.volume, (newVolume) => {
            audio.value.volume = newVolume / 100;
        });

        watch(() => player.currentSong, (newSong, oldSong) => {
            if (newSong) {
                audio.value.pause();
                player.isPlaying = false;
                audio.value.src = newSong.audioURL;
                audio.value.load();
                audio.value.onended = handleSongEnd;
                togglePlay();
            }
        });

        audio.value.ontimeupdate = () => {
            player.updateCurrentTime(audio.value.currentTime);
            range.value = (audio.value.currentTime / audio.value.duration) * 100;
        };

        const updateAudioTime = () => {
            if (audio.value.duration) {
                const newTime = (range.value / 100) * audio.value.duration;
                audio.value.currentTime = newTime;
                player.updateCurrentTime(newTime);
            }
        };

        const handleSongEnd = () => {
            if (player.queue.length === 0) {
                player.isPlaying = false;
            } else {
                player.nextSong();
            }
        };

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

        const nextSong = () => {
            player.nextSong();
        }

        const prevSong = () => {
            player.prevSong();
        }

        const formatTime = (seconds: number) => {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }

        const formattedCurrentTime = computed(() => formatTime(player.currentTime));
        const formattedDuration = computed(() => player.currentSong ? formatTime(player.currentSong.duration) : '0:00');

        return {
            SkipBackward,
            SkipForward,
            Play,
            Pause,
            player,
            pauseCircleOutline,
            playCircleOutline,
            togglePlay,
            nextSong,
            prevSong,
            range,
            updateAudioTime,
            formattedCurrentTime,
            formattedDuration
        }
    }
}


</script>

<style scoped>
ion-content {
    --background: #000;
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
