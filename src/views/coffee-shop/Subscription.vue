<template>
<app-layout title="My Subscriptions">
<template #content>
<div class="subscriptions-page">
<!-- Header Section -->
<div class="header-section">
<div class="header-bg">
<div class="header-pattern"></div>
</div>
<div class="header-content">
<div class="title-group">
<div class="icon-wrapper">
<ion-icon :icon="reloadOutline" class="header-icon"></ion-icon>
</div>
<div>
<h1 class="page-title">My Subscriptions</h1>
<p class="page-subtitle">Manage your coffee deliveries</p>
</div>
</div>
</div>
<div class="stats-container">
<div class="stats-row">
<div class="stat-card">
<div class="stat-icon-wrapper">
<ion-icon :icon="cafeOutline" class="stat-icon"></ion-icon>
</div>
<div class="stat-info">
<span class="stat-value">{{ subscriptions.length }}</span>
<span class="stat-label">Active Plans</span>
</div>
</div>
<div class="stat-card">
<div class="stat-icon-wrapper monthly">
<ion-icon :icon="calendarOutline" class="stat-icon"></ion-icon>
</div>
<div class="stat-info">
<span class="stat-value">${{ totalMonthly }}</span>
<span class="stat-label">Per Month</span>
</div>
</div>
<div class="stat-card">
<div class="stat-icon-wrapper savings">
<ion-icon :icon="trendingDownOutline" class="stat-icon"></ion-icon>
</div>
<div class="stat-info">
<span class="stat-value">${{ totalSaved }}</span>
<span class="stat-label">You Save</span>
</div>
</div>
</div>
</div>
</div>

<!-- Subscriptions List -->
<div class="subscriptions-list">
<div 
  v-for="subscription in subscriptions" 
  :key="subscription.id" 
  class="subscription-card"
>
  <!-- Product Image -->
  <div class="subscription-image">
    <img :src="subscription.image" :alt="subscription.name" />
    <div class="subscription-badge" :class="subscription.status">
      {{ subscription.status }}
    </div>
  </div>

  <!-- Product Info -->
  <div class="subscription-content">
    <h3 class="product-name">{{ subscription.name }}</h3>
    <div class="product-meta">
      <span class="roast-type">{{ subscription.roast }}</span>
    </div>
    
    <div class="product-stats">
      <div class="stat-item">
        <ion-icon :icon="cubeOutline"></ion-icon>
        <span>{{ subscription.size }}</span>
      </div>
      <div class="stat-item">
        <ion-icon :icon="reloadOutline"></ion-icon>
        <span>{{ subscription.frequency }}</span>
      </div>
    </div>

    <div class="price-row">
      <span class="price">${{ subscription.price }}</span>
      <span class="savings">Save ${{ subscription.savings }}</span>
    </div>
  </div>
</div>
</div>

<!-- Empty State (if no subscriptions) -->
<div v-if="subscriptions.length === 0" class="empty-state">
  <div class="empty-icon">
    <ion-icon :icon="cafeOutline"></ion-icon>
  </div>
  <h3 class="empty-title">No Active Subscriptions</h3>
  <p class="empty-text">Start a subscription and save 15% on your favorite coffee</p>
  <button class="browse-btn">
    <span>Browse Coffee</span>
    <ion-icon :icon="arrowForwardOutline"></ion-icon>
  </button>
</div>

<!-- Add Subscription Button -->
<div class="add-subscription-section">
  <button class="add-subscription-btn">
    <ion-icon :icon="addCircleOutline"></ion-icon>
    <span>Add New Subscription</span>
  </button>
</div>
</div>
</template>
</app-layout>
</template>

<script setup>
import { ref, computed } from 'vue';
import AppLayout from './template/AppLayout.vue';
import { IonIcon } from '@ionic/vue';
import {
  cafeOutline,
  calendarOutline,
  walletOutline,
  starSharp,
  cubeOutline,
  reloadOutline,
  trendingDownOutline,
  settingsOutline,
  pauseOutline,
  eyeOutline,
  addCircleOutline,
  arrowForwardOutline
} from 'ionicons/icons';

// Subscriptions data
const subscriptions = ref([
  {
    id: 3,
    name: 'Costa Rican Tarrazu',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
    roast: 'Light Roast',
    origin: 'Costa Rica',
    rating: 4.7,
    size: '250g',
    frequency: 'Weekly',
    grind: 'Pour Over',
    nextDelivery: 'Dec 18',
    price: 11.04,
    savings: 1.95,
    status: 'active'
  },
  {
    id: 4,
    name: 'Brazilian Santos',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
    roast: 'Medium-Dark',
    origin: 'Brazil',
    rating: 4.6,
    size: '500g',
    frequency: 'Every 3 weeks',
    grind: 'French Press',
    nextDelivery: 'Jan 5',
    price: 18.69,
    savings: 3.30,
    status: 'active'
  }
]);

