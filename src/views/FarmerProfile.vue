<template>
<app-layout title="Farmer Profile">
<template #content>
<div class="farmer-profile-page">

<!-- Farmer Header -->
<div class="farmer-header">
<div class="farmer-info">
<div class="avatar-section">
  <ion-avatar class="farmer-avatar">
    <img :src="farmerData.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'" alt="Farmer Avatar" />
  </ion-avatar>
  <div class="verified-badge" v-if="farmerData.verified">
    <ion-icon :icon="checkmarkCircle"></ion-icon>
  </div>
</div>

<h1 class="farmer-name">{{ farmerData.name }}</h1>
<p class="farm-location">
  <ion-icon :icon="locationOutline"></ion-icon>
  {{ farmerData.location }}
</p>

<div class="farmer-stats">
  <div class="stat-item">
    <span class="stat-value">{{ farmerData.farmSize }}</span>
    <span class="stat-label">Hectares</span>
  </div>
  <div class="stat-divider"></div>
  <div class="stat-item">
    <span class="stat-value">{{ farmerData.experience }}</span>
    <span class="stat-label">Years Exp</span>
  </div>
  <div class="stat-divider"></div>
  <div class="stat-item">
    <span class="stat-value">{{ farmerData.products }}</span>
    <span class="stat-label">Products</span>
  </div>
</div>
</div>
</div>

<!-- About Section -->
<div class="profile-section">
<div class="section-header">
<ion-icon :icon="documentTextOutline" class="section-icon"></ion-icon>
<h2 class="section-title">About the Farmer</h2>
</div>
<div class="about-card">
<p class="about-text">{{ farmerData.bio }}</p>
</div>
</div>

<!-- Farm Details -->
<div class="profile-section">
<div class="section-header">
<ion-icon :icon="leafOutline" class="section-icon"></ion-icon>
<h2 class="section-title">Farm Details</h2>
</div>

<div class="detail-card">
<ion-icon :icon="businessOutline" class="detail-icon"></ion-icon>
<div class="detail-content">
  <span class="detail-label">Farm Name</span>
  <span class="detail-value">{{ farmerData.farmName }}</span>
</div>
</div>

<div class="detail-card">
<ion-icon :icon="leafOutline" class="detail-icon"></ion-icon>
<div class="detail-content">
  <span class="detail-label">Coffee Varieties</span>
  <span class="detail-value">{{ farmerData.varieties }}</span>
</div>
</div>

<div class="detail-card">
<ion-icon :icon="waterOutline" class="detail-icon"></ion-icon>
<div class="detail-content">
  <span class="detail-label">Growing Method</span>
  <span class="detail-value">{{ farmerData.growingMethod }}</span>
</div>
</div>

<div class="detail-card">
<ion-icon :icon="ribbonOutline" class="detail-icon"></ion-icon>
<div class="detail-content">
  <span class="detail-label">Certifications</span>
  <div class="certifications">
    <span v-for="cert in farmerData.certifications" :key="cert" class="cert-badge">
      {{ cert }}
    </span>
  </div>
</div>
</div>
</div>

<!-- Sustainability Practices -->
<div class="profile-section">
<div class="section-header">
<ion-icon :icon="earthOutline" class="section-icon"></ion-icon>
<h2 class="section-title">Sustainability</h2>
</div>

<div class="sustainability-grid">
<div class="practice-card" v-for="practice in farmerData.sustainabilityPractices" :key="practice.title">
  <div class="practice-icon-wrapper">
    <ion-icon :icon="practice.icon" class="practice-icon"></ion-icon>
  </div>
  <h3 class="practice-title">{{ practice.title }}</h3>
  <p class="practice-description">{{ practice.description }}</p>
</div>
</div>
</div>

<!-- Impact Metrics -->
<div class="profile-section">
<div class="section-header">
<ion-icon :icon="statsChartOutline" class="section-icon"></ion-icon>
<h2 class="section-title">Impact Metrics</h2>
</div>

<div class="metrics-grid">
<div class="metric-card">
  <div class="metric-icon-wrapper green">
    <ion-icon :icon="leafOutline"></ion-icon>
  </div>
  <div class="metric-content">
    <span class="metric-value">{{ farmerData.metrics.treesPlanted }}</span>
    <span class="metric-label">Trees Planted</span>
  </div>
</div>

<div class="metric-card">
  <div class="metric-icon-wrapper blue">
    <ion-icon :icon="waterOutline"></ion-icon>
  </div>
  <div class="metric-content">
    <span class="metric-value">{{ farmerData.metrics.waterSaved }}</span>
    <span class="metric-label">Water Saved (L)</span>
  </div>
</div>

