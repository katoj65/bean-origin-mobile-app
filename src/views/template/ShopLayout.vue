<script setup>
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonFooter, IonButtons, IonAvatar,IonItem, IonLabel} from '@ionic/vue';
import { defineProps } from 'vue';

const props = defineProps({
title:String,  
subtitle:String,
image:String
});



</script>
<template>
<ion-page>
<ion-header translucent class="header ion-no-border">
<ion-toolbar style="padding-top:30px;">
<!-- TITLE -->
<ion-title style="font-weight:bold;text-transform: capitalize;">
<ion-item class="item">
<!-- <ion-avatar slot="start" v-if="image">
<img :alt="title" :src="image"/>
</ion-avatar> -->
<ion-label style="font-size:20px;font-weight:bold;text-transform: capitalize;"> 
<div> {{ title }} </div>
<p style="color:white;font-weight: normal;">  
<!-- {{ subtitle }} -->
</p>
</ion-label>
</ion-item>


<!-- {{ title }} -->


</ion-title>
<!-- RIGHT ICONS -->
<ion-buttons slot="end" class="button">
<slot name="header-buttons"/>
</ion-buttons>
</ion-toolbar>
</ion-header>





<ion-content :fullscreen="true" style="--background:#f2f2f2;">
<ion-header translucent class="header ion-no-border" collapse="condense">
<ion-toolbar style="padding-top:30px;">
<!-- TITLE -->
<ion-title style="font-weight:bold;">{{ title }} </ion-title>
<!-- RIGHT ICONS -->
<ion-buttons slot="end" class="button">
<!-- <ion-button>
<ion-icon :icon="search"/>
</ion-button>
<ion-button>
<ion-icon :icon="ellipsisVertical"/>
</ion-button> -->
<slot name="header-buttons"/>
</ion-buttons>

</ion-toolbar>
</ion-header>

<slot name="content"/>


</ion-content>
<ion-footer class="ion-no-border" style="background:#f2f2f2;">
<slot name="footer"/>
</ion-footer>
</ion-page> 
</template>
<style scoped>
.button{
color:white
}
ion-item{
--background: #6B4226;
--color: #fff;
--detail-icon-color: white;
--detail-icon-opacity: 1;
--detail-icon-font-size: 20px;
--color:white;
}
.icon{
color:white;
}
p{
color:white;
}

</style>