<template>
    <ion-page>
        <ion-header class ="text-center mt-32">
            <img  class = "w-1/12" src="/images/icons/chevron-down-outline.png" style="filter: invert(1)" />
            <ion-title class="text-white">Reproduciendo Canción</ion-title>
        </ion-header>

        <ion-content class="ion-padding" fullscreen>
            <div class="song-container">
                <img class="song-image" src="song-image-url" alt="Song Image" />
                <ion-button class="play-button" fill="clear" color="light" @click="playSong">
                    <ion-icon :icon="isPlaying ? pauseIcon : playIcon"></ion-icon>
                </ion-button>
            </div>
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
