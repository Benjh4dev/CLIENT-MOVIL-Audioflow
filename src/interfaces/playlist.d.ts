import { Song } from './song';

export interface Playlist {
    id: number;
    username: string;
    name: string;
    pic_url: string;
    songs: Song[];
}
