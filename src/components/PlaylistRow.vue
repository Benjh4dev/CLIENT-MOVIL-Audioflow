<template>
    <div @click="SelectPlaylist" class=" text-white flex h-[70px] items-center active:bg-blue-500">
        <img :src="props.playlist.image"
            class="h-[50px] w-[50px] ml-5 rounded-md">
        <div class="ml-3">
            <h1 class="font-bold text-l">{{ props.playlist.name }} </h1>
            <h2 class="text-xs">{{ props.playlist.username }}</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Playlist } from '../interfaces';
import { usePlayerStore } from '@/stores/player';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const playerStore = usePlayerStore();
const router = useRouter();

const playlistLenght = computed(() => {
    if(typeof props.playlist.songs.length !== 'undefined' ){
        return 0;
    } else {
        return props.playlist.songs.length;
    }
});

const props = defineProps({
    playlist: {
        type: Object as () => Playlist,
        required: true
    }
});
const SelectPlaylist = () => {
    router.push(`/`)
    
};


</script>