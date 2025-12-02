<script setup>
import { useRouter } from 'vue-router';
import { ellipsisVertical, search, } from 'ionicons/icons';
import { IonButton, IonButtons, IonIcon,} from '@ionic/vue';




const router = useRouter();
function navigateToOptions() {
router.push('/options');
}   

function profileNav(){
router.push('/profile');
}



</script>
<template>
<div>
<ion-button @click="navigateToOptions">
<ion-icon slot="icon-only" :icon="search" class="icon"></ion-icon>
</ion-button>
<ion-button @click="profileNav">
<ion-icon slot="icon-only" :md="ellipsisVertical" class="icon"></ion-icon>
</ion-button> 
</div>
</template>