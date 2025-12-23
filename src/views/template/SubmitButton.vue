<template>
<div>
<ion-button
expand="block">
<ion-spinner v-if="props.isLoading==true" style="color:white;"></ion-spinner>
<span v-else>
{{ title }}
</span>
</ion-button>
</div>
</template>
<script setup>
import { IonButton,IonSpinner } from '@ionic/vue';
const props=defineProps({
isLoading:Boolean,
title:String
});
</script>
