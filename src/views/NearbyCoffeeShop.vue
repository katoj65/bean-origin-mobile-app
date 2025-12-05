<script setup>
import { useIonRouter } from '@ionic/vue';
import { ref,reactive,onMounted } from 'vue';
import AppLayout from './template/AppLayout.vue';
import CoffeeShopService from '../service/CoffeeShopService';
import Skeleton from './template/Skeleton.vue';

import {
IonButtons,
IonButton,
IonContent,
IonIcon,
IonSearchbar,
IonChip,
IonLabel,
} from "@ionic/vue";
import {
arrowBackOutline,
filterOutline,
star,
timeOutline,
navigateOutline,
} from "ionicons/icons";











const router=useIonRouter();
function navigateToShop(id){
router.push('/coffee-shop/'+id);
}



const coffeeShops=ref([]);
const isLoading=ref(false);
const error=ref(null);
onMounted(async ()=>{
try{
isLoading.value=true;
const service=new CoffeeShopService();
const response=await service.getCoffeeShop(); 
if(response.status===200){
if(response.data.length>0){
const items=[];
response.data.forEach(element => {
let item = {
id: element.id,
name: element.name,
address: element.address,
distance: "0.5 km",
rating: 4.8,
hours: element.open_hours,
isOpen: true,
tags: ["WiFi", "Outdoor Seating"],
image: element.image
}
items.push(item);
});

coffeeShops.value=items;

}
}else{
console.log(response.error);
}
}catch(e){
console.log(e);
}finally{
isLoading.value=false;
}
});





</script>
<template>
<app-layout title="Nearby Coffee Shop">
<template #content>

<div fullscreen class="content-bg">
<!-- HERO SECTION -->
<div class="hero-section">
<h1 class="hero-title">Find Coffee Nearby</h1>
<p class="hero-subtitle">Discover the best coffee shops around you</p>
</div>


<!-- COFFEE SHOPS LIST -->
<div class="shops-container" v-if="isLoading===false">
<div 
v-for="(shop, index) in coffeeShops" 
:key="shop.id" 
class="shop-card"
:style="{ animationDelay: `${index * 0.1}s` }"
@click="navigateToShop(shop.id)" style="background:white;">

<!-- Image Container -->
<div class="image-container">
<img :src="shop.image" :alt="shop.name" class="shop-image" />
<div class="image-overlay"></div>
<div class="distance-badge">{{ shop.distance }}</div>
<div v-if="shop.isOpen" class="open-badge">Open</div>
<div v-else class="closed-badge">Closed</div>
</div>

<!-- Content -->
<div class="card-content">
<div class="content-top">
<div class="shop-info">
<h3 class="shop-name partial-text">{{ shop.name }}</h3>
<p class="shop-address partial-text">{{ shop.address }}</p>

<div class="shop-meta">
<span class="meta-item">
<ion-icon :icon="timeOutline" class="meta-icon"></ion-icon>
{{ shop.hours }}
</span>
<!-- <span class="meta-item">
<ion-icon :icon="navigateOutline" class="meta-icon"></ion-icon>
{{ shop.distance }}
</span> -->
</div>
</div>

<div class="rating">
<ion-icon :icon="star" class="star-icon"></ion-icon>
<span>{{ shop.rating }}</span>
</div>
</div>

<div class="card-footer">
<div class="tags">
<span v-for="tag in shop.tags" :key="tag" class="tag">
{{ tag }}
</span>
</div>
<ion-button 
fill="clear" 
class="directions-btn"
@click.stop="getDirections(shop)">
<ion-icon :icon="navigateOutline"></ion-icon>
</ion-button>
</div>
</div>
</div>
</div>
<skeleton v-else style="margin:20px;"/>



</div>
</template>
</app-layout>
</template>




<style scoped>
/* ===== CSS VARIABLES ===== */
:root {
--coffee-dark: #4a2c2a;
--coffee-medium: #6b4226;
--coffee-light: #a87b54;
--cream: #f5f1e8;
--accent: #d4a574;
--text-dark: #2c1810;
--text-light: #8b7355;
--card-bg: #ffffff;
--shadow-sm: 0 2px 8px rgba(74, 44, 42, 0.08);
--shadow-md: 0 8px 24px rgba(74, 44, 42, 0.12);
--shadow-lg: 0 16px 48px rgba(74, 44, 42, 0.16);
}

/* ===== HEADER ===== */
.custom-toolbar {
--background: transparent;
--border-width: 0;
padding: 8px 4px;
}

.page-title {
font-size: 24px;
font-weight: 700;
color: var(--coffee-dark);
letter-spacing: -0.3px;
}

.header-btn {
--color: var(--coffee-dark);
--background: rgba(245, 241, 232, 0.8);
--border-radius: 12px;
margin: 0 4px;
backdrop-filter: blur(10px);
}

/* ===== CONTENT ===== */
.content-bg {
--background: #f2f2f2;
}

/* ===== HERO SECTION ===== */
.hero-section {
padding: 20px 20px 16px;
text-align: center;
animation: fadeInDown 0.6s ease-out;
}

.hero-title {
font-size: 32px;
font-weight: 700;
color: var(--coffee-dark);
margin: 0 0 6px 0;
letter-spacing: -0.5px;
line-height: 1.1;
}

.hero-subtitle {
font-size: 15px;
color: var(--text-light);
margin: 0;
font-weight: 500;
}

/* ===== SEARCH ===== */
.search-wrapper {
display: flex;
align-items: center;
gap: 10px;
padding: 0 16px 12px;
animation: fadeIn 0.8s ease-out 0.2s both;
}

