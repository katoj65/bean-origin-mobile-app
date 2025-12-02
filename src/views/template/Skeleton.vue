<script setup>
import {IonSkeletonText} from "@ionic/vue";
</script>
<template>
<div>
<ion-skeleton-text :animated="true" style="width: 30%;"></ion-skeleton-text>
<ion-skeleton-text :animated="true" style="width: 40%;"></ion-skeleton-text>
<ion-skeleton-text :animated="true" style="width: 50%;"></ion-skeleton-text>
</div>
</template>
<style scoped>
ion-skeleton-text{
border-radius:20px;
height:15px;
}
</style>