<template>
<div>


<div class="quick-stats" style="margin-top:-20px;padding-top:35px;">
<div class="stat-item" @click="handleCall">
<div class="stat-icon-wrapper call">
<ion-icon :icon="callOutline"></ion-icon>
</div>
<span class="stat-label">Call Now</span>
<span class="stat-sublabel">Quick support</span>
</div>

<div class="stat-item" @click="handleMenu">
<div class="stat-icon-wrapper menu">
<ion-icon :icon="fastFoodOutline"></ion-icon>
</div>
<span class="stat-label">Menu</span>
<span class="stat-sublabel">View options</span>
</div>

<div class="stat-item" id="open-modal">
<div class="stat-icon-wrapper orders">
<ion-icon :icon="bagHandleOutline"></ion-icon>
</div>
<span class="stat-label">Orders</span>
<span class="stat-sublabel">Track status</span>
</div>
</div>




<div class="content-bg" style="padding-bottom: 35px;">
<!-- COFFEE TYPE LINKS -->
<div class="type-links">
<div v-for="type in coffeeTypes" :key="type.id" :class="['type-link']">
<div class="type-icon-box" :style="{ background: type.color }">
<ion-icon :icon="type.icon" class="type-icon"></ion-icon>
</div>
<span class="type-name">{{ type.name }}</span>
</div>
</div>


<div class="section-header">
<h2 class="section-title">Menu</h2>
<span class="product-count">{{ products.length }} Products</span>
</div>

<div class="products-container" v-if="products.length>1">

<div v-for="(product, index) in products" 
:key="product.id" class="product-card" :style="{ animationDelay: `${index * 0.05}s` }">

<!-- Image Container -->
<div class="image-container">
<img :src="product.image" :alt="product.name" class="product-image" />
<div class="image-overlay"></div>
<ion-button fill="clear" class="fav-btn" :class="{ active: product.favorite }">
<ion-icon :icon="product.favorite ? heart : heartOutline"></ion-icon>
</ion-button>
<div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
</div>

<!-- Content -->
<div class="card-content">
<h3 class="product-name">{{ product.name }}</h3>
<!-- <p class="product-type">{{ product.type }}</p> -->

<div class="product-meta">
<span class="meta-item">
<ion-icon :icon="locationOutline" class="meta-icon"></ion-icon>
{{ product.type }}
</span>
<span class="meta-divider">•</span>
<span class="meta-item">
<ion-icon :icon="flameOutline" class="meta-icon"></ion-icon>
{{ product.roast_level }}
</span>
</div>

<div class="card-footer">
<div class="price-section">
<span class="price">Shs. {{ product.price }}</span>
</div>
</div>
</div>
</div>
</div>
</div>














<!------Quick links modals-------->
<ion-modal trigger="open-modal" can-dismiss="true">
<ion-content>
<ion-toolbar>
<ion-title>Modal</ion-title>
<ion-buttons slot="end">
<ion-button color="light">Close</ion-button>
</ion-buttons>
</ion-toolbar>

<orders/>


</ion-content>
</ion-modal>












</div>
</template>
<script setup>
import { defineProps,ref, onMounted } from 'vue';
import { IonIcon, IonButton,IonModal,IonContent,IonToolbar,IonTitle,IonButtons, } from '@ionic/vue';
import Orders from './Orders.vue';
import {
callOutline,
fastFoodOutline,
bagHandleOutline,
cartOutline,
heartOutline,
heart,
star,
locationOutline,
flameOutline,
addOutline,
searchOutline,
cafeOutline,
flashOutline,
moonOutline,
sunnyOutline,
} from 'ionicons/icons';

const products=ref([]);
const props=defineProps({
products:Array
});

const coffeeTypes = ref([
{ 
id: 'all', 
name: 'All Coffee', 
icon: cafeOutline,
color: 'linear-gradient(135deg, #6b4226 0%, #8b5a3c 100%)'
},
{ 
id: 'arabica', 
name: 'Arabica', 
icon: sunnyOutline,
color: 'linear-gradient(135deg, #d4a574 0%, #e8c4a0 100%)'
},
{ 
id: 'espresso', 
name: 'Espresso', 
icon: flashOutline,
color: 'linear-gradient(135deg, #4a2c2a 0%, #6b4226 100%)'
},
{ 
id: 'dark', 
name: 'Dark Roast', 
icon: moonOutline,
color: 'linear-gradient(135deg, #2c1810 0%, #4a2c2a 100%)'
},
]);


