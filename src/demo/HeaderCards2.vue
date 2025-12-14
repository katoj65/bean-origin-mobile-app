<template>
<ion-page>
<ion-content>
<div class="headers-showcase">

<!-- HEADER 1: MINIMAL MODERN -->
<div class="shop-header minimal-modern">
<div class="header-container">
<div class="header-main">
<div class="logo-section">
  <div class="logo-circle minimal">
    <ion-icon :icon="cafeOutline"></ion-icon>
  </div>
  <div class="shop-info">
    <h1 class="shop-name">Bean Origin</h1>
    <div class="rating-line">
      <div class="rating-group">
        <ion-icon :icon="star"></ion-icon>
        <span class="rating-value">4.8</span>
        <span class="review-count">(245 reviews)</span>
      </div>
    </div>
  </div>
</div>
<div class="status-badge open">
  <span class="status-dot"></span>
  <span>Open</span>
</div>
</div>

<div class="header-secondary">
<div class="location-row">
  <ion-icon :icon="locationOutline"></ion-icon>
  <span>123 Coffee Lane, Downtown</span>
</div>
<div class="hours-row">
  <ion-icon :icon="timeOutline"></ion-icon>
  <span>7:00 AM – 9:00 PM</span>
</div>
</div>
</div>
</div>

<!-- HEADER 2: PREMIUM ELEGANT -->
<div class="shop-header premium-elegant">
<div class="header-container">
<div class="premium-top">
<div class="premium-logo-section">
  <div class="logo-rounded premium">
    <ion-icon :icon="cafeOutline"></ion-icon>
  </div>
  <div class="premium-identity">
    <div class="premium-badges">
      <span class="badge-label">Premium</span>
      <span class="status-badge-premium open">Open Now</span>
    </div>
    <h1 class="premium-name">Bean Origin</h1>
    <div class="premium-location">
      <ion-icon :icon="locationOutline"></ion-icon>
      <span>Downtown · 123 Coffee Lane</span>
    </div>
  </div>
</div>
</div>

<div class="premium-divider"></div>

<div class="premium-bottom">
<div class="premium-rating">
  <div class="rating-stars">
    <ion-icon :icon="star"></ion-icon>
    <ion-icon :icon="star"></ion-icon>
    <ion-icon :icon="star"></ion-icon>
    <ion-icon :icon="star"></ion-icon>
    <ion-icon :icon="starHalf"></ion-icon>
  </div>
  <span class="premium-score">4.8</span>
  <span class="premium-reviews">245 reviews</span>
</div>
<div class="premium-hours">
  <ion-icon :icon="timeOutline"></ion-icon>
  <span>Today: 7:00 AM – 9:00 PM</span>
</div>
</div>
</div>
</div>

<!-- HEADER 3: COMPACT MOBILE-FIRST -->
<div class="shop-header compact-mobile">
<div class="header-container">
<div class="compact-row">
<div class="compact-left">
  <div class="logo-small">
    <ion-icon :icon="cafeOutline"></ion-icon>
  </div>
  <div class="compact-info">
    <div class="compact-name-status">
      <h1 class="compact-name">Bean Origin</h1>
      <span class="compact-status open">Open</span>
    </div>
    <div class="compact-meta">
      <span class="compact-rating">
        <ion-icon :icon="star"></ion-icon>
        4.8
      </span>
      <span class="compact-separator">·</span>
      <span class="compact-reviews">245 reviews</span>
    </div>
  </div>
</div>
</div>

<div class="compact-details">
<div class="compact-detail-item">
  <ion-icon :icon="locationOutline"></ion-icon>
  <span>123 Coffee Lane, Downtown</span>
</div>
<div class="compact-detail-item">
  <ion-icon :icon="timeOutline"></ion-icon>
  <span>7:00 AM – 9:00 PM</span>
</div>
</div>
</div>
</div>

<!-- HEADER 4: BOLD BRANDING -->
<div class="shop-header bold-branding">
<div class="header-container">
<div class="bold-main">
<div class="bold-logo-wrap">
  <div class="logo-bold">
    <ion-icon :icon="cafeOutline"></ion-icon>
  </div>
  <div class="bold-glow"></div>
