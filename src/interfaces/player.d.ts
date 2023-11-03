import { Song } from './song';

export interface Player {
    currentSong: Song | null;
    lastPlayed: Song[];
    queue: Song[];
    isPlaying: boolean;
    currentTime: number;
    volume: number;
};