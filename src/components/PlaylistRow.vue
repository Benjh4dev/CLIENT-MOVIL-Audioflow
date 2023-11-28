<template>
    <div class="text-white flex h-[70px] items-center">
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

const playerStore = usePlayerStore();

const props = defineProps({
    playlist: {
        type: Object as () => Playlist,
        required: true
    }
});
const SelectPlaylist = () => {
    console.log('Reproduciendo canción');
    
};

</script>