<template>
<app-layout title="Product Details">
<template #content>
<div class="product-details-page">
<!-- Product Card -->
<div class="product-card">
<!-- Product Image -->
<div class="product-image-section">
<img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800" alt="Coffee" class="product-image" />
<div class="premium-badge">
<ion-icon :icon="starOutline" class="premium-icon"></ion-icon>
<span>Premium</span>
</div>
<div class="image-badge">
<ion-icon :icon="heartOutline" class="heart-icon"></ion-icon>
</div>
</div>

<!-- Product Info -->
<div class="product-info-content">
<div class="product-header">
<h1 class="product-name">Cappuccino</h1>
<div class="product-rating">
<ion-icon :icon="starOutline" class="star-icon"></ion-icon>
<span class="rating-value">4.8</span>
<span class="rating-count">(245)</span>
</div>
</div>

<div class="price-section">
<span class="price-value">$5.50</span>
</div>

<p class="product-description">
A classic Italian coffee drink made with espresso, steamed milk, and a thick layer of milk foam. 
Rich and creamy with a perfect balance of coffee and milk.
</p>

<!-- Add to Cart Button -->
<ion-button expand="block" class="add-cart-btn">
<ion-icon :icon="cartOutline" slot="start"></ion-icon>
Add to Cart
</ion-button>
</div>
</div>

<!-- Product Info Section -->
<div class="product-info-section">
<!-- Origin Info -->
<div class="origin-card">
<ion-icon :icon="locationOutline" class="origin-icon"></ion-icon>
<div class="origin-info">
<h4 class="origin-label">Origin</h4>
<p class="origin-value">Ethiopia, Yirgacheffe</p>
</div>
</div>

<!-- Farmer Summary -->
<div class="farmer-card">
<div class="farmer-content">
<div class="farmer-image-wrapper">
<img src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=120" alt="Farmer" class="farmer-image" />
</div>
<div class="farmer-info">
<span class="farmer-label">Sourced from</span>
<h3 class="farmer-name">Abebe Kebede</h3>
<span class="farmer-region">Yirgacheffe, Ethiopia</span>
</div>
</div>
<button class="farmer-profile-btn">
<span>View Farmer Profile</span>
<ion-icon :icon="arrowForwardOutline"></ion-icon>
</button>
</div>

<!-- Farm Summary -->
<div class="farm-section">
<div class="section-header-row">
<h3 class="section-label">Farm Details</h3>
<span class="certification-badge">
<ion-icon :icon="leafOutline"></ion-icon>
<span>Organic Certified</span>
</span>
</div>
<div class="farm-details-grid">
<div class="farm-detail-card">
<ion-icon :icon="waterOutline" class="detail-icon"></ion-icon>
<div class="detail-info">
<h4 class="detail-label">Processing</h4>
<p class="detail-value">Washed</p>
</div>
</div>
<div class="farm-detail-card">
<ion-icon :icon="sunnyOutline" class="detail-icon"></ion-icon>
<div class="detail-info">
<h4 class="detail-label">Altitude</h4>
<p class="detail-value">1,800-2,000m</p>
</div>
</div>
<div class="farm-detail-card">
<ion-icon :icon="leafOutline" class="detail-icon"></ion-icon>
<div class="detail-info">
<h4 class="detail-label">Variety</h4>
<p class="detail-value">Heirloom</p>
</div>
</div>
<div class="farm-detail-card">
<ion-icon :icon="calendarOutline" class="detail-icon"></ion-icon>
<div class="detail-info">
<h4 class="detail-label">Harvest</h4>
<p class="detail-value">Oct - Dec 2024</p>
</div>
</div>
</div>
<div class="sustainability-card">
<div class="sustainability-header">
<ion-icon :icon="leafOutline" class="sustainability-icon"></ion-icon>
<h4 class="sustainability-title">Sustainability Practices</h4>
</div>
<div class="sustainability-tags">
<span class="tag">Organic Farming</span>
<span class="tag">Water Conservation</span>
<span class="tag">Fair Trade</span>
<span class="tag">Biodiversity</span>
</div>
</div>
</div>

<!-- Quick Action Buttons -->
<div class="action-buttons-section">
<ion-button expand="block" class="action-btn subscription-btn">
<ion-icon :icon="reloadOutline" slot="start"></ion-icon>
<div class="btn-content">
<span class="btn-main-text">Subscribe</span>
<span class="btn-sub-text">Save 15%</span>
</div>
</ion-button>
<ion-button expand="block" fill="outline" class="action-btn brew-guide-btn">
<ion-icon :icon="cafeOutline" slot="start"></ion-icon>
<span>Brew Guide</span>
</ion-button>
</div>

