<template>
  <ion-page>
    <!-- HEADER -->
    <ion-header class="ion-no-border" translucent>
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-button class="menu-btn">
            <ion-icon :icon="menuOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="app-title">Bean Origin</ion-title>
        <ion-buttons slot="end">
          <ion-button class="notif-btn" @click="openNotifications">
            <ion-icon :icon="notificationsOutline"></ion-icon>
            <span class="notif-badge" v-if="hasNotifications">3</span>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="content-bg">






      <!-- USER PROFILE CARD -->
      <div class="profile-section">
        <div class="profile-card">
          <div class="profile-background">
            <div class="profile-pattern"></div>
          </div>
          <div class="profile-content">
            <div class="profile-header">
              <div class="avatar-section">
                <div class="avatar-wrapper">
                  <img :src="user.avatar" :alt="user.name" class="user-avatar" />
                  <div class="online-status"></div>
                </div>
                <div class="level-badge-container">
                  <div class="level-badge">
                    <ion-icon :icon="starOutline" class="star-icon"></ion-icon>
                    <span class="level-text">{{ user.level }}</span>
                  </div>
                  <span class="level-label">Coffee Master</span>
                </div>
              </div>
              <ion-button fill="clear" class="settings-icon-btn" @click="openSettings">
                <ion-icon :icon="settingsOutline"></ion-icon>
              </ion-button>
            </div>

            <div class="profile-info">
              <h2 class="profile-name">{{ user.name }}</h2>
              <p class="profile-email">{{ user.email }}</p>
              <div class="profile-meta">
                <span class="meta-badge">
                  <ion-icon :icon="locationOutline"></ion-icon>
                  {{ user.location }}
                </span>
                <span class="meta-badge">
                  <ion-icon :icon="calendarOutline"></ion-icon>
                  {{ user.memberSince }}
                </span>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="stats-grid">
              <div class="stat-card purple-card">
                <div class="stat-icon-box">
                  <ion-icon :icon="bagHandleOutline" class="stat-icon"></ion-icon>
                </div>
                <div class="stat-info">
                  <span class="stat-number">{{ user.stats.orders }}</span>
                  <span class="stat-label">Total Orders</span>
                </div>
                <div class="stat-trend up">
                  <ion-icon :icon="trendingUpOutline"></ion-icon>
                  <span>12%</span>
                </div>
              </div>

              <div class="stat-card gold-card">
                <div class="stat-icon-box">
                  <ion-icon :icon="trophyOutline" class="stat-icon"></ion-icon>
                </div>
                <div class="stat-info">
                  <span class="stat-number">{{ user.stats.points }}</span>
                  <span class="stat-label">Reward Points</span>
                </div>
                <div class="stat-trend up">
                  <ion-icon :icon="trendingUpOutline"></ion-icon>
                  <span>8%</span>
                </div>
              </div>

              <div class="stat-card red-card">
                <div class="stat-icon-box">
                  <ion-icon :icon="heartOutline" class="stat-icon"></ion-icon>
                </div>
                <div class="stat-info">
                  <span class="stat-number">{{ user.stats.favorites }}</span>
                  <span class="stat-label">Favorites</span>
                </div>
                <div class="stat-badge">
                  <ion-icon :icon="flameOutline"></ion-icon>
                </div>
              </div>

              <div class="stat-card green-card">
                <div class="stat-icon-box">
                  <ion-icon :icon="leafOutline" class="stat-icon"></ion-icon>
                </div>
                <div class="stat-info">
                  <span class="stat-number">{{ user.stats.co2Saved }}</span>
                  <span class="stat-label">CO₂ Saved</span>
                </div>
                <div class="stat-badge eco">
                  <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>







      

      <!-- FEATURED BANNER -->
      <div class="banner-section">
        <div class="featured-banner" @click="handleAdvertClick">
          <img :src="advertisement.image" :alt="advertisement.title" class="banner-bg-image" />
          <div class="banner-overlay"></div>
          <div class="banner-content">
            <span class="banner-tag">{{ advertisement.badge }}</span>
            <h3 class="banner-title">{{ advertisement.title }}</h3>
            <p class="banner-text">{{ advertisement.description }}</p>
            <ion-button fill="solid" class="banner-cta">
              {{ advertisement.buttonText }}
              <ion-icon :icon="arrowForwardOutline" slot="end"></ion-icon>
            </ion-button>
          </div>
        </div>
      </div>

      <!-- QUICK ACTIONS TILES -->
      <div class="actions-section">
        <div class="section-header">
          <h3 class="section-title">Quick Actions</h3>
          <span class="section-subtitle">Explore what you can do</span>
        </div>
        
        <div class="actions-grid">
          <div 
            v-for="tile in tiles" 
            :key="tile.id"
            :class="['action-tile', tile.colorClass]"
            @click="navigateToTile(tile)">
            <div class="tile-header">
              <div class="tile-icon-wrapper">
                <ion-icon :icon="tile.icon" class="tile-icon"></ion-icon>
              </div>
              <div class="tile-badge" v-if="tile.badge">{{ tile.badge }}</div>
            </div>
            <div class="tile-body">
              <h4 class="tile-title">{{ tile.title }}</h4>
              <p class="tile-description">{{ tile.description }}</p>
            </div>
            <div class="tile-footer">
              <ion-icon :icon="arrowForwardOutline" class="tile-arrow"></ion-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- SPACER -->
      <div class="bottom-spacer"></div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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
  menuOutline,
  settingsOutline,
  notificationsOutline,
  starOutline,
  locationOutline,
  calendarOutline,
  bagHandleOutline,
  trophyOutline,
  heartOutline,
  leafOutline,
  trendingUpOutline,
  flameOutline,
  checkmarkCircleOutline,
  arrowForwardOutline,
  cafeOutline,
  qrCodeOutline,
  peopleOutline,
  cardOutline,
} from "ionicons/icons";

