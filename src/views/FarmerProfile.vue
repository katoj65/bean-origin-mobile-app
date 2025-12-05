<template>
  <ion-page>
    <!-- HEADER -->
    <ion-header class="ion-no-border">
      <ion-toolbar class="farmer-toolbar">
        <ion-buttons slot="start">
          <ion-button class="header-btn" @click="goBack">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        
        <ion-title class="farmer-title">Farmer Profile</ion-title>
        
        <ion-buttons slot="end">
          <ion-button class="header-btn" @click="shareFarmer">
            <ion-icon :icon="shareOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- CONTENT -->
    <ion-content class="farmer-content">
      <div v-if="farmer" class="content-wrapper">
        
        <!-- FARMER HEADER CARD -->
        <div class="farmer-header-card">
          <div class="farmer-profile-section">
            <div class="farmer-avatar-wrapper">
              <img :src="farmer.photo" :alt="farmer.name" class="farmer-avatar" />
              <div class="verification-badge">
                <ion-icon :icon="checkmarkCircleSharp"></ion-icon>
              </div>
            </div>
            
            <div class="farmer-info">
              <h1 class="farmer-name">{{ farmer.name }}</h1>
              <div class="farmer-location-row">
                <ion-icon :icon="locationSharp"></ion-icon>
                <span>{{ farmer.location }}</span>
              </div>
              <div class="farmer-meta-row">
                <div class="meta-item">
                  <ion-icon :icon="resizeOutline"></ion-icon>
                  <span>{{ farmer.farmSize }}</span>
                </div>
                <div class="meta-divider"></div>
                <div class="meta-item">
                  <ion-icon :icon="leafOutline"></ion-icon>
                  <span>{{ farmer.coffeeVariety }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FARMER STATS -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon production">
              <ion-icon :icon="analyticsOutline"></ion-icon>
            </div>
            <span class="stat-value">{{ farmer.stats.totalProduction }}</span>
            <span class="stat-label">Total Production</span>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon batches">
              <ion-icon :icon="cubeOutline"></ion-icon>
            </div>
            <span class="stat-value">{{ farmer.stats.activeBatches }}</span>
            <span class="stat-label">Active Batches</span>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon sustainability">
              <ion-icon :icon="leafSharp"></ion-icon>
            </div>
            <span class="stat-value">{{ farmer.stats.sustainabilityScore }}%</span>
            <span class="stat-label">Sustainability</span>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon experience">
              <ion-icon :icon="timeOutline"></ion-icon>
            </div>
            <span class="stat-value">{{ farmer.stats.yearsExperience }}+</span>
            <span class="stat-label">Years Experience</span>
          </div>
        </div>

        <!-- ABOUT THE FARMER -->
        <div class="about-card">
          <h2 class="section-title">About {{ farmer.name.split(' ')[0] }}</h2>
          <p class="about-text">{{ farmer.about }}</p>
          
          <div class="farming-practices">
            <h3 class="subsection-title">Farming Practices</h3>
            <div class="practices-list">
              <div v-for="practice in farmer.practices" :key="practice" class="practice-item">
                <ion-icon :icon="checkmarkCircleOutline" class="practice-icon"></ion-icon>
                <span>{{ practice }}</span>
              </div>
            </div>
          </div>

          <div class="certifications-section">
            <h3 class="subsection-title">Certifications</h3>
            <div class="certifications-grid">
              <div v-for="cert in farmer.certifications" :key="cert.name" class="cert-badge">
                <span class="cert-icon">{{ cert.icon }}</span>
                <span class="cert-name">{{ cert.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- FARM DETAILS -->
        <div class="farm-details-card">
          <h2 class="section-title">Farm Details</h2>
          
          <div class="details-grid">
            <div class="detail-item">
              <div class="detail-icon-wrapper">
                <ion-icon :icon="layersOutline"></ion-icon>
              </div>
              <div class="detail-content">
                <span class="detail-label">Soil Type</span>
                <span class="detail-value">{{ farmer.farmDetails.soilType }}</span>
              </div>
            </div>

            <div class="detail-item">
              <div class="detail-icon-wrapper">
                <ion-icon :icon="trendingUpOutline"></ion-icon>
              </div>
              <div class="detail-content">
                <span class="detail-label">Altitude</span>
                <span class="detail-value">{{ farmer.farmDetails.altitude }}</span>
              </div>
            </div>

            <div class="detail-item">
              <div class="detail-icon-wrapper">
                <ion-icon :icon="calendarOutline"></ion-icon>
              </div>
              <div class="detail-content">
                <span class="detail-label">Harvest Seasons</span>
                <span class="detail-value">{{ farmer.farmDetails.harvestSeasons }}</span>
              </div>
            </div>

            <div class="detail-item">
              <div class="detail-icon-wrapper">
                <ion-icon :icon="waterOutline"></ion-icon>
              </div>
              <div class="detail-content">
                <span class="detail-label">Processing Method</span>
                <span class="detail-value">{{ farmer.farmDetails.processingMethod }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- GALLERY -->
        <div class="gallery-section">
          <h2 class="section-title">Farm Gallery</h2>
          <div class="gallery-grid">
            <div 
              v-for="(image, index) in farmer.gallery" 
              :key="index"
              class="gallery-item"
              @click="viewImage(index)"
            >
              <img :src="image.url" :alt="image.caption" class="gallery-image" />
              <div class="gallery-overlay">
                <span class="gallery-caption">{{ image.caption }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- INTERACTIVE MAP -->
        <div class="map-section">
          <h2 class="section-title">Farm Location</h2>
          <div class="map-container" @click="openFullMap">
            <div class="map-placeholder">
              <ion-icon :icon="mapSharp"></ion-icon>
              <span class="map-location">{{ farmer.location }}</span>
              <span class="map-coordinates">{{ farmer.coordinates }}</span>
              <button class="map-action-btn">
                <ion-icon :icon="navigateOutline"></ion-icon>
                <span>Get Directions</span>
              </button>
            </div>
          </div>
        </div>

        <!-- SUSTAINABILITY HIGHLIGHTS -->
        <div class="sustainability-card">
          <div class="sustainability-header">
            <h2 class="section-title">Sustainability Highlights</h2>
            <div class="sustainability-score-badge">
              <ion-icon :icon="leafSharp"></ion-icon>
              <span>{{ farmer.stats.sustainabilityScore }}%</span>
            </div>
          </div>

          <div class="sustainability-metrics">
            <div class="metric-item">
              <div class="metric-icon carbon">
                <ion-icon :icon="cloudOutline"></ion-icon>
              </div>
              <div class="metric-content">
                <span class="metric-label">Carbon Footprint</span>
                <span class="metric-value">{{ farmer.sustainability.carbonFootprint }}</span>
                <div class="metric-bar">
                  <div class="metric-fill" :style="{ width: '75%' }"></div>
                </div>
              </div>
            </div>

            <div class="metric-item">
              <div class="metric-icon trees">
                <ion-icon :icon="leafSharp"></ion-icon>
              </div>
              <div class="metric-content">
                <span class="metric-label">Trees Planted</span>
                <span class="metric-value">{{ farmer.sustainability.treesPlanted }} trees</span>
                <div class="metric-bar">
                  <div class="metric-fill" :style="{ width: '90%' }"></div>
                </div>
              </div>
            </div>

            <div class="metric-item">
              <div class="metric-icon water">
                <ion-icon :icon="waterSharp"></ion-icon>
              </div>
              <div class="metric-content">
                <span class="metric-label">Water Conservation</span>
                <span class="metric-value">{{ farmer.sustainability.waterConservation }}</span>
                <div class="metric-bar">
                  <div class="metric-fill" :style="{ width: '85%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="action-buttons-section">
          <button class="action-btn primary" @click="tipFarmer">
            <ion-icon :icon="giftOutline"></ion-icon>
            <span>Tip Farmer</span>
          </button>
          
          <button class="action-btn secondary" @click="connectFarmer">
            <ion-icon :icon="personAddOutline"></ion-icon>
            <span>Connect</span>
          </button>
          
          <button class="action-btn secondary" @click="viewBatches">
            <ion-icon :icon="cubeOutline"></ion-icon>
            <span>View Batches</span>
          </button>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonIcon,
} from "@ionic/vue";
import {
  arrowBackOutline,
  shareOutline,
  locationSharp,
  checkmarkCircleSharp,
  resizeOutline,
  leafOutline,
  leafSharp,
  analyticsOutline,
  cubeOutline,
  timeOutline,
  checkmarkCircleOutline,
  layersOutline,
  trendingUpOutline,
  calendarOutline,
  waterOutline,
  waterSharp,
  mapSharp,
  navigateOutline,
  cloudOutline,
  giftOutline,
  personAddOutline,
} from "ionicons/icons";

const router = useRouter();

const farmer = reactive({
  id: 1,
  name: 'Alem Bekele',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  location: 'Yirgacheffe, Gedeo Zone, Ethiopia',
  coordinates: '6.1667°N, 38.2000°E',
  farmSize: '5.2 hectares',
  coffeeVariety: 'Arabica Heirloom',
  stats: {
    totalProduction: '2,450 kg',
    activeBatches: 12,
    sustainabilityScore: 92,
    yearsExperience: 15
  },
  about: 'Alem has been cultivating coffee in the highlands of Yirgacheffe for over 15 years. His farm is situated at an optimal altitude for growing premium Arabica coffee, and he has mastered the art of natural processing. Alem is committed to sustainable farming practices and works closely with local cooperatives to ensure fair trade and environmental conservation.',
  practices: [
    'Organic farming methods',
    'Shade-grown coffee cultivation',
    'Natural composting and fertilization',
    'Integrated pest management',
    'Water conservation techniques'
  ],
  certifications: [
    { name: 'Organic', icon: '🌱' },
    { name: 'Fair Trade', icon: '🤝' },
    { name: 'Rainforest Alliance', icon: '🌳' },
    { name: 'UTZ Certified', icon: '✓' }
  ],
  farmDetails: {
    soilType: 'Volcanic Loam',
    altitude: '1,800 - 2,200m',
    harvestSeasons: 'Nov - Feb, May - Aug',
    processingMethod: 'Natural & Washed'
  },
  gallery: [
    { url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400', caption: 'Coffee Trees' },
    { url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400', caption: 'Harvest Season' },
    { url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400', caption: 'Processing' },
    { url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400', caption: 'Drying Beds' }
  ],
  sustainability: {
    carbonFootprint: 'Low Impact',
    treesPlanted: 450,
    waterConservation: 'Drip Irrigation'
  }
});

const goBack = () => {
  router.back();
};

const shareFarmer = () => {
  console.log('Share farmer profile');
};

const viewImage = (index) => {
  console.log('View image:', index);
};

const openFullMap = () => {
  console.log('Open full map');
};

const tipFarmer = () => {
  console.log('Tip farmer');
};

const connectFarmer = () => {
  console.log('Connect with farmer');
};

const viewBatches = () => {
  console.log('View batches');
};
</script>

<style scoped>
/* ===== VARIABLES ===== */
:root {
  --bean-primary: #6b4226;
  --bean-secondary: #3d2317;
  --bean-accent: #d4a574;
  --bean-light: #f5f1ed;
  --bean-cream: #faf8f5;
  --text-dark: #2d1810;
  --text-medium: #5d4e46;
  --text-light: #8b7c74;
  --orange: #ff9800;
  --green: #27ae60;
  --blue: #3b82f6;
  --red: #ef4444;
}

/* ===== HEADER ===== */
.farmer-toolbar {
  --background: var(--bean-cream);
  --border-width: 0;
  padding: 8px 4px;
  box-shadow: 0 2px 8px rgba(107, 66, 38, 0.06);
}

.farmer-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-dark);
  letter-spacing: -0.2px;
}

.header-btn {
  --background: rgba(107, 66, 38, 0.08);
  --color: var(--text-dark);
  width: 44px;
  height: 44px;
  margin: 4px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.header-btn:active {
  transform: scale(0.92);
}

/* ===== CONTENT ===== */
.farmer-content {
  --background: var(--bean-cream);
}

.content-wrapper {
  padding: 0 0 100px;
}

/* ===== FARMER HEADER CARD ===== */
.farmer-header-card {
  margin: 0 20px 20px;
  padding: 24px;
  background: white;
  border-radius: 28px;
  box-shadow: 0 4px 16px rgba(107, 66, 38, 0.08);
  animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.farmer-profile-section {
  display: flex;
  gap: 18px;
}

.farmer-avatar-wrapper {
  position: relative;
  width: 90px;
  height: 90px;
  flex-shrink: 0;
}

.farmer-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--bean-light);
  box-shadow: 0 4px 12px rgba(107, 66, 38, 0.15);
}

.verification-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.verification-badge ion-icon {
  font-size: 16px;
  color: white;
}

.farmer-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.farmer-name {
  font-size: 24px;
  font-weight: 900;
  color: var(--text-dark);
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.4px;
}

.farmer-location-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-medium);
}

.farmer-location-row ion-icon {
  font-size: 16px;
  color: var(--bean-primary);
}

.farmer-meta-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-dark);
}

.meta-item ion-icon {
  font-size: 16px;
  color: var(--bean-accent);
}

.meta-divider {
  width: 1px;
  height: 16px;
  background: rgba(107, 66, 38, 0.2);
}

/* ===== STATS GRID ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 0 20px 20px;
  animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s backwards;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 16px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(107, 66, 38, 0.08);
}

.stat-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 4px;
}

.stat-icon ion-icon {
  font-size: 28px;
  color: white;
}

.stat-icon.production {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.stat-icon.batches {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.stat-icon.sustainability {
  background: linear-gradient(135deg, #27ae60, #229954);
}

.stat-icon.experience {
  background: linear-gradient(135deg, #ff9800, #f57c00);
}

.stat-value {
  font-size: 22px;
  font-weight: 900;
  color: var(--text-dark);
  line-height: 1;
  letter-spacing: -0.3px;
}

.stat-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-light);
  text-align: center;
  line-height: 1.3;
}

/* ===== ABOUT CARD ===== */
.about-card {
  margin: 0 20px 20px;
  padding: 24px;
  background: white;
  border-radius: 28px;
  box-shadow: 0 4px 16px rgba(107, 66, 38, 0.08);
  animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards;
}

.section-title {
  font-size: 20px;
  font-weight: 900;
  color: var(--text-dark);
  margin: 0 0 16px 0;
  letter-spacing: -0.3px;
}

.about-text {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-medium);
  margin: 0 0 24px 0;
  font-weight: 500;
}

.farming-practices {
  margin-bottom: 24px;
}

.subsection-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--text-dark);
  margin: 0 0 14px 0;
  letter-spacing: -0.2px;
}

