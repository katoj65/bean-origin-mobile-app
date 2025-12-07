<template>
<div class="location-page">

<!-- Map Container (Full Screen) -->
<div class="map-container">
<div class="map-view" @click="openInMaps">
<!-- Map Placeholder with Pin -->
<div class="map-placeholder">
<div class="map-grid"></div>
<div class="location-pin">
<ion-icon :icon="locationSharp"></ion-icon>
</div>
</div>
</div>

<!-- Map Label -->
<div class="map-label" style="margin-top:20px;">
<ion-icon :icon="navigateOutline"></ion-icon>
<span>{{ shop.distance }} away</span>
</div>
</div>

<!-- Floating Header -->
<div class="floating-header">
<button class="back-button" @click="goBack">
<ion-icon :icon="arrowBackOutline"></ion-icon>
</button>
<button class="favorite-button" :class="{ active: isFavorite }" @click="toggleFavorite">
<ion-icon :icon="isFavorite ? heart : heartOutline"></ion-icon>
</button>
</div>

<!-- Bottom Sheet -->
<div class="bottom-sheet">
<!-- Shop Info -->
<div class="shop-info">
<h1 class="shop-name">{{ shop.name }}</h1>
<p class="shop-address">{{ shop.address }}</p>
</div>



</div>

</div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import {IonIcon} from '@ionic/vue';
import {
arrowBackOutline,
heart,
heartOutline,
locationSharp,
navigateOutline,
navigateCircleOutline,
timeOutline,
callOutline,
locationOutline,
copyOutline,
} from 'ionicons/icons';
import { defineProps } from 'vue';




const props=defineProps({

});
const router = useRouter();
const isFavorite = ref(false);

const shop = reactive({
name: 'Brew & Beans Coffee',
address: '123 Coffee Street, Downtown',
fullAddress: '123 Coffee Street, Downtown District, City Center, 12345',
distance: '3.2 km',
hours: '7:00 AM - 8:00 PM',
phone: '(555) 123-4567',
coordinates: {
lat: 40.7128,
lng: -74.0060,
},
});

const goBack = () => router.back();
const toggleFavorite = () => isFavorite.value = !isFavorite.value;
const openInMaps = () => {
// Open in Google Maps or Apple Maps
const url = `https://maps.google.com/?q=${shop.coordinates.lat},${shop.coordinates.lng}`;
window.open(url, '_blank');
};
const getDirections = () => {
console.log('Getting directions');
openInMaps();
};
const callShop = () => {
window.open(`tel:${shop.phone}`);
};
const copyAddress = () => {
navigator.clipboard.writeText(shop.fullAddress);
console.log('Address copied');
};
</script>

<style scoped>
/* ===== BASE ===== */
.location-page {
position: relative;
min-height: 100vh;
background: #faf8f5;

}

/* ===== MAP CONTAINER (FULL SCREEN) ===== */
.map-container {
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
z-index: 1;
}

.map-view {
width: 100%;
height: 100%;
cursor: pointer;
}

.map-view:active {
opacity: 0.95;
}

