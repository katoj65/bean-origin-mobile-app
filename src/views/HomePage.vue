<template>
<ion-page class="bg">
<ion-content :fullscreen="true">
<div class="bg ion-padding main-container" style="padding-top:50px;">

<ion-img src="./icon.png" alt="icon" class="logo"></ion-img>

<strong class="title">BEAN ORIGIN</strong>
<p class="subtitle">From farm to cup, transparently.</p>

<!-- FORM (NO ion-list, NO ion-item) -->
<form class="form-box" @submit.prevent="submit">

<label class="label">Email Address</label>
<ion-input 
type="email" 
placeholder="Enter email"
class="input" v-model="form.email">
</ion-input>

<label class="label">Password</label>
<ion-input 
type="password" 
placeholder="Enter password"
class="input" v-model="form.password">
</ion-input>

<ion-button expand="block" type="submit" class="login-btn">
LOGIN
</ion-button>


<p class="subtitle" style="margin-top:20px;text-align: center;font-size: 15px;" @click="registerNav">Create a new account</p>

</form>

</div>
</ion-content>
</ion-page>
</template>

<script setup>
import { ref,reactive } from 'vue';
import { 
IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg,
IonInput, IonButton
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import AuthenticationService from '@/service/AuthenticationService';
import { Preferences } from '@capacitor/preferences';




const router = useRouter();

function registerNav(){
router.push({ name: 'Register' });
}


const error=ref(null);
const form=reactive({
email:'katoj65@gmail.com',
password:'0987654321'
});

const isLoading=ref(false);
const submit = async ()=>{
if(!form.email || !form.password){
error.value='Fill in all fields';
return;
}else{


try{
isLoading.value=true;
const auth=new AuthenticationService();
const response=await auth.login(form);
if(response.error===null){

let id=response.data.user;
id=id.id;


let data=response.data;
const email=data.user.email;

let profile = await auth.getProfile(email);
if(profile.error===null){
profile=profile.data;


//create user profile
let account='';
profile.forEach(element => {
account={
id:id,
fname:element.fname,
email:element.email,
gender:element.gender,
dob:element.dob,
status:element.status,
role:element.role,
address:element.address,
}
});

account=JSON.stringify(account);
Preferences.set({key:'account',value:account});
Preferences.set({key:'app_status',value:'active'});

//Move to dashboard
router.push('/dashboard-buyer')

}else{
error.value='Could not fetch user profile';
console.log(profile.error);
}

}else{
console.log(error);
error.value='Invalid email address or password';
}


}catch(err){
console.log(err);
}finally{
isLoading.value=false;
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
