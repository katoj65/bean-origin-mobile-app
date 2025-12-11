<template>
<div class="coffee-heading-component" style="padding-bottom:0;">

<!-- Shop Info Section -->
<div class="shop-info-card" style="border-radius: 30px;">
<!-- Header -->
<div class="shop-header" style="padding-top:25px;">
<div class="header-left">
<div class="name-row">
  <h1 class="shop-name"> {{ head.name }} </h1>
  <!-- <div class="verified-badge" v-if="shopData.verified">
    <ion-icon :icon="checkmarkCircle"></ion-icon>
  </div> -->
</div>

<div class="location-row">
  <ion-icon :icon="locationOutline"></ion-icon>
  <span>
  {{ head.address }}
  </span>
  <span class="distance">• 
  10 km away
  </span>
</div>

<!-- Rating -->
<div class="rating-row">
  <div class="stars">
    <ion-icon :icon="star"></ion-icon>
    <ion-icon :icon="star"></ion-icon>
    <ion-icon :icon="star"></ion-icon>
    <ion-icon :icon="star"></ion-icon>
    <ion-icon :icon="starHalf"></ion-icon>
  </div>
  <span class="rating-value">{{ 4.5 }} rating</span>
  <span class="divider">•</span>
  <span class="reviews">100 reviews</span>
</div>
</div>
</div>

<!-- Quick Stats -->
<div class="quick-stats" style="padding-bottom: 0;margin:0;border-radius: 20px;">
<div class="stat-item" style="padding-bottom: 0;margin:0">
<ion-icon :icon="callOutline" style="font-size:30px;"></ion-icon>
<span style="font-size:15px;">CALL</span>
</div>
<div class="stat-item" style="padding-bottom: 0;margin:0">
<ion-icon :icon="fastFoodOutline" style="font-size:30px;">></ion-icon>
<span style="font-size:15px;">MENU</span>
</div>
<div class="stat-item" style="padding-bottom: 0;margin:0;">
<ion-icon :icon="bagHandleOutline" style="font-size:30px;"></ion-icon>
<span style="font-size:15px;">ORDERS</span>
</div>
</div>



</div>

</div>
</template>

<script setup>
import { ref, defineProps, defineEmits,onMounted } from 'vue';
import { IonIcon } from '@ionic/vue';
import {
heart,
heartOutline,
star,
starHalf,
checkmarkCircle,
locationOutline,
timeOutline,
bicycleOutline,
walletOutline,
callOutline,
restaurantOutline,
bagHandleOutline,
arrowBack,
fastFoodOutline,
cartOutline,
} from 'ionicons/icons';

const props = defineProps({
heading:''
});


const head=ref('');
onMounted(()=>{
head.value=props.heading;
});







const emit = defineEmits(['back', 'call', 'menu', 'order', 'favorite']);
const isFavorite = ref(false);

const handleBack = () => {
emit('back');
if ('vibrate' in navigator) {
navigator.vibrate(10);
}
};

const toggleFavorite = () => {
isFavorite.value = !isFavorite.value;
emit('favorite', isFavorite.value);
if ('vibrate' in navigator) {
navigator.vibrate(15);
}
};

const handleCall = () => {
emit('call');
if ('vibrate' in navigator) {
navigator.vibrate(10);
}
};

const handleMenu = () => {
emit('menu');
if ('vibrate' in navigator) {
navigator.vibrate(10);
}
};

const handleOrder = () => {
emit('order');
if ('vibrate' in navigator) {
navigator.vibrate(15);
}
};
</script>

<style scoped>
.coffee-heading-component {
position: relative;
background: #ffffff;
border-radius: 0 0 20px 20px;
}

/* ============ HERO SECTION ============ */
.hero-section {
position: relative;
width: 100%;
height: 240px;
overflow: hidden;
}

.hero-image {
width: 100%;
height: 100%;
background-size: cover;
background-position: center;
position: relative;
}

