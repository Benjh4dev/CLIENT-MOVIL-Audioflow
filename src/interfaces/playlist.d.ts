import { Song } from './song';

export interface Playlist {
    id: string;
    user_id: string;
    username: string;
    image: string;
    name: string;
    songs: Song[];
};