</div>

<div class="bold-content">
  <div class="bold-title-row">
    <h1 class="bold-name">BEAN ORIGIN</h1>
    <div class="bold-status open">
      <span class="bold-pulse"></span>
      <span>OPEN NOW</span>
    </div>
  </div>
  
  <div class="bold-rating-bar">
    <div class="bold-rating">
      <ion-icon :icon="star"></ion-icon>
      <span class="bold-score">4.8</span>
    </div>
    <div class="bold-divider"></div>
    <span class="bold-reviews">245 Reviews</span>
  </div>
  
  <div class="bold-info-grid">
    <div class="bold-info-item">
      <ion-icon :icon="locationOutline"></ion-icon>
      <span>123 Coffee Lane, Downtown</span>
    </div>
    <div class="bold-info-item">
      <ion-icon :icon="timeOutline"></ion-icon>
      <span>7:00 AM – 9:00 PM</span>
    </div>
  </div>
</div>
</div>
</div>
</div>

<!-- HEADER 5: FRIENDLY NEIGHBORHOOD -->
<div class="shop-header friendly-neighborhood">
<div class="header-container">
<div class="friendly-header">
<div class="friendly-logo-section">
  <div class="logo-friendly">
    <ion-icon :icon="cafeOutline"></ion-icon>
    <div class="friendly-heart">
      <ion-icon :icon="heart"></ion-icon>
    </div>
  </div>
  <div class="friendly-identity">
    <h1 class="friendly-name">Bean Origin</h1>
    <p class="friendly-tagline">Your local coffee spot ☕</p>
  </div>
</div>
<div class="friendly-status open">
  <span class="friendly-emoji">✨</span>
  <span>Open</span>
</div>
</div>

<div class="friendly-card">
<div class="friendly-rating-section">
  <div class="friendly-star-display">
    <ion-icon :icon="star"></ion-icon>
    <ion-icon :icon="star"></ion-icon>
    <ion-icon :icon="star"></ion-icon>
    <ion-icon :icon="star"></ion-icon>
    <ion-icon :icon="starHalf"></ion-icon>
  </div>
  <div class="friendly-rating-text">
    <span class="friendly-score">4.8 out of 5</span>
    <span class="friendly-count">from 245 happy customers</span>
  </div>
</div>

<div class="friendly-details">
  <div class="friendly-detail">
    <div class="friendly-icon">
      <ion-icon :icon="locationOutline"></ion-icon>
    </div>
    <div class="friendly-text">
      <span class="friendly-label">Find us</span>
      <span class="friendly-value">123 Coffee Lane, Downtown</span>
    </div>
  </div>
  <div class="friendly-detail">
    <div class="friendly-icon">
      <ion-icon :icon="timeOutline"></ion-icon>
    </div>
    <div class="friendly-text">
      <span class="friendly-label">Open today</span>
      <span class="friendly-value">7:00 AM – 9:00 PM</span>
    </div>
  </div>
</div>
</div>
</div>
</div>

<!-- HEADER 6: DATA-FOCUSED CLEAN UI -->
<div class="shop-header data-focused">
<div class="header-container">
<div class="data-header">
<div class="data-identity">
  <div class="logo-square data">
    <ion-icon :icon="cafeOutline"></ion-icon>
  </div>
  <div class="data-title">
    <h1 class="data-name">Bean Origin</h1>
    <div class="data-location">
      <ion-icon :icon="locationOutline"></ion-icon>
      <span>Downtown</span>
    </div>
  </div>
</div>

<div class="data-metrics">
  <div class="metric-item">
    <span class="metric-value">4.8</span>
    <span class="metric-label">Rating</span>
  </div>
  <div class="metric-divider"></div>
  <div class="metric-item">
    <span class="metric-value">245</span>
    <span class="metric-label">Reviews</span>
  </div>
  <div class="metric-divider"></div>
  <div class="metric-item status">
    <span class="metric-value status-open">Open</span>
    <span class="metric-label">Now</span>
  </div>
</div>
</div>

