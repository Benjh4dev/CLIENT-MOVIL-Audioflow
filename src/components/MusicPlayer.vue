<template>
  <div class="flex items-center w-1/4">
    <div class="flex items-center ml-4">
      <img class="rounded-lg shadow-2xl" src="https://i.scdn.co/image/ab67616d0000b273ab5c9cd818ad6ed3e9b79cd1" width="70" alt="Portada del álbum">
      <div class="ml-4 opacity-0 md:opacity-100 group transition-all duration-300 ease-in-out">
        <div class="text-[14px] text-white hover:underline cursor-pointer">
          WHERE SHE GOES
        </div>
        <div class="text-[11px] text-gray-400 font-semibold hover:underline hover:text-white cursor-pointer">
          Bad Bunny
        </div>
      </div>
    </div>
    <div class="flex items-center ml-8">
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MusicPlayer',
  data() {
    return {
      isPlaying: false,
      currentTrack: {
        title: 'WHERE SHE GOES',
        artist: 'Bad Bunny',
        albumCover: 'https://i.scdn.co/image/ab67616d0000b273ab5c9cd818ad6ed3e9b79cd1'
      }
    };
  },
  methods: {
    // métodos para controlar la reproducción de música 
    play() {
      // lógica para reproducir música
      this.isPlaying = true;
    },
    pause() {
      // lógica para pausar la música
      this.isPlaying = false;
    },
    nextTrack() {
      // lógica para reproducir la siguiente pista
    }
  }
});
</script>

<style>
/* Estilos del componente si es necesario */
</style>
