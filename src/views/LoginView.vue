<template>
  <ion-page>
    <ion-content :fullscreen="true" class="container">
      <ion-row>
        <ion-img
          class="w-1/6 h-1/6 mx-auto"
          src="/images/icons/audioflow-logo.png"
          alt="Logo AudioFlow"
        ></ion-img>
      </ion-row>
      <ion-row>
        <h1 class="text-[40px] text-white font-bold mx-auto">AudioFlow</h1>
      </ion-row>
      <ion-row>
        <h5 class="text-white mx-auto">Your Melody, Your Mood.</h5>
      </ion-row>
      <br />
      <h2 class="text-3xl text-white font-bold text-center mx-auto">Iniciar Sesión</h2>
      <form @submit.prevent="loginUser">
        <ion-row responsive-sm class="gap-4 ion-padding">
          <ion-row>
            <ion-label class="text-white my-2 text-sm relative text-center indent-8 font-normal">CORREO ELECTRÓNICO</ion-label>
            <ion-input
              mode="md"
              v-model="formData.email"
              id="email"
              name="email"
              type="text"
              fill="outline"
              autocapitalize="off"
              class="bg-gray-200 text-black border border-transparent rounded-[1.25rem] w-5/6 mx-auto opacity-80 min-w-[280px]"
            ></ion-input>
          </ion-row>

          <ion-row>
            <ion-label class="text-white my-2 text-sm relative text-center indent-8 font-normal">CONTRASEÑA</ion-label>
            
            <ion-input
              mode="md"
              v-model="formData.password"
              name="password"
              type="password"
              fill="outline"
              autocapitalize="off"
              class="bg-gray-200 text-black border border-transparent rounded-[1.25rem] w-5/6 mx-auto opacity-80 min-w-[280px]"
            ></ion-input>
            <p v-if="errors" class="pt-3 pl-2 pb-1 text-sm text-start indent-8 text-[#ff0000] font-bold">{{ errors}}</p>
          </ion-row>
        </ion-row>
        <ion-row responsive-sm>
          <ion-col>
            <ion-button
              class="w-4/5 mx-auto font-bold text-white border-white border-4 rounded-2xl"
              type="submit"
              expand="block"
              fill="outline"
            >Iniciar Sesión</ion-button>
            <p class="pt-4 text-white text-base text-center">¿No tienes cuenta? <router-link to="/register" class="underline font-bold">Regístrate aquí</router-link></p>

          </ion-col>
        </ion-row>
        <ion-row responsive-sm>
            <ion-col> 
                <router-link to="/" class="text-white underline font-bold block text-center">Ingresar como invitado</router-link>
            </ion-col>
        </ion-row>
        
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonImg, IonRow, IonInput, IonButton, IonCol, IonLabel } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMainStore } from '@/stores/main';
import { usePlayerStore } from '@/stores/player';

import { fetchUserPlaylists, login } from '@/api';

import apiClient from '@/services/api';
import { LoginForm } from '@/interfaces';

const mainStore = useMainStore();
const playerStore = usePlayerStore();

const errors = ref<string>(''); 

const formData = ref<LoginForm>({
  email: '',
  password: '',
});

const router = useRouter();

async function loginUser(): Promise<void> {
  errors.value = '';

  try {
    const user = await login(formData.value);

    mainStore.loginUser(user);

    // user.player.queue = await loadQueue(user.player.id); //AGREGAR FIRESTORE PARA GUARDAR Y CARGAR DATOS DEL MUSICPLAYER
    playerStore.storePlayer(user.player);

    const userPlaylists = await fetchUserPlaylists();
    mainStore.loadMyPlaylists(userPlaylists);
    router.push('/');
    
  } catch (error: any) {    
      if (error.response) {
        if (error.response.status == 400) {
          errors.value = 'Ingrese los campos correctamente';
          return;
        }
        else if (error.response.status == 401) {
          errors.value = error.response.data.message;
          return;
        }
      } 
      errors.value = "Hubo un error, inténtelo más tarde";
    }
  }
</script>

<style scoped>
.container {
  --overflow: hidden;
  height: 100vh;
  position: absolute;
  left: 0;
  right: 0;
  top: 5%;
  --ion-background-color: linear-gradient(90deg,#8c52ff,#00bf63);
}
</style>