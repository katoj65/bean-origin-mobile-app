<template>
<div>
<shop-header/>


<!-- AMENITIES CARD -->
<ion-card class="amenities-card">
<ion-card-header>
<ion-card-title>Amenities</ion-card-title>
</ion-card-header>
<ion-card-content>
<div class="amenities-grid">
<div v-for="(amenity, index) in amenities" :key="index" class="amenity-tile">
<div class="amenity-icon-container">
<ion-icon :icon="amenity.icon" class="amenity-icon"></ion-icon>
</div>
<ion-label>{{ amenity.text }}</ion-label>
</div>
</div>
</ion-card-content>
</ion-card>

<!-- ADDRESS CARD -->
<ion-card class="address-card">
<div class="coffee-beans-accent"></div>
<div class="address-content">
<div class="address-header">
<div class="location-badge">
<ion-icon :icon="locationOutline" class="badge-icon"></ion-icon>
</div>
<div class="address-info">
<ion-card-title class="address-title">Visit Our Roastery</ion-card-title>
<p class="address-subtitle">Freshly roasted daily</p>
</div>
</div>
<div class="address-details">
<p class="address-text">123 Coffee Bean Lane<br>Roastville, USA</p>
</div>
<div class="address-actions">
<ion-button expand="block" fill="solid" class="action-button-main">
<ion-icon slot="start" :icon="navigateCircleOutline"></ion-icon>
Get Directions
</ion-button>
</div>
</div>
</ion-card>
</div>

</template>

<script setup>
import { ref } from 'vue';
import ShopHeader from './ShopHeader.vue';
import Contact from './Contact.vue';
import {
IonCard,
IonCardHeader,
IonCardTitle,
IonCardContent,
IonIcon,
IonLabel,
IonButton,
} from '@ionic/vue';
import {
locationOutline,
wifi,
leafOutline,
flashOutline,
pawOutline,
cardOutline,
bicycleOutline,
navigateCircleOutline,
} from 'ionicons/icons';

const amenities = ref([
{ icon: wifi, text: 'Free Wi-Fi' },
{ icon: leafOutline, text: 'Outdoor Seating' },
{ icon: flashOutline, text: 'Power Outlets' },
{ icon: pawOutline, text: 'Pet Friendly' },
{ icon: cardOutline, text: 'Credit Cards' },
{ icon: bicycleOutline, text: 'Bike Parking' },
]);
</script>

<style scoped>
/* ===== VARIABLES ===== */
:root {
--coffee-dark: #4a2c2a;
--coffee-medium: #6b4226;
--coffee-light: #a87b54;
--cream: #faf8f5;
--cream-dark: #f5f1e8;
--text-dark: #2c1810;
--text-light: #8b7355;
--green: #10b981;
--red: #ef4444;
--gold: #d4af37;
}

/* ===== CONTACT CARD ===== */
.contact-card {
margin: 16px 0;
border-radius: 24px;
background: #fff;
box-shadow: none; /* Add a subtle shadow to distinguish the card */
overflow: hidden;
}

.contact-card ion-card-header {
padding: 24px 24px 8px;
}

.contact-card ion-card-title {
font-size: 20px;
font-weight: 700;
color: var(--text-dark);
}

.contact-card ion-card-content {
padding-bottom: 16px;
}

.contact-card ion-list {
background: transparent;
padding: 0;
}

.contact-card ion-item {
--background: white;
--padding-start: 24px;
--inner-padding-end: 24px;
margin-bottom: 0;
border-radius: 0;
box-shadow: none;
}

.contact-card ion-item:not(:last-child) {
border-bottom: 1px solid var(--cream-dark);
}

.contact-icon {
color: var(--coffee-light);
font-size: 22px;
margin-right: 16px;
}

.contact-card ion-label h3 {
font-size: 14px;
font-weight: 600;
color: var(--text-light);
margin: 0 0 4px;
}

.contact-card ion-label p {
font-size: 16px;
font-weight: 500;
color: var(--text-dark);
margin: 0;
}

.contact-card ion-label a {
color: var(--coffee-medium);
text-decoration: none;
transition: color 0.3s ease;
}

.contact-card ion-label a:hover {
color: var(--coffee-dark);
}

/* ===== AMENITIES CARD ===== */
.amenities-card {
margin: 16px 0;
border-radius: 28px;
background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
box-shadow: none;
overflow: visible;
}

.amenities-card ion-card-header {
padding: 24px 20px 16px;
}

.amenities-card ion-card-title {
font-size: 22px;
font-weight: 700;
color: #000000;
letter-spacing: -0.5px;
}

/* Updated styles for a more modern grid */
.amenities-card ion-card-content {
padding: 0 20px 24px;
}

.amenities-grid {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 16px;
}

.amenity-tile {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: #ffffff;
border-radius: 24px;
padding: 24px 12px;
text-align: center;
border: none;
box-shadow: none;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
position: relative;
}

.amenity-tile:hover {
transform: translateY(-6px) scale(1.02);
box-shadow: none;
}

.amenity-tile::before {
content: '';
position: absolute;
inset: 0;
border-radius: 24px;
padding: 1.5px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.15), rgba(168, 123, 84, 0.15));
-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
-webkit-mask-composite: xor;
mask-composite: exclude;
opacity: 0;
transition: opacity 0.3s ease;
}

