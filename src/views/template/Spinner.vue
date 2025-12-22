<template>
<div class="spinner-container">
<ion-spinner name="crescent" v-if="props.isLoading==true" class="coffee-spinner"></ion-spinner>
</div>
</template>

<script setup>
import { IonSpinner } from '@ionic/vue';
import { defineProps} from 'vue';

const props=defineProps({
isLoading:Boolean,
});




</script>

<style scoped>
.spinner-container {
display: flex;
justify-content: center;
align-items: center;
}

.coffee-spinner {
--color: #6b4226;
width: 40px;
height: 40px;
}
</style>