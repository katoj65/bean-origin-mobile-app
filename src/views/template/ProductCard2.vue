<template>
<div class="product-card">
<!-- Image Container -->
<div class="image-container">
<img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80" alt="Coffee Product" class="product-image" />
<div class="image-overlay"></div>

<!-- Favorite Button -->
<ion-button fill="clear" class="fav-btn">
<ion-icon :icon="heartOutline"></ion-icon>
</ion-button>

<!-- Badge -->
<div class="product-badge">Organic</div>
</div>

<!-- Content -->
<div class="card-content">
<div class="content-top">
<div class="product-info">
<h3 class="product-name">
{{ item.name }}
</h3>
<p class="product-type">Arabica</p>

<div class="product-meta">
<!-- <span class="meta-item">
  <ion-icon :icon="locationOutline" class="meta-icon"></ion-icon>
  Ethiopia
</span> -->
<span class="meta-item">
  <ion-icon :icon="flameOutline" class="meta-icon"></ion-icon>
  {{ item.roast_level }}
</span>
</div>
</div>

<div class="rating">
<ion-icon :icon="star" class="star-icon"></ion-icon>
<span>4.8</span>
</div>
</div>

<div class="card-footer">
<div class="price-section">
<span class="price-label">Price</span>
<span class="price">Shs. {{ item.price }}</span>
</div>

</div>
</div>
</div>
</template>

<script setup>
import { IonButton, IonIcon, } from '@ionic/vue';
import { onMounted,ref } from 'vue';
import {
heartOutline,
heart,
star,
locationOutline,
flameOutline,
addOutline,
} from 'ionicons/icons';

const props=defineProps({
product:Object
});

const item=ref('');
onMounted(()=>{
item.value=props.product;

console.log(item);

});






</script>

<style scoped>
/* ===== CSS VARIABLES ===== */
:root {
--coffee-dark: #4a2c2a;
--coffee-medium: #6b4226;
--coffee-light: #a87b54;
--text-dark: #2c1810;
--text-light: #8b7355;
}

/* ===== PRODUCT CARD ===== */
.product-card {
background: white;
border-radius: 16px;
overflow: hidden;
display: flex;
flex-direction: row;
min-height: 120px;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
animation: fadeInUp 0.6s ease-out both;
cursor: pointer;
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
font-size: 15px;
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

/* ===== RESPONSIVE ===== */
@media (max-width: 360px) {
.product-name {
font-size: 15px;
}
}
span{
text-transform: capitalize;
}
</style>