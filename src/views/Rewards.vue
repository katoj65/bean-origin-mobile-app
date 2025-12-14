<template>
<app-layout title="Rewards">
<template #content>
<div class="rewards-page">

<!-- Hero Header Section -->
<div class="hero-header">
  <div class="hero-content">
    <div class="title-row">
      <div class="hero-icon-wrapper">
        <ion-icon :icon="trophyOutline" class="hero-icon"></ion-icon>
      </div>
      <div class="text-content">
        <h1 class="hero-title">Rewards Program</h1>
        <p class="hero-subtitle">Earn points with every purchase and unlock exclusive benefits</p>
      </div>
    </div>
  </div>
</div>

<!-- Points Balance Section -->
<div class="balance-section">
  <div class="balance-card">
    <div class="balance-icon-wrapper">
      <ion-icon :icon="starOutline" class="balance-icon"></ion-icon>
    </div>
    <div class="balance-content">
      <span class="balance-label">Your Points</span>
      <span class="balance-value">{{ currentPoints }}</span>
    </div>
  </div>
  
  <div class="progress-card">
    <div class="progress-header">
      <span class="progress-label">Next Reward</span>
      <span class="progress-value">{{ pointsToNext }} pts</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
    </div>
  </div>
</div>

<!-- Tier Status -->
<div class="tier-section">
  <div class="tier-badge" :class="currentTier.class">
    <div class="tier-icon-wrapper">
      <ion-icon :icon="currentTier.icon" class="tier-icon"></ion-icon>
    </div>
    <div class="tier-info">
      <h3 class="tier-name">{{ currentTier.name }}</h3>
      <p class="tier-level">{{ currentTier.level }}</p>
    </div>
  </div>
  
  <div class="tier-benefits">
    <div 
      v-for="benefit in currentTier.benefits" 
      :key="benefit" 
      class="benefit-item"
    >
      <ion-icon :icon="checkmarkCircleOutline" class="benefit-icon"></ion-icon>
      <span class="benefit-text">{{ benefit }}</span>
    </div>
  </div>
</div>

<!-- Available Rewards -->
<div class="rewards-section">
  <h2 class="section-title">Available Rewards</h2>
  
  <div class="rewards-grid">
    <div 
      v-for="reward in availableRewards" 
      :key="reward.id" 
      class="reward-card"
    >
      <div class="reward-image">
        <img :src="reward.image" :alt="reward.name" />
        <div class="reward-points-badge">
          <ion-icon :icon="starOutline"></ion-icon>
          <span>{{ reward.points }}</span>
        </div>
      </div>
      
      <div class="reward-content">
        <h3 class="reward-name">{{ reward.name }}</h3>
        <p class="reward-description">{{ reward.description }}</p>
        
        <button 
          class="redeem-btn" 
          :disabled="currentPoints < reward.points"
          @click="redeemReward(reward)"
        >
          <span>Redeem</span>
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Earn More Points -->
<div class="earn-section">
  <h2 class="section-title">Earn More Points</h2>
  
  <div 
    v-for="action in earnActions" 
    :key="action.id" 
    class="earn-card"
  >
    <div class="earn-icon-wrapper" :class="action.colorClass">
      <ion-icon :icon="action.icon" class="earn-icon"></ion-icon>
    </div>
    
    <div class="earn-content">
      <h4 class="earn-title">{{ action.title }}</h4>
      <p class="earn-description">{{ action.description }}</p>
    </div>
    
    <div class="earn-points">
      <span class="earn-value">+{{ action.points }}</span>
      <span class="earn-label">pts</span>
    </div>
  </div>
</div>

<!-- Recent Activity -->
<div class="activity-section">
  <h2 class="section-title">Recent Activity</h2>
  
  <div 
    v-for="activity in recentActivity" 
    :key="activity.id" 
    class="activity-item"
  >
    <div class="activity-icon" :class="activity.type">
      <ion-icon :icon="activity.icon"></ion-icon>
    </div>
    
    <div class="activity-info">
      <h4 class="activity-title">{{ activity.title }}</h4>
      <p class="activity-date">{{ activity.date }}</p>
    </div>
    
    <div class="activity-points" :class="activity.type">
      <span>{{ activity.points > 0 ? '+' : '' }}{{ activity.points }}</span>
    </div>
  </div>
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
  starOutline,
  checkmarkCircleOutline,
  timeOutline,
  arrowForwardOutline,
  trophyOutline,
  cartOutline,
  personAddOutline,
  shareOutline,
  heartOutline,
  chatbubbleOutline,
  addCircleOutline,
  removeCircleOutline
} from 'ionicons/icons';

