<template>
<app-layout title="Checkout">

<template #content>
    <div class="checkout-page">
<!-- Order Summary -->
<div class="checkout-section">
<h2 class="section-title">Order Summary</h2>
<div class="order-items">
<div class="order-item" v-for="item in 3" :key="item">
<img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80" alt="Coffee" class="item-image" />
<div class="item-info">
<h4 class="item-name">Cappuccino</h4>
<p class="item-details">Large · Extra Shot</p>
</div>
<div class="item-price-qty">
<span class="item-qty">x1</span>
<span class="item-price">$8.50</span>
</div>
</div>
</div>
</div>

<!-- Delivery Method -->
<div class="checkout-section">
<h2 class="section-title">Delivery Method</h2>
<div class="delivery-options">
<div class="delivery-option selected">
<ion-icon :icon="storefrontOutline" class="option-icon"></ion-icon>
<div class="option-info">
<h4 class="option-name">Pickup</h4>
<p class="option-desc">Ready in 15 mins</p>
</div>
<ion-icon :icon="checkmarkCircleOutline" class="check-icon"></ion-icon>
</div>
<div class="delivery-option">
<ion-icon :icon="bicycleOutline" class="option-icon"></ion-icon>
<div class="option-info">
<h4 class="option-name">Delivery</h4>
<p class="option-desc">30-45 mins · $2.50 fee</p>
</div>
</div>
</div>
</div>

<!-- Pickup Location -->
<div class="checkout-section">
<h2 class="section-title">Pickup Location</h2>
<div class="location-card">
<ion-icon :icon="locationOutline" class="location-icon"></ion-icon>
<div class="location-info">
<h4 class="location-name">Bean Origin</h4>
<p class="location-address">123 Coffee Street, Downtown</p>
<div class="location-contact">
<a href="tel:+1234567890" class="contact-link">
<ion-icon :icon="callOutline"></ion-icon>
<span>+1 (234) 567-890</span>
</a>
</div>
</div>
</div>
</div>

<!-- Payment Method -->
<div class="checkout-section">
<h2 class="section-title">Payment Method</h2>
<div class="payment-options">
<div class="payment-option selected">
<ion-icon :icon="cardOutline" class="payment-icon"></ion-icon>
<div class="payment-info">
<h4 class="payment-name">Credit Card</h4>
<p class="payment-details">•••• 4242</p>
</div>
<ion-icon :icon="checkmarkCircleOutline" class="check-icon"></ion-icon>
</div>
<div class="payment-option">
<ion-icon :icon="cashOutline" class="payment-icon"></ion-icon>
<div class="payment-info">
<h4 class="payment-name">Cash</h4>
<p class="payment-details">Pay at pickup</p>
</div>
</div>
</div>
</div>

<!-- Price Breakdown -->
<div class="checkout-section">
<div class="price-breakdown">
<div class="price-row">
<span class="price-label">Subtotal</span>
<span class="price-value">$24.50</span>
</div>
<div class="price-row">
<span class="price-label">Tax</span>
<span class="price-value">$2.45</span>
</div>
<div class="price-row">
<span class="price-label">Service Fee</span>
<span class="price-value">$1.00</span>
</div>
<div class="price-row total">
<span class="price-label">Total</span>
<span class="price-value">$27.95</span>
</div>
</div>
</div>

<!-- Place Order Button -->
<div class="checkout-footer">
<ion-button expand="block" class="place-order-btn">
<ion-icon :icon="checkmarkOutline" slot="start"></ion-icon>
Place Order · $27.95
</ion-button>
</div>
</div>
</template>
</app-layout>
</template>

<script setup>
import { ref } from 'vue';
import AppLayout from './template/AppLayout.vue';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon
} from '@ionic/vue';
import {
  storefrontOutline,
  bicycleOutline,
  checkmarkCircleOutline,
  locationOutline,
  callOutline,
  cardOutline,
  cashOutline,
  checkmarkOutline
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
  --green: #10b981;
}

ion-toolbar {
  --background: var(--cream-100);
  --color: var(--coffee-800);
}

ion-title {
  font-weight: 900;
}

