
<template>
    <ion-page>
        <ion-header class="shadow-none">
            <TopBar></TopBar>
        </ion-header>
        <ion-content>
            <ion-list class="bg-[#212121]">
                <h1 class="text-2xl ml-5 mb-3 font-bold">
                    Recomendaciones
                </h1>

                <li v-for="number in 50" :key="number">
                    <SongRow></SongRow>
                </li>
                
            </ion-list>
        </ion-content>
        <ion-footer class="shadow-none">
            <MusicPlayer></MusicPlayer>
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

const props = defineProps({
    email: String || "Invitado",
});

</script>
