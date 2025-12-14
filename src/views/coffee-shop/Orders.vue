<template>
<div class="orders-page">

<!-- EARLIER SECTION -->
<div class="orders-section">
<div class="section-header">
<h2 class="section-title">Earlier</h2>
<span class="section-count">19 orders</span>
</div>

<div class="order-card past-order compact">
<div class="compact-header">
<div class="compact-left">
<ion-avatar class="shop-avatar-small">
<img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80" alt="Bean Origin" />
</ion-avatar>
<div class="compact-info">
<h4 class="compact-shop-name">Bean Origin</h4>
<span class="compact-date">Dec 5, 2025 · 9:20 AM</span>
<span class="compact-items">2 items · Pickup</span>
</div>
</div>
<div class="compact-right">
<span class="compact-total">$9.40</span>
<ion-icon :icon="chevronForwardOutline" class="chevron-icon"></ion-icon>
</div>
</div>
</div>

<ion-button expand="block" fill="outline" class="load-more-btn">
Load More Orders
</ion-button>
</div>

<!-- EMPTY STATE (Hidden when orders exist) -->
<!-- <div class="empty-state">
<div class="empty-icon">
<ion-icon :icon="receiptOutline"></ion-icon>
</div>
<h3 class="empty-title">No Orders Yet</h3>
<p class="empty-text">
Start your coffee journey! Browse our menu and place your first order.
</p>
<ion-button class="browse-btn">
<ion-icon slot="start" :icon="cafeOutline"></ion-icon>
Browse Menu
</ion-button>
</div> -->

</div>
</template>

<script setup>
import { 
IonButton,
IonIcon,
IonAvatar
} from '@ionic/vue';
import {
chevronForwardOutline,
} from 'ionicons/icons';

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
--amber: #f59e0b;
--green: #10b981;
--blue: #3b82f6;
--red: #ef4444;
--orange: #f97316;
}

ion-toolbar {
--background: var(--cream-100);
--color: var(--coffee-800);
}

ion-title {
font-weight: 800;
}

.orders-page {
padding: 20px;
background: var(--cream-200);
min-height: 100%;
}

/* ===== ORDERS SECTION ===== */
.orders-section {
margin-bottom: 32px;
}

.section-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 16px;
}

.section-title {
font-size: 22px;
font-weight: 900;
color: #000000;
margin: 0;
letter-spacing: -0.8px;
}

.section-count {
font-size: 13px;
font-weight: 700;
color: #6b4226;
background: rgba(107, 66, 38, 0.1);
padding: 4px 12px;
border-radius: 12px;
}

/* ===== COMPACT ORDER CARD ===== */
.order-card.compact {
padding: 16px;
cursor: pointer;
}

.order-card.compact:hover {
background: var(--cream-100);
}

.compact-header {
display: flex;
justify-content: space-between;
align-items: center;
gap: 12px;
}

.compact-left {
display: flex;
gap: 12px;
flex: 1;
min-width: 0;
}

.shop-avatar-small {
width: 44px;
height: 44px;
border-radius: 10px;
border: none;
flex-shrink: 0;
}.compact-info {
display: flex;
flex-direction: column;
gap: 4px;
min-width: 0;
}

.compact-shop-name {
font-size: 15px;
font-weight: 900;
color: var(--coffee-800);
margin: 0;
letter-spacing: -0.3px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}

.compact-date {
font-size: 13px;
font-weight: 600;
color: var(--text-600);
}

.compact-items {
font-size: 12px;
font-weight: 700;
color: var(--text-500);
}

.compact-right {
display: flex;
align-items: center;
gap: 8px;
flex-shrink: 0;
}

.compact-total {
font-size: 16px;
font-weight: 900;
color: var(--coffee-800);
letter-spacing: -0.3px;
}

.chevron-icon {
font-size: 20px;
color: var(--text-500);
}

/* ===== LOAD MORE BUTTON ===== */
.load-more-btn {
--border-color: var(--coffee-600);
--color: var(--coffee-700);
--border-radius: 16px;
--border-width: 2px;
height: 48px;
font-weight: 800;
text-transform: none;
margin: 16px 0 0 0;
}



/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
.orders-page {
padding: 16px;
}
}

/* ===== ANIMATIONS ===== */
@keyframes slideIn {
from {
opacity: 0;
transform: translateY(10px);
}
to {
opacity: 1;
transform: translateY(0);
}
}

.order-card {
animation: slideIn 0.3s ease-out;
}
</style>