const router = useRouter();

const hasNotifications = ref(true);

const user = ref({
  name: "Joshua Martinez",
  email: "joshua.martinez@email.com",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  location: "Kampala, UG",
  memberSince: "Jan 2024",
  level: 5,
  stats: {
    orders: "24",
    points: "1,250",
    favorites: "18",
    co2Saved: "45kg"
  }
});

const advertisement = ref({
  image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
  badge: "🔥 Hot Deal",
  title: "50% Off Premium Beans",
  description: "Limited time offer on Ethiopian Yirgacheffe",
  buttonText: "Shop Now"
});

const tiles = ref([
  {
    id: 1,
    title: "Shop Coffee",
    description: "Premium beans worldwide",
    icon: bagHandleOutline,
    colorClass: "brown",
    route: "/shop",
    badge: "New"
  },
  {
    id: 2,
    title: "Scan QR",
    description: "Verify authenticity",
    icon: qrCodeOutline,
    colorClass: "orange",
    route: "/scan",
    badge: null
  },
  {
    id: 3,
    title: "Nearby Cafés",
    description: "Find local spots",
    icon: cafeOutline,
    colorClass: "purple",
    route: "/cafes",
    badge: "12"
  },
  {
    id: 4,
    title: "Carbon Credit",
    description: "Track your impact",
    icon: leafOutline,
    colorClass: "green",
    route: "/carbon",
    badge: null
  },
  {
    id: 5,
    title: "Community",
    description: "Connect & share",
    icon: peopleOutline,
    colorClass: "blue",
    route: "/community",
    badge: "Hot"
  },
  {
    id: 6,
    title: "My Rewards",
    description: "Exclusive benefits",
    icon: cardOutline,
    colorClass: "gold",
    route: "/rewards",
    badge: null
  }
]);

const openNotifications = () => {
  console.log('Open notifications');
};

const openSettings = () => {
  console.log('Open settings');
};

const handleAdvertClick = () => {
  console.log('Advertisement clicked');
};

const navigateToTile = (tile) => {
  console.log('Navigate to:', tile.route);
  // router.push(tile.route);
};
</script>

<style scoped>
/* ===== CSS VARIABLES ===== */
:root {
  --coffee-dark: #4a2c2a;
  --coffee-medium: #6b4226;
  --coffee-light: #a87b54;
  --text-dark: #2c1810;
  --text-light: #8b7355;
  --brown: #6b4226;
  --orange: #ff9800;
  --purple: #9c27b0;
  --green: #27ae60;
  --blue: #2196f3;
  --gold: #ffd700;
  --red: #ef4444;
}

/* ===== HEADER ===== */
.custom-toolbar {
  --background: white;
  --border-width: 0;
  padding: 8px 4px;
}

.menu-btn {
  --color: var(--coffee-dark);
  margin: 0 4px;
}

.app-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.notif-btn {
  --color: var(--coffee-dark);
  margin: 0 4px;
  position: relative;
}

.notif-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--red);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 10px;
  min-width: 16px;
  text-align: center;
}

/* ===== CONTENT ===== */
.content-bg {
  --background: #f2f2f2;
}

/* ===== PROFILE SECTION ===== */
.profile-section {
  padding: 16px;
  margin-bottom: 16px;
}

.profile-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  position: relative;
}

.profile-background {
  height: 80px;
  background: linear-gradient(135deg, var(--coffee-medium) 0%, var(--coffee-light) 100%);
  position: relative;
  overflow: hidden;
}

.profile-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

.profile-content {
  padding: 0 20px 24px;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: -40px;
  margin-bottom: 16px;
}

.avatar-section {
  display: flex;
  align-items: flex-end;
  gap: 12px;
}

.avatar-wrapper {
  position: relative;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  object-fit: cover;
}

.online-status {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  background: var(--green);
  border-radius: 50%;
  border: 3px solid white;
}

.level-badge-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
}

.level-badge {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  padding: 6px 12px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 8px rgba(251, 191, 36, 0.3);
}

.star-icon {
  font-size: 14px;
  color: white;
}

.level-text {
  font-size: 13px;
  font-weight: 700;
  color: white;
}

