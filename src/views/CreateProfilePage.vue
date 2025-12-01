<script setup>
import { Preferences } from '@capacitor/preferences';
import AuthebticationService from '../service/AuthenticationService';
import { useRouter } from 'vue-router';
import AppLayout from './template/AppLayout.vue';
import { reactive,ref, onMounted, computed} from 'vue';
import {IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,  IonButton, IonAvatar,
IonList,
IonItem,
IonLabel,
IonInput,
IonSelect,
IonSelectOption
} from '@ionic/vue';
import Header from './template/Header.vue';










const router = useRouter();
const form = reactive({ 
gender:'male',
dob:'30/11/1990',
tel:'0752567534',
location:'kampala'
});

const isLoading= ref(false);
const error= ref(null);
const profile=ref({});

onMounted(async () => {

try{

isLoading.value = true;
let user = await Preferences.get({key:'user'}); 
user = JSON.parse(user.value);
profile.value=user;
}catch(error){
error.value = 'Failed to load user profile.';
console.log('Error loading profile:', error);
}finally{
isLoading.value = false;
}


}); 






async function submit(){
error.value = null;

if(!form.gender || !form.dob || !form.tel || !form.location) {
error.value = 'Please fill in all fields.';
console.log('Form Incomplete:', form);
return;
}else{

try{    


let user = await Preferences.get({key:'user'}); 
user = JSON.parse(user.value);

const input={
fname:user.fname,
lname:user.lname,
email:user.email,
gender:form.gender,
dob:form.dob,
tel:form.tel,
address:form.location,  
status:'active',
role:'user'
};

 //insert in to the database
 const authService = new AuthebticationService();
 const response = await authService.createProfile(input);
if(response.error===null){

//profile created successfully
if(response.status===201){
let account='';
response.data.forEach(element => {
account=element;    
});
//save profile locally
const item={
id:account.id,
fname:account.fname,
email:account.email,
tel:account.tel,
status:account.status,
role:account.role
};

await Preferences.set({key:'account',value:JSON.stringify(account)});
await Preferences.remove({key:'user'});
await Preferences.set({key:'app_status',value:'active'});
//navigate to dashboard
router.push({ name: 'DashboardBuyer' });

}else{
error.value = 'Profile creation failed. Please try again.';
console.log('Profile creation error:', response.error);
}


}else{
error.value = 'Profile creation failed. Please try again.';
console.log('Profile creation error:', response.error);
}


isLoading.value = true;


}catch(error){
error.value = 'Profile creation failed. Please try again.';
console.log('Error creating profile:', error);
}finally{
isLoading.value = false;
}

}















}





</script>
<template>
<app-layout title="Create Profile">

<template #content>
<form style="padding:10px;" @submit.prevent="submit">
<ion-card class="profile-card ion-no-border" style="box-shadow:none;">
<ion-card-header>
<ion-avatar class="avatar">
<img src="/user.png" alt="User Avatar">
</ion-avatar>
<ion-card-title>{{ profile.fname +' '+profile.lname}} </ion-card-title>
<ion-card-subtitle>{{ profile.email }} </ion-card-subtitle>
</ion-card-header>

<ion-card-content style="padding:0;">

<ion-list>
<ion-item lines="none">
<ion-label position="stacked">Gender</ion-label>
<ion-select placeholder="Select gender" class="input" v-model="form.gender">
<ion-select-option value="male">Male</ion-select-option>
<ion-select-option value="female">Female</ion-select-option>
<ion-select-option value="other">Other</ion-select-option>
</ion-select>
</ion-item>

<ion-item lines="none">
<ion-label position="stacked">Date of Birth</ion-label>
<ion-input type="date" class="input" v-model="form.dob"></ion-input>
</ion-item>

<ion-item lines="none">
<ion-label position="stacked">Telephone</ion-label>
<ion-input type="tel" placeholder="+256 700 000000" class="input" v-model="form.tel"></ion-input>
</ion-item>

<ion-item lines="none">
<ion-label position="stacked">Location</ion-label>
<ion-input placeholder="e.g. Kampala, Uganda" class="input" v-model="form.location"></ion-input>
</ion-item>
</ion-list>









</ion-card-content>
</ion-card>


<ion-button expand="block" class="edit-btn" style="margin-top:10px;" @click="submit">
Save
</ion-button>












</form>
</template>
</app-layout>
</template>

<style scoped>
.profile-card {
  max-width: 400px;
  margin: 0px auto;
  background-color:white;
  color: #fff;
  border-radius: 12px;
  box-shadow:none;
 
}

.profile-card ion-card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  
}

ion-card-title {
  font-size: 22px;
  font-weight: bold;
  color:#6B4226;
  text-transform: capitalize;
}

ion-card-subtitle {
  font-size: 14px;
  color:#A87B54;
  margin-bottom: 10px;
}

ion-card-content p {
  margin: 6px 0;
  font-size: 14px;
  color: #f0e6d2;
}

.edit-btn {
  --background: #A87B54;
  --background-hover: #9d7045;
  --background-activated: #8b5f38;
  --color: white;
  --border-radius: 6px;
  height: 44px;
  font-weight: bold;
  letter-spacing: 0.5px;
--box-shadow:none;

}




ion-input.input, ion-select.input {
  --background: transparent;
  --placeholder-color: black;
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  border: solid thin #D9A066;
  border-radius: 6px;
  margin-bottom: 14px;
  margin-top:10px;
}
</style>