.practices-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.practice-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.08), rgba(39, 174, 96, 0.05));
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
}

.practice-icon {
  font-size: 20px;
  color: var(--green);
  flex-shrink: 0;
}

.certifications-section {
  padding-top: 24px;
  border-top: 1px solid rgba(107, 66, 38, 0.08);
}

.certifications-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.cert-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.06), rgba(107, 66, 38, 0.04));
  border-radius: 16px;
}

.cert-icon {
  font-size: 32px;
}

.cert-name {
  font-size: 12px;
  font-weight: 800;
  color: var(--text-dark);
  text-align: center;
  line-height: 1.3;
}

/* ===== FARM DETAILS CARD ===== */
.farm-details-card {
  margin: 0 20px 20px;
  padding: 24px;
  background: white;
  border-radius: 28px;
  box-shadow: 0 4px 16px rgba(107, 66, 38, 0.08);
  animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s backwards;
}

.details-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(245, 241, 237, 0.6), rgba(235, 228, 220, 0.4));
  border-radius: 16px;
}

.detail-icon-wrapper {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(107, 66, 38, 0.1);
}

.detail-icon-wrapper ion-icon {
  font-size: 22px;
  color: var(--bean-primary);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.detail-label {
  font-size: 11px;
  font-weight: 800;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 15px;
  font-weight: 800;
  color: var(--text-dark);
}

/* ===== GALLERY SECTION ===== */
.gallery-section {
  margin: 0 20px 20px;
  animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s backwards;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.gallery-item {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f1ed, #ebe4dc);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(107, 66, 38, 0.08);
}

.gallery-item:active {
  transform: scale(0.97);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  display: flex;
  align-items: flex-end;
}

.gallery-caption {
  font-size: 12px;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* ===== MAP SECTION ===== */
.map-section {
  margin: 0 20px 20px;
  animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.5s backwards;
}

.map-container {
  width: 100%;
  height: 240px;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #e3f2fd, #e8f5e9);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(107, 66, 38, 0.08);
}

.map-container:active {
  transform: scale(0.98);
}

.map-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 24px;
}

.map-placeholder > ion-icon {
  font-size: 64px;
  color: var(--bean-primary);
  margin-bottom: 8px;
}

.map-location {
  font-size: 16px;
  font-weight: 800;
  color: var(--text-dark);
  text-align: center;
}

.map-coordinates {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-light);
}

.map-action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #6b4226, #3d2317);
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(107, 66, 38, 0.25);
}

