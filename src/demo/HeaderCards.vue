<template>
<ion-page>
<ion-content>
<div class="header-cards-showcase">

<!-- CARD 1: MINIMAL MODERN -->
<ion-card class="header-card minimal-card">
<div class="card-content">
<div class="header-row">
<div class="logo-minimal">
  <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200" alt="Bean Origin" />
</div>
<div class="info-section">
  <h1 class="shop-title-minimal">Bean Origin</h1>
  <div class="rating-row">
    <div class="rating-group">
      <ion-icon :icon="star" class="star-icon"></ion-icon>
      <span class="rating-value">4.8</span>
    </div>
    <span class="review-count">(247 reviews)</span>
  </div>
</div>
</div>
<div class="details-row">
<div class="address-line">
  <ion-icon :icon="locationOutline" class="detail-icon"></ion-icon>
  <span>123 Coffee Lane, Downtown District</span>
</div>
<div class="status-line open">
  <span class="status-dot"></span>
  <span>Open · Closes at 9:00 PM</span>
</div>
</div>
</div>
</ion-card>

<!-- CARD 2: PREMIUM ELEGANT -->
<ion-card class="header-card premium-card">
<div class="card-content">
<div class="premium-header">
<div class="logo-premium">
  <div class="logo-frame">
    <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200" alt="Bean Origin" />
  </div>
</div>
<div class="premium-info">
  <h1 class="shop-title-premium">Bean Origin</h1>
  <div class="premium-meta">
    <div class="rating-premium">
      <ion-icon :icon="star" class="premium-star"></ion-icon>
      <span class="premium-rating">4.8</span>
      <span class="premium-reviews">247 reviews</span>
    </div>
  </div>
</div>
</div>
<div class="premium-divider"></div>
<div class="premium-details">
<div class="premium-address">
  <ion-icon :icon="locationOutline"></ion-icon>
  <span>123 Coffee Lane, Downtown District</span>
</div>
<div class="premium-status open">
  <div class="status-indicator"></div>
  <span class="status-text">Open</span>
  <span class="status-time">Closes at 9:00 PM</span>
</div>
</div>
</div>
</ion-card>

<!-- CARD 3: COMPACT MOBILE-FIRST -->
<ion-card class="header-card compact-card">
<div class="card-content">
<div class="compact-main">
<div class="logo-compact">
  <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200" alt="Bean Origin" />
</div>
<div class="compact-details">
  <div class="compact-header">
    <h1 class="shop-title-compact">Bean Origin</h1>
    <div class="status-badge-compact open">
      <span class="badge-dot"></span>
      <span>Open</span>
    </div>
  </div>
  <div class="compact-rating">
    <ion-icon :icon="star"></ion-icon>
    <span class="rating-text">4.8</span>
    <span class="separator">·</span>
    <span class="reviews-text">247 reviews</span>
  </div>
  <div class="compact-location">
    <ion-icon :icon="locationOutline"></ion-icon>
    <span>123 Coffee Lane</span>
  </div>
  <div class="compact-hours">
    <ion-icon :icon="timeOutline"></ion-icon>
    <span>Closes at 9:00 PM</span>
  </div>
</div>
</div>
</div>
</ion-card>

<!-- CARD 4: BOLD BRANDING -->
<ion-card class="header-card bold-card">
<div class="card-content">
<div class="bold-header">
<div class="logo-bold">
  <div class="bold-logo-bg">
    <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200" alt="Bean Origin" />
  </div>
</div>
<div class="bold-info">
  <h1 class="shop-title-bold">BEAN ORIGIN</h1>
  <div class="bold-rating-row">
    <div class="bold-rating">
      <ion-icon :icon="star"></ion-icon>
      <span class="bold-score">4.8</span>
    </div>
    <span class="bold-reviews">(247 reviews)</span>
  </div>
</div>
</div>
<div class="bold-details">
<div class="bold-detail-item">
  <ion-icon :icon="locationOutline" class="bold-icon"></ion-icon>
  <span class="bold-text">123 Coffee Lane, Downtown</span>
</div>
<div class="bold-detail-item status open">
  <div class="bold-status-icon"></div>
  <span class="bold-text">Open until 9:00 PM</span>
</div>
</div>
</div>
</ion-card>

<!-- CARD 5: FRIENDLY NEIGHBORHOOD -->
<ion-card class="header-card friendly-card">
<div class="card-content">
<div class="friendly-layout">
<div class="logo-friendly">
  <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200" alt="Bean Origin" />
  <div class="friendly-badge">
    <ion-icon :icon="heartOutline"></ion-icon>
  </div>
