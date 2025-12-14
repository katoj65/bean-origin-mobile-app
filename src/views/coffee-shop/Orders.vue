<template>
<div class="orders-page">

<!-- EARLIER SECTION -->
<div class="orders-section">
<div class="section-header">
<h2 class="section-title">Orders</h2>
<span class="section-count">19 orders</span>
</div>

<div class="order-card past-order compact" v-for="(x,key) in 7" :key="key">
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
Previous Orders
</ion-button>
</div>

<!-- ORDER SUMMARY CARD -->
<div class="order-summary-showcase">
<!-- Coffee Shop Header -->
<div class="shop-header">
<ion-avatar class="shop-header-avatar">
<img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=120" alt="Bean Origin" />
</ion-avatar>
<div class="shop-header-info">
<h3 class="shop-header-name">Bean Origin</h3>
<div class="shop-header-contact">
<a href="tel:+1234567890" class="contact-link">
<ion-icon :icon="callOutline"></ion-icon>
<span>+1 (234) 567-890</span>
</a>
<a href="mailto:info@beanorigin.com" class="contact-link">
<ion-icon :icon="mailOutline"></ion-icon>
<span>info@beanorigin.com</span>
</a>
</div>
</div>
</div>

<div class="summary-card compact-horizontal">
<div class="compact-top">
<div class="compact-date">
<ion-icon :icon="calendarOutline"></ion-icon>
<span>Dec 14, 2025</span>
</div>
<div class="compact-items-summary">
<ion-icon :icon="bagHandleOutline"></ion-icon>
<span>3 items</span>
</div>
</div>

<div class="delivery-method">
<span class="delivery-label">Delivery</span>
<div class="method-options">
<div class="method-option selected">
<ion-icon :icon="storefrontOutline"></ion-icon>
<span>Pickup</span>
</div>
<div class="method-option">
<ion-icon :icon="bicycleOutline"></ion-icon>
<span>Delivery</span>
</div>
</div>
</div>

<div class="compact-pricing">
<div class="compact-price-item">
<span class="compact-label">Subtotal</span>
<span class="compact-value">$24.50</span>
</div>
<div class="compact-price-item">
<span class="compact-label">Tax</span>
<span class="compact-value">$2.45</span>
</div>
<div class="compact-price-item total">
<span class="compact-label">Total</span>
<span class="compact-value">$26.95</span>
</div>
</div>

<ion-button expand="block" class="checkout-btn-compact">
Checkout
</ion-button>
</div>
</div>

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
calendarOutline,
bagHandleOutline,
starOutline,
callOutline,
mailOutline,
storefrontOutline,
bicycleOutline,
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
background: white;
border-radius: 20px;
margin-bottom: 10px;
border: none;
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
--border-color: white;
--color: var(--coffee-700);
--background: white;
--border-radius: 16px;
--border-width: 2px;
height: 48px;
font-weight: 800;
text-transform: none;
margin: 16px 0 0 0;
}

/* ===== ORDER SUMMARY CARD ===== */
.order-summary-showcase {
margin-top: 32px;
}

/* Coffee Shop Header */
.shop-header {
display: flex;
align-items: center;
gap: 16px;
background: white;
border-radius: 20px;
padding: 20px;
margin-bottom: 20px;
transition: all 0.3s ease;
}

.shop-header:hover {
background: var(--cream-50);
}

.shop-header-avatar {
width: 64px;
height: 64px;
border-radius: 16px;
flex-shrink: 0;
}

.shop-header-info {
flex: 1;
min-width: 0;
}

.shop-header-name {
font-size: 20px;
font-weight: 900;
color: var(--coffee-800);
margin: 0 0 4px 0;
letter-spacing: -0.5px;
}

.shop-header-address {
font-size: 14px;
font-weight: 600;
color: var(--text-600);
margin: 0 0 8px 0;
}

.shop-header-contact {
display: flex;
flex-direction: column;
gap: 6px;
margin-bottom: 10px;
}

.contact-link {
display: flex;
align-items: center;
gap: 6px;
font-size: 13px;
font-weight: 700;
color: var(--coffee-600);
text-decoration: none;
transition: all 0.2s ease;
}

.contact-link:hover {
color: var(--coffee-800);
transform: translateX(2px);
}

