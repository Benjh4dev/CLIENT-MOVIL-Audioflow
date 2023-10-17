<template>
    <ion-page>
      <ion-content :fullscreen="true" class="container">
        <ion-row>
            <ion-img
            class="w-1/6 h-1/6 mx-auto"
            src="\images\icons\audioflow-logo.png"
            alt="Logo AudioFlow"
            ></ion-img> 
          </ion-row>
            <ion-row>  
              <h1 class="text-[40px] text-white font-bold mx-auto my-0">AudioFlow</h1>
            </ion-row>
            <ion-row>
              <h5 class="text-white mx-auto my-0">Your Melody, Your Mood.</h5>
            </ion-row>
        <br />
        <h2 class="text-3xl text-white font-bold text-center mx-auto my-0">Registro</h2>
        <form @submit.prevent="addUser">
          <ion-row responsive-sm class="ion-padding">
            <ion-row>
              <ion-label class="text-white text-sm relative text-center indent-8 font-mono">NOMBRE DE USUARIO</ion-label>
              <ion-input
                mode="md"
                v-model="formData.username"
                id="username"
                name="username"
                type="text"
                fill="outline"
                autocapitalize="off"
                :class="{ 'border-red-500': errors.username }" 
                class="bg-gray-200 border border-transparent rounded-[1.25rem]  w-5/6 mx-auto opacity-80 min-w-[280px]">
              </ion-input>
              <p v-if="errors.username" class="text-sm text-center text-[#ff0000] font-[bold] mx-auto my-0">{{ errors.username[0] }}</p>
            </ion-row>
          
            <ion-row>
              <ion-label class="text-white text-sm relative text-center indent-8 font-mono">CORREO ELECTRÓNICO</ion-label>
              <ion-input
                mode="md"
                v-model="formData.email"
                name="email"
                fill="outline" 
                :class="{ 'border-red-500': errors.email }"
                class="bg-gray-200 border border-transparent rounded-[1.25rem] w-5/6 mx-auto opacity-80 min-w-[280px]">
              </ion-input> 
              <p v-if="errors.email" class="text-sm text-center text-[#ff0000] font-[bold] mx-auto my-0">{{ errors.email[0] }}</p>
            </ion-row>
            <ion-row>
              <ion-label class="text-white text-sm relative text-center indent-8 font-mono">CONTRASEÑA</ion-label>
              <ion-input
                mode="md"
                v-model="formData.password"
                name="password"
                type="password"
                fill="outline"
                autocapitalize="off"
                :class="{ 'border-red-500': errors.password }"
                class="bg-gray-200 border border-transparent rounded-[1.25rem] w-5/6 mx-auto opacity-80 min-w-[280px]"></ion-input>
              <p v-if="errors.password" class="text-sm text-center text-[#ff0000] font-[bold] mx-auto my-0">{{ errors.password[0] }}</p>
            </ion-row>
            <ion-row>
              <ion-label class="text-white text-sm relative text-center indent-8 font-mono">CONFIRMAR CONTRASEÑA</ion-label>
              <ion-input
                mode="md"
                v-model="formData.confirmPassword"
                name="confirmPassword"
                type="password"
                fill="outline"
                autocapitalize="off"
                :class="{ 'border-red-500': errors.confirmPassword }"
                class="bg-gray-200 border border-transparent rounded-[1.25rem] w-5/6 mx-auto opacity-80 min-w-[280px]">
              </ion-input>
              <p v-if="errors.confirmPassword" class="text-sm text-center text-[#ff0000] font-[bold] mx-auto my-0">{{ errors.confirmPassword }}</p>
            </ion-row>
          </ion-row>
          <ion-row responsive-sm class="ion-padding">
            <ion-col>
              <ion-button 
                  class="w-4/5 mx-auto font-bold text-white border border-white border-4 rounded-2xl"
                  type="submit" 
                  expand="block" 
                  fill="outline"
                >Registrarse</ion-button>
                <p class="text-white text-base text-center">¿Ya tienes cuenta? <router-link to ="" class="underline font-[bold];">Ingresa aquí</router-link></p>
            </ion-col>
          </ion-row>
        </form>
      </ion-content>
    </ion-page>
</template>

    
    <script setup lang="ts">
    import {IonContent, IonPage, IonImg, IonRow, IonInput,IonButton,IonCol, IonLabel } from '@ionic/vue';
    import { ref } from 'vue';
    import apiClient from '@/services/api'

    interface FormData {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    }
    
    interface Errors {
      [key: string]: string;
    }
    
    const formData = ref<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const errors = ref<Errors>({});
    
    async function addUser(): Promise<void> {
      errors.value = {};
      if (formData.value.password != formData.value.confirmPassword) {
        errors.value.confirmPassword = "Las contraseñas no coinciden";
        return;
      } try {
        const { confirmPassword, ...dataToSend } = formData.value;
        const response = await apiClient.post('/user/', dataToSend);
      } catch (error: any) {
        if(error.response && error.response.data.error) {
          const zodErrors = error.response.data.error.issues;
          const mappedErrors: Record<string, any> = {};
          zodErrors.forEach((err: any) => {
            const fieldName = err.path[0];

            if (!mappedErrors[fieldName]) {
              mappedErrors[fieldName] = [];
            }
            mappedErrors[fieldName].push(err.message);
            });
            errors.value = mappedErrors;
        }
      }
    };

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
    