.hero-overlay {
position: absolute;
inset: 0;
background: linear-gradient(
to bottom,
rgba(0, 0, 0, 0.3) 0%,
rgba(0, 0, 0, 0.1) 50%,
rgba(0, 0, 0, 0.4) 100%
);
}

/* Hero Buttons */
.back-button,
.favorite-button {
position: absolute;
top: 16px;
width: 40px;
height: 40px;
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(10px);
border: none;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
transition: all 0.3s ease;
z-index: 10;
}

.back-button {
left: 16px;
}

.favorite-button {
right: 16px;
}

.back-button:active,
.favorite-button:active {
transform: scale(0.9);
background: white;
}

.back-button ion-icon {
font-size: 24px;
color: #0a0a0a;
}

.favorite-button ion-icon {
font-size: 24px;
color: #e74c3c;
}

/* ============ SHOP INFO CARD ============ */
.shop-info-card {
background: white;
margin-top: -24px;
border-radius: 24px 24px 0 0;
padding: 24px;
position: relative;
z-index: 2;
}

/* Shop Header */
.shop-header {
margin-bottom: 20px;
}

.header-left {
display: flex;
flex-direction: column;
gap: 8px;
}

.name-row {
display: flex;
align-items: center;
gap: 8px;
}

.shop-name {
font-size: 28px;
font-weight: 900;
color: #0a0a0a;
margin: 0;
letter-spacing: -0.5px;
line-height: 1.1;
}

.verified-badge {
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
}

.verified-badge ion-icon {
font-size: 22px;
color: #4CAF50;
}

.location-row {
display: flex;
align-items: center;
gap: 6px;
font-size: 14px;
color: #666;
font-weight: 500;
}

.location-row ion-icon {
font-size: 16px;
color: #8B6F47;
}

.distance {
color: #999;
}

.rating-row {
display: flex;
align-items: center;
gap: 6px;
}

.stars {
display: flex;
gap: 2px;
}

.stars ion-icon {
font-size: 15px;
color: #FFA726;
}

.rating-value {
font-size: 14px;
font-weight: 700;
color: #0a0a0a;
margin-left: 2px;
}

.divider {
color: #ccc;
font-size: 14px;
}

.reviews {
font-size: 13px;
color: #666;
font-weight: 500;
}

/* Quick Stats */
.quick-stats {
display: flex;
justify-content: space-around;
padding: 16px 0;
margin-bottom: 16px;
border-radius: 16px;
}

.stat-item {
display: flex;
flex-direction: column;
align-items: center;
gap: 6px;

}

.stat-item ion-icon {
font-size: 20px;
color: #8B6F47;
}

.stat-item span {
font-size: 11px;
font-weight: 600;
color: #666;
text-align: center;
}

/* ============ ACTION BUTTONS ============ */
.action-buttons {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 10px;
padding: 0;
margin: 0;
}

.action-btn {
position: relative;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 0;
background: white;
border: none;
border-radius: 16px;
cursor: pointer;
overflow: hidden;
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
min-height: 70px;
}

.action-btn::before {
content: '';
position: absolute;
inset: 0;
border-radius: 16px;
padding: 1.5px;
-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
-webkit-mask-composite: xor;
mask-composite: exclude;
opacity: 0;
transition: opacity 0.3s ease;
}

.action-btn:active::before {
opacity: 1;
}

.btn-background {
position: absolute;
inset: 0;
background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
opacity: 0;
transition: opacity 0.4s ease;
}

.action-btn:active .btn-background {
opacity: 1;
}

.btn-glow {
position: absolute;
inset: -2px;
background: radial-gradient(circle at 50% 50%, rgba(139, 111, 71, 0.15) 0%, transparent 60%);
opacity: 0;
filter: blur(10px);
transition: opacity 0.4s ease;
}

.action-btn:active .btn-glow {
opacity: 1;
animation: glow-pulse 0.6s ease-out;
}

@keyframes glow-pulse {
0% { transform: scale(0.8); opacity: 0; }
50% { opacity: 1; }
100% { transform: scale(1.2); opacity: 0; }
}

