<template>
    <div @click="playSong" class="text-white flex h-[70px] border-opacity-20 border-black border items-center active:bg-green-500">
        <img :src="props.song.coverURL"
            class="h-[50px] w-[50px] ml-5 rounded-md">
        <div class="ml-3">
            <h1 class="font-bold text-l">{{ props.song.name }} </h1>
            <h2 class="text-xs text-gray-400">{{ props.song.artist }}</h2>
        </div>
        <div class="text-right ml-auto mr-5">
            <h2>{{ formatTime(props.song.duration) }}</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Song } from '../interfaces';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore();

const props = defineProps({
    song: {
        type: Object as () => Song,
        required: true
    }
});

const playSong = () => {
    playerStore.playSong(props.song);
};

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};
</script>