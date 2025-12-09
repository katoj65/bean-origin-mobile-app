<template>
<div class="shop-info-section">
<!-- Shop Header -->
<div class="info-header" v-if="head">
<div class="header-content">
<div class="name-container">
<h1 class="shop-name">{{ head.name }}  </h1>
<div class="verified-badge">
<ion-icon :icon="checkmarkCircle"></ion-icon>
</div>
</div>
<p class="shop-tagline">
{{ head.distance }}
</p>

<!-- Rating Inline -->
<div class="inline-rating">
<div class="stars">
<ion-icon :icon="star"></ion-icon>
<ion-icon :icon="star"></ion-icon>
<ion-icon :icon="star"></ion-icon>
<ion-icon :icon="star"></ion-icon>
<ion-icon :icon="starHalf"></ion-icon>
</div>
<span class="rating-text">{{ head.rating }} </span>
<span class="divider">•</span>
<span class="reviews-link">{{ head.reviews }} </span>
</div>
</div>
<ion-button 
fill="clear" 
class="favorite-button"
>
<ion-icon 
slot="icon-only" 
:icon="heartOutline"
></ion-icon>
</ion-button>
</div>


</div>
</template>

<script setup>
import {
  IonIcon,
  IonChip,
  IonLabel,
  IonButton,
} from '@ionic/vue';
import {
  locationOutline,
  heart,
  heartOutline,
  star,
  starHalf,
  timeOutline,
  bicycleOutline,
  callOutline,
  navigateOutline,
  shareOutline,
  checkmarkCircle,
  walletOutline,
  wifiOutline,
  leafOutline,
  cardOutline,
} from 'ionicons/icons';
import { defineProps,onMounted,ref } from 'vue';


const props=defineProps({
heading: ''
});
const head=ref(props.heading);




</script>

<style scoped>
.shop-info-section {
  background: white;
  margin-top:-10px;
  padding: 28px 24px;
  margin-bottom: 0px;
  border-radius: 0 0 20px 20px;
}

/* Header Section */
.info-header {

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0px;
  padding-top:10px;
}

.header-content {
  flex: 1;
  min-width: 0;
}

.name-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.shop-name {
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  color: #0a0a0a;
  line-height: 1.1;
  letter-spacing: -0.5px;
}

.verified-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.verified-badge ion-icon {
  font-size: 24px;
  color: #4CAF50;
}

.shop-tagline {
  font-size: 15px;
  font-weight: 500;
  color: #666;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

/* Inline Rating */
.inline-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
}

.stars {
  display: flex;
  gap: 2px;
}

.stars ion-icon {
  font-size: 16px;
  color: #FFA726;
}

.rating-text {
  font-size: 15px;
  font-weight: 700;
  color: #0a0a0a;
  margin-left: 2px;
}

.divider {
  color: #ccc;
  font-size: 14px;
}

.reviews-link {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.favorite-button {
  --padding-start: 8px;
  --padding-end: 8px;
  margin: -4px 0 0 0;
  flex-shrink: 0;
}

.favorite-button ion-icon {
  font-size: 30px;
  color: #d0d0d0;
  transition: all 0.2s ease;
}

.favorite-button:active ion-icon {
  color: #e74c3c;
  transform: scale(1.15);
}

/* Location Bar */
.location-bar {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20px;
}

.location-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.location-item > ion-icon {
  font-size: 24px;
  color: #2196F3;
  flex-shrink: 0;
}

.location-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.location-main {
  font-size: 15px;
  font-weight: 600;
  color: #0a0a0a;
  line-height: 1.3;
}

.location-sub {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

/* Status Cards */
.status-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.status-card {
  background: #ffffff;
  border: 2px solid #f0f0f0;
  border-radius: 16px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.2s ease;
}

.status-card:active {
  transform: scale(0.96);
  border-color: #e0e0e0;
}

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.open-card .card-icon {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

.open-card .card-icon ion-icon {
  font-size: 22px;
  color: #2e7d32;
}

.delivery-card .card-icon {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
}

.delivery-card .card-icon ion-icon {
  font-size: 22px;
  color: #1565c0;
}

.price-card .card-icon {
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
}

.price-card .card-icon ion-icon {
  font-size: 22px;
  color: #ef6c00;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-label {
  font-size: 11px;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-value {
  font-size: 14px;
  font-weight: 700;
  color: #0a0a0a;
  line-height: 1.2;
}

/* Features Section */
.features-section {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.feature-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f8f9fa;
  border: 1.5px solid #e9ecef;
  border-radius: 24px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #495057;
  transition: all 0.2s ease;
}

.feature-tag:active {
  transform: scale(0.95);
  background: #e9ecef;
}

.feature-tag ion-icon {
  font-size: 16px;
  color: #6c757d;
}

/* Description */
.shop-description {
  margin-bottom: 24px;
}

.description-title {
  font-size: 18px;
  font-weight: 700;
  color: #0a0a0a;
  margin: 0 0 12px 0;
  letter-spacing: -0.3px;
}

.description-text {
  font-size: 15px;
  color: #495057;
  line-height: 1.6;
  margin: 0;
}

/* Quick Actions */
.quick-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}

.action-button {
  --border-radius: 14px;
  --padding-top: 14px;
  --padding-bottom: 14px;
  --border-width: 2px;
  font-size: 15px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: -0.2px;
  height: 52px;
}

.primary-action {
  --background: #0a0a0a;
  --background-activated: #2a2a2a;
}

.action-button ion-icon {
  font-size: 20px;
}

.share-button {
  --color: #6c757d;
  --padding-top: 12px;
  --padding-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: -0.1px;
}

.share-button ion-icon {
  font-size: 18px;
}

/* Responsive Design */
@media (max-width: 360px) {
  .shop-info-section {
    padding: 24px 20px;
  }

  .shop-name {
    font-size: 28px;
  }

  .status-cards {
    grid-template-columns: 1fr;
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 768px) {
  .shop-info-section {
    border-radius: 20px;
    margin: 12px;
  }
}
</style>