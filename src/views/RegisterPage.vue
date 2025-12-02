<template>
<ion-page class="bg">
<ion-content :fullscreen="true">
<div class="bg ion-padding main-container" style="padding-top:70px;">

<ion-img src="/icon.png" alt="icon" class="logo"></ion-img>

<strong class="title">BEAN ORIGIN</strong>
<p class="subtitle">From farm to cup, transparently.</p>

<!-- FORM (NO ion-list, NO ion-item) -->
<form class="form-box" @submit.prevent="submit">
<label class="label">First Name</label>
<ion-input 
type="text" 
placeholder="Enter first name"
class="input" 
v-model="form.fname">
</ion-input>

<label class="label">Last Name</label>
<ion-input 
type="text" 
placeholder="Enter last name"
class="input" 
v-model="form.lname">
</ion-input>

<label class="label">Email Address</label>
<ion-input 
type="email" 
placeholder="Enter email"
class="input" 
v-model="form.email">
</ion-input>

<label class="label">Password</label>
<ion-input 
type="password" 
placeholder="Enter password"
class="input" 
v-model="form.password">
</ion-input>

<ion-button 
expand="block" 
class="login-btn" 
type="submit">
SIGN UP
</ion-button>

<p class="subtitle link-text" @click="goToLogin">
Already have an account? Login
</p>

</form>

</div>
</ion-content>
</ion-page>
</template>

<script setup>
import { Preferences } from '@capacitor/preferences';
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import AuthenticationService from '../service/AuthenticationService';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonInput, IonButton, 
} from '@ionic/vue';

const router = useRouter();

const form = reactive({
  fname: 'joshua',
  lname: 'kato',
  email: 'katoj65@gmail.com',
  password: '0987654321'
});

const isLoading = ref(false);
const error = ref(null);

// Methods
function goToLogin() {
  router.push({ name: 'Home' });

  // or if you don't have a named route:
  // router.push('/login');
}



async function submit() {
error.value = null;
if(!form.fname || !form.lname || !form.email || !form.password) {
error.value = 'Please fill in all fields.';
return;
}else{


try{

isLoading.value = true;

const authService = new AuthenticationService();
//create account

const response = await authService.register(form);
if(response.error===null){

//login
const loginResponse = await authService.login(form);
if(loginResponse.error===null){

//get user details
let loggedIn=loginResponse.data;
loggedIn=loggedIn.user;
const id=loggedIn.id;

//create user object
let user=JSON.stringify({
fname:form.fname,
lname:form.lname,
email:form.email,
id:id
});

Preferences.set({key:'user',value:user});
router.push({ name: 'CreateProfile' });

}else{
error.value = 'Login after registration failed. Please try logging in.';
}


}else{
error.value ='Email already in use. Please use a different email.';
}

}catch(e){
console.error(e);
error.value = 'Registration failed. Please try again.'; 
}finally{
isLoading.value = false;
}









}








}
</script>

<style scoped>
/* ===== Background ===== */
.bg {
  background-color: #6B4226;
  color: white;
  height: 100%;
}

.header::part(background) {
  background-color: #6B4226 !important;
}

.header ion-title {
  color: white;
}

/* ===== Layout ===== */
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  height: 150px;
  margin-bottom: 10px;
}

.title {
  font-size: 30px;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 16px;
  margin-top: 4px;
  color: #f0e68c;
}

.link-text {
  margin-top: 20px;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
  text-decoration:none;
}

.link-text:hover {
  color: #fff;
}

/* ===== Form ===== */
.form-box {
  width: 90%;
  max-width: 380px;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
}

.label {
  color: #f0e6d2;
  margin-top: 12px;
  margin-bottom: 4px;
  font-size: 14px;
}

/* ===== Inputs ===== */
ion-input.input {
  --background: transparent;
  --color: #fff;
  --placeholder-color: #ddd;
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  border: solid thin #fff;
  border-radius: 6px;
  margin-bottom: 14px;
}

/* ===== Button ===== */
.login-btn {
  margin-top: 10px;
  --background: #A87B54;
  --background-hover: #9d7045;
  --background-activated: #8b5f38;
  --color: white;
  --border-radius: 6px;
  height: 48px;
  font-weight: bold;
  letter-spacing: 1px;
}

.login-btn:disabled {
  opacity: 0.5;
}

/* Remove the blue underline from ion-input (Material Design mode) */
ion-input {
  --highlight-color-focused: transparent !important;
  --highlight-color: transparent !important;
  --highlight-width: 0 !important;
}

/* Remove shadow/underline drawn by the native input part */
ion-input::part(native) {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}

/* Remove MD underline element that Ionic inserts inside ion-input */
ion-input::part(container) {
  border-bottom: none !important;
  box-shadow: none !important;
}

/* For some IOS/Android builds, Ionic adds <div class="input-bottom"> */
.input-bottom {
  display: none !important;
}

/* If ion-input is inside ion-item, remove that underline too */
ion-item::part(native) {
  --border-width: 0 !important;
  border: none !important;
  box-shadow: none !important;
}
</style>