// Data
const currentPoints = ref(1250);
const pointsToNext = ref(250);

const currentTier = ref({
  name: 'Gold Member',
  level: 'Level 3',
  class: 'gold',
  icon: trophyOutline,
  benefits: [
    '10% off all purchases',
    'Free shipping on orders over $30',
    'Early access to new coffees',
    'Birthday reward'
  ]
});

const availableRewards = ref([
  {
    id: 1,
    name: 'Free Coffee Bag',
    description: 'Redeem for any 250g coffee bag',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
    points: 500,
    expiry: 'Valid for 30 days'
  },
  {
    id: 2,
    name: '$10 Off Voucher',
    description: 'Use on your next purchase',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
    points: 800,
    expiry: 'Valid for 60 days'
  },
  {
    id: 3,
    name: 'Premium Brewing Kit',
    description: 'Complete coffee brewing starter kit',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    points: 1500,
    expiry: 'Valid for 90 days'
  },
  {
    id: 4,
    name: 'Coffee Grinder',
    description: 'Professional burr grinder',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    points: 1200,
    expiry: 'Valid for 60 days'
  }
]);

const earnActions = ref([
  {
    id: 1,
    title: 'Make a Purchase',
    description: 'Earn 1 point per dollar spent',
    points: '1 per $',
    icon: cartOutline,
    colorClass: 'blue'
  },
  {
    id: 2,
    title: 'Refer a Friend',
    description: 'Get points when they make first purchase',
    points: 200,
    icon: personAddOutline,
    colorClass: 'green'
  },
  {
    id: 3,
    title: 'Share on Social',
    description: 'Share your favorite coffee',
    points: 50,
    icon: shareOutline,
    colorClass: 'purple'
  },
  {
    id: 4,
    title: 'Write a Review',
    description: 'Review a product you purchased',
    points: 75,
    icon: chatbubbleOutline,
    colorClass: 'orange'
  }
]);

const recentActivity = ref([
  {
    id: 1,
    title: 'Purchase Reward',
    date: 'Dec 10, 2025',
    points: 45,
    type: 'earned',
    icon: addCircleOutline
  },
  {
    id: 2,
    title: 'Redeemed Free Coffee',
    date: 'Dec 5, 2025',
    points: -500,
    type: 'redeemed',
    icon: removeCircleOutline
  },
  {
    id: 3,
    title: 'Referral Bonus',
    date: 'Dec 1, 2025',
    points: 200,
    type: 'earned',
    icon: addCircleOutline
  }
]);

// Computed
const progressPercent = computed(() => {
  const total = currentPoints.value + pointsToNext.value;
  return (currentPoints.value / total) * 100;
});

// Methods
const redeemReward = (reward) => {
  console.log('Redeeming reward:', reward);
  // Add redemption logic here
};
</script>

<style scoped>
:root {
  --coffee-900: #3d2419;
  --coffee-600: #6b4226;
  --cream-200: #faf8f5;
  --cream-300: #f5f1e8;
  --text-900: #1a0f0a;
  --text-600: #6b5444;
  --gold: #fbbf24;
  --gold-dark: #f59e0b;
  --blue: #3b82f6;
  --green: #10b981;
  --purple: #8b5cf6;
  --orange: #f97316;
}

.rewards-page {
  background: var(--cream-200);
  min-height: 100vh;
  padding-bottom: 20px;
}

/* ===== HERO HEADER ===== */
.hero-header {
  background: white;
  padding: 28px 20px 24px;
  margin-bottom: 12px;
}

.hero-content {
  width: 100%;
}

.title-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.hero-icon-wrapper {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.1));
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hero-icon {
  font-size: 28px;
  color: var(--gold);
}

.text-content {
  flex: 1;
  padding-top: 2px;
}

.hero-title {
  font-size: 24px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 6px 0;
  letter-spacing: -0.8px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-600);
  margin: 0;
  line-height: 1.5;
}

/* ===== BALANCE SECTION ===== */
.balance-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 12px 20px 12px;
  margin-bottom: 8px;
}

