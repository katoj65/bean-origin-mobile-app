<template>
  <app-layout title="Profile">
    <template #content>
      <div class="profile-details-page">
        
        <!-- Profile Header -->
        <div class="profile-header">
          <div class="avatar-section">
            <ion-avatar class="profile-avatar">
              <img :src="userProfile.avatar || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200'" alt="User Avatar" />
            </ion-avatar>
            <button class="edit-avatar-btn">
              <ion-icon :icon="cameraOutline"></ion-icon>
            </button>
          </div>
          <h1 class="profile-name">{{ userProfile.name }}</h1>
          <p class="profile-email">{{ userProfile.email }}</p>
          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-value">{{ userProfile.orders }}</span>
              <span class="stat-label">Orders</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">{{ userProfile.points }}</span>
              <span class="stat-label">Points</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">{{ userProfile.reviews }}</span>
              <span class="stat-label">Reviews</span>
            </div>
          </div>
        </div>

        <!-- Profile Information -->
        <div class="profile-section">
          <h2 class="section-title">Personal Information</h2>
          
          <div class="info-card">
            <ion-icon :icon="personOutline" class="info-icon"></ion-icon>
            <div class="info-content">
              <span class="info-label">Full Name</span>
              <span class="info-value">{{ userProfile.name }}</span>
            </div>
            <button class="edit-btn">
              <ion-icon :icon="createOutline"></ion-icon>
            </button>
          </div>

          <div class="info-card">
            <ion-icon :icon="mailOutline" class="info-icon"></ion-icon>
            <div class="info-content">
              <span class="info-label">Email</span>
              <span class="info-value">{{ userProfile.email }}</span>
            </div>
            <button class="edit-btn">
              <ion-icon :icon="createOutline"></ion-icon>
            </button>
          </div>

          <div class="info-card">
            <ion-icon :icon="callOutline" class="info-icon"></ion-icon>
            <div class="info-content">
              <span class="info-label">Phone</span>
              <span class="info-value">{{ userProfile.phone || 'Not provided' }}</span>
            </div>
            <button class="edit-btn">
              <ion-icon :icon="createOutline"></ion-icon>
            </button>
          </div>

          <div class="info-card">
            <ion-icon :icon="locationOutline" class="info-icon"></ion-icon>
            <div class="info-content">
              <span class="info-label">Address</span>
              <span class="info-value">{{ userProfile.address || 'Not provided' }}</span>
            </div>
            <button class="edit-btn">
              <ion-icon :icon="createOutline"></ion-icon>
            </button>
          </div>
        </div>

        <!-- Preferences -->
        <div class="profile-section">
          <h2 class="section-title">Preferences</h2>
          
          <div class="preference-card">
            <div class="preference-header">
              <ion-icon :icon="cafeOutline" class="preference-icon"></ion-icon>
              <div>
                <h3 class="preference-title">Favorite Coffee Type</h3>
                <p class="preference-subtitle">Your go-to choice</p>
              </div>
            </div>
            <span class="preference-value">{{ userProfile.favoriteCoffee || 'Not set' }}</span>
          </div>

          <div class="preference-card">
            <div class="preference-header">
              <ion-icon :icon="flameOutline" class="preference-icon"></ion-icon>
              <div>
                <h3 class="preference-title">Preferred Roast Level</h3>
                <p class="preference-subtitle">How you like it roasted</p>
              </div>
            </div>
            <span class="preference-value">{{ userProfile.preferredRoast || 'Not set' }}</span>
          </div>

          <div class="preference-card">
            <div class="preference-header">
              <ion-icon :icon="notificationsOutline" class="preference-icon"></ion-icon>
              <div>
                <h3 class="preference-title">Notifications</h3>
                <p class="preference-subtitle">Get updates about orders</p>
              </div>
            </div>
            <ion-toggle :checked="userProfile.notifications" color="primary"></ion-toggle>
          </div>
        </div>

        <!-- Account Actions -->
        <div class="profile-section">
          <h2 class="section-title">Account</h2>
          
          <button class="action-btn primary">
            <ion-icon :icon="lockClosedOutline"></ion-icon>
            <span>Change Password</span>
            <ion-icon :icon="chevronForwardOutline" class="arrow"></ion-icon>
          </button>

          <button class="action-btn">
            <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
            <span>Privacy Settings</span>
            <ion-icon :icon="chevronForwardOutline" class="arrow"></ion-icon>
          </button>

          <button class="action-btn">
            <ion-icon :icon="helpCircleOutline"></ion-icon>
            <span>Help & Support</span>
            <ion-icon :icon="chevronForwardOutline" class="arrow"></ion-icon>
          </button>

          <button class="action-btn danger">
            <ion-icon :icon="logOutOutline"></ion-icon>
            <span>Logout</span>
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
  IonAvatar,
  IonToggle
} from '@ionic/vue';
import {
  personOutline,
  mailOutline,
  callOutline,
  locationOutline,
  cameraOutline,
  createOutline,
  cafeOutline,
  flameOutline,
  notificationsOutline,
  lockClosedOutline,
  shieldCheckmarkOutline,
  helpCircleOutline,
  logOutOutline,
  chevronForwardOutline
} from 'ionicons/icons';