.amenity-tile:hover::before {
opacity: 1;
}

/* Icon container */
.amenity-icon-container {
width: 64px;
height: 64px;
border-radius: 20px;
background: linear-gradient(135deg, #f8f6f3 0%, #f0ebe4 100%);
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 14px;
box-shadow: none;
transition: all 0.3s ease;
}

.amenity-tile:hover .amenity-icon-container {
transform: scale(1.1) rotate(5deg);
box-shadow: none;
}

.amenity-icon {
font-size: 30px;
color: var(--coffee-medium);
transition: color 0.3s ease;
}

.amenity-tile:hover .amenity-icon {
color: var(--coffee-dark);
}

.amenity-tile ion-label {
font-size: 13px;
font-weight: 600;
color: #000000;
line-height: 1.4;
letter-spacing: -0.2px;
}

/* ===== PRODUCT CATEGORIES ===== */
.categories-card {
margin: 16px 0;
border-radius: 28px;
background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
box-shadow: none;
overflow: visible;
}

.categories-card ion-card-header {
padding: 24px 20px 12px;
}

.categories-card ion-card-title {
font-size: 22px;
font-weight: 700;
color: #000000;
letter-spacing: -0.5px;
margin-bottom: 4px;
}

.categories-subtitle {
font-size: 14px;
font-weight: 500;
color: #6b4226;
margin: 0;
font-style: italic;
}

.categories-card ion-card-content {
padding: 16px 20px 24px;
}

.categories-grid {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 16px;
}

.category-item {
background: #ffffff;
border-radius: 20px;
overflow: hidden;
box-shadow: none;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
position: relative;
}

.category-item:hover {
transform: translateY(-4px);
}

.category-item::before {
content: '';
position: absolute;
inset: 0;
border-radius: 20px;
padding: 1.5px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.15), rgba(168, 123, 84, 0.15));
-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
-webkit-mask-composite: xor;
mask-composite: exclude;
opacity: 0;
transition: opacity 0.3s ease;
}

.category-item:hover::before {
opacity: 1;
}

.category-image-container {
position: relative;
width: 100%;
height: 140px;
overflow: hidden;
}

.category-image {
width: 100%;
height: 100%;
object-fit: cover;
transition: transform 0.4s ease;
}

.category-item:hover .category-image {
transform: scale(1.1);
}

.category-overlay {
position: absolute;
inset: 0;
background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
}

.category-info {
padding: 16px;
}

.category-name {
font-size: 16px;
font-weight: 700;
color: #000000;
margin: 0 0 6px 0;
letter-spacing: -0.3px;
}

.category-description {
font-size: 13px;
font-weight: 400;
color: #6b4226;
margin: 0;
line-height: 1.4;
}

/* ===== ADDRESS CARD ===== */
.address-card {
margin: 16px 0;
border-radius: 28px;
background: linear-gradient(135deg, #f8f6f3 0%, #ffffff 100%);
box-shadow: none;
overflow: hidden;
position: relative;
}

.coffee-beans-accent {
position: absolute;
top: -20px;
right: -20px;
width: 120px;
height: 120px;
background: radial-gradient(circle at 30% 30%, rgba(107, 66, 38, 0.08) 0%, transparent 50%);
border-radius: 50%;
pointer-events: none;
}

.coffee-beans-accent::before {
content: '';
position: absolute;
top: 60px;
left: -30px;
width: 80px;
height: 80px;
background: radial-gradient(circle at 30% 30%, rgba(168, 123, 84, 0.06) 0%, transparent 50%);
border-radius: 50%;
}

.address-content {
padding: 28px 24px;
position: relative;
z-index: 1;
}

.address-header {
display: flex;
align-items: center;
gap: 16px;
margin-bottom: 20px;
}

.location-badge {
width: 56px;
height: 56px;
border-radius: 18px;
background: linear-gradient(135deg, #6b4226 0%, #4a2c2a 100%);
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0 4px 12px rgba(107, 66, 38, 0.2);
}

.badge-icon {
font-size: 28px;
color: #ffffff;
}

.address-info {
flex: 1;
}

.address-title {
font-size: 22px;
font-weight: 700;
color: #000000;
margin: 0 0 4px 0;
letter-spacing: -0.5px;
}

.address-subtitle {
font-size: 14px;
font-weight: 500;
color: #6b4226;
margin: 0;
font-style: italic;
}

.address-details {
margin-bottom: 24px;
padding: 20px;
background: #ffffff;
border-radius: 20px;
border-left: 4px solid #6b4226;
}

.address-text {
font-size: 16px;
font-weight: 500;
color: #000000;
margin: 0;
line-height: 1.6;
}

.address-actions {
display: grid;
grid-template-columns: 1fr;
gap: 12px;
}

.action-button-main {
--background: linear-gradient(135deg, #6b4226 0%, #4a2c2a 100%);
--background-activated: #4a2c2a;
--border-radius: 16px;
font-weight: 600;
height: 52px;
font-size: 16px;
letter-spacing: 0.3px;
--box-shadow: 0 4px 12px rgba(107, 66, 38, 0.25);
transition: transform 0.2s ease;
}

.action-button-main:hover {
transform: translateY(-2px);
}

.action-button-main ion-icon {
font-size: 22px;
}


/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
.contact-card, .amenities-card, .address-card {
margin: 16px;
}
}
</style>