</div>
<div class="friendly-content">
  <h1 class="shop-title-friendly">Bean Origin</h1>
  <div class="friendly-rating-line">
    <div class="stars-display">
      <ion-icon :icon="star" v-for="i in 5" :key="i" :class="{ filled: i <= 4.8 }"></ion-icon>
    </div>
    <span class="friendly-reviews">4.8 (247 reviews)</span>
  </div>
  <div class="friendly-info-grid">
    <div class="friendly-info-item">
      <ion-icon :icon="locationOutline"></ion-icon>
      <span>123 Coffee Lane, Downtown</span>
    </div>
    <div class="friendly-info-item open">
      <span class="friendly-dot"></span>
      <span>Open · Closes 9:00 PM</span>
    </div>
  </div>
</div>
</div>
</div>
</ion-card>

<!-- CARD 6: DATA-FOCUSED CLEAN UI -->
<ion-card class="header-card data-card">
<div class="card-content">
<div class="data-header">
<div class="logo-data">
  <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200" alt="Bean Origin" />
</div>
<div class="data-primary">
  <h1 class="shop-title-data">Bean Origin</h1>
  <div class="data-meta-row">
    <div class="data-metric">
      <ion-icon :icon="star" class="metric-icon"></ion-icon>
      <span class="metric-value">4.8</span>
    </div>
    <div class="data-separator"></div>
    <div class="data-metric">
      <ion-icon :icon="chatbubbleOutline" class="metric-icon"></ion-icon>
      <span class="metric-value">247</span>
    </div>
    <div class="data-separator"></div>
    <div class="data-status open">
      <span class="data-dot"></span>
      <span class="data-status-text">Open</span>
    </div>
  </div>
</div>
</div>
<div class="data-info-section">
<div class="data-info-row">
  <ion-icon :icon="locationOutline" class="info-icon"></ion-icon>
  <span class="info-text">123 Coffee Lane, Downtown District</span>
</div>
<div class="data-info-row">
  <ion-icon :icon="timeOutline" class="info-icon"></ion-icon>
  <span class="info-text">Closes at 9:00 PM today</span>
</div>
</div>
</div>
</ion-card>

<!-- CARD 7: AFRICAN-INSPIRED MODERN -->
<ion-card class="header-card african-card">
<div class="african-pattern"></div>
<div class="card-content">
<div class="african-header">
<div class="logo-african">
  <div class="african-logo-frame">
    <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200" alt="Bean Origin" />
  </div>
</div>
<div class="african-info">
  <h1 class="shop-title-african">Bean Origin</h1>
  <div class="african-rating">
    <div class="rating-container">
      <ion-icon :icon="star" class="african-star"></ion-icon>
      <span class="african-score">4.8</span>
    </div>
    <span class="african-reviews">247 reviews</span>
  </div>
</div>
</div>
<div class="african-accent-line"></div>
<div class="african-details">
<div class="african-detail-row">
  <div class="detail-icon-wrapper">
    <ion-icon :icon="locationOutline"></ion-icon>
  </div>
  <span>123 Coffee Lane, Downtown District</span>
</div>
<div class="african-detail-row status">
  <div class="detail-icon-wrapper open">
    <div class="african-status-dot"></div>
  </div>
  <span class="status-primary">Open</span>
  <span class="status-secondary">· Closes at 9:00 PM</span>
</div>
</div>
</div>
</ion-card>

</div>
</ion-content>
</ion-page>
</template>

<script setup>
import { IonCard, IonIcon,IonPage,IonContent } from '@ionic/vue';
import { 
star, 
locationOutline, 
timeOutline, 
heartOutline,
chatbubbleOutline 
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
}

.header-cards-showcase {
display: flex;
flex-direction: column;
gap: 24px;
padding: 20px;
background: var(--cream-200);
max-width: 800px;
margin: 0 auto;
}

