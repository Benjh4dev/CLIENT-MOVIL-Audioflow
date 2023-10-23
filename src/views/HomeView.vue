<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Canciones</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <h1 class="text-2xl ml-5 font-bold">
                    Recomendaciones
                </h1>
                <MusicPlayer></MusicPlayer>
            </ion-list>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
import MusicPlayer from '@/components/MusicPlayer.vue';
</script>
