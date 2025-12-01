<script setup>
import { useRouter } from 'vue-router';
import AppLayout from './template/AppLayout.vue';
import HeadButtonsDefault from './template/HeadButtonsDefault.vue';
import {
IonPage,
IonHeader,
IonToolbar,
IonTitle,
IonButtons,
IonButton,
IonContent,
IonIcon,
IonSearchbar,
IonChip,
IonLabel,
} from "@ionic/vue";
import {
cartOutline,
personCircleOutline,
optionsOutline,
heartOutline,
heart,
star,
locationOutline,
flameOutline,
} from "ionicons/icons";








const   products= [
{
id: 1,
name: "Arabica Premium",
type: "Single Origin",
price: 12.99,
rating: 4.8,
origin: "Ethiopia",
roast: "Medium",
image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
favorite: false
},
{
id: 2,
name: "Espresso Intenso",
type: "Dark Roast Blend",
price: 15.99,
rating: 4.9,
origin: "Colombia",
roast: "Dark",
image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
favorite: true
},
{
id: 3,
name: "Morning House",
type: "Light Roast",
price: 10.99,
rating: 4.6,
origin: "Brazil",
roast: "Light",
image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400",
favorite: false
},
{
id: 4,
name: "Decaf Delight",
type: "Decaffeinated",
price: 13.99,
rating: 4.5,
origin: "Guatemala",
roast: "Medium",
image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
favorite: false
},
{
id: 5,
name: "Costa Rica Honey",
type: "Single Origin",
price: 16.99,
rating: 4.9,
origin: "Costa Rica",
roast: "Medium",
image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
favorite: true
},
{
id: 6,
name: "French Roast",
type: "Dark Roast",
price: 11.99,
rating: 4.7,
origin: "Sumatra",
roast: "Dark",
image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400",
favorite: false
}
];





const router=useRouter();
function productNav(){
router.push('/product-details');
}

</script>
<template>
<app-layout title="Coffee Products">
<template #header-buttons>
<head-buttons-default/>
</template>
<template #content> 




<div class="hero-section">
<h1 class="hero-title">Discover Coffee</h1>
<p class="hero-subtitle">Ethically sourced, expertly roasted</p>
</div>








<div class="products-container">
<div 
v-for="(item, index) in products" 
:key="item.id" 
class="product-card"
:style="{ animationDelay: `${index * 0.1}s` }" style="background:white;" @click="productNav">

<!-- Image Container -->
<div class="image-container">
<img :src="item.image" :alt="item.name" class="product-image" />
<div class="image-overlay"></div>




<!-- <ion-button 
fill="clear" 
class="fav-btn"
:class="{ active: item.favorite }">
<ion-icon :icon="item.favorite ? heart : heartOutline"></ion-icon>
</ion-button> -->




</div>





<!-- Content -->
<div class="card-content">
<div class="content-top">
<div class="product-info">
<h3 class="product-name">{{ item.name }}</h3>
<p class="product-type">{{ item.type }}</p>

<div class="product-meta">
<span class="meta-item">
<ion-icon :icon="locationOutline" class="meta-icon"></ion-icon>
{{ item.origin }}
</span>
<span class="meta-item">
<ion-icon :icon="flameOutline" class="meta-icon"></ion-icon>
{{ item.roast }}
</span>
</div>
</div>

<div class="rating">
<ion-icon :icon="star" class="star-icon"></ion-icon>
<span>{{ item.rating }}</span>
</div>
</div>

<div class="card-footer">
<div class="price-section">
<span class="price-label">Price</span>
<span class="price">${{ item.price }}</span>
</div>
</div>
</div>
</div>
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
position: relative;
backdrop-filter: blur(10px);
}

.badge {
position: absolute;
top: 4px;
right: 4px;
background: var(--coffee-light);
color: white;
border-radius: 10px;
padding: 2px 6px;
font-size: 10px;
font-weight: 700;
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

.filter-btn {
--color: var(--coffee-dark);
--background: white;
--border-radius: 14px;
width: 44px;
height: 44px;
box-shadow: var(--shadow-sm);
margin: 0;
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

/* ===== PRODUCTS LIST ===== */
.products-container {
padding: 0 16px;
display: flex;
flex-direction: column;
gap: 12px;
}

.product-card {
background: var(--card-bg);
border-radius: 16px;
overflow: hidden;
box-shadow: var(--shadow-sm);
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
animation: fadeInUp 0.6s ease-out both;
display: flex;
flex-direction: row;
min-height: 120px;
}

.product-card:active {
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

.product-image {
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
background: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.2) 100%);
opacity: 0;
transition: opacity 0.3s ease;
}

.product-card:active .image-overlay {
opacity: 1;
}

.badge-origin {
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

.fav-btn {
position: absolute;
top: 4px;
right: 4px;
--color: white;
--background: rgba(0, 0, 0, 0.3);
--background-hover: rgba(0, 0, 0, 0.5);
backdrop-filter: blur(10px);
--border-radius: 50%;
width: 32px;
height: 32px;
transition: transform 0.3s ease;
}

.fav-btn.active {
--color: #e74c3c;
--background: rgba(255, 255, 255, 0.9);
}

.fav-btn:active {
transform: scale(0.9);
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

.product-info {
flex: 1;
min-width: 0;
}

.product-header {
display: flex;
justify-content: space-between;
align-items: flex-start;
margin-bottom: 8px;
}

.product-name {
font-size: 16px;
font-weight: 700;
color: var(--text-dark);
margin: 0 0 3px 0;
line-height: 1.2;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}

.product-type {
font-size: 12px;
color: var(--text-light);
margin: 0 0 6px 0;
font-weight: 500;
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
.product-meta {
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
gap: 10px;
margin-top: auto;
}

.price-section {
display: flex;
flex-direction: column;
gap: 1px;
}

.price-label {
font-size: 9px;
color: var(--text-light);
text-transform: uppercase;
letter-spacing: 0.5px;
font-weight: 600;
}

.price {
font-size: 20px;
font-weight: 700;
color: var(--coffee-dark);
line-height: 1;
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

.product-name {
font-size: 15px;
}
}
</style>