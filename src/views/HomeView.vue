<template>
    <ion-page >
        <ion-header>
            <TopBar></TopBar>
        </ion-header>
        <ion-content>
            <ion-list class="bg-[#212121]">
                <h1 class="text-2xl ml-5 mb-3 mt-5 font-bold">
                    Recomendaciones
                </h1>


                <li v-for="number in 30">
                    <SongRow></SongRow>
                </li>
                
                


            </ion-list>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
import SongRow from '../components/SongRow.vue'
import TopBar from '../components/TopBar.vue'


</script>
