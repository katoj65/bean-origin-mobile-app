<template>
<app-layout title="Product Details">
<template #header>
<HeadButtonsDefault/>
</template>
<template #content>
<div class="coffee-content">
<div class="content-container">

<!-- HERO CARD: IMAGE + PRODUCT INFO + PRICE -->














<!-- DESCRIPTION CARD -->
<div class="content-card description-card">
<div class="card-header">
<div class="header-icon">
<ion-icon :icon="documentTextOutline"></ion-icon>
</div>
<div class="header-text">
<h2 class="card-title">About This Coffee</h2>
<p class="card-subtitle">What makes it special</p>
</div>
</div>

<p class="description-text">{{ product.description }}</p>

<!-- Key Features -->
<div class="key-features">
<div class="feature-item">
<div class="feature-check">✓</div>
<span>Single Origin</span>
</div>
<div class="feature-item">
<div class="feature-check">✓</div>
<span>Ethically Sourced</span>
</div>
<div class="feature-item">
<div class="feature-check">✓</div>
<span>Small Batch Roasted</span>
</div>
<div class="feature-item">
<div class="feature-check">✓</div>
<span>Direct Trade</span>
</div>
</div>
</div>

<!-- SPECIFICATIONS CARD -->
<div class="content-card specs-card">
<div class="card-header">
<div class="header-icon">
<ion-icon :icon="listOutline"></ion-icon>
</div>
<div class="header-text">
<h2 class="card-title">Specifications</h2>
<p class="card-subtitle">Coffee details</p>
</div>
</div>

<div class="specs-grid">
<div class="spec-item">
<div class="spec-icon">☕</div>
<div class="spec-details">
<span class="spec-label">Roast Level</span>
<span class="spec-value">{{ product.roast }}</span>
</div>
</div>
<div class="spec-item">
<div class="spec-icon">⛰️</div>
<div class="spec-details">
<span class="spec-label">Altitude</span>
<span class="spec-value">{{ product.altitude }}</span>
</div>
</div>
<div class="spec-item">
<div class="spec-icon">💧</div>
<div class="spec-details">
<span class="spec-label">Processing</span>
<span class="spec-value">{{ product.process }}</span>
</div>
</div>
<div class="spec-item">
<div class="spec-icon">🌱</div>
<div class="spec-details">
<span class="spec-label">Variety</span>
<span class="spec-value">{{ product.variety }}</span>
</div>
</div>
</div>
</div>

<!-- FLAVOR CARD -->
<div class="content-card flavor-card">
<div class="card-header">
<div class="header-icon">
<ion-icon :icon="cafeOutline"></ion-icon>
</div>
<div class="header-text">
<h2 class="card-title">Flavor Profile</h2>
<p class="card-subtitle">Tasting notes</p>
</div>
</div>

<div class="flavor-notes">
<div v-for="(flavor, index) in product.flavors" :key="flavor" 
class="flavor-chip"
:style="{ animationDelay: (index * 0.05) + 's' }">
{{ flavor }}
</div>
</div>

<!-- Flavor Characteristics -->
<div class="flavor-characteristics">
<div class="characteristic">
<div class="char-header">
<span class="char-label">Body</span>
<span class="char-value">Medium-Full</span>
</div>
<div class="char-bar">
<div class="char-fill" :style="{ width: '75%' }"></div>
</div>
</div>
<div class="characteristic">
<div class="char-header">
<span class="char-label">Acidity</span>
<span class="char-value">Bright & Clean</span>
</div>
<div class="char-bar">
<div class="char-fill bright" :style="{ width: '85%' }"></div>
</div>
</div>
<div class="characteristic">
<div class="char-header">
<span class="char-label">Sweetness</span>
<span class="char-value">Honey-like</span>
</div>
<div class="char-bar">
<div class="char-fill sweet" :style="{ width: '80%' }"></div>
</div>
</div>
</div>
</div>

<!-- SUSTAINABILITY CARD -->
<div class="content-card sustainability-card">
<div class="card-header">
<div class="header-icon green">
<ion-icon :icon="leafOutline"></ion-icon>
</div>
<div class="header-text">
<h2 class="card-title">Sustainability</h2>
<p class="card-subtitle">Environmental impact</p>
</div>
</div>

