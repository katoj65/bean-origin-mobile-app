<script setup>
import AppLayout from './template/AppLayout.vue';
import HeadButtonsDefault from './template/HeadButtonsDefault.vue';
import Skeleton from './template/Skeleton.vue';
import { ref, computed, onMounted } from 'vue';
import { useIonRouter } from '@ionic/vue';
import ProductService from '@/service/ProductService';

import {
IonButton,
IonIcon,
} from "@ionic/vue";
import {
arrowBackOutline,
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
} from "ionicons/icons";





const router = useIonRouter();
const selectedType = ref('all');

const coffeeTypes = [
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
];

const products = ref('');

const filteredProducts = computed(() => {
if (selectedType.value === 'all') {
return products.value;
}
return products.value.filter(p => p.category === selectedType.value);
});

const currentTypeTitle = computed(() => {
const type = coffeeTypes.find(t => t.id === selectedType.value);
return type ? type.name : 'All Coffee';
});

const goBack = () => {
router.back();
};

const viewProduct = (product) => {
console.log('View product:', product);
// router.push({ name: 'ProductDetails', params: { id: product.id } });
};

const toggleFavorite = (product) => {
product.favorite = !product.favorite;
};

const addToCart = (product) => {
console.log('Add to cart:', product);
};




const isLoading=ref(false);
const error=ref(null);

onMounted(async()=>{
try{
isLoading.value = true;
const database = new ProductService();
const response = await database.getProducts();


if(response.status===200){
const items=[];
response.data.forEach(element => {
items.push({
id: element.id,
name: element.name,
type: element.type,
price: element.price,
rating: 4.8,
origin: "Elgon",
roast: element.roast_level,
category: "arabica",
image: element.image,
favorite: false,
badge: "Organic"
})    
});

products.value=items;


}else{
console.log(response.error);
error.value='Unable to complete, please try again.';
}

}catch(e){
console.log(e);
error.value=e;
}finally{
isLoading.value=false;
}









});











</script>
<template>
<app-layout title="Buy Coffee">
<template #header-buttons>
<head-buttons-default/>
</template>



<template #content>

<div class="content-bg" v-if="isLoading==false">
<!-- HERO BANNER -->
<div class="hero-banner">
<h1 class="hero-title">Premium Coffee</h1>
<p class="hero-subtitle">Ethically sourced from the finest farms</p>
</div>

<!-- COFFEE TYPE LINKS -->
<div class="type-links">
<div 
v-for="type in coffeeTypes" 
:key="type.id"
:class="['type-link', { active: selectedType === type.id }]"
@click="selectedType = type.id">
<div class="type-icon-box" :style="{ background: type.color }">
<ion-icon :icon="type.icon" class="type-icon"></ion-icon>
</div>
<span class="type-name">{{ type.name }}</span>
</div>
</div>

<!-- SECTION TITLE -->
<div class="section-header">
<h2 class="section-title">{{ currentTypeTitle }}</h2>
<span class="product-count">{{ filteredProducts.length }} products</span>
</div>







<!-- PRODUCTS GRID -->
<div class="products-container">
<div 
v-for="(product, index) in filteredProducts" 
:key="product.id" 
class="product-card"
:style="{ animationDelay: `${index * 0.05}s` }"
@click="viewProduct(product)">

<!-- Image Container -->
<div class="image-container">
<img :src="product.image" :alt="product.name" class="product-image" />
<div class="image-overlay"></div>
<ion-button 
fill="clear" 
class="fav-btn"
:class="{ active: product.favorite }"
@click.stop="toggleFavorite(product)">
<ion-icon :icon="product.favorite ? heart : heartOutline"></ion-icon>
</ion-button>
<div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
</div>

<!-- Content -->
<div class="card-content">
<div class="content-top">
<div class="product-info">
<h3 class="product-name">{{ product.name }}</h3>
<p class="product-type">{{ product.type }}</p>

<div class="product-meta">
<span class="meta-item">
<ion-icon :icon="locationOutline" class="meta-icon"></ion-icon>
{{ product.origin }}
</span>
<span class="meta-item">
<ion-icon :icon="flameOutline" class="meta-icon"></ion-icon>
{{ product.roast }}
</span>
</div>
</div>

<div class="rating">
<ion-icon :icon="star" class="star-icon"></ion-icon>
<span>{{ product.rating }}</span>
</div>
</div>

<div class="card-footer">
<div class="price-section">
<span class="price-label">Price</span>
<span class="price">Shs. {{ product.price }}</span>
</div>

</div>
</div>
</div>
</div>











<!-- EMPTY STATE -->
<div v-if="filteredProducts.length === 0" class="empty-state">
<ion-icon :icon="searchOutline" class="empty-icon"></ion-icon>
<p class="empty-text">No products found</p>
</div>

<!-- SPACER -->
<div class="bottom-spacer"></div>
</div>
<skeleton v-else style="margin:20px;"/>




</template>
</app-layout>   
</template>
<style scoped>
/* ===== CSS VARIABLES ===== */
:root {
--coffee-dark: #4a2c2a;
--coffee-medium: #6b4226;
--coffee-light: #a87b54;
--text-dark: #2c1810;
--text-light: #8b7355;
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
position: relative;
}

.cart-badge {
position: absolute;
top: 6px;
right: 6px;
background: var(--coffee-light);
color: white;
border-radius: 10px;
padding: 2px 6px;
font-size: 10px;
font-weight: 700;
min-width: 16px;
text-align: center;
}

/* ===== CONTENT ===== */
.content-bg {
--background: #f2f2f2;
}

/* ===== HERO BANNER ===== */
.hero-banner {
padding: 24px 20px 20px;
text-align: center;
animation: fadeInDown 0.6s ease-out;
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

.hero-title {
font-size: 32px;
font-weight: 700;
color: var(--text-dark);
margin: 0 0 6px 0;
letter-spacing: -0.5px;
line-height: 1.1;
}

.hero-subtitle {
font-size: 15px;
color: var(--text-light);
margin: 0;
}

/* ===== COFFEE TYPE LINKS ===== */
.type-links {
display: flex;
gap: 12px;
padding: 0 16px 20px;
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

/* ===== PRODUCTS GRID ===== */
.products-container {
padding: 0 16px;
display: flex;
flex-direction: column;
gap: 12px;
}

.product-card {
background: white;
border-radius: 16px;
overflow: hidden;
display: flex;
flex-direction: row;
min-height: 120px;
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
transform: scale(0.98);
}

/* ===== IMAGE ===== */
.image-container {
position: relative;
width: 120px;
min-width: 120px;
height: 120px;
overflow: hidden;
background: #f5f1e8;
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
margin: 0;
--padding-start: 0;
--padding-end: 0;
}

.fav-btn.active {
--color: #e74c3c;
--background: rgba(255, 255, 255, 0.9);
}

.fav-btn:active {
transform: scale(0.9);
}

.product-badge {
position: absolute;
bottom: 8px;
left: 8px;
background: var(--coffee-light);
color: white;
padding: 4px 10px;
border-radius: 12px;
font-size: 10px;
font-weight: 700;
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

.add-btn {
--background: var(--coffee-dark);
--border-radius: 12px;
--border-style: solid;
--border-width: 2px;
--border-color: var(--coffee-medium);
width: 36px;
height: 36px;
--padding-start: 0;
--padding-end: 0;
margin: 0;
}

.add-btn:active {
transform: scale(0.9);
}

/* ===== EMPTY STATE ===== */
.empty-state {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 60px 20px;
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
}

/* ===== RESPONSIVE ===== */
@media (max-width: 360px) {
.product-name {
font-size: 15px;
}
}
</style>