.custom-searchbar {
--background: white;
--border-radius: 14px;
--box-shadow: var(--shadow-sm);
--icon-color: var(--coffee-light);
--placeholder-color: var(--text-light);
--placeholder-opacity: 0.7;
flex: 1;
}

/* ===== CATEGORY CHIPS ===== */
.category-chips {
display: flex;
gap: 8px;
padding: 0 16px 16px;
overflow-x: auto;
animation: fadeIn 0.8s ease-out 0.3s both;
}

.category-chips::-webkit-scrollbar {
display: none;
}

.chip {
--background: white;
--color: var(--coffee-medium);
border-radius: 18px;
height: 34px;
box-shadow: var(--shadow-sm);
font-weight: 600;
font-size: 13px;
transition: all 0.3s ease;
}

.chip.active {
--background: var(--coffee-dark);
--color: white;
box-shadow: var(--shadow-md);
}

/* ===== SHOPS LIST ===== */
.shops-container {
padding: 0 16px;
display: flex;
flex-direction: column;
gap: 12px;
}

.shop-card {
background: var(--card-bg);
border-radius: 16px;
overflow: hidden;
box-shadow: var(--shadow-sm);
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
animation: fadeInUp 0.6s ease-out both;
display: flex;
flex-direction: row;
min-height: 120px;
cursor: pointer;
}

.shop-card:active {
transform: scale(0.98);
box-shadow: var(--shadow-md);
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

@keyframes fadeInDown {
from {
opacity: 0;
transform: translateY(-20px);
}
to {
opacity: 1;
transform: translateY(0);
}
}

@keyframes fadeIn {
from { opacity: 0; }
to { opacity: 1; }
}

/* ===== IMAGE ===== */
.image-container {
position: relative;
width: 120px;
min-width: 120px;
height: 120px;
overflow: hidden;
background: linear-gradient(135deg, #f5f1e8 0%, #e8dcc8 100%);
}

.shop-image {
width: 100%;
height: 100%;
object-fit: cover;
transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.shop-card:active .shop-image {
transform: scale(1.1);
}

.image-overlay {
position: absolute;
inset: 0;
background: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.2) 100%);
opacity: 0;
transition: opacity 0.3s ease;
}

.shop-card:active .image-overlay {
opacity: 1;
}

.distance-badge {
position: absolute;
top: 8px;
left: 8px;
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(10px);
color: var(--coffee-dark);
padding: 4px 8px;
border-radius: 12px;
font-size: 10px;
font-weight: 700;
box-shadow: var(--shadow-sm);
}

.open-badge {
position: absolute;
bottom: 8px;
left: 8px;
background: #27ae60;
color: white;
padding: 4px 8px;
border-radius: 12px;
font-size: 10px;
font-weight: 700;
box-shadow: var(--shadow-sm);
}

.closed-badge {
position: absolute;
bottom: 8px;
left: 8px;
background: #e74c3c;
color: white;
padding: 4px 8px;
border-radius: 12px;
font-size: 10px;
font-weight: 700;
box-shadow: var(--shadow-sm);
}

/* ===== CARD CONTENT ===== */
.card-content {
flex: 1;
padding: 10px 12px;
display: flex;
flex-direction: column;
justify-content: space-between;
}

.content-top {
display: flex;
justify-content: space-between;
gap: 8px;
}

.shop-info {
flex: 1;
min-width: 0;
}

.shop-name {
font-size: 16px;
font-weight: 700;
color: var(--text-dark);
margin: 0 0 3px 0;
line-height: 1.2;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}

.shop-address {
font-size: 11px;
color: var(--text-light);
margin: 0 0 6px 0;
font-weight: 500;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}

.rating {
display: flex;
align-items: center;
gap: 3px;
background: rgba(212, 165, 116, 0.15);
padding: 3px 7px;
border-radius: 8px;
font-size: 12px;
font-weight: 700;
color: var(--coffee-dark);
height: fit-content;
flex-shrink: 0;
}

.star-icon {
color: #f39c12;
font-size: 11px;
}

/* ===== META ===== */
.shop-meta {
display: flex;
gap: 10px;
flex-wrap: wrap;
}

.meta-item {
display: flex;
align-items: center;
gap: 3px;
font-size: 11px;
color: var(--text-light);
font-weight: 500;
}

.meta-icon {
font-size: 13px;
color: var(--coffee-light);
}

/* ===== CARD FOOTER ===== */
.card-footer {
display: flex;
justify-content: space-between;
align-items: center;
gap: 8px;
margin-top: auto;
}

.tags {
display: flex;
gap: 6px;
flex-wrap: wrap;
flex: 1;
}

.tag {
background: rgba(168, 123, 84, 0.1);
color: var(--coffee-medium);
padding: 3px 8px;
border-radius: 8px;
font-size: 10px;
font-weight: 600;
}

.directions-btn {
--color: var(--coffee-dark);
--background: rgba(168, 123, 84, 0.1);
--border-radius: 10px;
--padding-start: 10px;
--padding-end: 10px;
height: 32px;
margin: 0;
}

.directions-btn ion-icon {
font-size: 18px;
}

/* ===== SPACER ===== */
.bottom-spacer {
height: 20px;
}

/* ===== MOBILE OPTIMIZATIONS ===== */
@media (max-width: 360px) {
.hero-title {
font-size: 28px;
}

.shop-name {
font-size: 15px;
}

.tag {
font-size: 9px;
padding: 2px 6px;
}
}
</style>