<div class="impact-grid">
<div class="impact-item">
<div class="impact-icon">💧</div>
<div class="impact-content">
<span class="impact-value">{{ product.sustainability.waterSaved }}L</span>
<span class="impact-label">Water Saved</span>
</div>
<div class="impact-bar">
<div class="impact-fill" :style="{ width: '85%' }"></div>
</div>
</div>
<div class="impact-item">
<div class="impact-icon">🌱</div>
<div class="impact-content">
<span class="impact-value">{{ product.sustainability.carbonOffset }}kg</span>
<span class="impact-label">CO₂ Offset</span>
</div>
<div class="impact-bar">
<div class="impact-fill" :style="{ width: '70%' }"></div>
</div>
</div>
<div class="impact-item">
<div class="impact-icon">♻️</div>
<div class="impact-content">
<span class="impact-value">{{ product.sustainability.wasteRecycled }}%</span>
<span class="impact-label">Waste Recycled</span>
</div>
<div class="impact-bar">
<div class="impact-fill" :style="{ width: '98%' }"></div>
</div>
</div>
<div class="impact-item">
<div class="impact-icon">🌳</div>
<div class="impact-content">
<span class="impact-value">{{ product.sustainability.treesPlanted }}</span>
<span class="impact-label">Trees Planted</span>
</div>
<div class="impact-bar">
<div class="impact-fill" :style="{ width: '90%' }"></div>
</div>
</div>
</div>

<!-- Certifications -->
<div class="certifications-section">
<div class="cert-label">Certifications</div>
<div class="cert-badges">
<div v-for="cert in product.certifications" :key="cert.name" class="cert-badge">
<span class="cert-emoji">{{ cert.icon }}</span>
<span class="cert-name">{{ cert.name }}</span>
</div>
</div>
</div>
</div>

<!-- JOURNEY CARD -->
<div class="content-card journey-card">
<div class="card-header">
<div class="header-icon blue">
<ion-icon :icon="mapOutline"></ion-icon>
</div>
<div class="header-text">
<h2 class="card-title">Product Journey</h2>
<p class="card-subtitle">From farm to cup</p>
</div>
</div>

<div class="journey-timeline">
<div v-for="(stage, index) in product.journey" :key="index" class="timeline-item">
<div class="timeline-marker">
<div class="timeline-number">{{ index + 1 }}</div>
<div v-if="index < product.journey.length - 1" class="timeline-line"></div>
</div>
<div class="timeline-content">
<div class="timeline-header">
<span class="timeline-emoji">{{ stage.emoji }}</span>
<div class="timeline-info">
<h3 class="timeline-title">{{ stage.title }}</h3>
<span class="timeline-date">{{ stage.date }}</span>
</div>
</div>
<p class="timeline-description">{{ stage.description }}</p>
</div>
</div>
</div>

<!-- Blockchain Verification -->
<div class="verification-box">
<div class="verify-icon">
<ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
</div>
<div class="verify-content">
<span class="verify-title">Blockchain Verified</span>
<span class="verify-subtitle">Journey recorded permanently</span>
</div>
<button class="verify-button">
View
<ion-icon :icon="arrowForwardOutline"></ion-icon>
</button>
</div>
</div>

<!-- FARMER CARD -->
<div class="content-card farmer-card">
<div class="card-header">
<div class="header-icon orange">
<ion-icon :icon="personOutline"></ion-icon>
</div>
<div class="header-text">
<h2 class="card-title">Meet the Farmer</h2>
<p class="card-subtitle">Behind your coffee</p>
</div>
</div>

<div class="farmer-profile">
<div class="farmer-top">
<img :src="product.farmer.photo" :alt="product.farmer.name" class="farmer-photo" />
<div class="farmer-info">
<h3 class="farmer-name">{{ product.farmer.name }}</h3>
<p class="farmer-role">{{ product.farmer.role }}</p>
<div class="farmer-meta">
<span class="farmer-badge">
<ion-icon :icon="homeOutline"></ion-icon>
{{ product.farmer.farmSize }}
</span>
<span class="farmer-badge">
<ion-icon :icon="calendarOutline"></ion-icon>
{{ product.farmer.experience }}
</span>
</div>
</div>
</div>

<div class="farmer-quote-box">
<div class="quote-mark">"</div>
<p class="quote-text">{{ product.farmer.quote }}</p>
</div>

