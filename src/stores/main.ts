import { defineStore } from 'pinia';
import { User, Song, StoreUser, DecodedToken, Playlist} from '@/interfaces';
import router from '@/router';
import jwtDecode from "jwt-decode";

export const useMainStore = defineStore({
    id: 'main',

    state: (): {
        user: User | null;
        token: string;
        mySongs: Song[];
        systemSongs: Song[];
        myPlaylists: Playlist[];
    } => ({
        user: null,
        token: "",
        mySongs: [],
        systemSongs: [],
        myPlaylists: [],
    }),

    actions: {
        loginUser(data: StoreUser) {
            this.user = data.user;
            this.token = data.token;
            router.push('/');
        },

        logoutUser() {
                this.user = null;
                this.token = "";
                this.mySongs = [];
                this.myPlaylists = [];
                router.push('/');
                window.location.reload();
        },
        verifyTokenValidity() {
            if (!this.token) {
                return false;
            }
    
            const decodedToken: DecodedToken = jwtDecode(this.token);
    
            // Si el token ha expirado
            if (decodedToken.exp * 1000 < Date.now()) {
                this.logoutUser();
                return false;
            }
    
            return true;
        },
        
        loadMySongs(songs: Song[]) {
            this.mySongs = songs;
        },
        loadSongs(songs: Song[]) {
            this.systemSongs = songs;
        },
        addSystemSong(song: Song) {
            this.systemSongs.push(song);
            this.mySongs.push(song);
        },
        clearSystemSongs() {
            this.systemSongs = [];
        },
        clearMySongs() {
            this.mySongs = [];
        },
        deleteSystemSong(song: Song) {
            this.systemSongs = this.systemSongs.filter(s => s.id !== song.id);
            this.mySongs = this.mySongs.filter(s => s.id !== song.id);
        },
        loadPlaylists(playlists: Playlist[]) {
            this.myPlaylists = playlists;
        }
    },
    persist: true
});