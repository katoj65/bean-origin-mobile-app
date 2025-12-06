<script setup>
import { useRouter } from 'vue-router';
import {locationSharp } from 'ionicons/icons';
import { IonButton, IonButtons, IonIcon,} from '@ionic/vue';




const router = useRouter();

function profileNav(){
router.push('/profile');
}

</script>
<template>
<div>
<ion-button @click="profileNav">
<ion-icon slot="icon-only" :md="locationSharp" class="icon"></ion-icon>
</ion-button> 
</div>
</template>