<template>
    <ion-page>
        <ion-content class="ion-padding" fullscreen>
            <ion-grid>
                <ion-row class="pt-24">
                    <ion-col class ="flex justify-center items-center" size="2"><img  class = "w-1/2" src="/images/icons/chevron-down-outline.png" style="filter: invert(1)" /></ion-col>
                    <ion-col size="8"><h4 class="text-white text-center">Reproduciendo Canción</h4> </ion-col>
                    <ion-col class ="flex justify-center items-center" size="2"><img class ="w-1/2" src="/images/icons/icon-2.png" style="filter:invert(1)" /></ion-col>
                </ion-row>

                <ion-row class="pt-16">
                    <ion-col class="flex justify-center items-center"><img src="/images/albumCovers/DiariesOfAHero.png" alt="Song Image" /></ion-col>

                </ion-row>

                <ion-row>
                    <ion-col size="10">Columna 1</ion-col>
                    <ion-col size="2">Columna 2</ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/vue';
import { play, pause, chevronDownOutline } from 'ionicons/icons';


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
    },
    data() {
        return {
            isPlaying: false,
            playIcon: play,
            pauseIcon: pause,
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

.song-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.song-image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
}

</style>
