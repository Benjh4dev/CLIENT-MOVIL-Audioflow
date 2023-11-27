import { Song } from './song';

export interface Player {
    id: string;
    user_id: string;
    currentSong: Song | null;
    queue: Song[];
    currentTime: number;
    volume: number;
    isPlaying: boolean;
};