<template>
<ion-page>

<ion-header>
<ion-toolbar>
<ion-buttons slot="end" >
<ion-button>
<ion-icon slot="icon-only" :icon="locationOutline" class="icon"></ion-icon>
</ion-button>
</ion-buttons>
<ion-title>
<ion-item class="item">
<ion-avatar slot="start">
<img alt="Silhouette of a person's head" src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400" />
</ion-avatar>
<ion-label style="font-size:20px;font-weight:bold;"> 
<div>Cafe Javas</div>
<p style="color:white;font-weight: normal;">  
12 km away
</p>
</ion-label>
</ion-item>
</ion-title>
</ion-toolbar>
</ion-header>



<ion-content class="ion-padding">
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>

<p>Here's a small text description for the content. Nothing more, nothing less.</p>
</ion-content>
<ion-footer>
<ion-toolbar>
<ion-title> Footer </ion-title>
</ion-toolbar>
</ion-footer>
</ion-page>
</template>

<script setup lang="ts">
import {IonPage, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar, IonAvatar,IonItem, IonLabel,IonButtons,IonIcon,IonButton  } from '@ionic/vue';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, search, personCircle, star,locationOutline } from 'ionicons/icons';
</script>

<style>
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