<div class="data-info-bar">
<div class="data-info-item">
  <span class="data-info-label">Address</span>
  <span class="data-info-value">123 Coffee Lane, Downtown</span>
</div>
<div class="data-separator"></div>
<div class="data-info-item">
  <span class="data-info-label">Hours</span>
  <span class="data-info-value">7:00 AM – 9:00 PM</span>
</div>
</div>
</div>
</div>

<!-- HEADER 7: AFRICAN-INSPIRED MODERN -->
<div class="shop-header african-inspired">
<div class="african-pattern"></div>
<div class="header-container">
<div class="african-header">
<div class="african-logo-section">
  <div class="logo-african">
    <div class="african-frame"></div>
    <ion-icon :icon="cafeOutline"></ion-icon>
  </div>
  <div class="african-identity">
    <div class="african-accent-bar"></div>
    <h1 class="african-name">Bean Origin</h1>
    <div class="african-subtitle">
      <ion-icon :icon="locationOutline"></ion-icon>
      <span>Downtown Coffee House</span>
    </div>
  </div>
</div>

<div class="african-status-card open">
  <span class="african-status-text">Open Now</span>
  <span class="african-status-icon">●</span>
</div>
</div>

<div class="african-info-section">
<div class="african-rating-card">
  <div class="african-rating-display">
    <div class="african-stars">
      <ion-icon :icon="star"></ion-icon>
      <ion-icon :icon="star"></ion-icon>
      <ion-icon :icon="star"></ion-icon>
      <ion-icon :icon="star"></ion-icon>
      <ion-icon :icon="starHalf"></ion-icon>
    </div>
    <span class="african-rating-number">4.8</span>
  </div>
  <span class="african-review-text">Based on 245 reviews</span>
</div>

<div class="african-details-grid">
  <div class="african-detail-card">
    <div class="african-detail-icon">
      <ion-icon :icon="locationOutline"></ion-icon>
    </div>
    <div class="african-detail-content">
      <span class="african-detail-label">Location</span>
      <span class="african-detail-value">123 Coffee Lane</span>
    </div>
  </div>
  
  <div class="african-detail-card">
    <div class="african-detail-icon">
      <ion-icon :icon="timeOutline"></ion-icon>
    </div>
    <div class="african-detail-content">
      <span class="african-detail-label">Hours Today</span>
      <span class="african-detail-value">7:00 AM – 9:00 PM</span>
    </div>
  </div>
</div>
</div>

<div class="african-divider"></div>
</div>
</div>

</div>
</ion-content>
</ion-page>
</template>

<script setup>
import { IonIcon, IonPage, IonContent } from '@ionic/vue';
import {
cafeOutline,
star,
starHalf,
locationOutline,
timeOutline,
heart,
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
--yellow: #fef3c7;
}

.headers-showcase {
display: flex;
flex-direction: column;
gap: 24px;
padding: 20px;
background: var(--cream-200);
max-width: 800px;
margin: 0 auto;
}

.shop-header {
border-radius: 24px;
box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
overflow: hidden;
}

.header-container {
padding: 24px;
}

/* ===== HEADER 1: MINIMAL MODERN ===== */
.minimal-modern {
background: white;
}

.header-main {
display: flex;
justify-content: space-between;
align-items: flex-start;
margin-bottom: 18px;
}

.logo-section {
display: flex;
gap: 14px;
flex: 1;
}

