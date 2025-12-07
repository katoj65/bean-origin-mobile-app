<template>
<ion-header>
<ion-toolbar>

<!-- Left: Logo -->
<ion-buttons slot="start">
<div class="header-logo-wrapper">
<img :src="logo" :alt="title" class="header-logo" />
</div>
</ion-buttons>

<!-- Center: Title -->
<ion-title class="header-title">
{{ title }}
</ion-title>

<!-- Right: Search Icon -->
<ion-buttons slot="end">
<ion-button @click="handleSearch" class="search-button">
<ion-icon :icon="searchOutline" slot="icon-only"></ion-icon>
</ion-button>
</ion-buttons>

</ion-toolbar>
</ion-header>
</template>

<script setup>
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { searchOutline } from 'ionicons/icons';

// Props
const props = defineProps({
logo: {
type: String,
default: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&q=80'
},
title: {
type: String,
default: 'Bean Origin'
}
});

// Emits
const emit = defineEmits(['search']);

// Methods
const handleSearch = () => {
emit('search');
};
</script>

<style scoped>
/* ===== TOOLBAR ===== */
ion-toolbar {
--background: #ffffff;
--border-width: 0;
--padding-top: 8px;
--padding-bottom: 8px;
--min-height: 64px;
}

/* ===== LOGO ===== */
.header-logo-wrapper {
display: flex;
align-items: center;
justify-content: center;
width: 40px;
height: 40px;
border-radius: 50%;
overflow: hidden;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
margin-left: 8px;
}

.header-logo {
width: 100%;
height: 100%;
object-fit: cover;
}

/* ===== TITLE ===== */
.header-title {
font-size: 18px;
font-weight: 800;
color: #1a1a1a;
letter-spacing: -0.3px;
text-align: center;
}

/* ===== SEARCH BUTTON ===== */
.search-button {
--color: #6b4423;
--border-radius: 12px;
--padding-start: 8px;
--padding-end: 8px;
}

.search-button ion-icon {
font-size: 24px;
}

/* ===== RESPONSIVE ===== */
@media (min-width: 768px) {
ion-toolbar {
--min-height: 72px;
}

.header-logo-wrapper {
width: 44px;
height: 44px;
}

.header-title {
font-size: 20px;
}

.search-button ion-icon {
font-size: 26px;
}
}
</style>