<!-- Community Impact -->
<div class="community-section">
<h4 class="community-title">Community Impact</h4>
<div class="community-grid">
<div class="community-item">
<div class="community-icon">👨‍👩‍👧‍👦</div>
<span class="community-value">{{ product.farmer.familiesSupported }}</span>
<span class="community-label">Families</span>
</div>
<div class="community-item">
<div class="community-icon">🏫</div>
<span class="community-value">{{ product.farmer.schoolsBuilt }}</span>
<span class="community-label">Schools</span>
</div>
<div class="community-item">
<div class="community-icon">👷</div>
<span class="community-value">{{ product.farmer.workersEmployed }}</span>
<span class="community-label">Workers</span>
</div>
</div>
</div>
</div>
</div>

<!-- PURCHASE OPTIONS CARD -->
<div class="content-card purchase-card">
<div class="card-header">
<div class="header-icon">
<ion-icon :icon="cartOutline"></ion-icon>
</div>
<div class="header-text">
<h2 class="card-title">Purchase Options</h2>
<p class="card-subtitle">Customize your order</p>
</div>
</div>

<!-- Size Selection -->
<div class="option-section">
<label class="option-label">Size</label>
<div class="option-buttons">
<button 
v-for="size in sizes" 
:key="size"
:class="['option-btn', { active: selectedSize === size }]"
@click="selectedSize = size">
{{ size }}
</button>
</div>
</div>

<!-- Grind Selection -->
<div class="option-section">
<label class="option-label">Grind</label>
<div class="option-buttons">
<button 
v-for="grind in grinds" 
:key="grind"
:class="['option-btn', { active: selectedGrind === grind }]"
@click="selectedGrind = grind">
{{ grind }}
</button>
</div>
</div>

<!-- Quantity Selection -->
<div class="option-section">
<label class="option-label">Quantity</label>
<div class="quantity-selector">
<button class="qty-btn" @click="decreaseQty" :disabled="quantity <= 1">
<ion-icon :icon="removeOutline"></ion-icon>
</button>
<span class="qty-number">{{ quantity }}</span>
<button class="qty-btn" @click="increaseQty" :disabled="quantity >= 10">
<ion-icon :icon="addOutline"></ion-icon>
</button>
</div>
</div>

<!-- Add to Cart Button -->
<button class="add-cart-button" @click="addToCart">
<ion-icon :icon="cartOutline"></ion-icon>
<span>Add to Cart</span>
<span class="cart-price">${{ totalPrice }}</span>
</button>
</div>

</div>
</div>
</template>
</app-layout>
</template>

<script setup>
import { ref, computed } from 'vue';
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
} from "@ionic/vue";
import {
arrowBackOutline,
heartOutline,
heart,
shareOutline,
locationOutline,
starOutline,
pricetagOutline,
cashOutline,
checkmarkCircleOutline,
cardOutline,
shieldCheckmarkOutline,
documentTextOutline,
listOutline,
cafeOutline,
leafOutline,
mapOutline,
personOutline,
homeOutline,
calendarOutline,
arrowForwardOutline,
cartOutline,
removeOutline,
addOutline,
} from "ionicons/icons";

const router = useRouter();

const showSolidHeader = ref(false);
const currentImageIndex = ref(0);
const selectedSize = ref('250g');
const selectedGrind = ref('Whole Bean');
const quantity = ref(1);

const sizes = ['250g', '500g', '1kg'];
const grinds = ['Whole Bean', 'Ground', 'Espresso'];