.map-action-btn:active {
  transform: scale(0.95);
}

.map-action-btn ion-icon {
  font-size: 20px;
}

/* ===== SUSTAINABILITY CARD ===== */
.sustainability-card {
  margin: 0 20px 20px;
  padding: 24px;
  background: white;
  border-radius: 28px;
  box-shadow: 0 4px 16px rgba(107, 66, 38, 0.08);
  animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s backwards;
}

.sustainability-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.sustainability-score-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.15), rgba(39, 174, 96, 0.10));
  border-radius: 14px;
  font-size: 16px;
  font-weight: 900;
  color: var(--green);
}

.sustainability-score-badge ion-icon {
  font-size: 20px;
}

.sustainability-metrics {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.metric-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.metric-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
}

.metric-icon ion-icon {
  font-size: 24px;
  color: white;
}

.metric-icon.carbon {
  background: linear-gradient(135deg, #64748b, #475569);
}

.metric-icon.trees {
  background: linear-gradient(135deg, #27ae60, #229954);
}

.metric-icon.water {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.metric-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.metric-label {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-dark);
  letter-spacing: 0.2px;
}

.metric-value {
  font-size: 16px;
  font-weight: 900;
  color: var(--bean-primary);
}

.metric-bar {
  width: 100%;
  height: 6px;
  background: rgba(107, 66, 38, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 2px;
}

.metric-fill {
  height: 100%;
  background: linear-gradient(135deg, var(--bean-primary), var(--bean-secondary));
  border-radius: 10px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ===== ACTION BUTTONS ===== */
.action-buttons-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin: 0 20px 20px;
  animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.7s backwards;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.3px;
}

.action-btn:active {
  transform: scale(0.97);
}

.action-btn ion-icon {
  font-size: 24px;
}

.action-btn.primary {
  background: linear-gradient(135deg, #6b4226, #3d2317);
  color: white;
  box-shadow: 0 6px 16px rgba(107, 66, 38, 0.25);
}

.action-btn.secondary {
  background: white;
  color: var(--text-dark);
  box-shadow: 0 4px 16px rgba(107, 66, 38, 0.08);
}

.action-btn.secondary ion-icon {
  color: var(--bean-primary);
}

/* ===== RESPONSIVE ===== */
@media (min-width: 480px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .certifications-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .action-buttons-section {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) {
  .content-wrapper {
    max-width: 700px;
    margin: 0 auto;
  }
}
</style>