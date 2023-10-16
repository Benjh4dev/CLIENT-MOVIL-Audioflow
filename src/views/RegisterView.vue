<template>
    <ion-page>
      <ion-content :fullscreen="true" class="container">
        <ion-row>
            <ion-img
            class="display"
            src="\images\icons\audioflow-logo.png"
            alt="Logo AudioFlow"
            ></ion-img> 
          </ion-row>
            <ion-row>  
            <h1>AudioFlow</h1></ion-row>
            <ion-row>
            <h5>Your Melody, Your Mood.</h5></ion-row>
        <br />
        <h2>Registro</h2>
        <form @submit.prevent="addUser">
          <ion-row responsive-sm class="ion-padding">
            <ion-row>
              <ion-label class="label" position="stacked">NOMBRE DE USUARIO</ion-label>
              <ion-input
              class="input"
              mode="md"
              v-model="formData.username"
              name="username"
              type="text"
              fill="outline"
              autocapitalize="off"
              required>
              </ion-input>
              <p v-if="errors.username" class="error">{{ errors.username[0] }}</p>
            </ion-row>
          
            <ion-row>
              <ion-label class="label" position="stacked">CORREO ELECTRÓNICO</ion-label>
              <ion-input
              class="input"
              mode="md"
              v-model="formData.email"
              name="email"
              type="email"
              fill="outline" 
              required></ion-input> 
              <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
            </ion-row>
            <ion-row>
              <ion-label class="label" position="stacked">CONTRASEÑA</ion-label>
              <ion-input
              class="input"
              mode="md"
              v-model="formData.password"
              name="password"
              type="password"
              fill="outline"
              autocapitalize="off"
              required></ion-input>
              <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
            </ion-row>
            <ion-row>
              <ion-label class="label" position="stacked">CONFIRMAR CONTRASEÑA</ion-label>
              <ion-input
              class="input"
              mode="md"
              v-model="formData.confirmPassword"
              name="confirmPassword"
              type="password"
              fill="outline"
              autocapitalize="off"
              required></ion-input>
              <p v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</p>
            </ion-row>
          </ion-row>
          <ion-row responsive-sm class="ion-padding">
            <ion-col>
              <ion-button 
                  class="login-button"
                  type="submit" 
                  expand="block" 
                  fill="outline"
                >Registrarse</ion-button>
                <h4>¿Ya tienes cuenta? <router-link to ="" class="link">Ingresa aquí</router-link></h4>
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
  
    .input {
    --border-width: 0px;
    background-color: rgb(217, 217, 238);
    border-radius: 15px;
    width: 85%;
    margin: 0 auto;
    opacity: 80%;
    min-width: 280px;
    }
    .login-button {
      width:85%;
      margin: 0 auto;
      font-weight: bold;
      color: #ffffff;
      --border-color: #ffffff;
      --border-width: 3px;
      
    }
    .link {
      color:white;
      font-weight: bold;
    }
    h1 {
      font-size: 40px;
      color: #ffffff;
      font-weight:bold;
      margin: 0 auto;
      
    }
    h2 {
      font-size: 30px;
      color: #ffffff;
      font-weight:bold;
      margin: 0 auto;
      text-align: center;
      
    }
    h5 {
      color:#ffffff;
      margin: 0 auto;
    }
    .label {
      font-size: 14px;
      position:relative;
      left: 30px;
      color: #ffffff;
    }
    h4 {
      color: #ffffff;
      font-size: 16px;
      text-align: center;
    }
  
    .display {
      width: 15%;
      height: 15%;
      margin: 0 auto;
    }
    .error {
      font-size: 14px;
      text-align: center;
      color: #ff0000;
      margin: 0 auto;
      font-weight: bold;
    }
    
    </style>
    