const product = ref({
id: 1,
name: "Ethiopian Yirgacheffe Premium",
origin: "Yirgacheffe, Ethiopia",
price: 18.99,
discount: 15,
rating: 4.8,
reviewCount: 127,
favorite: false,
organic: true,
fairTrade: true,
description: "Experience the birthplace of coffee with this exceptional single-origin lot. Grown at high altitudes by dedicated smallholder farmers, each bean is carefully hand-picked at peak ripeness. The traditional washed processing method brings out vibrant floral notes, bright citrus acidity, and a delicate tea-like body that makes this coffee truly special.",

images: [
'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800'
],

roast: 'Light',
altitude: '1,800-2,200m',
process: 'Washed',
variety: 'Heirloom',

flavors: ['Jasmine', 'Lemon', 'Bergamot', 'Honey', 'Black Tea', 'Peach'],

sustainability: {
waterSaved: '2,400',
carbonOffset: '15',
wasteRecycled: '98',
treesPlanted: '125'
},

certifications: [
{ icon: '🌿', name: 'Organic' },
{ icon: '🤝', name: 'Fair Trade' },
{ icon: '🐸', name: 'Rainforest' },
{ icon: '⭐', name: 'Grade 1' }
],

journey: [
{
emoji: '🌱',
title: 'Farm Cultivation',
date: 'Jan - Oct 2024',
description: 'Grown at 1,950m altitude using shade-grown organic methods with regular care by local farmers.'
},
{
emoji: '🍒',
title: 'Selective Harvesting',
date: 'Nov 15-28, 2024',
description: 'Hand-picked at peak ripeness. Only red cherries selected through multiple passes.'
},
{
emoji: '💧',
title: 'Washed Processing',
date: 'Nov 29 - Dec 1',
description: 'Cherries depulped and fermented for 36 hours, washed with mountain spring water.'
},
{
emoji: '☀️',
title: 'Sun Drying',
date: 'Dec 2-14, 2024',
description: 'Dried on raised African beds over 12 days to 11% moisture content.'
},
{
emoji: '🔍',
title: 'Quality Grading',
date: 'Dec 20-22, 2024',
description: 'Professional cupping and grading. Achieved Grade 1 classification with 88 points.'
}
],

farmer: {
name: 'Alemayehu Tadesse',
role: 'Coffee Farmer & Cooperative Leader',
photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
farmSize: '2.5 hectares',
experience: '25 years',
quote: 'Every coffee cherry we harvest carries the story of our land, our tradition, and our dreams for the future.',
familiesSupported: '47',
schoolsBuilt: '2',
workersEmployed: '68'
}
});

const discountedPrice = computed(() => {
if (product.value.discount) {
return (product.value.price * (1 - product.value.discount / 100)).toFixed(2);
}
return product.value.price.toFixed(2);
});

const priceSaved = computed(() => {
if (product.value.discount) {
return (product.value.price - parseFloat(discountedPrice.value)).toFixed(2);
}
return '0.00';
});

const totalPrice = computed(() => {
return (parseFloat(discountedPrice.value) * quantity.value).toFixed(2);
});

const handleScroll = (event) => {
showSolidHeader.value = event.detail.scrollTop > 200;
};

const goBack = () => {
router.back();
};

const toggleFavorite = () => {
product.value.favorite = !product.value.favorite;
};

const shareProduct = () => {
console.log('Share product');
};

const decreaseQty = () => {
if (quantity.value > 1) quantity.value--;
};

const increaseQty = () => {
if (quantity.value < 10) quantity.value++;
};

const addToCart = () => {
console.log('Add to cart:', {
product: product.value.name,
size: selectedSize.value,
grind: selectedGrind.value,
quantity: quantity.value,
price: totalPrice.value
});
alert('Added to cart!');
};
</script>

<style scoped>
/* ===== VARIABLES ===== */
:root {
--coffee-dark: #4a2c2a;
--coffee-medium: #6b4226;
--coffee-light: #a87b54;
--text-dark: #2c1810;
--text-light: #8b7355;
--green: #27ae60;
--blue: #2196f3;
--orange: #ff9800;
--red: #ef4444;
}

* {
-webkit-tap-highlight-color: transparent;
}

/* ===== HEADER ===== */
.coffee-toolbar {
--background: transparent;
--border-width: 0;
padding: 8px 4px;
transition: all 0.3s ease;
}

