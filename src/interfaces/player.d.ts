import { Song } from './song';

export interface Player {
    queue: Song[];
    currentTrackIndex: number;
    currentTime: number;
    volume: number;
}