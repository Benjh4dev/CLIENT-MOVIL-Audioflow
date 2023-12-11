<template>
    <ion-page>
        <ion-header class="shadow-none">
            <TopBar></TopBar>
        </ion-header>
        <ion-content style="--background: #121212">
            <ion-list class="bg-[#121212]">
                <h1 class="text-white text-2xl ml-5 mb-3 font-bold mt-4">
                    {{ playlist.name }}
                </h1>
                <SongRow v-for="song in playlistSongs" :song="song"></SongRow>
            </ion-list>
        </ion-content>
        <ion-footer class="shadow-none">
            <MusicPlayer></MusicPlayer>
        </ion-footer>
    </ion-page>
</template>


<script setup lang="ts">
import { IonPage, IonHeader, IonFooter, IonList, IonContent, IonRouterOutlet } from '@ionic/vue';

import TopBar from '@/components/TopBar.vue';
import SongRow from '@/components/SongRow.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
import { ref, onMounted } from 'vue';
import { useMainStore } from '@/stores/main';
import { Playlist, Song } from '@/interfaces'
import { useRoute } from 'vue-router';
import { fetchPlaylistById } from '@/api';

const mainStore = useMainStore();
const route = useRoute();

const playlistSongs = ref<Song[]>([]);

const playlist = ref<Playlist>({
    id: 'playlist_id',
    user_id: 'user_id',
    username: 'username',
    name: 'playlist_name',
    image: '/images/icons/defaultPlaylistImg.png',
    songs: []
});
onMounted(async () => {
    const response = await fetchPlaylistById(String(route.params.id));
    playlist.value = response.playlist;
    playlistSongs.value = playlist.value.songs;
})
</script>