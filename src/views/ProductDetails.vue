<template>
<app-layout title="Product Details">
<template #header-buttons>
<head-buttons-default/>
</template>

<template #content>
<div class="content-wrapper" style="margin-top:20px;" v-if="isLoading===false">

<!-- PRODUCT HERO -->
<div class="hero-section">
<div class="product-image-wrapper">
<img :src="item.image" :alt="product.name" class="product-image" />
<div class="product-badge" v-if="product_standard.length>0">{{product_standard[0].standard }}</div>
</div>
</div>
















<!-- BASIC INFO -->
<div class="info-card">
<div class="product-header">
<div class="product-meta">
<h1 class="product-name">
{{ item.name }}
</h1>
<div class="product-type-row">
<span class="coffee-type" style="text-transform: capitalize;">
  {{ item.type }}
</span>
<span class="roast-pill" :class="getRoastClass(product.roastLevel)">
{{ item.roast_level }} Roast
</span>
</div>
</div>

<div class="rating-section">
<div class="stars">
<ion-icon 
v-for="i in 5" 
:key="i"
:icon="i <= Math.floor(product.rating) ? starSharp : starOutline"
class="star-icon"
></ion-icon>
</div>
<span class="rating-text">
  
{{ product.rating }} ({{ product.reviews }})

</span>
</div>
</div>

<div class="price-section">
<div class="price-row">
<span class="price">Shs. {{ item.price }}</span>
<span v-if="product.originalPrice" class="original-price">
Shs. {{ product.originalPrice }}</span>
<span v-if="product.discount" class="discount-badge">{{ product.discount }}% OFF</span>
</div>
</div>
</div>

















<!-- DESCRIPTION -->
<div class="description-card">
<h2 class="section-title">About the product</h2>
<p class="description-text">{{ item.description}}</p>

<div class="tasting-notes" v-if="product_taste.length>0">
<h3 class="subsection-title">Tasting Notes</h3>
<div class="notes-grid">
<div class="note-item" v-for="(taste,key) in product_taste" :key="key">
<span class="note-label">{{ taste.type }} </span>
<span class="note-value">{{ taste.taste }} </span>
</div>
</div>
</div>



<div class="origin-section" v-for="(origin,key) in product_origin" :key="key">
<h3 class="subsection-title">Origin</h3>
<div class="origin-details">
<div class="origin-item">
<ion-icon :icon="locationOutline" class="origin-icon"></ion-icon>
<div class="origin-content">
<span class="origin-label">Region</span>
<span class="origin-value">{{ origin.region }}</span>
</div>
</div>
<div class="origin-item">
<ion-icon :icon="trendingUpOutline" class="origin-icon"></ion-icon>
<div class="origin-content">
<span class="origin-label">Altitude</span>
<span class="origin-value">{{ origin.altitude}}</span>
</div>
</div>
<div class="origin-item">
<ion-icon :icon="leafOutline" class="origin-icon"></ion-icon>
<div class="origin-content">
<span class="origin-label">Farm</span>
<span class="origin-value">{{ origin.farm.name }}</span>
</div>
</div>
</div>
</div>


</div>












<!-- SPECS -->
<div class="specs-card" v-if="product_specification.length>0">
<h2 class="section-title">Specifications</h2>
<div class="specs-grid">

<div class="spec-item" v-for="(spec,key) in product_specification" :key="key">
<span class="spec-label capitalize">{{ spec.name }}</span>
<span class="spec-value capitalize">{{ spec.description }}</span>
</div>

</div>
</div>

<!-- FARMER PROFILE -->
<div class="farmer-card">
<div class="farmer-content">
<div class="farmer-image-wrapper">
<img :src="product.farmer.image" :alt="product.farmer.name" class="farmer-image" />
</div>
<div class="farmer-info">
<span class="farmer-label">Sourced from</span>
<h3 class="farmer-name">{{ product.farmer.name }}</h3>
<span class="farmer-region">{{ product.farmer.region }}</span>
</div>
</div>
<button class="farmer-profile-btn" @click="viewFarmerProfile">
<span>View Farmer Profile</span>
<ion-icon :icon="arrowForwardOutline"></ion-icon>
</button>
</div>

