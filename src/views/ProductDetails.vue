<script setup>
import AppLayout from './template/AppLayout.vue';
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
shareOutline,
star,
checkmarkCircle,
locationOutline,
calendar,
cartOutline,
personOutline,
leafOutline,
cloudDownloadOutline,
ribbonOutline,
waterOutline,
flashOutline,
} from "ionicons/icons";



const product= {
id: 1,
name: "Ethiopian Yirgacheffe",
type: "Single Origin Arabica",
rating: 4.9,
price: 18.99,
unit: "lb",
image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
tags: ["Organic", "Fair Trade", "Single Origin"],
description: "A premium single-origin coffee from the highlands of Ethiopia. Known for its bright acidity, floral notes, and wine-like characteristics. Grown at 1,800-2,200 meters above sea level using traditional methods passed down through generations.",
origin: "Yirgacheffe, Ethiopia",
harvest: "November 2024"
};


const farmer = {
name: "Alemayehu Tadesse",
location: "Gedeo Zone, Ethiopia",
photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
farmSize: "5 hectares",
experience: "25 years",
certifications: "3",
story: "Alemayehu has been cultivating coffee on his family farm for over two decades. His farm is nestled in the highlands of Yirgacheffe, where the altitude and climate create perfect conditions for growing exceptional coffee. He practices organic farming methods and is committed to environmental sustainability.",
practices: [
"100% Organic Farming",
"Shade-Grown Coffee",
"Natural Water Conservation",
"Composting & Soil Management",
"No Chemical Pesticides",
"Fair Labor Practices"
]
};

const carbon= {
sequestered: "2.5 tons",
offset: "850 kg CO₂",
treeCoverage: 85,
soilHealth: 92,
waterConservation: 78,
creditInfo: "This farm participates in verified carbon offset programs. By purchasing this coffee, you support sustainable farming practices that actively remove CO₂ from the atmosphere.",
certifications: ["Rainforest Alliance", "Carbon Neutral", "Climate Positive"],
impacts: [
{ type: "water", value: "12,000L", label: "Water Saved" },
{ type: "tree", value: "150+", label: "Trees Protected" },
{ type: "energy", value: "65%", label: "Renewable Energy" },
{ type: "biodiversity", value: "High", label: "Biodiversity" }
]
};







</script>
<template>
<app-layout title="Product Details">