<!-- Nutritional Info -->
<div class="nutrition-section">
<h3 class="section-label">Nutritional Information</h3>
<div class="nutrition-grid">
<div class="nutrition-item">
<span class="nutrition-value">150</span>
<span class="nutrition-label">Calories</span>
</div>
<div class="nutrition-item">
<span class="nutrition-value">8g</span>
<span class="nutrition-label">Protein</span>
</div>
<div class="nutrition-item">
<span class="nutrition-value">6g</span>
<span class="nutrition-label">Fat</span>
</div>
<div class="nutrition-item">
<span class="nutrition-value">12g</span>
<span class="nutrition-label">Carbs</span>
</div>
</div>
</div>

<!-- RECOMMENDED PRODUCTS -->
<div class="recommended-section">
<div class="recommended-header">
<h2 class="section-title">You May Also Like</h2>
<button class="view-all-link">
<span>View All</span>
<ion-icon :icon="chevronForwardOutline"></ion-icon>
</button>
</div>

<div class="recommended-carousel">
<div 
v-for="item in recommendedProducts" 
:key="item.id"
class="recommended-card"
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
</div>
</template>
</app-layout>
</template>

<script setup>
import { ref } from 'vue';
import AppLayout from './template/AppLayout.vue';
import {
  IonButton,
  IonIcon
} from '@ionic/vue';
import {
  heartOutline,
  starOutline,
  locationOutline,
  cartOutline,
  arrowForwardOutline,
  leafOutline,
  waterOutline,
  sunnyOutline,
  calendarOutline,
  checkmarkCircleOutline,
  timeOutline,
  resizeOutline,
  ribbonOutline,
  reloadOutline,
  cafeOutline,
  chevronForwardOutline,
  starSharp
} from 'ionicons/icons';

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
</script>

<style scoped>
/* ===== VARIABLES ===== */
:root {
  --coffee-900: #3d2419;
  --coffee-800: #4a2c2a;
  --coffee-700: #5d3a2f;
  --coffee-600: #6b4226;
  --coffee-500: #8b5a3c;
  
  --cream-50: #ffffff;
  --cream-100: #fdfcfa;
  --cream-200: #faf8f5;
  --cream-300: #f5f1e8;
  
  --text-900: #1a0f0a;
  --text-800: #2c1810;
  --text-600: #6b5444;
  --text-500: #8b7355;
  
  --gold: #fbbf24;
  --green: #10b981;
}

.product-details-page {
  background: var(--cream-200);
  min-height: 100%;
  padding-bottom: 120px;
}

/* ===== PRODUCT CARD ===== */
.product-card {
  background: white;
  margin: 20px 20px 10px 20px;
  border-radius: 20px;
  overflow: hidden;
}