<div class="metric-card">
  <div class="metric-icon-wrapper gold">
    <ion-icon :icon="sparklesOutline"></ion-icon>
  </div>
  <div class="metric-content">
    <span class="metric-value">{{ farmerData.metrics.carbonOffset }}</span>
    <span class="metric-label">Carbon Offset (kg)</span>
  </div>
</div>

<div class="metric-card">
  <div class="metric-icon-wrapper brown">
    <ion-icon :icon="peopleOutline"></ion-icon>
  </div>
  <div class="metric-content">
    <span class="metric-value">{{ farmerData.metrics.employeesSupported }}</span>
    <span class="metric-label">Jobs Created</span>
  </div>
</div>
</div>
</div>

<!-- Contact Section -->
<div class="profile-section">
<div class="section-header">
<ion-icon :icon="mailOutline" class="section-icon"></ion-icon>
<h2 class="section-title">Contact</h2>
</div>

<button class="contact-btn">
<ion-icon :icon="callOutline"></ion-icon>
<span>Call Farmer</span>
</button>

<button class="contact-btn secondary">
<ion-icon :icon="mailOutline"></ion-icon>
<span>Send Message</span>
</button>

<button class="contact-btn secondary">
<ion-icon :icon="locationOutline"></ion-icon>
<span>View Farm Location</span>
</button>
</div>

</div>
</template>
</app-layout>
</template>

<script setup>
import { ref } from 'vue';
import AppLayout from './template/AppLayout.vue';
import {
IonIcon,
IonAvatar
} from '@ionic/vue';
import {
locationOutline,
checkmarkCircle,
documentTextOutline,
leafOutline,
businessOutline,
waterOutline,
ribbonOutline,
earthOutline,
statsChartOutline,
sparklesOutline,
peopleOutline,
mailOutline,
callOutline
} from 'ionicons/icons';

const farmerData = ref({
name: 'James Mugisha',
location: 'Rwenzori Mountains, Uganda',
avatar: '',
farmImage: '',
verified: true,
farmSize: '15',
experience: '20',
products: '8',
bio: 'I am a third-generation coffee farmer dedicated to producing the finest Arabica beans in the Rwenzori region. My family has been cultivating coffee for over 60 years, and I take pride in maintaining sustainable farming practices while preserving our land for future generations.',
farmName: 'Mugisha Coffee Estate',
varieties: 'Arabica SL14, SL28, Bourbon',
growingMethod: 'Organic, Shade-grown',
certifications: ['Organic', 'Fair Trade', 'Rainforest Alliance'],
sustainabilityPractices: [
{
title: 'Organic Farming',
description: 'No synthetic pesticides or fertilizers',
icon: leafOutline
},
{
title: 'Water Conservation',
description: 'Efficient irrigation and recycling systems',
icon: waterOutline
},
{
title: 'Shade Growing',
description: 'Natural canopy preserves biodiversity',
icon: businessOutline
},
{
title: 'Composting',
description: 'Coffee pulp recycled as natural fertilizer',
icon: earthOutline
}
],
metrics: {
treesPlanted: '1,200',
waterSaved: '45,000',
carbonOffset: '8,500',
employeesSupported: '25'
}
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
--text-800: #2c1810;
--text-600: #6b5444;
--text-500: #8b7355;

--gold: #fbbf24;
--green: #10b981;
--blue: #3b82f6;
--red: #ef4444;
--brown: #92400e;
}

.farmer-profile-page {
background: var(--cream-200);
min-height: 100vh;
padding-bottom: 100px;
}

/* ===== FARMER HEADER ===== */
.farmer-header {
position: relative;
margin: -20px 0 32px 0;
background: white;
border-radius: 0 0 20px 20px;
overflow: hidden;
padding-bottom: 12px;
}

.farmer-info {
text-align: center;
padding: 32px 20px 0;
position: relative;
}

.avatar-section {
position: relative;
display: inline-block;
margin-bottom: 12px;
}

.farmer-avatar {
width: 100px;
height: 100px;
border: 4px solid white;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.verified-badge {
position: absolute;
bottom: 0;
right: 0;
width: 32px;
height: 32px;
border-radius: 50%;
background: white;
display: flex;
align-items: center;
justify-content: center;
}

.verified-badge ion-icon {
font-size: 28px;
color: var(--green);
}

.farmer-name {
font-size: 24px;
font-weight: 900;
color: #000000;
margin: 0 0 8px 0;
letter-spacing: -0.5px;
}

.farm-location {
display: flex;
align-items: center;
justify-content: center;
gap: 6px;
font-size: 14px;
font-weight: 600;
color: var(--text-600);
margin: 0 0 20px 0;
}

.farm-location ion-icon {
font-size: 18px;
}

.farmer-stats {
display: flex;
justify-content: center;
align-items: center;
gap: 24px;
padding: 20px;
background: var(--cream-200);
border-radius: 16px;
}

.stat-item {
display: flex;
flex-direction: column;
align-items: center;
gap: 4px;
}

.stat-value {
font-size: 24px;
font-weight: 900;
color: var(--coffee-600);
letter-spacing: -0.5px;
}

.stat-label {
font-size: 11px;
font-weight: 700;
color: var(--text-600);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.stat-divider {
width: 1px;
height: 40px;
background: var(--cream-300);
}

/* ===== PROFILE SECTION ===== */
.profile-section {
padding: 0 20px;
margin: 20px 0 24px 0;
}

.section-header {
display: flex;
align-items: center;
gap: 8px;
margin-bottom: 12px;
}

.section-icon {
font-size: 24px;
color: var(--coffee-600);
}

.section-title {
font-size: 18px;
font-weight: 900;
color: #000000;
margin: 0;
letter-spacing: -0.5px;
}

/* ===== ABOUT CARD ===== */
.about-card {
background: white;
padding: 20px;
border-radius: 16px;
}

.about-text {
font-size: 15px;
font-weight: 500;
color: var(--text-600);
line-height: 1.6;
margin: 0;
}

/* ===== DETAIL CARD ===== */
.detail-card {
display: flex;
align-items: flex-start;
gap: 12px;
padding: 16px;
background: white;
border-radius: 16px;
margin-bottom: 12px;
}

.detail-icon {
font-size: 24px;
color: var(--coffee-600);
flex-shrink: 0;
margin-top: 2px;
}

.detail-content {
flex: 1;
display: flex;
flex-direction: column;
gap: 6px;
}

.detail-label {
font-size: 12px;
font-weight: 700;
color: var(--text-600);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.detail-value {
font-size: 16px;
font-weight: 700;
color: #000000;
}

.certifications {
display: flex;
flex-wrap: wrap;
gap: 8px;
}

.cert-badge {
padding: 6px 12px;
background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.08));
color: var(--green);
font-size: 12px;
font-weight: 800;
border-radius: 8px;
border: 1.5px solid var(--green);
}

/* ===== SUSTAINABILITY GRID ===== */
.sustainability-grid {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 12px;
}

.practice-card {
background: white;
padding: 16px;
border-radius: 16px;
text-align: center;
}

.practice-icon-wrapper {
width: 48px;
height: 48px;
margin: 0 auto 12px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.15), rgba(107, 66, 38, 0.08));
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
}

