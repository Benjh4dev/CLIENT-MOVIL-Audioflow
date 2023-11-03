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

                <li v-for="number in 50">
                    <SongRow></SongRow>
                </li>
                
            </ion-list>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
import TopBar from '@/components/TopBar.vue';
import SongRow from '@/components/SongRow.vue';
const props = defineProps({
    email: String || "Invitado",
});

</script>
