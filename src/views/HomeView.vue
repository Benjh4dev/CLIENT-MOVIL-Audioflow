<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Canciones</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <h1>
                    Canciones de {{ email }}
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