.balance-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.balance-icon-wrapper {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.1));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.balance-icon {
  font-size: 32px;
  color: var(--gold);
}

.balance-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.balance-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.balance-value {
  font-size: 32px;
  font-weight: 900;
  color: var(--text-900);
  line-height: 1;
}

.progress-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.progress-value {
  font-size: 16px;
  font-weight: 900;
  color: var(--gold);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--cream-300);
  border-radius: 8px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--gold), var(--gold-dark));
  border-radius: 8px;
  transition: width 0.5s ease;
}

/* ===== TIER SECTION ===== */
.tier-section {
  background: white;
  margin: 0 20px 20px;
  border-radius: 16px;
  padding: 20px;
}

.tier-badge {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  border-radius: 12px;
}

.tier-badge.gold {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.05));
}

.tier-icon-wrapper {
  width: 56px;
  height: 56px;
  background: var(--gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tier-icon {
  font-size: 28px;
  color: white;
}

.tier-info {
  flex: 1;
}

.tier-name {
  font-size: 20px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 4px 0;
  letter-spacing: -0.5px;
}

.tier-level {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-600);
  margin: 0;
}

.tier-benefits {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: var(--cream-200);
  border-radius: 10px;
}

.benefit-icon {
  font-size: 20px;
  color: var(--gold);
  flex-shrink: 0;
}

.benefit-text {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-900);
}

/* ===== REWARDS SECTION ===== */
.rewards-section {
  padding: 0 20px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
}

.rewards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.reward-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.reward-card:active {
  transform: scale(0.98);
}

.reward-image {
  position: relative;
  width: 100%;
  height: 100px;
  overflow: hidden;
}

.reward-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reward-points-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: rgba(251, 191, 36, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  font-size: 12px;
  font-weight: 900;
  color: white;
}

.reward-points-badge ion-icon {
  font-size: 14px;
}

.reward-content {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reward-name {
  font-size: 15px;
  font-weight: 900;
  color: #000000;
  margin: 0;
  letter-spacing: -0.3px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 38px;
}

.reward-description {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-600);
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.redeem-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 14px;
  background: var(--gold);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s ease;
}

.redeem-btn:disabled {
  background: var(--cream-300);
  color: var(--text-600);
  cursor: not-allowed;
}

.redeem-btn:not(:disabled):active {
  transform: scale(0.95);
  background: var(--gold-dark);
}

.redeem-btn ion-icon {
  font-size: 18px;
}

/* ===== EARN SECTION ===== */
.earn-section {
  padding: 0 20px;
  margin-bottom: 20px;
}

.earn-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
  transition: transform 0.3s ease;
}

.earn-card:active {
  transform: scale(0.98);
}

.earn-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.earn-icon-wrapper.blue {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));
}

.earn-icon-wrapper.green {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
}

.earn-icon-wrapper.purple {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05));
}

.earn-icon-wrapper.orange {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(249, 115, 22, 0.05));
}

.earn-icon {
  font-size: 24px;
}

.earn-icon-wrapper.blue .earn-icon {
  color: var(--blue);
}

.earn-icon-wrapper.green .earn-icon {
  color: var(--green);
}

.earn-icon-wrapper.purple .earn-icon {
  color: var(--purple);
}

.earn-icon-wrapper.orange .earn-icon {
  color: var(--orange);
}

.earn-content {
  flex: 1;
}

.earn-title {
  font-size: 15px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 4px 0;
}

.earn-description {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-600);
  margin: 0;
}

.earn-points {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.earn-value {
  font-size: 20px;
  font-weight: 900;
  color: var(--gold);
  line-height: 1;
}

.earn-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-600);
}

/* ===== ACTIVITY SECTION ===== */
.activity-section {
  padding: 0 20px;
  margin-bottom: 20px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 10px;
}

.activity-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon.earned {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
  color: var(--green);
}

.activity-icon.redeemed {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(249, 115, 22, 0.05));
  color: var(--orange);
}

.activity-icon ion-icon {
  font-size: 22px;
}

.activity-info {
  flex: 1;
}

.activity-title {
  font-size: 14px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 2px 0;
}

.activity-date {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-600);
  margin: 0;
}

.activity-points {
  font-size: 16px;
  font-weight: 900;
}

.activity-points.earned {
  color: var(--green);
}

.activity-points.redeemed {
  color: var(--orange);
}
</style>