<!-- ACTIONS -->
<div class="actions-section">
<div class="quick-actions">
<button class="quick-action-btn" @click="addToCart">
<ion-icon :icon="cartOutline"></ion-icon>
<span>Add to Cart</span>
</button>
<button class="quick-action-btn" @click="addToSubscription">
<ion-icon :icon="refreshOutline"></ion-icon>
<span>Subscribe</span>
</button>
<button class="quick-action-btn" @click="viewBrewGuide">
<ion-icon :icon="cafeOutline"></ion-icon>
<span>Brew Guide</span>
</button>
</div>

<button class="order-now-btn" @click="orderNow">
<span>Order Now</span>
<ion-icon :icon="arrowForwardOutline"></ion-icon>
</button>
</div>

<!-- RECOMMENDED PRODUCTS -->
<div class="recommended-section">
<div class="recommended-header">
<h2 class="section-title">You May Also Like</h2>
<button class="view-all-link" @click="viewAllRecommended">
<span>View All</span>
<ion-icon :icon="chevronForwardOutline"></ion-icon>
</button>
</div>

<div class="recommended-carousel">
<div 
v-for="item in recommendedProducts" 
:key="item.id"
class="recommended-card"
@click="viewProduct(item.id)"
>
<div class="recommended-image-wrapper">
<img :src="item.image" :alt="item.name" class="recommended-image" />
</div>
<div class="recommended-info">
<h4 class="recommended-name">{{ item.name }}</h4>
<div class="recommended-meta">
<span class="recommended-type">{{ item.type }}</span>
<div class="recommended-rating">
<ion-icon :icon="starSharp"></ion-icon>
<span>{{ item.rating }}</span>
</div>
</div>
<span class="recommended-price">${{ item.price }}</span>
</div>
</div>
</div>
</div>

</div>
<skeleton v-else style="margin:20px;"/>




</template>
</app-layout>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { useRoute } from 'vue-router';
import AppLayout from './template/AppLayout.vue';
import HeadButtonsDefault from './template/HeadButtonsDefault.vue';
import Skeleton from './template/Skeleton.vue';
import ProductService from '../service/ProductService';
import {
IonPage,
IonHeader,
IonToolbar,
IonButtons,
IonButton,
IonTitle,
IonContent,
IonIcon,
} from "@ionic/vue";
import {
arrowBackOutline,
shareOutline,
heartOutline,
heartSharp,
starSharp,
starOutline,
locationOutline,
trendingUpOutline,
leafOutline,
arrowForwardOutline,
cartOutline,
refreshOutline,
cafeOutline,
chevronForwardOutline,
} from "ionicons/icons";


const router =  useIonRouter();
const isFavorite = ref(false);

const product = ref({
id: 1,
name: 'Ethiopian Yirgacheffe',
coffeeType: 'Single Origin Arabica',
roastLevel: 'Medium',
rating: 4.8,
reviews: 234,
price: 18.99,
originalPrice: 24.99,
discount: 25,
badge: 'Premium',
image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
description: 'A vibrant and complex coffee from the birthplace of coffee. This Ethiopian Yirgacheffe offers bright citrus notes with floral undertones and a wine-like acidity that makes it perfect for pour-over brewing.',
tastingNotes: {
acidity: 'Bright Citrus',
aroma: 'Floral & Fruity',
body: 'Light & Delicate',
aftertaste: 'Clean & Sweet'
},
origin: {
region: 'Yirgacheffe, Ethiopia',
altitude: '1,800 - 2,200m',
farm: 'Kochere Cooperative'
},
specs: {
weight: '250g',
processing: 'Washed',
packaging: 'Resealable Bag',
harvestYear: '2024'
},
farmer: {
name: 'Alem Bekele',
region: 'Gedeo Zone, Ethiopia',
image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
}
});

const recommendedProducts = ref([
{
id: 2,
name: 'Colombian Supremo',
type: 'Medium Roast',
rating: 4.7,
price: 16.99,
image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400'
},
{
id: 3,
name: 'Kenyan AA',
type: 'Light Roast',
rating: 4.9,
price: 19.99,
image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400'
},
{
id: 4,
name: 'Brazilian Santos',
type: 'Dark Roast',
rating: 4.6,
price: 15.99,
image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'
},
{
id: 5,
name: 'Guatemala Antigua',
type: 'Medium Roast',
rating: 4.8,
price: 17.99,
image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400'
}
]);

const getRoastClass = (roastLevel) => {
return roastLevel.toLowerCase().replace(' ', '-');
};



const shareProduct = () => {
console.log('Share product');
};

const toggleFavorite = () => {
isFavorite.value = !isFavorite.value;
};