<template #content>







    <ion-content fullscreen class="content-bg">
      <!-- PRODUCT INFO CARD -->
      <div class="info-card">
        <!-- PRODUCT IMAGE -->
        <div class="product-image-section">
          <img :src="product.image" :alt="product.name" class="main-image" />
          <div class="image-gradient"></div>
          <div class="badge-container">
            <span class="badge organic-badge">
              <ion-icon :icon="leafOutline" class="badge-icon"></ion-icon>
              Organic
            </span>
            <span class="badge verified-badge">
              <ion-icon :icon="checkmarkCircle" class="badge-icon"></ion-icon>
              Verified
            </span>
          </div>
        </div>

        <div class="product-main">
          <div class="product-title-section">
            <h1 class="product-name">{{ product.name }}</h1>
            <p class="product-type">{{ product.type }}</p>
          </div>
          
          <div class="rating-price-row">
            <div class="rating-badge">
              <ion-icon :icon="star" class="star-icon"></ion-icon>
              {{ product.rating }}
            </div>
            <div class="price-display">
              <span class="price">${{ product.price }}</span>
              <span class="unit">/ {{ product.unit }}</span>
            </div>
          </div>
        </div>

        <div class="quick-tags">
          <span v-for="tag in product.tags" :key="tag" class="quick-tag">{{ tag }}</span>
        </div>

        <p class="product-description">{{ product.description }}</p>

        <div class="product-meta">
          <div class="meta-box">
            <ion-icon :icon="locationOutline" class="meta-icon"></ion-icon>
            <div>
              <span class="meta-label">Origin</span>
              <span class="meta-value">{{ product.origin }}</span>
            </div>
          </div>
          <div class="meta-box">
            <ion-icon :icon="calendar" class="meta-icon"></ion-icon>
            <div>
              <span class="meta-label">Harvest</span>
              <span class="meta-value">{{ product.harvest }}</span>
            </div>
          </div>
        </div>

        <ion-button expand="block" fill="solid" class="cart-btn">
          <ion-icon :icon="cartOutline" slot="start"></ion-icon>
          Add to Cart
        </ion-button>
      </div>

      <!-- FARMER DETAILS -->
      <div class="section-card farmer-card">
        <div class="section-header">
          <h2 class="section-title">Meet Your Farmer</h2>
        </div>

        <div class="farmer-main">
          <img :src="farmer.photo" :alt="farmer.name" class="farmer-photo" />
          <div class="farmer-details">
            <h3 class="farmer-name">{{ farmer.name }}</h3>
            <p class="farmer-location">
              <ion-icon :icon="locationOutline" class="inline-icon"></ion-icon>
              {{ farmer.location }}
            </p>
          </div>
        </div>

        <div class="farmer-stats-grid">
          <div class="stat-card">
            <span class="stat-number">{{ farmer.farmSize }}</span>
            <span class="stat-text">Farm Size</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">{{ farmer.experience }}</span>
            <span class="stat-text">Experience</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">{{ farmer.certifications }}</span>
            <span class="stat-text">Certifications</span>
          </div>
        </div>

        <div class="story-box">
          <p class="story-text">{{ farmer.story }}</p>
        </div>

        <div class="practices-section">
          <h4 class="practices-title">Sustainable Practices</h4>
          <div class="practices-grid">
            <div v-for="practice in farmer.practices" :key="practice" class="practice-chip">
              <ion-icon :icon="checkmarkCircle" class="check-icon"></ion-icon>
              {{ practice }}
            </div>
          </div>
        </div>
      </div>

      <!-- CARBON SEQUESTRATION -->
      <div class="section-card carbon-card">
        <div class="section-header">
          <h2 class="section-title">Environmental Impact</h2>
        </div>

        <div class="carbon-hero">
          <div class="carbon-big-stat">
            <ion-icon :icon="leafOutline" class="carbon-hero-icon"></ion-icon>
            <div>
              <span class="carbon-hero-number">{{ carbon.sequestered }}</span>
              <span class="carbon-hero-label">CO₂ Sequestered</span>
            </div>
          </div>
          <div class="carbon-big-stat">
            <ion-icon :icon="cloudDownloadOutline" class="carbon-hero-icon"></ion-icon>
            <div>
              <span class="carbon-hero-number">{{ carbon.offset }}</span>
              <span class="carbon-hero-label">Carbon Offset</span>
            </div>
          </div>
        </div>

        <div class="metrics-section">
          <h4 class="subsection-heading">Sustainability Metrics</h4>
          
          <div class="metric-row">
            <div class="metric-info">
              <span class="metric-name">Tree Coverage</span>
              <span class="metric-percent">{{ carbon.treeCoverage }}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-bar" :style="{ width: carbon.treeCoverage + '%' }"></div>
            </div>
          </div>

          <div class="metric-row">
            <div class="metric-info">
              <span class="metric-name">Soil Health</span>
              <span class="metric-percent">{{ carbon.soilHealth }}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-bar" :style="{ width: carbon.soilHealth + '%' }"></div>
            </div>
          </div>

          <div class="metric-row">
            <div class="metric-info">
              <span class="metric-name">Water Conservation</span>
              <span class="metric-percent">{{ carbon.waterConservation }}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-bar" :style="{ width: carbon.waterConservation + '%' }"></div>
            </div>
          </div>
        </div>

        <div class="impact-boxes">
          <div v-for="impact in carbon.impacts" :key="impact.label" class="impact-box">
            <ion-icon :icon="waterOutline" class="impact-icon-new"></ion-icon>
            <span class="impact-number">{{ impact.value }}</span>
            <span class="impact-text">{{ impact.label }}</span>
          </div>
        </div>

        <div class="certifications-box">
          <p class="cert-description">{{ carbon.creditInfo }}</p>
          <div class="cert-list">
            <span v-for="cert in carbon.certifications" :key="cert" class="cert-chip">
              {{ cert }}
            </span>
          </div>
        </div>
      </div>

      <!-- SPACER -->
      <div class="bottom-spacer"></div>
    </ion-content>







</template>

</app-layout>
</template>

<style scoped>
/* ===== CSS VARIABLES ===== */
:root {
--coffee-dark: #4a2c2a;
--coffee-medium: #6b4226;
--coffee-light: #a87b54;
--cream: #f5f1e8;
--text-dark: #2c1810;
--text-light: #8b7355;
--green: #27ae60;
}

/* ===== HEADER ===== */
.custom-toolbar {
--background: transparent;
--border-width: 0;
padding: 8px 4px;
}

.page-title {
font-size: 18px;
font-weight: 700;
color: var(--coffee-dark);
}

