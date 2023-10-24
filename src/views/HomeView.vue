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
            </ion-list>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
const props = defineProps({
    email: String || "Invitado",
});

</script>