const userProfile = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+256 700 123 456',
  address: '123 Coffee Street, Kampala, Uganda',
  avatar: '',
  orders: 24,
  points: 1250,
  reviews: 8,
  favoriteCoffee: 'Ethiopian Yirgacheffe',
  preferredRoast: 'Medium Roast',
  notifications: true
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
  --red: #ef4444;
}

.profile-details-page {
  background: var(--cream-200);
  min-height: 100vh;
  padding-bottom: 100px;
}

/* ===== PROFILE HEADER ===== */
.profile-header {
  background: white;
  padding: 32px 20px;
  text-align: center;
  margin-bottom: 20px;
}

.avatar-section {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border: 4px solid var(--cream-200);
}

.edit-avatar-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--coffee-600);
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-avatar-btn:active {
  transform: scale(0.95);
}

.edit-avatar-btn ion-icon {
  font-size: 18px;
  color: white;
}

.profile-name {
  font-size: 24px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 4px 0;
  letter-spacing: -0.5px;
}

.profile-email {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-600);
  margin: 0 0 20px 0;
}

.profile-stats {
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
  font-size: 12px;
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
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
}

/* ===== INFO CARD ===== */
.info-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 16px;
  margin-bottom: 12px;
}

.info-icon {
  font-size: 24px;
  color: var(--coffee-600);
  flex-shrink: 0;
}

.info-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 16px;
  font-weight: 600;
  color: #000000;
}

.edit-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--cream-200);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-btn:active {
  transform: scale(0.95);
  background: var(--cream-300);
}

.edit-btn ion-icon {
  font-size: 20px;
  color: var(--coffee-600);
}

/* ===== PREFERENCE CARD ===== */
.preference-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 16px;
  margin-bottom: 12px;
}

.preference-header {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.preference-icon {
  font-size: 28px;
  color: var(--coffee-600);
  flex-shrink: 0;
}

.preference-title {
  font-size: 15px;
  font-weight: 800;
  color: #000000;
  margin: 0 0 2px 0;
}

.preference-subtitle {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-600);
  margin: 0;
}

.preference-value {
  font-size: 14px;
  font-weight: 800;
  color: var(--coffee-600);
}

/* ===== ACTION BUTTONS ===== */
.action-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border: none;
  border-radius: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:active {
  transform: scale(0.98);
  background: var(--cream-200);
}

.action-btn ion-icon {
  font-size: 24px;
  color: var(--coffee-600);
}

.action-btn span {
  flex: 1;
  text-align: left;
  font-size: 15px;
  font-weight: 700;
  color: #000000;
}

.action-btn .arrow {
  font-size: 20px;
  color: var(--text-600);
}

.action-btn.primary {
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.08), rgba(107, 66, 38, 0.04));
}

.action-btn.danger {
  background: rgba(239, 68, 68, 0.05);
}

.action-btn.danger ion-icon {
  color: var(--red);
}

.action-btn.danger span {
  color: var(--red);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .profile-header {
    padding: 24px 16px;
  }

  .profile-stats {
    gap: 16px;
  }
}
</style>
