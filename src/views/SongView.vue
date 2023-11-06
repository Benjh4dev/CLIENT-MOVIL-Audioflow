<template>
    <ion-page>
        <ion-content class="ion-padding" fullscreen>
            <ion-grid>
                <ion-row class="pt-16">
                    <ion-col class ="flex justify-center items-center" size="2"><img  class = "w-1/2" src="/images/icons/chevron-down-outline.png" style="filter: invert(1)" /></ion-col>
                    <ion-col size="8"><h4 class="text-white text-center">Reproduciendo Canción</h4> </ion-col>
                    <ion-col class ="flex justify-center items-center" size="2"><img class ="w-1/2" src="/images/icons/icon-2.png" style="filter:invert(1)" /></ion-col>
                </ion-row>

                <ion-row class="pt-16">
                    <ion-col class="flex justify-center items-center"><img src="/images/albumCovers/DiariesOfAHero.png" alt="Song Image" /></ion-col>
                </ion-row>

                <ion-row class="pt-6">
                    <ion-col><h1 class="text-white text-left font-bold">Título de la canción</h1></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="10"><h1 class="text-white text-left text-sm">Autor</h1></ion-col>
                    <ion-col size="2"><img class ="w-2/3" src="/images/icons/icon3.png" style="filter:invert(1)" /></ion-col>
                </ion-row>
                <ion-row>
                    <ion-range min="0" max="100"></ion-range>
                </ion-row>
                <ion-row>
                    <ion-col size="2" class="flex justify-center items-center"><img  class = "w-1/2" src="/images/icons/shuffle.png" style="filter: invert(1)" /></ion-col>
                    <ion-col size="2" class="flex justify-center items-center"><img  class = "w-1/2 scale-x-[-1]" src="/images/icons/music-player.png" style="filter: invert(1)" /></ion-col>
                    <ion-col size="4" class="flex justify-center items-center">
                        <ion-button slot="icon-only" @click="playSong" :icon="isPlaying ? pauseIcon : playIcon"></ion-button>
                    </ion-col>
                    <ion-col size="2" class="flex justify-center items-center"><img  class = "w-1/2" src="/images/icons/music-player.png" style="filter: invert(1)" /></ion-col>
                    <ion-col size="2" class="flex justify-center items-center"><img  class = "w-1/2" src="/images/icons/replay.png" style="filter: invert(1)" /></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonImg, IonRange } from '@ionic/vue';
import {  playCircleOutline, pauseCircleOutline, chevronDownOutline } from 'ionicons/icons';


export default {
    name: 'SongView',
    components: {
        IonButton,
        IonContent,
        IonHeader,
        IonIcon,
        IonPage,
        IonTitle,
        IonToolbar,
        IonRange
    },
    data() {
        return {
            isPlaying: false,
            playIcon: playCircleOutline,
            pauseIcon:  pauseCircleOutline,
        };
    },
    methods: {
        playSong() {
            this.isPlaying = !this.isPlaying;
            // Add logic to play/pause the song
        },
    },
};
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


.song-image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
}

</style>
