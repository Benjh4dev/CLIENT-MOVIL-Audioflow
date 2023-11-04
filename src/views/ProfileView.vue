<template>
    <ion-page>
        <ion-header>
            <TopBar></TopBar>
        </ion-header>
        <ion-content>
            <div class="bg-[#212121] py-5">
                <div class="flex space-x-5 mx-5">
                    <img src="/images/icons/guest-pic.png" class=" h-[70px] w-[70px]">
                    <div class="self-center">
                        <h1 class="font-bold text-2xl">Nombre Apellido</h1>
                        <h1>username@gmail.com</h1>
                    </div>
                </div>
                <div class="flex space-x-4 justify-center my-5 ">
                    <button class="bg-white text-black font-bold py-2 rounded-3xl w-[120px] text-sm"> Subir canción</button>
                    <button class="bg-white text-black font-bold py-2 rounded-3xl w-[120px] text-sm"> Crear playlist</button>
                </div>
                <div class="flex space-x-4 justify-center">
                    <button class= "text-white py-2 rounded-3xl w-[120px] border-solid border border-white text-sm"> Mis canciones</button>
                    <button class="text-white py-2 rounded-3xl w-[120px] border-solid border border-white text-sm"> Mis playlist</button>
                </div>
            </div>
            <ion-list class="bg-[#212121]">
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

</script>