// Computed properties
const totalMonthly = computed(() => {
  return subscriptions.value.reduce((sum, sub) => {
    // Convert frequency to monthly cost
    let monthlyCost = sub.price;
    if (sub.frequency.includes('2 weeks')) {
      monthlyCost = sub.price * 2;
    } else if (sub.frequency.includes('Weekly')) {
      monthlyCost = sub.price * 4;
    } else if (sub.frequency.includes('3 weeks')) {
      monthlyCost = sub.price * 1.33;
    }
    return sum + monthlyCost;
  }, 0).toFixed(2);
});

const totalSaved = computed(() => {
  return subscriptions.value.reduce((sum, sub) => {
    // Calculate monthly savings based on frequency
    let monthlySavings = sub.savings;
    if (sub.frequency.includes('2 weeks')) {
      monthlySavings = sub.savings * 2;
    } else if (sub.frequency.includes('Weekly')) {
      monthlySavings = sub.savings * 4;
    } else if (sub.frequency.includes('3 weeks')) {
      monthlySavings = sub.savings * 1.33;
    }
    return sum + monthlySavings;
  }, 0).toFixed(2);
});
</script>

<style scoped>
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
  --text-600: #6b5444;
  --gold: #fbbf24;
  --green: #10b981;
  --orange: #ff6b00;
  --blue: #3b82f6;
}

.subscriptions-page {
  background: var(--cream-200);
  min-height: 100vh;
  padding-bottom: 20px;
}

/* ===== HEADER SECTION ===== */
.header-section {
  position: relative;
  background: white;
  padding: 0;
  margin-bottom: 20px;
  overflow: hidden;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.03;
}

.header-pattern {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(107, 66, 38, 0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.header-content {
  position: relative;
  padding: 24px 20px 20px;
  z-index: 1;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 0;
}

.icon-wrapper {
  width: 56px;
  height: 56px;
  background: var(--cream-300);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-icon {
  font-size: 32px;
  color: var(--coffee-600);
}

.page-title {
  font-size: 26px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 4px 0;
  letter-spacing: -0.8px;
}

.page-subtitle {
  font-size: 14px;
  font-weight: 600;
  color: #000000;
  margin: 0;
}

.stats-container {
  position: relative;
  padding: 0 20px 20px;
  z-index: 1;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 12px;
  background: white;
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.stat-card:active {
  transform: scale(0.95);
}

.stat-icon-wrapper {
  width: 44px;
  height: 44px;
  background: transparent;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon-wrapper.monthly {
  background: transparent;
}

.stat-icon-wrapper.savings {
  background: transparent;
}

.stat-icon {
  font-size: 22px;
  color: #000000;
}

.stat-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-value {
  font-size: 20px;
  font-weight: 900;
  color: #000000;
  line-height: 1;
}

.stat-label {
  font-size: 10px;
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  text-align: center;
}

/* ===== SUBSCRIPTIONS LIST ===== */
.subscriptions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 20px;
  margin-bottom: 20px;
}

.subscription-card {
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.subscription-card:active {
  transform: scale(0.98);
}

/* Product Image */
.subscription-image {
  position: relative;
  width: 110px;
  min-width: 110px;
  height: auto;
  overflow: hidden;
}

.subscription-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.subscription-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
}

.subscription-badge.active {
  background: rgba(16, 185, 129, 0.95);
  color: white;
}

.subscription-badge.paused {
  background: rgba(251, 191, 36, 0.95);
  color: white;
}

/* Product Content */
.subscription-content {
  flex: 1;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-name {
  font-size: 16px;
  font-weight: 900;
  color: var(--text-900);
  margin: 0 0 4px 0;
  letter-spacing: -0.3px;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-meta {
  margin-bottom: 12px;
}

.roast-type {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-600);
}

.product-stats {
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-bottom: 8px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-600);
}

.stat-item ion-icon {
  font-size: 16px;
  color: var(--coffee-600);
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0;
  border-top: 1px solid var(--cream-300);
}

.price {
  font-size: 18px;
  font-weight: 900;
  color: var(--coffee-600);
  letter-spacing: -0.3px;
}

.savings {
  font-size: 10px;
  font-weight: 900;
  color: var(--green);
  background: rgba(16, 185, 129, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
}

/* ===== EMPTY STATE ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  text-align: center;
}

.empty-icon {
  width: 100px;
  height: 100px;
  background: var(--cream-300);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.empty-icon ion-icon {
  font-size: 50px;
  color: var(--coffee-600);
}

.empty-title {
  font-size: 22px;
  font-weight: 900;
  color: var(--text-900);
  margin: 0 0 12px 0;
  letter-spacing: -0.4px;
}

.empty-text {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-600);
  line-height: 1.5;
  margin: 0 0 28px 0;
}

.browse-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: var(--coffee-600);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s ease;
}

.browse-btn ion-icon {
  font-size: 20px;
}

.browse-btn:active {
  transform: scale(0.95);
}

/* ===== ADD SUBSCRIPTION ===== */
.add-subscription-section {
  padding: 0 20px;
}

.add-subscription-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  background: white;
  border: 2px dashed var(--coffee-600);
  border-radius: 16px;
  font-size: 15px;
  font-weight: 900;
  color: var(--coffee-600);
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-subscription-btn ion-icon {
  font-size: 24px;
}

.add-subscription-btn:active {
  transform: scale(0.98);
  background: var(--cream-300);
}
</style>