/* ===== PRODUCT IMAGE ===== */
.product-image-section {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.image-badge:hover {
  transform: scale(1.1);
  background: var(--cream-100);
}

.heart-icon {
  font-size: 24px;
  color: var(--coffee-600);
}

.premium-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(135deg, var(--gold) 0%, #f59e0b 100%);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 900;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

.premium-icon {
  font-size: 18px;
  color: white;
}

/* ===== PRODUCT INFO ===== */
.product-info-content {
  padding: 20px;
}

.product-info-section {
  padding: 0 20px 20px 20px;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.product-name {
  font-size: 24px;
  font-weight: 900;
  color: #000000;
  margin: 0;
  letter-spacing: -0.5px;
  flex: 1;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.star-icon {
  font-size: 18px;
  color: var(--gold);
}

.rating-value {
  font-size: 16px;
  font-weight: 900;
  color: #000000;
}

.rating-count {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-600);
}

.price-section {
  margin-bottom: 12px;
}

.price-value {
  font-size: 28px;
  font-weight: 900;
  color: var(--coffee-600);
  letter-spacing: -0.5px;
}

.product-description {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-600);
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.add-cart-btn {
  --background: #6b4226;
  --background-activated: #5d3a2f;
  --background-hover: #5d3a2f;
  --border-radius: 16px;
  height: 56px;
  font-size: 16px;
  font-weight: 900;
  text-transform: none;
  letter-spacing: 0.3px;
  margin: 0;
}

.add-cart-btn ion-icon {
  font-size: 22px;
}

/* ===== ORIGIN CARD ===== */
.origin-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 16px;
  margin-bottom: 24px;
}

.origin-icon {
  font-size: 28px;
  color: var(--coffee-600);
  flex-shrink: 0;
}

.origin-info {
  flex: 1;
}

.origin-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-600);
  margin: 0 0 4px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.origin-value {
  font-size: 16px;
  font-weight: 900;
  color: #000000;
  margin: 0;
}

/* ===== FARMER SECTION ===== */
.farmer-section,
.farm-section {
  margin-bottom: 24px;
}

.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

/* ===== FARMER CARD ===== */
.farmer-card {
  padding: 24px;
  background: white;
  border-radius: 20px;
  margin-bottom: 20px;
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
  color: var(--text-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.farmer-name {
  font-size: 20px;
  font-weight: 900;
  color: #000000;
  margin: 0;
  letter-spacing: -0.3px;
}

.farmer-region {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-600);
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
  color: var(--coffee-600);
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

/* ===== ACTION BUTTONS ===== */
.action-buttons-section {
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.action-btn {
  height: 64px;
  font-weight: 900;
  font-size: 15px;
  text-transform: none;
  letter-spacing: 0.3px;
  margin: 0;
  transition: all 0.3s ease;
}

.subscription-btn {
  --background: linear-gradient(135deg, #6b4226 0%, #8b5a3c 50%, #6b4226 100%);
  --border-radius: 16px;
  position: relative;
  overflow: visible;
}

.subscription-btn::before {
  content: '';
  position: absolute;
  top: -2px;
  right: -2px;
  padding: 4px 10px;
  background: var(--gold);
  border-radius: 12px;
  font-size: 10px;
  font-weight: 900;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.subscription-btn .btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.btn-main-text {
  font-size: 16px;
  font-weight: 900;
  line-height: 1;
}

.btn-sub-text {
  font-size: 11px;
  font-weight: 800;
  opacity: 0.95;
  letter-spacing: 0.5px;
}

.subscription-btn:hover {
  transform: translateY(-2px);
  --background: linear-gradient(135deg, #8b5a3c 0%, #6b4226 50%, #8b5a3c 100%);
}

.brew-guide-btn {
  --border-color: var(--coffee-600);
  --color: var(--coffee-700);
  --background: white;
  --border-radius: 16px;
  --border-width: 2px;
}

.brew-guide-btn:hover {
  --background: var(--cream-100);
  transform: translateY(-2px);
}

/* ===== FARM SECTION ===== */
.certification-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 800;
  color: var(--green);
}

.certification-badge ion-icon {
  font-size: 16px;
}

.farm-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.farm-detail-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 16px;
}

.detail-icon {
  font-size: 28px;
  color: var(--coffee-600);
  flex-shrink: 0;
}

.detail-info {
  flex: 1;
  min-width: 0;
}

.detail-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-600);
  margin: 0 0 4px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 15px;
  font-weight: 900;
  color: #000000;
  margin: 0;
}

.sustainability-card {
  padding: 20px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%);
  border-radius: 16px;
}

.sustainability-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.sustainability-icon {
  font-size: 24px;
  color: var(--green);
}

.sustainability-title {
  font-size: 16px;
  font-weight: 900;
  color: #000000;
  margin: 0;
}

.sustainability-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 8px 14px;
  background: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 800;
  color: var(--green);
}

/* ===== OPTIONS SECTION ===== */
.options-section {
  margin-bottom: 24px;
}

.section-label {
  font-size: 18px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
}

/* ===== NUTRITION ===== */
.nutrition-section {
  margin-bottom: 24px;
}

.nutrition-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.nutrition-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 12px;
  background: white;
  border-radius: 16px;
}

.nutrition-value {
  font-size: 18px;
  font-weight: 900;
  color: var(--coffee-600);
  margin-bottom: 4px;
}

.nutrition-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-600);
  text-align: center;
}

/* ===== RECOMMENDED SECTION ===== */
.recommended-section {
  margin: 0 0 20px 0;
}

.recommended-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 16px 0;
}

.section-title {
  font-size: 20px;
  font-weight: 900;
  color: #000000;
  margin: 0;
  letter-spacing: -0.5px;
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
  color: var(--coffee-600);
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
  color: #000000;
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
  color: var(--text-600);
}

.recommended-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 800;
  color: #000000;
}

.recommended-rating ion-icon {
  font-size: 14px;
  color: var(--gold);
}

.recommended-price {
  font-size: 18px;
  font-weight: 900;
  color: var(--coffee-600);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .product-info-section {
    padding: 16px;
  }
  
  .nutrition-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .size-options {
    flex-direction: column;
  }
}
</style>