.header-btn {
--color: var(--coffee-dark);
--background: rgba(245, 241, 232, 0.8);
--border-radius: 12px;
margin: 0 4px;
backdrop-filter: blur(10px);
}

/* ===== CONTENT ===== */
.content-bg {
--background: #f2f2f2;
}

/* ===== PRODUCT IMAGE ===== */
.product-image-section {
position: relative;
width: 100%;
height: 240px;
overflow: hidden;
border-radius: 20px;
margin-bottom: 20px;
}

.main-image {
width: 100%;
height: 100%;
object-fit: cover;
}

.image-gradient {
position: absolute;
inset: 0;
background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%);
}

.badge-container {
position: absolute;
bottom: 12px;
left: 12px;
display: flex;
gap: 8px;
}

.badge {
display: flex;
align-items: center;
gap: 4px;
padding: 6px 12px;
border-radius: 20px;
font-size: 12px;
font-weight: 600;
backdrop-filter: blur(10px);
}

.organic-badge {
background: rgba(39, 174, 96, 0.9);
color: white;
}

.verified-badge {
background: rgba(255, 255, 255, 0.9);
color: var(--coffee-dark);
}

.badge-icon {
font-size: 14px;
}

/* ===== INFO CARD ===== */
.info-card {
background: white;
margin: 16px;
padding: 24px;
border-radius: 24px;
border: 1px solid #e0e0e0;
}

.product-main {
margin-bottom: 20px;
}

.product-title-section {
margin-bottom: 12px;
}

.product-name {
font-size: 26px;
font-weight: 700;
color: var(--text-dark);
margin: 0 0 6px 0;
line-height: 1.2;
}

.product-type {
font-size: 14px;
color: var(--text-light);
margin: 0;
}

.rating-price-row {
display: flex;
justify-content: space-between;
align-items: center;
}

.rating-badge {
display: flex;
align-items: center;
gap: 4px;
background: rgba(243, 156, 18, 0.1);
padding: 6px 12px;
border-radius: 12px;
font-size: 15px;
font-weight: 700;
color: var(--coffee-dark);
}

.star-icon {
color: #f39c12;
font-size: 16px;
}

.price-display {
display: flex;
align-items: baseline;
gap: 4px;
}

.price {
font-size: 28px;
font-weight: 700;
color: var(--coffee-dark);
}

.unit {
font-size: 14px;
color: var(--text-light);
}

.quick-tags {
display: flex;
gap: 8px;
margin-bottom: 16px;
}

.quick-tag {
background: rgba(168, 123, 84, 0.1);
color: var(--coffee-medium);
padding: 6px 12px;
border-radius: 12px;
font-size: 12px;
font-weight: 600;
}

.product-description {
font-size: 14px;
color: var(--text-light);
line-height: 1.7;
margin: 0 0 20px 0;
}

.product-meta {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 12px;
margin-bottom: 24px;
}

.meta-box {
display: flex;
gap: 10px;
align-items: flex-start;
}

.meta-icon {
color: var(--coffee-light);
font-size: 20px;
margin-top: 2px;
flex-shrink: 0;
}

.meta-box div {
display: flex;
flex-direction: column;
gap: 2px;
}

.meta-label {
font-size: 11px;
color: var(--text-light);
text-transform: uppercase;
font-weight: 600;
}

.meta-value {
font-size: 13px;
color: var(--text-dark);
font-weight: 600;
}

.cart-btn {
--background: var(--coffee-dark);
--color: var(--cream);
--border-radius: 16px;
--border-style: solid;
--border-width: 2px;
--border-color: var(--coffee-medium);
height: 52px;
font-weight: 600;
font-size: 15px;
}

.cart-btn:active {
transform: scale(0.98);
}

/* ===== SECTION CARDS ===== */
.section-card {
background: white;
margin: 0 16px 16px;
padding: 24px;
border-radius: 24px;
border: 1px solid #e0e0e0;
}

.section-header {
margin-bottom: 20px;
padding-bottom: 16px;
border-bottom: 1px solid #f0f0f0;
}

.section-title {
font-size: 20px;
font-weight: 700;
color: var(--text-dark);
margin: 0;
}

/* ===== FARMER SECTION ===== */
.farmer-main {
display: flex;
gap: 16px;
align-items: center;
margin-bottom: 20px;
}

.farmer-photo {
width: 70px;
height: 70px;
border-radius: 50%;
object-fit: cover;
border: 3px solid var(--cream);
}

.farmer-details {
flex: 1;
}