onMounted(async ()=>{
products.value=await props.products;
console.log(products.value);
});

 var modal = document.querySelector('ion-modal');













</script>
<style scoped>
.quick-stats {
display: flex;
justify-content: space-around;
padding: 16px 0;
margin: 0;
border-radius: 0 0 20px 20px;
background: white;
}

.stat-item {
display: flex;
flex-direction: column;
align-items: center;
gap: 6px;
padding: 8px 16px;
cursor: pointer;
border-radius: 12px;
transition: all 0.3s ease;
}

.stat-item:hover {
background: rgba(139, 111, 71, 0.05);
}

.stat-item:active {
transform: scale(0.95);
background: rgba(139, 111, 71, 0.1);
}

.stat-item ion-icon {
font-size: 30px;
color: #8B6F47;
transition: transform 0.3s ease;
}

.stat-item:active ion-icon {
transform: scale(1.1);
}

.stat-item span {
font-size: 15px;
font-weight: 600;
color: #666;
text-align: center;
transition: color 0.3s ease;
}

.stat-item:active span {
color: #8B6F47;
}

/* ============ RESPONSIVE ============ */
@media (max-width: 400px) {
.quick-stats {
padding: 12px 0;
}

.stat-item {
padding: 6px 12px;
}

.stat-item ion-icon {
font-size: 26px;
}

.stat-item span {
font-size: 13px;
}
}

@media (max-width: 320px) {
.stat-item {
padding: 6px 8px;
}

.stat-item ion-icon {
font-size: 24px;
}

.stat-item span {
font-size: 12px;
}
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
.stat-item,
.stat-item ion-icon {
transition: none !important;
}
}

.stat-item:focus-visible {
outline: 3px solid #8B6F47;
outline-offset: 2px;
}





/* ===== CSS VARIABLES ===== */
:root {
--coffee-dark: #4a2c2a;
--coffee-medium: #6b4226;
--coffee-light: #a87b54;
--text-dark: #2c1810;
--text-light: #8b7355;
}

/* ===== CONTENT ===== */
.content-bg {
--background: #f2f2f2;
}

/* ===== COFFEE TYPE LINKS ===== */
.type-links {
display: flex;
gap: 12px;
padding: 16px 16px 20px;
overflow-x: auto;
animation: fadeIn 0.8s ease-out 0.2s both;
}

@keyframes fadeIn {
from { opacity: 0; }
to { opacity: 1; }
}

.type-links::-webkit-scrollbar {
display: none;
}

.type-link {
display: flex;
flex-direction: column;
align-items: center;
gap: 8px;
min-width: 80px;
padding: 12px;
background: white;
border-radius: 16px;
border: 2px solid transparent;
transition: all 0.3s ease;
cursor: pointer;
}

.type-link.active {
border-color: var(--coffee-dark);
}

.type-link:active {
transform: scale(0.95);
}

.type-icon-box {
width: 48px;
height: 48px;
border-radius: 12px;
display: flex;
align-items: center;
justify-content: center;
transition: transform 0.3s ease;
}

.type-link:active .type-icon-box {
transform: scale(0.9);
}

.type-icon {
font-size: 24px;
color: white;
}

.type-name {
font-size: 12px;
font-weight: 600;
color: var(--text-dark);
text-align: center;
line-height: 1.2;
}

.type-link.active .type-name {
color: var(--coffee-dark);
}

/* ===== SECTION HEADER ===== */
.section-header {
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 16px 16px;
}

.section-title {
font-size: 20px;
font-weight: 700;
color: var(--text-dark);
margin: 0;
}

.product-count {
font-size: 13px;
color: var(--text-light);
font-weight: 500;
}

/* ===== PRODUCTS GRID (TILE FORMAT) ===== */
.products-container {
padding: 0 16px;
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 12px;
}

.product-card {
background: white;
border-radius: 16px;
overflow: hidden;
display: flex;
flex-direction: column;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
animation: fadeInUp 0.6s ease-out both;
}

@keyframes fadeInUp {
from {
opacity: 0;
transform: translateY(30px);
}
to {
opacity: 1;
transform: translateY(0);
}
}