.map-placeholder {
position: relative;
width: 100%;
height: 100%;
background: linear-gradient(135deg, #e8f4f8, #d4e8ef);
}

.map-grid {
position: absolute;
inset: 0;
background-image: 
linear-gradient(rgba(107, 68, 35, 0.05) 1px, transparent 1px),
linear-gradient(90deg, rgba(107, 68, 35, 0.05) 1px, transparent 1px);
background-size: 40px 40px;
}

.location-pin {
position: absolute;
top: 40%;
left: 50%;
transform: translate(-50%, -100%);
width: 70px;
height: 70px;
display: flex;
align-items: center;
justify-content: center;
background: linear-gradient(135deg, #ef4444, #dc2626);
border-radius: 50% 50% 50% 0;
box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
animation: pin-bounce 2s ease-in-out infinite;
}

@keyframes pin-bounce {
0%, 100% {
transform: translate(-50%, -100%) scale(1);
}
50% {
transform: translate(-50%, -110%) scale(1.05);
}
}

.location-pin ion-icon {
font-size: 36px;
color: white;
margin-bottom: 10px;
}

.map-label {
position: absolute;
top: 80px;
top: calc(80px + env(safe-area-inset-top));
left: 20px;
display: flex;
align-items: center;
gap: 8px;
padding: 10px 16px;
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(10px);
border-radius: 20px;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
z-index: 10;
}

.map-label ion-icon {
font-size: 18px;
color: #6b4423;
}

.map-label span {
font-size: 14px;
font-weight: 800;
color: #2a2a2a;
}

/* ===== FLOATING HEADER ===== */
.floating-header {
position: fixed;
top: 20px;
top: calc(20px + env(safe-area-inset-top));
left: 20px;
right: 20px;
display: flex;
justify-content: space-between;
z-index: 100;
}

.back-button,
.favorite-button {
width: 44px;
height: 44px;
display: flex;
align-items: center;
justify-content: center;
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(10px);
border: none;
border-radius: 50%;
cursor: pointer;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;
}

.back-button:active,
.favorite-button:active {
transform: scale(0.9);
}

.back-button ion-icon,
.favorite-button ion-icon {
font-size: 24px;
color: #2a2a2a;
}

.favorite-button.active ion-icon {
color: #ef4444;
}

/* ===== BOTTOM SHEET ===== */
.bottom-sheet {
position: fixed;
bottom: 0;
left: 0;
right: 0;
background: white;
border-radius: 32px 32px 0 0;
padding: 24px 20px;
padding-bottom: calc(24px + env(safe-area-inset-bottom));
box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.12);
z-index: 50;
height:100px;
}

/* ===== SHOP INFO ===== */
.shop-info {
margin-bottom: 20px;
text-align: center;
}

.shop-name {
font-size: 24px;
font-weight: 900;
color: #1a1a1a;
margin: 0 0 8px 0;
letter-spacing: -0.5px;
line-height: 1.2;
}

.shop-address {
font-size: 15px;
font-weight: 600;
color: #8a8a8a;
margin: 0;
line-height: 1.4;
}

/* ===== DIRECTIONS BUTTON ===== */
.directions-button {
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
width: 100%;
padding: 18px;
background: linear-gradient(135deg, #6b4423, #4a2f18);
border: none;
border-radius: 16px;
font-size: 17px;
font-weight: 900;
color: white;
cursor: pointer;
box-shadow: 0 6px 20px rgba(107, 68, 35, 0.3);
transition: all 0.3s ease;
margin-bottom: 20px;
}

.directions-button:active {
transform: scale(0.98);
box-shadow: 0 8px 24px rgba(107, 68, 35, 0.4);
}

.directions-button ion-icon {
font-size: 26px;
}

/* ===== INFO ROW ===== */
.info-row {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 12px;
margin-bottom: 20px;
}

.info-item {
display: flex;
align-items: center;
gap: 12px;
padding: 16px;
background: #faf8f5;
border-radius: 16px;
cursor: pointer;
transition: all 0.3s ease;
}

.info-item:active {
transform: scale(0.98);
background: #f5f3f0;
}

.info-icon {
width: 44px;
height: 44px;
display: flex;
align-items: center;
justify-content: center;
background: linear-gradient(135deg, rgba(107, 68, 35, 0.1), rgba(107, 68, 35, 0.05));
border-radius: 50%;
flex-shrink: 0;
}

.info-icon ion-icon {
font-size: 22px;
color: #6b4423;
}

.info-text {
display: flex;
flex-direction: column;
gap: 4px;
flex: 1;
}

.info-label {
font-size: 11px;
font-weight: 800;
color: #8a8a8a;
text-transform: uppercase;
letter-spacing: 0.5px;
}

.info-value {
font-size: 14px;
font-weight: 700;
color: #2a2a2a;
line-height: 1.3;
}

/* ===== ADDRESS CARD ===== */
.address-card {
padding: 18px;
background: #faf8f5;
border-radius: 16px;
}

.address-header {
display: flex;
align-items: center;
gap: 10px;
margin-bottom: 10px;
}

.address-header ion-icon {
font-size: 20px;
color: #6b4423;
}

.address-header span {
font-size: 15px;
font-weight: 800;
color: #1a1a1a;
}

.full-address {
font-size: 14px;
font-weight: 500;
color: #5a5a5a;
line-height: 1.6;
margin: 0 0 14px 0;
}

.copy-button {
display: flex;
align-items: center;
justify-content: center;
gap: 8px;
width: 100%;
padding: 12px;
background: white;
border: none;
border-radius: 12px;
font-size: 14px;
font-weight: 800;
color: #6b4423;
cursor: pointer;
transition: all 0.3s ease;
}

.copy-button:active {
background: #f5f3f0;
transform: scale(0.98);
}

.copy-button ion-icon {
font-size: 18px;
}

/* ===== RESPONSIVE ===== */
@media (min-width: 768px) {
.bottom-sheet {
max-width: 600px;
left: 50%;
transform: translateX(-50%);
}

.floating-header {
max-width: 600px;
left: 50%;
transform: translateX(-50%);
right: auto;
width: calc(100% - 40px);
}

.map-label {
left: 50%;
transform: translateX(calc(-50% + 270px));
}
}
</style>