.coffee-toolbar.solid {
--background: rgba(255, 255, 255, 0.98);
backdrop-filter: blur(20px);
box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.header-button {
--background: rgba(255, 255, 255, 0.95);
--color: var(--coffee-dark);
width: 42px;
height: 42px;
margin: 4px;
border-radius: 50%;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.header-title {
font-size: 17px;
font-weight: 700;
color: var(--coffee-dark);
}

/* ===== CONTENT ===== */
.coffee-content {
--background: #f2f2f2;
}

.content-container {
padding: 12px;
}

/* ===== CONTENT CARD (BASE) ===== */
.content-card {
background: white;
border-radius: 16px;
margin-bottom: 12px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

}

/* ===== HERO CARD ===== */
.hero-card {
padding: 0;
}

.image-carousel {
position: relative;
width: 100%;
height: 360px;
overflow: hidden;
}

.carousel-container {
display: flex;
height: 100%;
transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-slide {
flex: 0 0 100%;
width: 100%;
height: 100%;
}

.carousel-image {
width: 100%;
height: 200%;

}

.floating-badges {
position: absolute;
top: 16px;
left: 16px;
display: flex;
flex-direction: column;
gap: 8px;
z-index: 2;
}

.float-badge {
display: flex;
align-items: center;
gap: 6px;
padding: 8px 14px;
border-radius: 20px;
font-size: 12px;
font-weight: 700;
backdrop-filter: blur(10px);
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.discount-badge {
background: rgba(239, 68, 68, 0.95);
color: white;
}

.organic-badge {
background: rgba(39, 174, 96, 0.95);
color: white;
}

.fair-badge {
background: rgba(33, 150, 243, 0.95);
color: white;
}

.carousel-dots {
position: absolute;
bottom: 16px;
left: 0;
right: 0;
display: flex;
justify-content: center;
gap: 8px;
}

.dot {
width: 8px;
height: 8px;
border-radius: 50%;
background: rgba(255, 255, 255, 0.5);
border: none;
padding: 0;
cursor: pointer;
transition: all 0.3s ease;
}

.dot.active {
width: 24px;
border-radius: 4px;
background: white;
}

/* Hero Content */
.hero-content {
padding: 20px;
}

.product-name {
font-size: 24px;
font-weight: 700;
color: var(--coffee-dark);
margin: 0 0 12px 0;
line-height: 1.2;
}

.product-badges {
display: flex;
flex-wrap: wrap;
gap: 8px;
margin-bottom: 20px;
padding-bottom: 20px;
border-bottom: 1px solid #f0f0f0;
}

.badge-item {
display: flex;
align-items: center;
gap: 4px;
padding: 6px 12px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.08), rgba(107, 66, 38, 0.12));
border-radius: 16px;
font-size: 13px;
font-weight: 600;
}

.origin-badge {
color: var(--coffee-medium);
}

.rating-badge {
color: var(--orange);
}

.badge-item ion-icon {
font-size: 14px;
}

/* Price Section */
.price-section {
display: flex;
flex-direction: column;
gap: 16px;
}

.price-row {
display: flex;
justify-content: space-between;
align-items: center;
gap: 16px;
}

.price-display {
display: flex;
align-items: center;
gap: 12px;
flex: 1;
}

.price-main {
display: flex;
align-items: baseline;
gap: 10px;
}

.price-original {
font-size: 18px;
color: var(--text-light);
text-decoration: line-through;
font-weight: 600;
}

.price-current {
font-size: 32px;
font-weight: 800;
color: var(--coffee-dark);
line-height: 1;
}

.price-save-badge {
padding: 6px 12px;
background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
border-radius: 12px;
color: var(--red);
font-size: 13px;
font-weight: 700;
}

.stock-badge {
display: flex;
align-items: center;
gap: 4px;
padding: 8px 14px;
background: linear-gradient(135deg, rgba(39, 174, 96, 0.1), rgba(39, 174, 96, 0.05));
border-radius: 12px;
color: var(--green);
font-size: 13px;
font-weight: 700;
white-space: nowrap;
flex-shrink: 0;
}

.stock-badge ion-icon {
font-size: 16px;
}

.trust-badges {
display: flex;
gap: 16px;
padding: 16px;
background: linear-gradient(135deg, #fafafa, #f5f5f5);
border-radius: 12px;
}

.trust-item {
display: flex;
align-items: center;
gap: 6px;
font-size: 13px;
color: var(--text-light);
font-weight: 600;
}

.trust-item ion-icon {
font-size: 16px;
color: var(--coffee-medium);
}

/* ===== CARD HEADER ===== */
.card-header {
display: flex;
align-items: center;
gap: 12px;
margin-bottom: 20px;
}

.header-icon {
width: 44px;
height: 44px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.15), rgba(107, 66, 38, 0.25));
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
color: var(--coffee-medium);
flex-shrink: 0;
}

.header-icon.green {
background: linear-gradient(135deg, rgba(39, 174, 96, 0.15), rgba(39, 174, 96, 0.25));
color: var(--green);
}

.header-icon.blue {
background: linear-gradient(135deg, rgba(33, 150, 243, 0.15), rgba(33, 150, 243, 0.25));
color: var(--blue);
}

.header-icon.orange {
background: linear-gradient(135deg, rgba(255, 152, 0, 0.15), rgba(255, 152, 0, 0.25));
color: var(--orange);
}

.header-icon ion-icon {
font-size: 22px;
}

.card-title {
font-size: 18px;
font-weight: 700;
color: var(--coffee-dark);
margin: 0;
}

.card-subtitle {
font-size: 13px;
color: var(--text-light);
margin: 2px 0 0 0;
font-weight: 600;
}

/* ===== DESCRIPTION CARD ===== */
.description-card {
padding: 20px;
}

.description-text {
font-size: 15px;
line-height: 1.7;
color: var(--text-dark);
margin: 0 0 16px 0;
}

.key-features {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 10px;
}

.feature-item {
display: flex;
align-items: center;
gap: 10px;
padding: 12px;
background: linear-gradient(135deg, rgba(39, 174, 96, 0.08), rgba(39, 174, 96, 0.05));
border-radius: 12px;
}

.feature-check {
width: 22px;
height: 22px;
background: var(--green);
color: white;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
font-size: 12px;
font-weight: 700;
flex-shrink: 0;
}

.feature-item span {
font-size: 13px;
color: var(--coffee-dark);
font-weight: 600;
}

/* ===== SPECS CARD ===== */
.specs-card {
padding: 20px;
}

.specs-grid {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 12px;
}

.spec-item {
display: flex;
align-items: center;
gap: 12px;
padding: 14px;
background: linear-gradient(135deg, #fafafa, #f5f5f5);
border-radius: 12px;
}

.spec-icon {
font-size: 28px;
flex-shrink: 0;
}

.spec-details {
display: flex;
flex-direction: column;
gap: 3px;
flex: 1;
}

.spec-label {
font-size: 11px;
color: var(--text-light);
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.5px;
}

.spec-value {
font-size: 14px;
color: var(--coffee-dark);
font-weight: 700;
}

/* ===== FLAVOR CARD ===== */
.flavor-card {
padding: 20px;
}

.flavor-notes {
display: flex;
flex-wrap: wrap;
gap: 10px;
margin-bottom: 20px;
}

.flavor-chip {
padding: 10px 16px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.1), rgba(107, 66, 38, 0.15));
border-radius: 20px;
font-size: 14px;
font-weight: 700;
color: var(--coffee-medium);
animation: fadeInScale 0.5s ease-out backwards;
}