.logo-circle {
width: 64px;
height: 64px;
border-radius: 50%;
background: linear-gradient(135deg, var(--gold), var(--amber));
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

.logo-circle ion-icon {
font-size: 34px;
color: white;
}

.shop-info {
display: flex;
flex-direction: column;
gap: 6px;
}

.shop-name {
font-size: 24px;
font-weight: 900;
color: var(--coffee-800);
margin: 0;
letter-spacing: -0.8px;
}

.rating-line {
display: flex;
align-items: center;
}

.rating-group {
display: flex;
align-items: center;
gap: 6px;
}

.rating-group ion-icon {
font-size: 18px;
color: var(--gold);
}

.rating-value {
font-size: 16px;
font-weight: 900;
color: var(--coffee-800);
}

.review-count {
font-size: 14px;
font-weight: 700;
color: var(--text-600);
}

.status-badge {
display: flex;
align-items: center;
gap: 6px;
padding: 8px 14px;
border-radius: 14px;
font-size: 13px;
font-weight: 800;
flex-shrink: 0;
}

.status-badge.open {
background: rgba(16, 185, 129, 0.1);
color: var(--green);
}

.status-dot {
width: 8px;
height: 8px;
border-radius: 50%;
background: currentColor;
animation: pulse 2s infinite;
}

@keyframes pulse {
0%, 100% { opacity: 1; }
50% { opacity: 0.5; }
}

.header-secondary {
display: flex;
gap: 20px;
padding-top: 18px;
border-top: 1px solid var(--cream-300);
}

.location-row,
.hours-row {
display: flex;
align-items: center;
gap: 8px;
font-size: 14px;
font-weight: 700;
color: var(--text-600);
}

.location-row ion-icon,
.hours-row ion-icon {
font-size: 18px;
color: var(--coffee-600);
}

/* ===== HEADER 2: PREMIUM ELEGANT ===== */
.premium-elegant {
background: linear-gradient(135deg, #ffffff 0%, #faf8f5 100%);
}

.premium-top {
margin-bottom: 20px;
}

.premium-logo-section {
display: flex;
gap: 16px;
}

.logo-rounded {
width: 72px;
height: 72px;
border-radius: 18px;
background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
border: 3px solid white;
box-shadow: 0 4px 16px rgba(93, 58, 47, 0.25);
}

.logo-rounded ion-icon {
font-size: 38px;
color: white;
}

.premium-identity {
flex: 1;
}

.premium-badges {
display: flex;
gap: 8px;
margin-bottom: 8px;
}

.badge-label {
padding: 4px 10px;
background: rgba(107, 66, 38, 0.1);
border-radius: 10px;
font-size: 11px;
font-weight: 800;
color: var(--coffee-600);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.status-badge-premium {
padding: 4px 10px;
border-radius: 10px;
font-size: 11px;
font-weight: 800;
text-transform: uppercase;
letter-spacing: 0.5px;
}

.status-badge-premium.open {
background: rgba(16, 185, 129, 0.1);
color: var(--green);
}

.premium-name {
font-size: 26px;
font-weight: 900;
color: var(--coffee-800);
margin: 0 0 8px 0;
letter-spacing: -1px;
}

.premium-location {
display: flex;
align-items: center;
gap: 6px;
font-size: 14px;
font-weight: 700;
color: var(--text-600);
}

.premium-location ion-icon {
font-size: 16px;
color: var(--coffee-600);
}

.premium-divider {
height: 1px;
background: linear-gradient(90deg, transparent, var(--cream-300) 20%, var(--cream-300) 80%, transparent);
margin-bottom: 20px;
}

.premium-bottom {
display: flex;
justify-content: space-between;
align-items: center;
}

.premium-rating {
display: flex;
align-items: center;
gap: 12px;
}

.rating-stars {
display: flex;
gap: 2px;
}

.rating-stars ion-icon {
font-size: 18px;
color: var(--gold);
}

.premium-score {
font-size: 20px;
font-weight: 900;
color: var(--coffee-800);
letter-spacing: -0.5px;
}

.premium-reviews {
font-size: 14px;
font-weight: 700;
color: var(--text-600);
}

.premium-hours {
display: flex;
align-items: center;
gap: 8px;
font-size: 14px;
font-weight: 700;
color: var(--text-600);
}

.premium-hours ion-icon {
font-size: 18px;
color: var(--coffee-600);
}

/* ===== HEADER 3: COMPACT MOBILE-FIRST ===== */
.compact-mobile {
background: white;
}

.compact-mobile .header-container {
padding: 18px;
}

.compact-row {
margin-bottom: 14px;
}

.compact-left {
display: flex;
gap: 12px;
}

.logo-small {
width: 48px;
height: 48px;
border-radius: 50%;
background: linear-gradient(135deg, var(--gold), var(--amber));
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
}

.logo-small ion-icon {
font-size: 26px;
color: white;
}

.compact-info {
flex: 1;
min-width: 0;
}

.compact-name-status {
display: flex;
align-items: center;
gap: 10px;
margin-bottom: 6px;
}

.compact-name {
font-size: 20px;
font-weight: 900;
color: var(--coffee-800);
margin: 0;
letter-spacing: -0.5px;
}

.compact-status {
padding: 4px 10px;
border-radius: 10px;
font-size: 11px;
font-weight: 900;
flex-shrink: 0;
}

.compact-status.open {
background: rgba(16, 185, 129, 0.1);
color: var(--green);
}

.compact-meta {
display: flex;
align-items: center;
gap: 6px;
font-size: 13px;
font-weight: 700;
color: var(--text-600);
}

.compact-rating {
display: flex;
align-items: center;
gap: 4px;
color: var(--coffee-800);
}

.compact-rating ion-icon {
font-size: 14px;
color: var(--gold);
}

.compact-separator {
color: var(--text-500);
}

.compact-details {
display: flex;
flex-direction: column;
gap: 10px;
padding-top: 14px;
border-top: 1px solid var(--cream-300);
}

.compact-detail-item {
display: flex;
align-items: center;
gap: 8px;
font-size: 13px;
font-weight: 700;
color: var(--text-600);
}

.compact-detail-item ion-icon {
font-size: 16px;
color: var(--coffee-600);
}

/* ===== HEADER 4: BOLD BRANDING ===== */
.bold-branding {
background: linear-gradient(135deg, var(--coffee-800), var(--coffee-900));
}

.bold-main {
display: flex;
gap: 20px;
}

.bold-logo-wrap {
position: relative;
flex-shrink: 0;
}

.logo-bold {
width: 80px;
height: 80px;
border-radius: 50%;
background: linear-gradient(135deg, var(--gold), var(--amber));
display: flex;
align-items: center;
justify-content: center;
border: 4px solid rgba(255, 255, 255, 0.2);
position: relative;
z-index: 1;
}

.logo-bold ion-icon {
font-size: 44px;
color: white;
}

.bold-glow {
position: absolute;
inset: -10px;
background: radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%);
border-radius: 50%;
z-index: 0;
}

.bold-content {
flex: 1;
color: white;
}

.bold-title-row {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 12px;
}

.bold-name {
font-size: 28px;
font-weight: 900;
color: white;
margin: 0;
letter-spacing: 1px;
}

.bold-status {
display: flex;
align-items: center;
gap: 8px;
padding: 8px 14px;
background: rgba(16, 185, 129, 0.2);
border-radius: 14px;
font-size: 12px;
font-weight: 900;
color: var(--green);
letter-spacing: 0.5px;
border: 2px solid rgba(16, 185, 129, 0.3);
}

.bold-pulse {
width: 8px;
height: 8px;
border-radius: 50%;
background: var(--green);
animation: pulse 2s infinite;
}

.bold-rating-bar {
display: flex;
align-items: center;
gap: 12px;
margin-bottom: 16px;
}

.bold-rating {
display: flex;
align-items: center;
gap: 6px;
}

.bold-rating ion-icon {
font-size: 20px;
color: var(--gold);
}

.bold-score {
font-size: 18px;
font-weight: 900;
letter-spacing: -0.3px;
}

.bold-divider {
width: 1px;
height: 20px;
background: rgba(255, 255, 255, 0.3);
}

.bold-reviews {
font-size: 14px;
font-weight: 700;
opacity: 0.9;
}

.bold-info-grid {
display: flex;
gap: 16px;
}

.bold-info-item {
display: flex;
align-items: center;
gap: 8px;
font-size: 13px;
font-weight: 700;
opacity: 0.9;
}

.bold-info-item ion-icon {
font-size: 18px;
}

/* ===== HEADER 5: FRIENDLY NEIGHBORHOOD ===== */
.friendly-neighborhood {
background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
}

.friendly-header {
display: flex;
justify-content: space-between;
align-items: flex-start;
margin-bottom: 20px;
}

.friendly-logo-section {
display: flex;
gap: 14px;
}

.logo-friendly {
width: 68px;
height: 68px;
border-radius: 50%;
background: white;
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
position: relative;
box-shadow: 0 4px 12px rgba(107, 66, 38, 0.1);
}

.logo-friendly ion-icon {
font-size: 36px;
color: var(--coffee-600);
}

.friendly-heart {
position: absolute;
bottom: -4px;
right: -4px;
width: 24px;
height: 24px;
border-radius: 50%;
background: #ef4444;
display: flex;
align-items: center;
justify-content: center;
}

.friendly-heart ion-icon {
font-size: 14px;
color: white;
}

.friendly-identity {
flex: 1;
}

.friendly-name {
font-size: 24px;
font-weight: 900;
color: var(--coffee-800);
margin: 0 0 4px 0;
letter-spacing: -0.8px;
}

.friendly-tagline {
font-size: 14px;
font-weight: 700;
color: var(--coffee-700);
margin: 0;
}

.friendly-status {
display: flex;
align-items: center;
gap: 6px;
padding: 8px 14px;
background: white;
border-radius: 14px;
font-size: 13px;
font-weight: 800;
color: var(--green);
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.friendly-emoji {
font-size: 16px;
}

.friendly-card {
background: white;
border-radius: 20px;
padding: 20px;
}

.friendly-rating-section {
display: flex;
gap: 14px;
margin-bottom: 18px;
padding-bottom: 18px;
border-bottom: 1px solid var(--cream-300);
}

.friendly-star-display {
display: flex;
gap: 4px;
}

.friendly-star-display ion-icon {
font-size: 22px;
color: var(--gold);
}

.friendly-rating-text {
display: flex;
flex-direction: column;
gap: 3px;
}

.friendly-score {
font-size: 16px;
font-weight: 900;
color: var(--coffee-800);
}

.friendly-count {
font-size: 13px;
font-weight: 700;
color: var(--text-600);
}

.friendly-details {
display: flex;
flex-direction: column;
gap: 14px;
}

.friendly-detail {
display: flex;
gap: 12px;
}

.friendly-icon {
width: 40px;
height: 40px;
border-radius: 12px;
background: var(--yellow);
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
}

.friendly-icon ion-icon {
font-size: 22px;
color: var(--coffee-600);
}

.friendly-text {
display: flex;
flex-direction: column;
gap: 3px;
}

.friendly-label {
font-size: 12px;
font-weight: 800;
color: var(--text-500);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.friendly-value {
font-size: 15px;
font-weight: 800;
color: var(--coffee-800);
}

/* ===== HEADER 6: DATA-FOCUSED CLEAN UI ===== */
.data-focused {
background: white;
}

.data-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
padding-bottom: 20px;
border-bottom: 2px solid var(--cream-300);
}

.data-identity {
display: flex;
gap: 14px;
}

.logo-square {
width: 60px;
height: 60px;
border-radius: 14px;
background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
}

.logo-square ion-icon {
font-size: 32px;
color: white;
}

.data-title {
display: flex;
flex-direction: column;
gap: 6px;
}

.data-name {
font-size: 22px;
font-weight: 900;
color: var(--coffee-800);
margin: 0;
letter-spacing: -0.8px;
}

.data-location {
display: flex;
align-items: center;
gap: 6px;
font-size: 13px;
font-weight: 700;
color: var(--text-600);
}

.data-location ion-icon {
font-size: 16px;
color: var(--coffee-600);
}

.data-metrics {
display: flex;
align-items: center;
gap: 16px;
}

.metric-item {
display: flex;
flex-direction: column;
align-items: center;
gap: 4px;
}

.metric-value {
font-size: 20px;
font-weight: 900;
color: var(--coffee-800);
letter-spacing: -0.5px;
}

.metric-value.status-open {
color: var(--green);
}

.metric-label {
font-size: 11px;
font-weight: 800;
color: var(--text-500);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.metric-divider {
width: 1px;
height: 40px;
background: var(--cream-300);
}

.data-info-bar {
display: flex;
gap: 20px;
padding: 16px;
background: var(--cream-200);
border-radius: 16px;
}

.data-info-item {
display: flex;
flex-direction: column;
gap: 4px;
flex: 1;
}

.data-info-label {
font-size: 11px;
font-weight: 800;
color: var(--text-500);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.data-info-value {
font-size: 14px;
font-weight: 800;
color: var(--coffee-800);
}

.data-separator {
width: 1px;
background: var(--cream-300);
}

/* ===== HEADER 7: AFRICAN-INSPIRED ===== */
.african-inspired {
position: relative;
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
justify-content: space-between;
align-items: flex-start;
margin-bottom: 20px;
position: relative;
}

.african-logo-section {
display: flex;
gap: 16px;
}

.logo-african {
width: 68px;
height: 68px;
border-radius: 16px;
background: white;
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
position: relative;
box-shadow: 0 4px 12px rgba(107, 66, 38, 0.15);
}

.african-frame {
position: absolute;
inset: -4px;
border: 3px solid var(--coffee-600);
border-radius: 18px;
background: linear-gradient(45deg, transparent 30%, rgba(251, 191, 36, 0.1) 50%, transparent 70%);
}

.logo-african ion-icon {
font-size: 36px;
color: var(--coffee-600);
position: relative;
z-index: 1;
}

.african-identity {
flex: 1;
}

.african-accent-bar {
width: 60px;
height: 4px;
background: linear-gradient(90deg, var(--coffee-600), var(--amber));
border-radius: 2px;
margin-bottom: 10px;
}

.african-name {
font-size: 26px;
font-weight: 900;
color: var(--coffee-800);
margin: 0 0 8px 0;
letter-spacing: -1px;
}

.african-subtitle {
display: flex;
align-items: center;
gap: 6px;
font-size: 14px;
font-weight: 700;
color: var(--coffee-700);
}

.african-subtitle ion-icon {
font-size: 16px;
}

.african-status-card {
display: flex;
align-items: center;
gap: 8px;
padding: 10px 16px;
background: white;
border-radius: 14px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.african-status-card.open {
border-left: 4px solid var(--green);
}

.african-status-text {
font-size: 13px;
font-weight: 800;
color: var(--green);
}

.african-status-icon {
font-size: 18px;
color: var(--green);
animation: pulse 2s infinite;
}

.african-info-section {
position: relative;
}

.african-rating-card {
background: white;
border-radius: 18px;
padding: 18px;
margin-bottom: 16px;
}

.african-rating-display {
display: flex;
align-items: center;
gap: 12px;
margin-bottom: 8px;
}

.african-stars {
display: flex;
gap: 4px;
}

.african-stars ion-icon {
font-size: 20px;
color: var(--gold);
}

.african-rating-number {
font-size: 22px;
font-weight: 900;
color: var(--coffee-800);
letter-spacing: -0.8px;
}

.african-review-text {
font-size: 13px;
font-weight: 700;
color: var(--text-600);
}

.african-details-grid {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 12px;
position: relative;
}

.african-detail-card {
display: flex;
gap: 12px;
padding: 16px;
background: white;
border-radius: 16px;
}

.african-detail-icon {
width: 44px;
height: 44px;
border-radius: 12px;
background: linear-gradient(135deg, var(--gold), var(--amber));
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
}

.african-detail-icon ion-icon {
font-size: 24px;
color: white;
}

.african-detail-content {
display: flex;
flex-direction: column;
gap: 3px;
}

.african-detail-label {
font-size: 11px;
font-weight: 800;
color: var(--text-500);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.african-detail-value {
font-size: 14px;
font-weight: 800;
color: var(--coffee-800);
line-height: 1.3;
}

.african-divider {
height: 3px;
background: linear-gradient(90deg, var(--coffee-600), var(--amber), var(--coffee-600));
border-radius: 2px;
margin-top: 20px;
position: relative;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
.headers-showcase {
padding: 16px;
}

.header-container {
padding: 20px;
}

.header-secondary,
.bold-info-grid,
.data-metrics {
flex-direction: column;
gap: 12px;
}

.metric-divider,
.data-separator {
width: 100%;
height: 1px;
}

.african-details-grid {
grid-template-columns: 1fr;
}

.data-info-bar {
flex-direction: column;
}
}
</style>