.level-label {
  font-size: 10px;
  color: var(--text-light);
  font-weight: 600;
  text-align: center;
}

.settings-icon-btn {
  --color: var(--text-light);
  --background: rgba(0, 0, 0, 0.04);
  --border-radius: 12px;
  margin: 0;
  width: 40px;
  height: 40px;
}

.profile-info {
  margin-bottom: 20px;
}

.profile-name {
  font-size: 24px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 4px 0;
}

.profile-email {
  font-size: 14px;
  color: var(--text-light);
  margin: 0 0 12px 0;
}

.profile-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.meta-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(168, 123, 84, 0.1);
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--coffee-dark);
}

.meta-badge ion-icon {
  font-size: 14px;
  color: var(--coffee-light);
}

/* ===== STATS GRID ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat-card {
  background: white;
  padding: 16px;
  border-radius: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border: 2px solid;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  background: currentColor;
  opacity: 0.05;
  border-radius: 0 0 0 100%;
}

.purple-card {
  border-color: rgba(156, 39, 176, 0.2);
  color: var(--purple);
}

.gold-card {
  border-color: rgba(255, 215, 0, 0.3);
  color: var(--gold);
}

.red-card {
  border-color: rgba(239, 68, 68, 0.2);
  color: var(--red);
}

.green-card {
  border-color: rgba(39, 174, 96, 0.2);
  color: var(--green);
}

.stat-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: currentColor;
  opacity: 0.12;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon {
  font-size: 22px;
  color: currentColor;
  opacity: 8;
  position: relative;
}

.stat-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-number {
  font-size: 20px;
  font-weight: 700;
  color: var(--coffee-dark);
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  color: var(--text-light);
  font-weight: 600;
}

.stat-trend {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 10px;
  font-weight: 700;
  color: var(--green);
}

.stat-trend ion-icon {
  font-size: 12px;
}

.stat-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 16px;
  color: currentColor;
  opacity: 0.6;
}

/* ===== BANNER SECTION ===== */
.banner-section {
  padding: 0 16px 20px;
}

.featured-banner {
  position: relative;
  height: 180px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.featured-banner:active {
  transform: scale(0.98);
}

.banner-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%);
}

.banner-content {
  position: absolute;
  inset: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: white;
}

.banner-tag {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
  width: fit-content;
  margin-bottom: 8px;
}

.banner-title {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 6px 0;
  line-height: 1.2;
}

.banner-text {
  font-size: 13px;
  margin: 0 0 12px 0;
  opacity: 0.95;
}

.banner-cta {
  --background: white;
  --color: var(--coffee-dark);
  --border-radius: 12px;
  height: 40px;
  font-weight: 700;
  font-size: 13px;
  width: fit-content;
}

/* ===== ACTIONS SECTION ===== */
.actions-section {
  padding: 0 16px 24px;
}

.section-header {
  margin-bottom: 16px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 4px 0;
}

.section-subtitle {
  font-size: 13px;
  color: var(--text-light);
  font-weight: 500;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.action-tile {
  background: white;
  padding: 18px 16px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 130px;
  position: relative;
}

.action-tile:active {
  transform: scale(0.97);
}

.tile-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.tile-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-tile.brown .tile-icon-wrapper {
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.12), rgba(107, 66, 38, 0.18));
}

.action-tile.orange .tile-icon-wrapper {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.12), rgba(255, 152, 0, 0.18));
}

.action-tile.purple .tile-icon-wrapper {
  background: linear-gradient(135deg, rgba(156, 39, 176, 0.12), rgba(156, 39, 176, 0.18));
}

.action-tile.green .tile-icon-wrapper {
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.12), rgba(39, 174, 96, 0.18));
}

.action-tile.blue .tile-icon-wrapper {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.12), rgba(33, 150, 243, 0.18));
}

.action-tile.gold .tile-icon-wrapper {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.18), rgba(255, 215, 0, 0.25));
}

.tile-icon {
  font-size: 24px;
}

.action-tile.brown .tile-icon { color: var(--brown); }
.action-tile.orange .tile-icon { color: var(--orange); }
.action-tile.purple .tile-icon { color: var(--purple); }
.action-tile.green .tile-icon { color: var(--green); }
.action-tile.blue .tile-icon { color: var(--blue); }
.action-tile.gold .tile-icon { color: var(--gold); }

.tile-badge {
  background: var(--red);
  color: white;
  font-size: 9px;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 8px;
  text-transform: uppercase;
}

.tile-body {
  flex: 1;
}

.tile-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 4px 0;
}

.tile-description {
  font-size: 12px;
  color: var(--text-light);
  margin: 0;
  line-height: 1.4;
}

.tile-footer {
  display: flex;
  justify-content: flex-end;
}

.tile-arrow {
  font-size: 18px;
  color: var(--text-light);
}

/* ===== SPACER ===== */
.bottom-spacer {
  height: 30px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 360px) {
  .stats-grid,
  .actions-grid {
    grid-template-columns: 1fr;
  }
}
</style>