.header-card {
margin: 0;
border-radius: 24px;
background: white;
box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.card-content {
padding: 24px;
}

/* ===== CARD 1: MINIMAL MODERN ===== */
.minimal-card .header-row {
display: flex;
gap: 16px;
margin-bottom: 16px;
}

.logo-minimal {
width: 64px;
height: 64px;
border-radius: 50%;
overflow: hidden;
flex-shrink: 0;
}

.logo-minimal img {
width: 100%;
height: 100%;
object-fit: cover;
}

.info-section {
flex: 1;
}

.shop-title-minimal {
font-size: 24px;
font-weight: 900;
color: var(--coffee-800);
margin: 0 0 8px 0;
letter-spacing: -0.5px;
}

.rating-row {
display: flex;
align-items: center;
gap: 8px;
}

.rating-group {
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
font-weight: 800;
color: var(--text-800);
}

.review-count {
font-size: 14px;
font-weight: 600;
color: var(--text-500);
}

.details-row {
display: flex;
flex-direction: column;
gap: 10px;
}

.address-line,
.status-line {
display: flex;
align-items: center;
gap: 8px;
font-size: 14px;
font-weight: 600;
color: var(--text-600);
}

.detail-icon {
font-size: 16px;
color: var(--coffee-600);
}

.status-line {
color: var(--text-500);
}

.status-line.open {
color: var(--green);
}

.status-dot {
width: 8px;
height: 8px;
border-radius: 50%;
background: #9ca3af;
}

.status-line.open .status-dot {
background: var(--green);
animation: pulse 2s infinite;
}

@keyframes pulse {
0%, 100% { opacity: 1; }
50% { opacity: 0.5; }
}

/* ===== CARD 2: PREMIUM ELEGANT ===== */
.premium-card {
background: linear-gradient(135deg, #ffffff 0%, #faf8f5 100%);
}

.premium-header {
display: flex;
gap: 20px;
margin-bottom: 20px;
}

.logo-premium {
flex-shrink: 0;
}

.logo-frame {
width: 72px;
height: 72px;
border-radius: 18px;
overflow: hidden;
border: 3px solid var(--cream-300);
box-shadow: 0 4px 16px rgba(107, 66, 38, 0.1);
}

.logo-frame img {
width: 100%;
height: 100%;
object-fit: cover;
}

.premium-info {
flex: 1;
}

.shop-title-premium {
font-size: 26px;
font-weight: 900;
color: var(--coffee-800);
margin: 0 0 10px 0;
letter-spacing: -0.8px;
}

.rating-premium {
display: flex;
align-items: center;
gap: 6px;
}

.premium-star {
font-size: 20px;
color: var(--gold);
}

.premium-rating {
font-size: 18px;
font-weight: 900;
color: var(--coffee-800);
}

.premium-reviews {
font-size: 14px;
font-weight: 600;
color: var(--text-500);
margin-left: 4px;
}

.premium-divider {
height: 1px;
background: linear-gradient(90deg, transparent, var(--cream-300) 20%, var(--cream-300) 80%, transparent);
margin-bottom: 20px;
}

.premium-details {
display: flex;
flex-direction: column;
gap: 12px;
}

.premium-address,
.premium-status {
display: flex;
align-items: center;
gap: 10px;
font-size: 14px;
font-weight: 600;
color: var(--text-600);
}

.premium-address ion-icon {
font-size: 18px;
color: var(--coffee-600);
}

.premium-status {
gap: 8px;
}

.status-indicator {
width: 10px;
height: 10px;
border-radius: 50%;
background: #9ca3af;
}

.premium-status.open .status-indicator {
background: var(--green);
}

.premium-status.open .status-text {
color: var(--green);
font-weight: 800;
}

.status-time {
color: var(--text-500);
}

/* ===== CARD 3: COMPACT MOBILE-FIRST ===== */
.compact-main {
display: flex;
gap: 14px;
}

.logo-compact {
width: 56px;
height: 56px;
border-radius: 50%;
overflow: hidden;
flex-shrink: 0;
}

.logo-compact img {
width: 100%;
height: 100%;
object-fit: cover;
}

.compact-details {
flex: 1;
display: flex;
flex-direction: column;
gap: 8px;
}

.compact-header {
display: flex;
justify-content: space-between;
align-items: center;
gap: 8px;
}

.shop-title-compact {
font-size: 20px;
font-weight: 900;
color: var(--coffee-800);
margin: 0;
letter-spacing: -0.3px;
}

.status-badge-compact {
display: flex;
align-items: center;
gap: 5px;
padding: 4px 10px;
background: rgba(107, 66, 38, 0.08);
border-radius: 12px;
font-size: 12px;
font-weight: 800;
color: var(--text-600);
}

.status-badge-compact.open {
background: rgba(16, 185, 129, 0.1);
color: var(--green);
}

.badge-dot {
width: 6px;
height: 6px;
border-radius: 50%;
background: currentColor;
}

.compact-rating,
.compact-location,
.compact-hours {
display: flex;
align-items: center;
gap: 6px;
font-size: 13px;
font-weight: 600;
color: var(--text-600);
}

.compact-rating ion-icon {
font-size: 14px;
color: var(--gold);
}

.compact-location ion-icon,
.compact-hours ion-icon {
font-size: 14px;
color: var(--coffee-600);
}

.rating-text {
font-weight: 800;
color: var(--text-800);
}

.separator {
color: var(--text-500);
}

.reviews-text {
color: var(--text-500);
}

/* ===== CARD 4: BOLD BRANDING ===== */
.bold-card {
background: var(--coffee-800);
color: white;
}

.bold-header {
display: flex;
gap: 18px;
margin-bottom: 20px;
}

.logo-bold {
flex-shrink: 0;
}

.bold-logo-bg {
width: 68px;
height: 68px;
border-radius: 50%;
overflow: hidden;
border: 3px solid rgba(255, 255, 255, 0.2);
padding: 3px;
background: rgba(255, 255, 255, 0.1);
}

.bold-logo-bg img {
width: 100%;
height: 100%;
border-radius: 50%;
object-fit: cover;
}

.bold-info {
flex: 1;
}

.shop-title-bold {
font-size: 24px;
font-weight: 900;
color: white;
margin: 0 0 10px 0;
letter-spacing: 1px;
}

.bold-rating-row {
display: flex;
align-items: center;
gap: 10px;
}

.bold-rating {
display: flex;
align-items: center;
gap: 6px;
padding: 6px 12px;
background: rgba(251, 191, 36, 0.2);
border-radius: 12px;
}

.bold-rating ion-icon {
font-size: 18px;
color: var(--gold);
}

.bold-score {
font-size: 16px;
font-weight: 900;
color: var(--gold);
}

.bold-reviews {
font-size: 14px;
font-weight: 600;
color: rgba(255, 255, 255, 0.7);
}

.bold-details {
display: flex;
flex-direction: column;
gap: 12px;
}

.bold-detail-item {
display: flex;
align-items: center;
gap: 10px;
}

.bold-icon {
font-size: 18px;
color: rgba(255, 255, 255, 0.8);
}

.bold-text {
font-size: 14px;
font-weight: 600;
color: rgba(255, 255, 255, 0.9);
}

.bold-status-icon {
width: 10px;
height: 10px;
border-radius: 50%;
background: rgba(255, 255, 255, 0.5);
}

.bold-detail-item.status.open .bold-status-icon {
background: var(--green);
}

.bold-detail-item.status.open .bold-text {
color: white;
}

/* ===== CARD 5: FRIENDLY NEIGHBORHOOD ===== */
.friendly-card {
background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
}

.friendly-layout {
display: flex;
gap: 18px;
}

.logo-friendly {
position: relative;
width: 70px;
height: 70px;
flex-shrink: 0;
}

.logo-friendly img {
width: 100%;
height: 100%;
border-radius: 50%;
object-fit: cover;
border: 3px solid white;
}

.friendly-badge {
position: absolute;
bottom: -2px;
right: -2px;
width: 26px;
height: 26px;
background: white;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.friendly-badge ion-icon {
font-size: 16px;
color: #ef4444;
}

.friendly-content {
flex: 1;
display: flex;
flex-direction: column;
gap: 10px;
}

.shop-title-friendly {
font-size: 24px;
font-weight: 900;
color: var(--coffee-800);
margin: 0;
letter-spacing: -0.5px;
}

.friendly-rating-line {
display: flex;
align-items: center;
gap: 10px;
}

.stars-display {
display: flex;
gap: 2px;
}

.stars-display ion-icon {
font-size: 16px;
color: #d1d5db;
}

.stars-display ion-icon.filled {
color: var(--gold);
}

.friendly-reviews {
font-size: 14px;
font-weight: 700;
color: var(--text-600);
}

.friendly-info-grid {
display: flex;
flex-direction: column;
gap: 8px;
}

.friendly-info-item {
display: flex;
align-items: center;
gap: 8px;
font-size: 13px;
font-weight: 600;
color: var(--text-600);
}

.friendly-info-item ion-icon {
font-size: 16px;
color: var(--coffee-600);
}

.friendly-info-item.open {
color: var(--green);
}

.friendly-dot {
width: 8px;
height: 8px;
border-radius: 50%;
background: var(--green);
}

/* ===== CARD 6: DATA-FOCUSED ===== */
.data-card {
border: 2px solid var(--cream-300);
}

.data-header {
display: flex;
gap: 16px;
margin-bottom: 18px;
}

.logo-data {
width: 60px;
height: 60px;
border-radius: 12px;
overflow: hidden;
flex-shrink: 0;
}

.logo-data img {
width: 100%;
height: 100%;
object-fit: cover;
}

.data-primary {
flex: 1;
}

.shop-title-data {
font-size: 22px;
font-weight: 900;
color: var(--coffee-800);
margin: 0 0 10px 0;
letter-spacing: -0.5px;
}

.data-meta-row {
display: flex;
align-items: center;
gap: 12px;
}

.data-metric {
display: flex;
align-items: center;
gap: 6px;
}

.metric-icon {
font-size: 16px;
color: var(--coffee-600);
}

.metric-value {
font-size: 15px;
font-weight: 800;
color: var(--text-800);
}

.data-separator {
width: 1px;
height: 16px;
background: var(--cream-300);
}

.data-status {
display: flex;
align-items: center;
gap: 6px;
}

.data-dot {
width: 8px;
height: 8px;
border-radius: 50%;
background: #9ca3af;
}

.data-status.open .data-dot {
background: var(--green);
}

.data-status-text {
font-size: 14px;
font-weight: 800;
color: var(--text-600);
}

.data-status.open .data-status-text {
color: var(--green);
}

.data-info-section {
display: flex;
flex-direction: column;
gap: 10px;
padding-top: 18px;
border-top: 1px solid var(--cream-300);
}

.data-info-row {
display: flex;
align-items: center;
gap: 10px;
}

.info-icon {
font-size: 16px;
color: var(--coffee-600);
}

.info-text {
font-size: 14px;
font-weight: 600;
color: var(--text-600);
}

/* ===== CARD 7: AFRICAN-INSPIRED ===== */
.african-card {
position: relative;
overflow: hidden;
background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
}

.african-pattern {
position: absolute;
inset: 0;
background-image: 
repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(139, 90, 60, 0.03) 10px, rgba(139, 90, 60, 0.03) 20px),
repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(139, 90, 60, 0.03) 10px, rgba(139, 90, 60, 0.03) 20px);
pointer-events: none;
}

.african-header {
display: flex;
gap: 18px;
margin-bottom: 16px;
position: relative;
z-index: 1;
}

.logo-african {
flex-shrink: 0;
}

.african-logo-frame {
width: 68px;
height: 68px;
border-radius: 16px;
overflow: hidden;
border: 3px solid rgba(139, 90, 60, 0.2);
background: white;
padding: 3px;
}

.african-logo-frame img {
width: 100%;
height: 100%;
border-radius: 12px;
object-fit: cover;
}

.african-info {
flex: 1;
}

.shop-title-african {
font-size: 24px;
font-weight: 900;
color: var(--coffee-800);
margin: 0 0 10px 0;
letter-spacing: -0.5px;
}

.african-rating {
display: flex;
align-items: center;
gap: 10px;
}

.rating-container {
display: flex;
align-items: center;
gap: 6px;
padding: 6px 12px;
background: white;
border-radius: 12px;
border: 2px solid rgba(139, 90, 60, 0.15);
}

.african-star {
font-size: 18px;
color: var(--amber);
}

.african-score {
font-size: 16px;
font-weight: 900;
color: var(--coffee-800);
}

.african-reviews {
font-size: 14px;
font-weight: 700;
color: var(--coffee-700);
}

.african-accent-line {
height: 3px;
background: linear-gradient(90deg, var(--coffee-600), var(--amber), var(--coffee-600));
border-radius: 2px;
margin-bottom: 16px;
position: relative;
z-index: 1;
}

.african-details {
display: flex;
flex-direction: column;
gap: 12px;
position: relative;
z-index: 1;
}

.african-detail-row {
display: flex;
align-items: center;
gap: 12px;
font-size: 14px;
font-weight: 600;
color: var(--coffee-700);
}

.detail-icon-wrapper {
width: 32px;
height: 32px;
border-radius: 10px;
background: white;
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
}

.detail-icon-wrapper ion-icon {
font-size: 18px;
color: var(--coffee-600);
}

.detail-icon-wrapper.open {
background: rgba(16, 185, 129, 0.15);
}

.african-status-dot {
width: 10px;
height: 10px;
border-radius: 50%;
background: var(--green);
animation: pulse 2s infinite;
}

.african-detail-row.status {
gap: 10px;
}

.status-primary {
font-weight: 800;
color: var(--green);
}

.status-secondary {
color: var(--coffee-600);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
.header-cards-showcase {
padding: 16px;
}

.premium-header,
.bold-header,
.friendly-layout,
.data-header,
.african-header {
flex-direction: column;
align-items: center;
text-align: center;
}

.premium-info,
.bold-info,
.friendly-content,
.data-primary,
.african-info {
align-items: center;
}

.premium-details,
.bold-details,
.friendly-info-grid,
.data-info-section,
.african-details {
align-items: center;
}
}
</style>