.farmer-name {
font-size: 18px;
font-weight: 700;
color: var(--text-dark);
margin: 0 0 6px 0;
}

.farmer-location {
font-size: 13px;
color: var(--text-light);
margin: 0;
display: flex;
align-items: center;
gap: 4px;
}

.inline-icon {
font-size: 14px;
}

.farmer-stats-grid {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 12px;
margin-bottom: 20px;
}

.stat-card {
text-align: center;
padding: 16px;
background: rgba(168, 123, 84, 0.06);
border-radius: 16px;
display: flex;
flex-direction: column;
gap: 4px;
}

.stat-number {
font-size: 18px;
font-weight: 700;
color: var(--coffee-dark);
}

.stat-text {
font-size: 11px;
color: var(--text-light);
text-transform: uppercase;
font-weight: 600;
}

.story-box {
margin-bottom: 20px;
}

.story-text {
font-size: 14px;
color: var(--text-light);
line-height: 1.7;
margin: 0;
}

.practices-section {
padding: 20px;
background: rgba(39, 174, 96, 0.05);
border-radius: 16px;
}

.practices-title {
font-size: 15px;
font-weight: 700;
color: var(--text-dark);
margin: 0 0 16px 0;
}

.practices-grid {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 10px;
}

.practice-chip {
display: flex;
align-items: center;
gap: 8px;
font-size: 12px;
color: var(--text-dark);
font-weight: 500;
padding: 8px 12px;
background: white;
border-radius: 12px;
}

.check-icon {
color: var(--green);
font-size: 16px;
flex-shrink: 0;
}

/* ===== CARBON SECTION ===== */
.carbon-hero {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 12px;
margin-bottom: 24px;
}

.carbon-big-stat {
display: flex;
gap: 12px;
padding: 20px;
background: rgba(39, 174, 96, 0.08);
border-radius: 16px;
align-items: center;
}

.carbon-hero-icon {
font-size: 32px;
color: var(--green);
flex-shrink: 0;
}

.carbon-hero-number {
display: block;
font-size: 20px;
font-weight: 700;
color: var(--coffee-dark);
margin-bottom: 2px;
}

.carbon-hero-label {
display: block;
font-size: 11px;
color: var(--text-light);
font-weight: 600;
text-transform: uppercase;
}

.metrics-section {
margin-bottom: 24px;
}

.subsection-heading {
font-size: 15px;
font-weight: 700;
color: var(--text-dark);
margin: 0 0 16px 0;
}

.metric-row {
margin-bottom: 16px;
}

.metric-info {
display: flex;
justify-content: space-between;
margin-bottom: 8px;
}

.metric-name {
font-size: 13px;
font-weight: 600;
color: var(--text-dark);
}

.metric-percent {
font-size: 14px;
font-weight: 700;
color: var(--green);
}

.progress-track {
height: 8px;
background: rgba(39, 174, 96, 0.15);
border-radius: 10px;
overflow: hidden;
}

.progress-bar {
height: 100%;
background: var(--green);
border-radius: 10px;
transition: width 0.6s ease;
}

.impact-boxes {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 12px;
margin-bottom: 24px;
}

.impact-box {
padding: 20px;
background: rgba(168, 123, 84, 0.06);
border-radius: 16px;
text-align: center;
display: flex;
flex-direction: column;
gap: 6px;
}

.impact-icon-new {
font-size: 28px;
color: var(--coffee-dark);
margin-bottom: 4px;
}

.impact-number {
font-size: 20px;
font-weight: 700;
color: var(--coffee-dark);
}

.impact-text {
font-size: 11px;
color: var(--text-light);
text-transform: uppercase;
font-weight: 600;
}

.certifications-box {
padding: 20px;
background: rgba(39, 174, 96, 0.05);
border-radius: 16px;
}

.cert-description {
font-size: 13px;
color: var(--text-light);
line-height: 1.7;
margin: 0 0 16px 0;
}

.cert-list {
display: flex;
flex-wrap: wrap;
gap: 8px;
}

.cert-chip {
background: white;
color: var(--green);
padding: 8px 14px;
border-radius: 12px;
font-size: 12px;
font-weight: 600;
border: 1.5px solid var(--green);
}

/* ===== SPACER ===== */
.bottom-spacer {
height: 20px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 360px) {
.product-name {
font-size: 22px;
}

.farmer-stats-grid,
.practices-grid,
.carbon-hero,
.impact-boxes {
grid-template-columns: 1fr;
}
}
</style>