.practice-icon {
font-size: 24px;
color: var(--coffee-600);
}

.practice-title {
font-size: 14px;
font-weight: 800;
color: #000000;
margin: 0 0 6px 0;
}

.practice-description {
font-size: 12px;
font-weight: 600;
color: var(--text-600);
line-height: 1.4;
margin: 0;
}

/* ===== METRICS GRID ===== */
.metrics-grid {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 12px;
}

.metric-card {
background: white;
padding: 16px;
border-radius: 16px;
display: flex;
align-items: center;
gap: 12px;
}

.metric-icon-wrapper {
width: 48px;
height: 48px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
}

.metric-icon-wrapper ion-icon {
font-size: 24px;
color: white;
}

.metric-icon-wrapper.green {
background: linear-gradient(135deg, #10b981, #059669);
}

.metric-icon-wrapper.blue {
background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.metric-icon-wrapper.gold {
background: linear-gradient(135deg, #fbbf24, #f59e0b);
}

.metric-icon-wrapper.brown {
background: linear-gradient(135deg, #92400e, #78350f);
}

.metric-content {
display: flex;
flex-direction: column;
gap: 2px;
}

.metric-value {
font-size: 18px;
font-weight: 900;
color: #000000;
letter-spacing: -0.5px;
}

.metric-label {
font-size: 11px;
font-weight: 700;
color: var(--text-600);
line-height: 1.2;
}

/* ===== CONTACT BUTTONS ===== */
.contact-btn {
width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
padding: 16px;
background: var(--coffee-600);
border: none;
border-radius: 16px;
margin-bottom: 12px;
cursor: pointer;
transition: all 0.3s ease;
height: 56px;
}

.contact-btn:active {
transform: scale(0.98);
}

.contact-btn ion-icon {
font-size: 24px;
color: white;
}

.contact-btn span {
font-size: 16px;
font-weight: 900;
color: white;
letter-spacing: -0.3px;
}

.contact-btn.secondary {
background: white;
border: 2px solid var(--coffee-600);
}

.contact-btn.secondary ion-icon {
color: var(--coffee-600);
}

.contact-btn.secondary span {
color: var(--coffee-600);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
.farmer-header {
margin: -20px 0 0 0;
}

.header-background {
height: 180px;
}

.farmer-stats {
gap: 16px;
}

.sustainability-grid,
.metrics-grid {
grid-template-columns: 1fr;
}
}
</style>