.btn-content {
position: relative;
z-index: 1;
display: flex;
flex-direction: column;
align-items: center;
gap: 6px;
transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-btn:active .btn-content {
transform: translateY(-2px) scale(1.02);
}

.icon-badge {
position: relative;
width: 40px;
height: 40px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 12px;
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-btn:active .icon-badge {
transform: scale(1.12);
}

.icon-badge ion-icon {
font-size: 20px;
position: relative;
z-index: 2;
transition: all 0.3s ease;
}

.action-btn:active .icon-badge ion-icon {
transform: rotate(-8deg);
}

.icon-ripple {
position: absolute;
inset: -3px;
border-radius: 12px;
opacity: 0;
transition: all 0.5s ease;
}

.action-btn:active .icon-ripple {
opacity: 1;
animation: ripple-expand 0.6s ease-out;
}

@keyframes ripple-expand {
0% { 
transform: scale(0.8);
opacity: 0.8;
}
100% { 
transform: scale(1.4);
opacity: 0;
}
}

.btn-label {
font-size: 11px;
font-weight: 800;
letter-spacing: -0.2px;
transition: all 0.3s ease;
}

.action-btn:active .btn-label {
transform: translateY(-1px);
}

/* Call Button */
.call-btn .icon-badge {
background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
}

.call-btn .icon-badge ion-icon {
color: #1565C0;
}

.call-btn .icon-ripple {
background: radial-gradient(circle, rgba(25, 118, 210, 0.3) 0%, transparent 70%);
}

.call-btn .btn-label {
color: #1565C0;
}

.call-btn:active {
transform: translateY(-3px);
}

/* Menu Button */
.menu-btn .icon-badge {
background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%);
}

.menu-btn .icon-badge ion-icon {
color: #EF6C00;
}

.menu-btn .icon-ripple {
background: radial-gradient(circle, rgba(245, 124, 0, 0.3) 0%, transparent 70%);
}

.menu-btn .btn-label {
color: #EF6C00;
}

.menu-btn:active {
transform: translateY(-3px);
}

/* Order Button */
.order-btn .icon-badge {
background: linear-gradient(135deg, #8B6F47 0%, #6B563D 100%);
}

.order-btn .icon-badge ion-icon {
color: white;
}

.order-btn .icon-ripple {
background: radial-gradient(circle, rgba(139, 111, 71, 0.3) 0%, transparent 70%);
}

.order-btn .btn-label {
color: #8B6F47;
}

.order-btn:active {
transform: translateY(-4px) scale(1.02);
}

.order-btn .btn-glow {
background: radial-gradient(circle at 50% 50%, rgba(139, 111, 71, 0.15) 0%, transparent 60%);
}

/* ============ RESPONSIVE ============ */
@media (max-width: 400px) {
.hero-section {
height: 220px;
}

.shop-info-card {
padding: 20px;
margin-top: -20px;
}

.shop-name {
font-size: 24px;
}

.action-buttons {
gap: 8px;
}

.action-btn {
min-height: 60px;
border-radius: 14px;
}

.icon-badge {
width: 36px;
height: 36px;
border-radius: 10px;
}

.icon-badge ion-icon {
font-size: 18px;
}

.btn-label {
font-size: 10px;
}
}

@media (max-width: 320px) {
.hero-section {
height: 200px;
}

.action-buttons {
grid-template-columns: 1fr;
gap: 8px;
}

.action-btn {
flex-direction: row;
justify-content: center;
min-height: 50px;
}

.btn-content {
flex-direction: row;
gap: 10px;
}

.icon-badge {
width: 36px;
height: 36px;
}
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
.action-btn,
.btn-content,
.icon-badge,
.icon-ripple {
animation: none !important;
transition: none !important;
}
}

.action-btn:focus-visible,
.back-button:focus-visible,
.favorite-button:focus-visible {
outline: 3px solid #8B6F47;
outline-offset: 2px;
}

</style>