.checkout-page {
  padding: 20px;
  background: var(--cream-200);
  min-height: 100%;
  padding-bottom: 100px;
}

/* ===== SECTIONS ===== */
.checkout-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
}

/* ===== ORDER ITEMS ===== */
.order-items {
  background: white;
  border-radius: 16px;
  padding: 16px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
}

.order-item:not(:last-child) {
  border-bottom: 1px solid var(--cream-200);
}

.item-image {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: cover;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 15px;
  font-weight: 900;
  color: var(--coffee-800);
  margin: 0 0 4px 0;
}

.item-details {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-600);
  margin: 0;
}

.item-price-qty {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.item-qty {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-500);
  padding: 2px 8px;
  background: var(--cream-200);
  border-radius: 6px;
}

.item-price {
  font-size: 16px;
  font-weight: 900;
  color: var(--coffee-800);
}

/* ===== DELIVERY OPTIONS ===== */
.delivery-options,
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.delivery-option,
.payment-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delivery-option:hover,
.payment-option:hover {
  background: var(--cream-100);
}

.delivery-option.selected,
.payment-option.selected {
  background: var(--coffee-600);
}

.option-icon,
.payment-icon {
  font-size: 28px;
  color: #000000;
  flex-shrink: 0;
}

.delivery-option.selected .option-icon {
  color: #000000;
}

.payment-option.selected .option-icon,
.payment-option.selected .payment-icon {
  color: #000000;
}

.option-info,
.payment-info {
  flex: 1;
  min-width: 0;
}

.option-name,
.payment-name {
  font-size: 15px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 4px 0;
}

.delivery-option.selected .option-name {
  color: #000000;
}

.payment-option.selected .payment-name {
  color: #000000;
}

.option-desc,
.payment-details {
  font-size: 13px;
  font-weight: 600;
  color: #000000;
  margin: 0;
}

.delivery-option.selected .option-desc {
  color: #000000;
}

.payment-option.selected .payment-details {
  color: #000000;
}

.check-icon {
  font-size: 24px;
  color: var(--green);
  flex-shrink: 0;
}

/* ===== LOCATION CARD ===== */
.location-card {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 16px;
}

.location-icon {
  font-size: 28px;
  color: var(--coffee-600);
  flex-shrink: 0;
}

.location-info {
  flex: 1;
  min-width: 0;
}

.location-name {
  font-size: 16px;
  font-weight: 900;
  color: var(--coffee-800);
  margin: 0 0 4px 0;
}

.location-address {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-600);
  margin: 0 0 8px 0;
}

.location-contact {
  display: flex;
  gap: 12px;
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
}

.contact-link ion-icon {
  font-size: 16px;
}

/* ===== PRICE BREAKDOWN ===== */
.price-breakdown {
  background: white;
  border-radius: 16px;
  padding: 16px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.price-row:not(:last-child) {
  border-bottom: 1px solid var(--cream-200);
}

.price-row.total {
  padding-top: 16px;
  border-top: 2px solid var(--cream-300);
  margin-top: 8px;
}

.price-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-600);
}

.price-row.total .price-label {
  font-size: 16px;
  font-weight: 900;
  color: var(--coffee-800);
}

.price-value {
  font-size: 15px;
  font-weight: 900;
  color: var(--coffee-800);
}

.price-row.total .price-value {
  font-size: 20px;
  color: var(--coffee-600);
  letter-spacing: -0.5px;
}

/* ===== FOOTER ===== */
.checkout-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px;
  background: white;
  border-top: 1px solid var(--cream-200);
  z-index: 10;
}

.place-order-btn {
  --background: linear-gradient(135deg, #6b4226 0%, #5d3a2f 50%, #4a2c2a 100%);
  --border-radius: 16px;
  height: 56px;
  font-weight: 900;
  font-size: 17px;
  text-transform: none;
  letter-spacing: 0.5px;
  margin: 0;
  transition: all 0.3s ease;
}

.place-order-btn:hover {
  transform: scale(1.02);
}

.place-order-btn:active {
  transform: scale(0.98);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .checkout-page {
    padding: 16px;
  }
}
</style>