@keyframes fadeInScale {
from {
opacity: 0;
transform: scale(0.9);
}
to {
opacity: 1;
transform: scale(1);
}
}

.flavor-characteristics {
display: flex;
flex-direction: column;
gap: 16px;
padding: 16px;
background: linear-gradient(135deg, #fafafa, #f5f5f5);
border-radius: 14px;
}

.characteristic {
display: flex;
flex-direction: column;
gap: 8px;
}

.char-header {
display: flex;
justify-content: space-between;
align-items: center;
}

.char-label {
font-size: 13px;
color: var(--text-dark);
font-weight: 700;
}

.char-value {
font-size: 12px;
color: var(--text-light);
font-weight: 600;
}

.char-bar {
height: 6px;
background: #e8e8e8;
border-radius: 3px;
overflow: hidden;
}

.char-fill {
height: 100%;
background: linear-gradient(90deg, var(--coffee-medium), var(--coffee-light));
border-radius: 3px;
transition: width 1s ease-out;
}

.char-fill.bright {
background: linear-gradient(90deg, #f39c12, #f1c40f);
}

.char-fill.sweet {
background: linear-gradient(90deg, #e74c3c, #ec7063);
}

/* ===== SUSTAINABILITY CARD ===== */
.sustainability-card {
padding: 20px;
}

.impact-grid {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 12px;
margin-bottom: 20px;
}

.impact-item {
background: linear-gradient(135deg, #fafafa, #f5f5f5);
padding: 16px;
border-radius: 14px;
display: flex;
flex-direction: column;
gap: 8px;
}

.impact-icon {
font-size: 32px;
margin-bottom: 4px;
}

.impact-content {
display: flex;
flex-direction: column;
gap: 2px;
}

.impact-value {
font-size: 22px;
font-weight: 800;
color: var(--coffee-dark);
line-height: 1;
}

.impact-label {
font-size: 11px;
color: var(--text-light);
font-weight: 600;
text-transform: uppercase;
}

.impact-bar {
width: 100%;
height: 4px;
background: #e8e8e8;
border-radius: 2px;
overflow: hidden;
margin-top: 4px;
}

.impact-fill {
height: 100%;
background: linear-gradient(90deg, var(--green), #2ecc71);
border-radius: 2px;
transition: width 1s ease-out 0.3s;
}

.certifications-section {
padding-top: 20px;
border-top: 1px solid #f0f0f0;
}

.cert-label {
font-size: 13px;
font-weight: 700;
color: var(--coffee-dark);
margin-bottom: 12px;
text-transform: uppercase;
letter-spacing: 0.5px;
}

.cert-badges {
display: flex;
gap: 8px;
flex-wrap: wrap;
}

.cert-badge {
display: flex;
align-items: center;
gap: 6px;
padding: 8px 14px;
background: linear-gradient(135deg, #fafafa, #f5f5f5);
border-radius: 20px;
}

.cert-emoji {
font-size: 16px;
}

.cert-name {
font-size: 12px;
font-weight: 700;
color: var(--coffee-dark);
}

/* ===== JOURNEY CARD ===== */
.journey-card {
padding: 20px;
}

.journey-timeline {
display: flex;
flex-direction: column;
gap: 20px;
margin-bottom: 20px;
}

.timeline-item {
display: flex;
gap: 14px;
}

.timeline-marker {
display: flex;
flex-direction: column;
align-items: center;
flex-shrink: 0;
}

.timeline-number {
width: 36px;
height: 36px;
background: linear-gradient(135deg, var(--coffee-dark), var(--coffee-medium));
color: white;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
font-weight: 700;
}

.timeline-line {
width: 2px;
flex: 1;
background: linear-gradient(180deg, rgba(107, 66, 38, 0.3), rgba(107, 66, 38, 0.1));
margin: 8px 0;
}

.timeline-content {
flex: 1;
padding-bottom: 4px;
}

.timeline-header {
display: flex;
align-items: center;
gap: 10px;
margin-bottom: 8px;
}

.timeline-emoji {
font-size: 24px;
}

.timeline-title {
font-size: 16px;
font-weight: 700;
color: var(--coffee-dark);
margin: 0 0 2px 0;
}

.timeline-date {
font-size: 12px;
color: var(--text-light);
font-weight: 600;
}

.timeline-description {
font-size: 14px;
color: var(--text-dark);
line-height: 1.6;
margin: 0;
}

.verification-box {
display: flex;
align-items: center;
gap: 12px;
padding: 16px;
background: linear-gradient(135deg, rgba(39, 174, 96, 0.1), rgba(39, 174, 96, 0.05));
border-radius: 14px;
border: 2px solid rgba(39, 174, 96, 0.2);
}

.verify-icon {
width: 40px;
height: 40px;
background: var(--green);
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
color: white;
flex-shrink: 0;
}

.verify-icon ion-icon {
font-size: 22px;
}

.verify-content {
flex: 1;
display: flex;
flex-direction: column;
gap: 2px;
}

.verify-title {
font-size: 14px;
font-weight: 700;
color: var(--coffee-dark);
}

.verify-subtitle {
font-size: 12px;
color: var(--green);
font-weight: 600;
}

.verify-button {
display: flex;
align-items: center;
gap: 6px;
padding: 10px 16px;
background: white;
border: 2px solid var(--green);
border-radius: 12px;
color: var(--green);
font-size: 13px;
font-weight: 700;
cursor: pointer;
}

/* ===== FARMER CARD ===== */
.farmer-card {
padding: 20px;
}

.farmer-profile {
display: flex;
flex-direction: column;
gap: 20px;
}

.farmer-top {
display: flex;
gap: 14px;
padding-bottom: 20px;
border-bottom: 1px solid #f0f0f0;
}

.farmer-photo {
width: 70px;
height: 70px;
border-radius: 50%;
object-fit: cover;
border: 3px solid #f0f0f0;
flex-shrink: 0;
}

.farmer-name {
font-size: 18px;
font-weight: 700;
color: var(--coffee-dark);
margin: 0 0 4px 0;
}

.farmer-role {
font-size: 14px;
color: var(--text-light);
margin: 0 0 10px 0;
font-weight: 600;
}

.farmer-meta {
display: flex;
gap: 8px;
flex-wrap: wrap;
}

.farmer-badge {
display: flex;
align-items: center;
gap: 4px;
padding: 4px 10px;
background: linear-gradient(135deg, #fafafa, #f5f5f5);
border-radius: 12px;
font-size: 12px;
font-weight: 600;
color: var(--coffee-medium);
}

.farmer-badge ion-icon {
font-size: 14px;
}

.farmer-quote-box {
position: relative;
background: linear-gradient(135deg, #fafafa, #f5f5f5);
padding: 20px;
border-radius: 12px;
}

.quote-mark {
font-size: 48px;
color: var(--coffee-light);
opacity: 0.25;
position: absolute;
top: 10px;
left: 16px;
line-height: 1;
}

.quote-text {
font-size: 15px;
color: var(--coffee-dark);
font-style: italic;
line-height: 1.6;
margin: 0;
padding-left: 16px;
}

.community-title {
font-size: 14px;
font-weight: 700;
color: var(--coffee-dark);
margin: 0 0 12px 0;
}

.community-grid {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 12px;
}

.community-item {
background: linear-gradient(135deg, #fafafa, #f5f5f5);
padding: 14px;
border-radius: 12px;
display: flex;
flex-direction: column;
align-items: center;
gap: 6px;
}

.community-icon {
font-size: 28px;
}

.community-value {
font-size: 20px;
font-weight: 800;
color: var(--coffee-dark);
line-height: 1;
}

.community-label {
font-size: 11px;
color: var(--text-light);
font-weight: 600;
text-transform: uppercase;
}

/* ===== PURCHASE CARD ===== */
.purchase-card {
padding: 20px;
}

.option-section {
margin-bottom: 20px;
}

.option-label {
font-size: 13px;
color: var(--coffee-dark);
font-weight: 700;
margin-bottom: 10px;
display: block;
text-transform: uppercase;
letter-spacing: 0.5px;
}

.option-buttons {
display: flex;
gap: 8px;
}

.option-btn {
flex: 1;
padding: 12px;
background: #f5f5f5;
border: 2px solid transparent;
border-radius: 12px;
font-size: 14px;
font-weight: 700;
color: var(--text-dark);
cursor: pointer;
transition: all 0.3s ease;
}

.option-btn.active {
background: linear-gradient(135deg, rgba(107, 66, 38, 0.1), rgba(107, 66, 38, 0.15));
border-color: var(--coffee-medium);
color: var(--coffee-medium);
}

.quantity-selector {
display: flex;
align-items: center;
justify-content: center;
gap: 20px;
padding: 12px;
background: #f5f5f5;
border-radius: 12px;
}

.qty-btn {
width: 40px;
height: 40px;
border: none;
background: white;
color: var(--coffee-dark);
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
transition: all 0.3s ease;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.qty-btn:disabled {
opacity: 0.3;
cursor: not-allowed;
}

.qty-btn:active:not(:disabled) {
transform: scale(0.95);
}

.qty-btn ion-icon {
font-size: 20px;
}

.qty-number {
font-size: 20px;
font-weight: 700;
min-width: 40px;
text-align: center;
color: var(--coffee-dark);
}

.add-cart-button {
width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 12px;
padding: 18px;
background: linear-gradient(135deg, var(--coffee-dark), var(--coffee-medium));
border: none;
border-radius: 12px;
color: white;
font-size: 17px;
font-weight: 700;
cursor: pointer;
margin-top: 20px;
transition: all 0.3s ease;
box-shadow: 0 4px 12px rgba(107, 66, 38, 0.3);
}

.add-cart-button:active {
transform: scale(0.98);
}

.add-cart-button ion-icon {
font-size: 24px;
}

.cart-price {
margin-left: auto;
font-size: 20px;
font-weight: 800;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 400px) {
.specs-grid,
.impact-grid,
.key-features {
grid-template-columns: 1fr;
}

.price-row {
flex-direction: column;
align-items: flex-start;
}

.stock-badge {
align-self: flex-start;
}
}

</style>