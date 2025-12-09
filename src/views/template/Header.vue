<script setup>
import { defineProps } from 'vue';
 import { IonHeader, IonTitle, IonToolbar,
 IonButton, IonButtons, IonIcon } from '@ionic/vue';
import { ellipsisHorizontal, search, } from 'ionicons/icons';
const props = defineProps({
title: String

});


</script>
<template>
<ion-header class="ion-no-border header" style="background:#6B4226;height:200px;">
<ion-toolbar style="padding-top:70px;">
<ion-buttons slot="end">
<ion-button>
<ion-icon slot="icon-only" :md="ellipsisVertical"></ion-icon>
</ion-button>
<ion-button>
<ion-icon slot="icon-only" :icon="search"></ion-icon>
</ion-button>
</ion-buttons>
<ion-title>
some title
</ion-title>
</ion-toolbar>
</ion-header>
</template>