.contact-link ion-icon {
font-size: 16px;
flex-shrink: 0;
}

.shop-header-meta {
display: flex;
align-items: center;
gap: 16px;
}

.shop-rating {
display: flex;
align-items: center;
gap: 4px;
font-size: 14px;
font-weight: 800;
color: var(--coffee-700);
}

.shop-rating ion-icon {
font-size: 16px;
color: var(--gold);
}

.shop-distance {
font-size: 13px;
font-weight: 700;
color: var(--text-500);
padding: 4px 10px;
background: var(--cream-200);
border-radius: 8px;
}

.summary-card {
background: white;
border-radius: 24px;
padding: 28px;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
position: relative;
overflow: hidden;
}

.summary-card:hover {
background: linear-gradient(135deg, white 0%, var(--cream-50) 100%);
}

.compact-top {
display: flex;
justify-content: space-between;
gap: 12px;
margin-bottom: 20px;
}

.compact-date,
.compact-items-summary {
display: flex;
align-items: center;
gap: 6px;
padding: 8px 12px;
background: var(--cream-200);
border-radius: 12px;
font-size: 13px;
font-weight: 800;
color: var(--text-600);
}

.compact-date ion-icon,
.compact-items-summary ion-icon {
font-size: 18px;
color: var(--coffee-600);
}

.delivery-method {
display: flex;
align-items: center;
justify-content: space-between;
gap: 16px;
margin-bottom: 20px;
}

.delivery-label {
font-size: 15px;
font-weight: 900;
color: var(--coffee-800);
flex-shrink: 0;
}

.method-options {
display: flex;
gap: 12px;
flex: 1;
}

.method-option {
flex: 1;
display: flex;
align-items: center;
justify-content: center;
gap: 8px;
padding: 12px 16px;
background: var(--cream-100);
border-radius: 12px;
font-size: 14px;
font-weight: 800;
color: var(--text-600);
cursor: pointer;
transition: all 0.3s ease;
}

.method-option ion-icon {
font-size: 20px;
}

.method-option.selected {
background: var(--coffee-600);
color: white;
}

.method-option.selected ion-icon {
color: white;
}

.method-option:not(.selected):hover {
background: var(--cream-200);
transform: translateY(-2px);
}

.compact-pricing {
display: flex;
flex-direction: column;
gap: 10px;
margin-bottom: 24px;
}

.compact-price-item {
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px 12px;
background: var(--cream-100);
border-radius: 10px;
}

.compact-price-item.total {
background: var(--cream-200);
padding: 12px 14px;
}

.compact-label {
font-size: 14px;
font-weight: 700;
color: var(--text-600);
}

.compact-price-item.total .compact-label {
font-size: 15px;
font-weight: 900;
color: var(--coffee-800);
}

.compact-value {
font-size: 15px;
font-weight: 900;
color: var(--coffee-800);
}

.compact-price-item.total .compact-value {
font-size: 18px;
letter-spacing: -0.5px;
}

.checkout-btn-compact {
--background: linear-gradient(135deg, #6b4226 0%, #5d3a2f 50%, #4a2c2a 100%);
--border-radius: 18px;
--box-shadow: none;
height: 60px;
font-weight: 900;
font-size: 17px;
text-transform: none;
letter-spacing: 0.8px;
margin: 0;
transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
position: relative;
overflow: hidden;
}

.checkout-btn-compact::before {
content: '';
position: absolute;
inset: 0;
background: linear-gradient(135deg, rgba(139, 90, 60, 0.3), transparent);
opacity: 0;
transition: opacity 0.35s ease;
}

.checkout-btn-compact::after {
content: '';
position: absolute;
top: 50%;
left: 50%;
width: 100%;
height: 100%;
background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
transform: translate(-50%, -50%) scale(0);
transition: transform 0.35s ease;
}

.checkout-btn-compact:hover {
transform: translateY(-4px) scale(1.03);
--background: linear-gradient(135deg, #8b5a3c 0%, #6b4226 50%, #5d3a2f 100%);
--box-shadow: none;
}

.checkout-btn-compact:hover::before {
opacity: 1;
}

.checkout-btn-compact:hover::after {
transform: translate(-50%, -50%) scale(1.5);
}

.checkout-btn-compact:active {
transform: translateY(-2px) scale(1.01);
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