const viewFarmerProfile = () => {
console.log('View farmer profile');
};

const addToCart = () => {
console.log('Add to cart');
};

const addToSubscription = () => {
console.log('Add to subscription');
};

const viewBrewGuide = () => {
console.log('View brew guide');
};

const orderNow = () => {
console.log('Order now');
};

const viewAllRecommended = () => {
console.log('View all recommended');
};

const viewProduct = (id) => {
console.log('View product:', id);
};





const item=ref('');
const product_taste=ref('');
const product_origin=ref([]);
const product_specification=ref([]);
const product_standard=ref('');

const isLoading=ref(false);
const error=ref(null);
const url=useRoute();

onMounted(async ()=>{
const id=url.params.id;
try{

isLoading.value=true;
const service=new ProductService();
const response = await service.getProductDetails(id);
if(response.status===200){
const data=response.data;
data.forEach(element => {
item.value=element;
product_taste.value=element.product_taste;
product_origin.value=element.product_origin;
product_specification.value=element.product_specification;
product_standard.value=element.product_standard;
});

console.log(product_origin.value);

}else{
console.log(response.error);
error.value='Could not retrieve data, please try again';
}

}catch(e){
console.log(e);
error.value='Could not complete action, please try again.';
}finally{
isLoading.value=false;
}




});












</script>

<style scoped>
/* ===== VARIABLES ===== */
:root {
--bean-primary: #6b4226;
--bean-secondary: #3d2317;
--bean-accent: #d4a574;
--bean-light: #f5f1ed;
--bean-cream: #faf8f5;
--text-dark: #2d1810;
--text-medium: #5d4e46;
--text-light: #8b7c74;
--orange: #ff9800;
--green: #27ae60;
--red: #ef4444;
}

/* ===== HEADER ===== */

.product-title {
font-size: 18px;
font-weight: 800;
color: var(--text-dark);
letter-spacing: -0.2px;
}

.header-btn {
--background: rgba(107, 66, 38, 0.08);
--color: var(--text-dark);
width: 44px;
height: 44px;
margin: 4px;
border-radius: 50%;
transition: all 0.3s ease;
}

.header-btn:active {
transform: scale(0.92);
}

.favorite-btn.active {
--color: var(--red);
--background: rgba(239, 68, 68, 0.12);
}

/* ===== CONTENT ===== */
.product-content {
--background: var(--bean-cream);
}

.content-wrapper {
padding: 0 0 100px;
}

