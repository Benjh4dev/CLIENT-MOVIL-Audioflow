import { defineStore } from 'pinia';
import { Player, Song } from '@/interfaces';

export const usePlayerStore = defineStore({
    id: 'player',

    state: (): Player => ({
        currentSong: null,
        lastPlayed: [],
        queue: [],
        isPlaying: false,
        currentTime: 0,
        volume: 80,
    }),

    actions: {
        playSong(song: Song) {
            if (this.currentSong) {
                this.lastPlayed.unshift(this.currentSong);
                if (this.lastPlayed.length > 5) {
                    this.lastPlayed.pop();
                }
            }
            this.isPlaying = true;
            this.currentSong = song;
        },
        
        addToQueue(song: Song) {
            this.queue.push(song);
        },

        nextSong() {
            if (this.queue.length > 0) {
                this.isPlaying = true;
                this.playSong(this.queue.shift()!);
            }
        },        

        prevSong() {
            if (this.lastPlayed.length > 0) {
                const previousSong = this.lastPlayed.shift();
                if (this.currentSong) {
                    this.queue.unshift(this.currentSong);
                }
                if(previousSong == null) return;
                this.currentSong = previousSong;
            }
        },

        updateCurrentTime(time: number) {
            this.currentTime = time;
        },

        updateVolume(volume: number) {
            this.volume = volume;
        },
    },
    persist: true
});