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
            <h1>AudioFlow</h1>
            <h5>Your Melody, Your Mood.</h5>
            </ion-row>
        <br />
        <form @submit="addUser">
          <h2>Registro</h2>
          <ion-row responsive-sm class="ion-padding">
            <h6>NOMBRE DE USUARIO</h6>
            <ion-input
            class="input"
            mode="md"
            v-model="username"
            name="username"
            type="text"
            spellcheck="false"
            fill="outline"
            autocapitalize="off"
            required
            ></ion-input>
          
            <h6>CORREO ELECTRÓNICO</h6>
            <ion-input
            class="input"
            mode="md"
            v-model="email"
            name="email"
            type="email"
            fill="outline" 
            required
            ></ion-input> 

            <h6>CONTRASEÑA</h6>
           <ion-input
            class="input"
            mode="md"
            v-model="password"
            name="password"
            type="password"
            fill="outline" 
            required
            ></ion-input></ion-row>
  
          <ion-row responsive-sm class="ion-padding">
            <ion-col>
              <ion-button 
                  class="login-button"
                  type="submit" 
                  expand="block" 
                  fill="outline"
                >Registrarse</ion-button>
                <h4>¿Ya tienes cuenta? Ingresa aquí</h4>
            </ion-col>
          </ion-row>
        </form>
      </ion-content>
    </ion-page>
</template>
  
    
    <script setup lang="ts">
    import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonImg, IonRow, IonInput,IonButton,IonCol } from '@ionic/vue';
    import { ref } from 'vue';

    const username = ref('');
    const email = ref('');
    const password = ref('');

    const addUser = (event) => {
      console.log('addUser fue llamado');
      event.preventDefault();
      // Verifica si el formulario se envió correctamente
      if (username.value && email.value && password.value) {
      // Realiza alguna acción con los datos
      console.log("Formulario enviado");
      console.log(username.value);
      console.log(email.value);
      console.log(password.value);

      // Limpia los campos después del envío si es necesario
      username.value = '';
      email.value = '';
      password.value = '';
      } else {
        // Muestra un mensaje de error si algún campo está vacío
        console.error("Por favor completa todos los campos.");
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
    }
    .login-button {
      width:85%;
      margin: 0 auto;
      font-weight: bold;
      color: #ffffff;
      --border-color: #ffffff;
      --border-width: 3px;
      
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
    h6 {
      font-size: 15px;
      position:relative;
      left: 30px;
      color: #ffffff;
    }
    h4 {
      color: #ffffff;
      font-size: 15px;
      text-align: center;
    }
  
    .display {
      width: 15%;
      height: 15%;
      margin: 0 auto;
    }
    
    </style>
    