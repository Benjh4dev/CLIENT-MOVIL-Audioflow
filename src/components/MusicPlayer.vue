<template>
    <router-link to ="/cancion" class="underline font-[bold];">
        <div class="bg-green-700 flex items-center">
        <div class="flex items-center ml-4 mt-2 mb-2">
            <img class="rounded-lg shadow-2xl" :src="props.song.coverURL" width="70" alt="Portada del álbum">
            <div class="ml-3 md:opacity-100 group transition-all duration-300 ease-in-out">
            <div class="text-[14px] text-white hover:underline cursor-pointer">
                {{props.song.name}}}
            </div>
            <div class="text-[11px] text-gray-400 font-semibold hover:underline hover:text-white cursor-pointer">
                {{props.song.artist}}}
            </div>
            </div>
        </div>
        <div class="flex items-center ml-3">
            
            <button class="text-white hover:text-gray-400 hover:bg-gray-800 px-2 rounded-full">
            <i class="fas fa-step-backward"></i> 
            </button>
            <button class="text-white hover:text-gray-400 hover:bg-gray-800 px-2 rounded-full ml-2">
            <i class="fas fa-play"></i> 
            </button>
            <button class="text-white hover:text-gray-400 hover:bg-gray-800 px-2 rounded-full ml-2">
            <i class="fas fa-pause"></i> 
            </button>
            <button class="text-white hover:text-gray-400 hover:bg-gray-800 px-2 rounded-full ml-2">
            <i class="fas fa-step-forward"></i> 
            </button>
        </div>
        </div>
    </router-link>
  </template>
  
  <script setup lang="ts">
    

    import { Song } from '../interfaces';

    const props = defineProps({
        song: {
            type: Object as () => Song,
            required: true
        }
    });
  </script>
  