.product-card:active {
transform: translateY(-4px);
box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* ===== IMAGE ===== */
.image-container {
position: relative;
width: 100%;
padding-top: 100%;
overflow: hidden;
background: #f5f1e8;
}

.product-image {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
object-fit: cover;
transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:active .product-image {
transform: scale(1.1);
}

.image-overlay {
position: absolute;
inset: 0;
background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 100%);
opacity: 0;
transition: opacity 0.3s ease;
}

.product-card:hover .image-overlay {
opacity: 1;
}

.fav-btn {
position: absolute;
top: 8px;
right: 8px;
--color: white;
--background: rgba(0, 0, 0, 0.4);
backdrop-filter: blur(10px);
--border-radius: 50%;
width: 36px;
height: 36px;
transition: transform 0.3s ease;
margin: 0;
--padding-start: 0;
--padding-end: 0;
z-index: 2;
}

.fav-btn.active {
--color: #e74c3c;
--background: rgba(255, 255, 255, 0.95);
}

.fav-btn:active {
transform: scale(0.9);
}

.fav-btn ion-icon {
font-size: 20px;
}

.product-badge {
position: absolute;
top: 8px;
left: 8px;
background: var(--coffee-light);
color: white;
padding: 4px 10px;
border-radius: 12px;
font-size: 10px;
font-weight: 700;
text-transform: uppercase;
z-index: 2;
}

.rating-overlay {
position: absolute;
bottom: 8px;
right: 8px;
display: flex;
align-items: center;
gap: 4px;
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(10px);
padding: 4px 8px;
border-radius: 10px;
font-size: 12px;
font-weight: 700;
color: var(--coffee-dark);
z-index: 2;
}

.rating-overlay .star-icon {
color: #f39c12;
font-size: 12px;
}

/* ===== CARD CONTENT ===== */
.card-content {
padding: 12px;
display: flex;
flex-direction: column;
gap: 6px;
flex: 1;
}

.product-name {
font-size: 15px;
font-weight: 700;
color: var(--text-dark);
margin: 0;
line-height: 1.2;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}

.product-type {
font-size: 11px;
color: var(--text-light);
margin: 0;
font-weight: 500;
}

/* ===== META ===== */
.product-meta {
display: flex;
align-items: center;
gap: 6px;
flex-wrap: wrap;
margin-top: 2px;
}

.meta-item {
display: flex;
align-items: center;
gap: 3px;
font-size: 10px;
color: var(--text-light);
font-weight: 500;
}

.meta-icon {
font-size: 11px;
color: var(--coffee-light);
}

.meta-divider {
color: var(--text-light);
opacity: 0.5;
font-size: 10px;
}

/* ===== CARD FOOTER ===== */
.card-footer {
display: flex;
justify-content: space-between;
align-items: center;
gap: 8px;
margin-top: auto;
padding-top: 8px;
}

.price-section {
flex: 1;
}

.price {
font-size: 16px;
font-weight: 700;
color: var(--coffee-dark);
line-height: 1;
}

.add-btn {
--background: var(--coffee-dark);
--border-radius: 12px;
width: 36px;
height: 36px;
--padding-start: 0;
--padding-end: 0;
margin: 0;
flex-shrink: 0;
}

.add-btn ion-icon {
font-size: 18px;
}

.add-btn:active {
transform: scale(0.92);
}

/* ===== EMPTY STATE ===== */
.empty-state {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 60px 20px;
grid-column: 1 / -1;
}

.empty-icon {
font-size: 64px;
color: var(--text-light);
opacity: 0.5;
margin-bottom: 16px;
}

.empty-text {
font-size: 16px;
color: var(--text-light);
margin: 0;
}

/* ===== SPACER ===== */
.bottom-spacer {
height: 20px;
grid-column: 1 / -1;
}

/* ===== RESPONSIVE ===== */
@media (min-width: 768px) {
.products-container {
grid-template-columns: repeat(3, 1fr);
gap: 16px;
}
}

@media (min-width: 1024px) {
.products-container {
grid-template-columns: repeat(4, 1fr);
gap: 20px;
}
}

@media (max-width: 360px) {
.product-name {
font-size: 14px;
}
.price {
font-size: 15px;
}
}



 ion-toolbar.tb{
    --background: #19422d;
    --color: white;

    --border-color: #f24aec;
    --border-width: 4px 0;
    --border-style: double;

    --min-height: 80px;
    --padding-top: 20px;
    --padding-bottom: 20px;
  }







</style>