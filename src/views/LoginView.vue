
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
        <ion-row responsive-sm class="ion-padding">
          <ion-col>
            <ion-button
              class="w-4/5 mx-auto font-bold text-white border-white border-4 rounded-2xl"
              type="submit"
              expand="block"
              fill="outline"
            >Iniciar Sesión</ion-button>
            <p class="pt-2 text-white text-base text-center">¿No tienes cuenta? <router-link to="/register" class="underline font-bold">Regístrate aquí</router-link></p>

          </ion-col>
        </ion-row>
        <ion-row responsive-sm class="ion-padding">
            <ion-col style="margin-top: 12rem;"> 
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
import apiClient from '@/services/api';
import { useRouter } from 'vue-router';
import { useMainStore } from '@/stores/main';

const errors = ref<string>(''); 

interface FormData {
  email: string;
  password: string;
}

const formData = ref<FormData>({
  email: '',
  password: '',
});

const router = useRouter();

async function loginUser(): Promise<void> {
  errors.value = '';
  try {
    const response = await apiClient.post('/auth', formData.value);
    console.log(response);
    if (response.status == 200) {
      useMainStore().loginUser(response.data);
      router.push('/');
    }
    
  } catch (error: any) {    
      if (error.response) {
        if (error.response.status == 400) {

          errors.value = 'Ingrese los campos correctamente';
          console.log(errors.value); 
          return;
        }
        else if (error.response.status == 401) {
          errors.value = error.response.data.message;
          console.log(errors.value); 
          return;
        }
      } 
      errors.value = "Hubo un error, inténtelo más tarde";
    console.log(errors.value);
    }
  }
  
  
  
  


</script>

<style scoped>
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 5%;
  --ion-background-color: linear-gradient(90deg,#8c52ff,#00bf63);
}
</style>
```
