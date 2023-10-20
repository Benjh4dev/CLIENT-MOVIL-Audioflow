Claro, puedes crear una vista de inicio de sesión (`LoginView.vue`) con un estilo similar al de la vista de registro. Aquí tienes el código:

```vue
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
        <ion-row responsive-sm class="ion-padding">
          <ion-row>
            <ion-label class="text-white text-sm relative text-center indent-8 font-normal">NOMBRE DE USUARIO</ion-label>
            <ion-input
              mode="md"
              v-model="formData.username"
              id="username"
              name="username"
              type="text"
              fill="outline"
              autocapitalize="off"
              class="bg-gray-200 text-black border border-transparent rounded-[1.25rem] w-5/6 mx-auto opacity-80 min-w-[280px]"
            ></ion-input>
          </ion-row>

          <ion-row>
            <ion-label class="text-white text-sm relative text-center indent-8 font-normal">CONTRASEÑA</ion-label>
            <ion-input
              mode="md"
              v-model="formData.password"
              name="password"
              type="password"
              fill="outline"
              autocapitalize="off"
              class="bg-gray-200 text-black border border-transparent rounded-[1.25rem] w-5/6 mx-auto opacity-80 min-w-[280px]"
            ></ion-input>
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
            <p class="pt-2 text-white text-base text-center">¿No tienes cuenta? <router-link to="/registro" class="underline font-bold">Regístrate aquí</router-link></p>
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

interface FormData {
  username: string;
  password: string;
}

const formData = ref<FormData>({
  username: '',
  password: '',
});

async function loginUser(): Promise<void> {
  // Aquí puedes agregar la lógica para autenticar al usuario
  // Por ejemplo, enviar una solicitud al servidor para verificar las credenciales.
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

En este código, he creado una vista de inicio de sesión con campos de "Nombre de Usuario" y "Contraseña". Debes agregar la lógica para autenticar al usuario en la función `loginUser`. Además, he incluido un enlace para redirigir a los usuarios a la vista de registro si no tienen una cuenta.

Asegúrate de que los estilos y la estructura coincidan con la vista de registro para mantener la coherencia en la apariencia de tu aplicación.