/* ===== HERO SECTION ===== */
.hero-section {
padding: 0 20px 20px;
animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeSlideUp {
from {
opacity: 0;
transform: translateY(20px);
}
to {
opacity: 1;
transform: translateY(0);
}
}

.product-image-wrapper {
position: relative;
width: 100%;
aspect-ratio: 1;
border-radius: 32px;
overflow: hidden;
background: linear-gradient(135deg, #f5f1ed, #ebe4dc);

}

.product-image {
width: 100%;
height: 100%;
object-fit: cover;
}

.product-badge {
position: absolute;
top: 20px;
right: 20px;
padding: 10px 18px;
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(10px);
border-radius: 16px;
font-size: 13px;
font-weight: 900;
color: var(--bean-primary);
text-transform: uppercase;
letter-spacing: 0.5px;

}

/* ===== INFO CARD ===== */
.info-card {
margin: 0 20px 16px;
padding: 24px;
background: white;
border-radius: 28px;

animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s backwards;
}

.product-header {
margin-bottom: 20px;
}

.product-name {
font-size: 28px;
font-weight: 900;
color: var(--text-dark);
margin: 0 0 12px 0;
line-height: 1.2;
letter-spacing: -0.5px;
}

.product-type-row {
display: flex;
align-items: center;
gap: 10px;
flex-wrap: wrap;
}

.coffee-type {
font-size: 14px;
font-weight: 700;
color: var(--text-medium);
letter-spacing: 0.3px;
}

.roast-pill {
padding: 6px 14px;
border-radius: 12px;
font-size: 12px;
font-weight: 900;
text-transform: uppercase;
letter-spacing: 0.5px;
}

.roast-pill.light {
background: linear-gradient(135deg, rgba(212, 165, 116, 0.15), rgba(212, 165, 116, 0.10));
color: var(--bean-accent);
}

.roast-pill.medium {
background: linear-gradient(135deg, rgba(107, 66, 38, 0.15), rgba(107, 66, 38, 0.10));
color: var(--bean-primary);
}

.roast-pill.dark {
background: linear-gradient(135deg, rgba(61, 35, 23, 0.20), rgba(61, 35, 23, 0.15));
color: var(--bean-secondary);
}

.rating-section {
display: flex;
align-items: center;
gap: 10px;
margin-top: 12px;
}

.stars {
display: flex;
gap: 4px;
}

.star-icon {
font-size: 18px;
color: var(--orange);
}

.rating-text {
font-size: 14px;
font-weight: 700;
color: var(--text-light);
}

.price-section {
padding-top: 20px;
border-top: 1px solid rgba(107, 66, 38, 0.08);
}

.price-row {
display: flex;
align-items: center;
gap: 12px;
flex-wrap: wrap;
}

.price {
font-size: 32px;
font-weight: 900;
color: var(--bean-primary);
letter-spacing: -0.5px;
}

.original-price {
font-size: 20px;
font-weight: 700;
color: var(--text-light);
text-decoration: line-through;
}

.discount-badge {
padding: 6px 12px;
background: linear-gradient(135deg, #ff9800, #ff5722);
border-radius: 10px;
font-size: 12px;
font-weight: 900;
color: white;
text-transform: uppercase;
letter-spacing: 0.5px;
}

/* ===== DESCRIPTION CARD ===== */
.description-card {
margin: 0 20px 16px;
padding: 24px;
background: white;
border-radius: 28px;

animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards;
}

.section-title {
font-size: 22px;
font-weight: 900;
color: var(--text-dark);
margin: 0 0 16px 0;
letter-spacing: -0.3px;
}

.description-text {
font-size: 15px;
line-height: 1.7;
color: var(--text-medium);
margin: 0 0 24px 0;
font-weight: 500;
}

.tasting-notes {
margin-bottom: 24px;
}

.subsection-title {
font-size: 17px;
font-weight: 800;
color: var(--text-dark);
margin: 0 0 14px 0;
letter-spacing: -0.2px;
}

.notes-grid {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 14px;
}

.note-item {
display: flex;
flex-direction: column;
gap: 6px;
padding: 16px;
background: linear-gradient(135deg, rgba(245, 241, 237, 0.6), rgba(235, 228, 220, 0.4));
border-radius: 16px;
}

.note-label {
font-size: 12px;
font-weight: 800;
color: var(--text-light);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.note-value {
font-size: 15px;
font-weight: 800;
color: var(--text-dark);
}

.origin-section {
padding-top: 24px;
border-top: 1px solid rgba(107, 66, 38, 0.08);
}

.origin-details {
display: flex;
flex-direction: column;
gap: 14px;
}

.origin-item {
display: flex;
align-items: center;
gap: 14px;
padding: 14px;
background: linear-gradient(135deg, rgba(245, 241, 237, 0.6), rgba(235, 228, 220, 0.4));
border-radius: 16px;
}

.origin-icon {
font-size: 24px;
color: var(--bean-primary);
flex-shrink: 0;
}

.origin-content {
display: flex;
flex-direction: column;
gap: 4px;
flex: 1;
}

.origin-label {
font-size: 12px;
font-weight: 800;
color: var(--text-light);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.origin-value {
font-size: 15px;
font-weight: 800;
color: var(--text-dark);
}

/* ===== SPECS CARD ===== */
.specs-card {
margin: 0 20px 16px;
padding: 24px;
background: white;
border-radius: 28px;

animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s backwards;
}

.specs-grid {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 14px;
}

.spec-item {
display: flex;
flex-direction: column;
gap: 6px;
padding: 16px;
background: linear-gradient(135deg, rgba(245, 241, 237, 0.6), rgba(235, 228, 220, 0.4));
border-radius: 16px;
}

.spec-label {
font-size: 12px;
font-weight: 800;
color: var(--text-light);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.spec-value {
font-size: 15px;
font-weight: 800;
color: var(--text-dark);
}

/* ===== FARMER CARD ===== */
.farmer-card {
margin: 0 20px 16px;
padding: 24px;
background: white;
border-radius: 28px;

animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s backwards;
}

.farmer-content {
display: flex;
align-items: center;
gap: 16px;
margin-bottom: 20px;
}

.farmer-image-wrapper {
width: 72px;
height: 72px;
border-radius: 50%;
overflow: hidden;
background: linear-gradient(135deg, #f5f1ed, #ebe4dc);
flex-shrink: 0;

}

.farmer-image {
width: 100%;
height: 100%;
object-fit: cover;
}

.farmer-info {
display: flex;
flex-direction: column;
gap: 4px;
flex: 1;
}

.farmer-label {
font-size: 11px;
font-weight: 800;
color: var(--text-light);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.farmer-name {
font-size: 20px;
font-weight: 900;
color: var(--text-dark);
margin: 0;
letter-spacing: -0.3px;
}

.farmer-region {
font-size: 14px;
font-weight: 600;
color: var(--text-medium);
}

.farmer-profile-btn {
width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
padding: 16px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.10), rgba(107, 66, 38, 0.06));
border: none;
border-radius: 16px;
font-size: 15px;
font-weight: 900;
color: var(--bean-primary);
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.farmer-profile-btn:active {
transform: scale(0.97);
background: linear-gradient(135deg, rgba(107, 66, 38, 0.15), rgba(107, 66, 38, 0.10));
}

.farmer-profile-btn ion-icon {
font-size: 20px;
}

/* ===== ACTIONS SECTION ===== */
.actions-section {
margin: 0 20px 24px;
animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.5s backwards;
}

.quick-actions {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 10px;
margin-bottom: 12px;
}

.quick-action-btn {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 8px;
padding: 18px 10px;
background: white;
border: none;
border-radius: 20px;
font-size: 12px;
font-weight: 900;
color: var(--text-dark);
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

letter-spacing: 0.2px;
}

.quick-action-btn:active {
transform: scale(0.95);
}

.quick-action-btn ion-icon {
font-size: 28px;
color: var(--bean-primary);
}

.order-now-btn {
width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
padding: 20px;
background: linear-gradient(135deg, #6b4226, #3d2317);
border: none;
border-radius: 20px;
font-size: 17px;
font-weight: 900;
color: white;
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
letter-spacing: 0.3px;
}

.order-now-btn:active {
transform: scale(0.97);
}

.order-now-btn ion-icon {
font-size: 24px;
}

/* ===== RECOMMENDED SECTION ===== */
.recommended-section {
margin: 0 0 0 20px;
animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s backwards;
}

.recommended-header {
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 20px 16px 0;
}

.view-all-link {
display: flex;
align-items: center;
gap: 6px;
padding: 8px 14px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.08), rgba(107, 66, 38, 0.05));
border: none;
border-radius: 12px;
font-size: 14px;
font-weight: 900;
color: var(--bean-primary);
cursor: pointer;
transition: all 0.3s ease;
}

.view-all-link:active {
transform: scale(0.95);
background: linear-gradient(135deg, rgba(107, 66, 38, 0.12), rgba(107, 66, 38, 0.08));
}

.view-all-link ion-icon {
font-size: 18px;
}

.recommended-carousel {
display: flex;
gap: 14px;
overflow-x: auto;
-webkit-overflow-scrolling: touch;
padding: 0 20px 4px 0;
}

.recommended-carousel::-webkit-scrollbar {
display: none;
}

.recommended-card {
flex-shrink: 0;
width: 180px;
background: white;
border-radius: 24px;
overflow: hidden;
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.recommended-card:active {
transform: scale(0.97);
}

.recommended-image-wrapper {
width: 100%;
height: 180px;
background: linear-gradient(135deg, #f5f1ed, #ebe4dc);
overflow: hidden;
}

.recommended-image {
width: 100%;
height: 100%;
object-fit: cover;
}

.recommended-info {
padding: 16px;
}

.recommended-name {
font-size: 16px;
font-weight: 900;
color: var(--text-dark);
margin: 0 0 8px 0;
line-height: 1.3;
letter-spacing: -0.2px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}

.recommended-meta {
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 10px;
}

.recommended-type {
font-size: 12px;
font-weight: 700;
color: var(--text-light);
}

.recommended-rating {
display: flex;
align-items: center;
gap: 4px;
font-size: 13px;
font-weight: 800;
color: var(--text-dark);
}

.recommended-rating ion-icon {
font-size: 14px;
color: var(--orange);
}

.recommended-price {
font-size: 18px;
font-weight: 900;
color: var(--bean-primary);
}

/* ===== RESPONSIVE ===== */
@media (min-width: 480px) {
.notes-grid,
.specs-grid {
grid-template-columns: repeat(2, 1fr);
}
}

@media (min-width: 768px) {
.content-wrapper {
max-width: 600px;
margin: 0 auto;
}
}
</style>