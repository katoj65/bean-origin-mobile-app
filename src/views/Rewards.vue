<template>
  <ion-page>
    <!-- HEADER -->
    <ion-header class="ion-no-border">
      <ion-toolbar class="page-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goBack" class="header-button">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="header-title">Rewards</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="showHistory" class="header-button">
            <ion-icon :icon="timeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="page-content">
      <div class="content-container">

        <!-- POINTS BALANCE CARD -->
        <div class="content-card balance-card">
          <div class="balance-header">
            <div class="balance-icon">⭐</div>
            <div class="balance-info">
              <span class="balance-label">Your Points</span>
              <div class="balance-amount">
                <span class="points-number">{{ currentPoints }}</span>
                <span class="points-label">pts</span>
              </div>
            </div>
          </div>

          <div class="balance-progress">
            <div class="progress-info">
              <span class="progress-label">Next Reward</span>
              <span class="progress-value">{{ pointsToNextReward }} pts away</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" :style="{ width: progressToNextReward + '%' }"></div>
            </div>
          </div>

          <div class="quick-actions">
            <button class="quick-action-btn" @click="earnPoints">
              <ion-icon :icon="trendingUpOutline"></ion-icon>
              <span>Earn Points</span>
            </button>
            <button class="quick-action-btn" @click="viewAllRewards">
              <ion-icon :icon="giftOutline"></ion-icon>
              <span>All Rewards</span>
            </button>
          </div>
        </div>

        <!-- TIER STATUS CARD -->
        <div class="content-card tier-card">
          <div class="tier-header">
            <div class="tier-badge" :style="{ background: currentTier.color }">
              <span class="tier-icon">{{ currentTier.icon }}</span>
            </div>
            <div class="tier-info">
              <h3 class="tier-name">{{ currentTier.name }} Member</h3>
              <p class="tier-description">{{ currentTier.description }}</p>
            </div>
          </div>

          <div class="tier-benefits">
            <div class="benefit-item" v-for="(benefit, index) in currentTier.benefits" :key="index">
              <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
              <span>{{ benefit }}</span>
            </div>
          </div>

          <div class="next-tier-progress" v-if="nextTier">
            <div class="next-tier-info">
              <span class="next-tier-label">{{ pointsToNextTier }} pts to {{ nextTier.name }}</span>
              <span class="next-tier-badge">{{ nextTier.icon }}</span>
            </div>
            <div class="tier-progress-bar">
              <div class="tier-progress-fill" :style="{ width: tierProgress + '%' }"></div>
            </div>
          </div>
        </div>

        <!-- ELIGIBLE REWARDS SECTION -->
        <div class="section-header">
          <h2 class="section-title">Your Eligible Rewards</h2>
          <span class="section-count">{{ eligibleRewards.length }} available</span>
        </div>

        <div v-if="eligibleRewards.length === 0" class="empty-state">
          <div class="empty-icon">🎁</div>
          <h3 class="empty-title">No Eligible Rewards Yet</h3>
          <p class="empty-message">Keep earning points to unlock amazing rewards!</p>
        </div>

        <div v-for="reward in eligibleRewards" :key="reward.id" class="content-card reward-card eligible">
          <div class="reward-image-wrapper">
            <img :src="reward.image" :alt="reward.name" class="reward-image" />
            <div class="eligible-badge">
              <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
              <span>Eligible</span>
            </div>
          </div>

          <div class="reward-content">
            <div class="reward-header-section">
              <h3 class="reward-name">{{ reward.name }}</h3>
              <div class="reward-category" :style="{ background: reward.categoryColor }">
                {{ reward.category }}
              </div>
            </div>

            <p class="reward-description">{{ reward.description }}</p>

            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-icon">⭐</span>
                <span class="points-cost">{{ reward.points }} pts</span>
              </div>
              <button class="redeem-btn" @click="redeemReward(reward.id)">
                <ion-icon :icon="giftOutline"></ion-icon>
                <span>Redeem Now</span>
              </button>
            </div>
          </div>
        </div>

        <!-- LOCKED REWARDS SECTION -->
        <div class="section-header">
          <h2 class="section-title">Unlock More Rewards</h2>
          <span class="section-count">{{ lockedRewards.length }} locked</span>
        </div>

        <div v-for="reward in lockedRewards" :key="reward.id" class="content-card reward-card locked">
          <div class="reward-image-wrapper">
            <img :src="reward.image" :alt="reward.name" class="reward-image locked-image" />
            <div class="locked-overlay">
              <ion-icon :icon="lockClosedOutline"></ion-icon>
            </div>
          </div>

          <div class="reward-content">
            <div class="reward-header-section">
              <h3 class="reward-name">{{ reward.name }}</h3>
              <div class="reward-category" :style="{ background: reward.categoryColor }">
                {{ reward.category }}
              </div>
            </div>

            <p class="reward-description">{{ reward.description }}</p>

            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-icon">⭐</span>
                <span class="points-cost">{{ reward.points }} pts</span>
              </div>
              <div class="points-needed">
                <ion-icon :icon="informationCircleOutline"></ion-icon>
                <span>Need {{ reward.points - currentPoints }} more pts</span>
              </div>
            </div>
          </div>
        </div>

        <!-- WAYS TO EARN SECTION -->
        <div class="content-card earn-card">
          <div class="earn-header">
            <div class="earn-icon">💰</div>
            <div class="earn-info">
              <h3 class="earn-title">Ways to Earn Points</h3>
              <p class="earn-subtitle">Complete activities to earn more rewards</p>
            </div>
          </div>

          <div class="earn-list">
            <div v-for="way in waysToEarn" :key="way.id" class="earn-item">
              <div class="earn-item-icon" :style="{ background: way.color }">
                <span>{{ way.icon }}</span>
              </div>
              <div class="earn-item-content">
                <h4 class="earn-item-title">{{ way.title }}</h4>
                <p class="earn-item-description">{{ way.description }}</p>
              </div>
              <div class="earn-item-points">
                <span class="earn-points-value">+{{ way.points }}</span>
                <span class="earn-points-label">pts</span>
              </div>
            </div>
          </div>
        </div>

        <!-- RECENT ACTIVITY -->
        <div class="content-card activity-card">
          <div class="activity-header">
            <h3 class="activity-title">Recent Activity</h3>
            <button class="view-all-btn" @click="showHistory">
              <span>View All</span>
              <ion-icon :icon="chevronForwardOutline"></ion-icon>
            </button>
          </div>

          <div class="activity-list">
            <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
              <div class="activity-icon" :class="activity.type">
                <ion-icon :icon="activity.icon"></ion-icon>
              </div>
              <div class="activity-content">
                <span class="activity-description">{{ activity.description }}</span>
                <span class="activity-date">{{ activity.date }}</span>
              </div>
              <div class="activity-points" :class="activity.type">
                <span>{{ activity.type === 'earned' ? '+' : '-' }}{{ activity.points }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- REFERRAL BONUS CARD -->
        <div class="content-card referral-card">
          <div class="referral-content">
            <div class="referral-icon">🎉</div>
            <div class="referral-text">
              <h3 class="referral-title">Refer a Friend</h3>
              <p class="referral-description">Get 500 points when they make their first purchase</p>
            </div>
          </div>
          <button class="referral-btn" @click="shareReferral">
            <ion-icon :icon="shareOutline"></ion-icon>
            <span>Share</span>
          </button>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed } from 'vue';
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
  alertController,
} from "@ionic/vue";
import {
  arrowBackOutline,
  timeOutline,
  trendingUpOutline,
  giftOutline,
  checkmarkCircleOutline,
  lockClosedOutline,
  informationCircleOutline,
  chevronForwardOutline,
  shareOutline,
  addOutline,
  chatbubbleOutline,
} from "ionicons/icons";

const router = useRouter();

const currentPoints = ref(1250);

const tiers = [
  {
    id: 'bronze',
    name: 'Bronze',
    icon: '🥉',
    color: 'linear-gradient(135deg, #cd7f32, #b87333)',
    minPoints: 0,
    benefits: [
      'Earn 1 point per $1 spent',
      'Birthday reward',
      'Early sale access'
    ],
    description: 'Welcome to the community!'
  },
  {
    id: 'silver',
    name: 'Silver',
    icon: '🥈',
    color: 'linear-gradient(135deg, #c0c0c0, #a8a8a8)',
    minPoints: 1000,
    benefits: [
      'Earn 1.5 points per $1 spent',
      'Birthday reward',
      'Early sale access',
      'Free shipping on orders $50+'
    ],
    description: 'You\'re making great progress!'
  },
  {
    id: 'gold',
    name: 'Gold',
    icon: '🥇',
    color: 'linear-gradient(135deg, #ffd700, #ffcc00)',
    minPoints: 2500,
    benefits: [
      'Earn 2 points per $1 spent',
      'Birthday reward + gift',
      'Priority early sale access',
      'Free shipping on all orders',
      'Exclusive monthly offers'
    ],
    description: 'Elite status unlocked!'
  },
  {
    id: 'platinum',
    name: 'Platinum',
    icon: '💎',
    color: 'linear-gradient(135deg, #e5e4e2, #bcc6cc)',
    minPoints: 5000,
    benefits: [
      'Earn 3 points per $1 spent',
      'Birthday reward + premium gift',
      'VIP early sale access',
      'Free shipping + priority handling',
      'Exclusive monthly offers',
      'Personal coffee consultant'
    ],
    description: 'You\'re a VIP member!'
  }
];

const currentTier = computed(() => {
  return [...tiers].reverse().find(tier => currentPoints.value >= tier.minPoints);
});

const nextTier = computed(() => {
  const currentIndex = tiers.findIndex(t => t.id === currentTier.value.id);
  return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
});

const pointsToNextTier = computed(() => {
  return nextTier.value ? nextTier.value.minPoints - currentPoints.value : 0;
});

const tierProgress = computed(() => {
  if (!nextTier.value) return 100;
  const current = currentPoints.value - currentTier.value.minPoints;
  const total = nextTier.value.minPoints - currentTier.value.minPoints;
  return Math.min((current / total) * 100, 100);
});

const allRewards = [
  {
    id: 1,
    name: 'Free Coffee Bag',
    description: 'Get any 250g bag of your choice absolutely free',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
    points: 500,
    category: 'Coffee',
    categoryColor: 'linear-gradient(135deg, #6b4226, #4a2c2a)'
  },
  {
    id: 2,
    name: '$10 Off Next Order',
    description: 'Save $10 on your next purchase of $30 or more',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    points: 750,
    category: 'Discount',
    categoryColor: 'linear-gradient(135deg, #27ae60, #2ecc71)'
  },
  {
    id: 3,
    name: 'Premium Grinder',
    description: 'High-quality burr grinder for perfect consistency',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400',
    points: 2000,
    category: 'Equipment',
    categoryColor: 'linear-gradient(135deg, #667eea, #764ba2)'
  },
  {
    id: 4,
    name: 'Coffee Tasting Kit',
    description: 'Sample pack of 5 premium single-origin coffees',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
    points: 1200,
    category: 'Experience',
    categoryColor: 'linear-gradient(135deg, #f093fb, #f5576c)'
  },
  {
    id: 5,
    name: 'Free Shipping - 1 Year',
    description: 'Enjoy free shipping on all orders for a full year',
    image: 'https://images.unsplash.com/photo-1578374173713-d8c19b84aeb8?w=400',
    points: 3000,
    category: 'Membership',
    categoryColor: 'linear-gradient(135deg, #fa709a, #fee140)'
  },
  {
    id: 6,
    name: 'Espresso Machine',
    description: 'Professional-grade espresso machine for home',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
    points: 8000,
    category: 'Equipment',
    categoryColor: 'linear-gradient(135deg, #667eea, #764ba2)'
  },
  {
    id: 7,
    name: '20% Off Entire Order',
    description: 'Get 20% off your entire purchase, no minimum',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    points: 1000,
    category: 'Discount',
    categoryColor: 'linear-gradient(135deg, #27ae60, #2ecc71)'
  },
  {
    id: 8,
    name: 'Barista Workshop',
    description: 'Private 2-hour workshop with a master barista',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
    points: 5000,
    category: 'Experience',
    categoryColor: 'linear-gradient(135deg, #f093fb, #f5576c)'
  }
];

const eligibleRewards = computed(() => {
  return allRewards.filter(reward => reward.points <= currentPoints.value);
});

const lockedRewards = computed(() => {
  return allRewards.filter(reward => reward.points > currentPoints.value);
});

const nextReward = computed(() => {
  return lockedRewards.value[0];
});

const pointsToNextReward = computed(() => {
  return nextReward.value ? nextReward.value.points - currentPoints.value : 0;
});

const progressToNextReward = computed(() => {
  if (!nextReward.value) return 100;
  const previousReward = eligibleRewards.value[eligibleRewards.value.length - 1];
  const basePoints = previousReward ? previousReward.points : 0;
  const current = currentPoints.value - basePoints;
  const total = nextReward.value.points - basePoints;
  return Math.min((current / total) * 100, 100);
});

const waysToEarn = [
  {
    id: 1,
    icon: '☕',
    title: 'Make a Purchase',
    description: 'Earn points with every order',
    points: 10,
    color: 'linear-gradient(135deg, rgba(107, 66, 38, 0.12), rgba(107, 66, 38, 0.08))'
  },
  {
    id: 2,
    icon: '📝',
    title: 'Write a Review',
    description: 'Share your coffee experience',
    points: 50,
    color: 'linear-gradient(135deg, rgba(39, 174, 96, 0.12), rgba(39, 174, 96, 0.08))'
  },
  {
    id: 3,
    icon: '🎂',
    title: 'Birthday Bonus',
    description: 'Special gift on your birthday',
    points: 200,
    color: 'linear-gradient(135deg, rgba(255, 152, 0, 0.12), rgba(255, 152, 0, 0.08))'
  },
  {
    id: 4,
    icon: '📱',
    title: 'Share on Social',
    description: 'Post about your favorite coffee',
    points: 25,
    color: 'linear-gradient(135deg, rgba(33, 150, 243, 0.12), rgba(33, 150, 243, 0.08))'
  },
  {
    id: 5,
    icon: '👥',
    title: 'Refer a Friend',
    description: 'Invite friends to join',
    points: 500,
    color: 'linear-gradient(135deg, rgba(155, 81, 224, 0.12), rgba(155, 81, 224, 0.08))'
  }
];

const recentActivity = ref([
  {
    id: 1,
    type: 'earned',
    description: 'Purchase reward',
    date: 'Today',
    points: 45,
    icon: addOutline
  },
  {
    id: 2,
    type: 'redeemed',
    description: 'Redeemed: $10 Off coupon',
    date: 'Yesterday',
    points: 750,
    icon: giftOutline
  },
  {
    id: 3,
    type: 'earned',
    description: 'Product review',
    date: '2 days ago',
    points: 50,
    icon: chatbubbleOutline
  },
  {
    id: 4,
    type: 'earned',
    description: 'Birthday bonus',
    date: '1 week ago',
    points: 200,
    icon: addOutline
  }
]);

const goBack = () => {
  router.back();
};

const showHistory = () => {
  alert('Full history feature coming soon!');
};

const earnPoints = () => {
  alert('Earn points feature coming soon!');
};

const viewAllRewards = () => {
  alert('View all rewards feature coming soon!');
};

const redeemReward = async (rewardId) => {
  const reward = allRewards.find(r => r.id === rewardId);
  
  const alert = await alertController.create({
    header: 'Redeem Reward?',
    message: `Do you want to redeem "${reward.name}" for ${reward.points} points?`,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Redeem',
        handler: () => {
          currentPoints.value -= reward.points;
          recentActivity.value.unshift({
            id: Date.now(),
            type: 'redeemed',
            description: `Redeemed: ${reward.name}`,
            date: 'Just now',
            points: reward.points,
            icon: giftOutline
          });
          
          alertController.create({
            header: 'Success!',
            message: `You've redeemed ${reward.name}. Check your email for details.`,
            buttons: ['OK']
          }).then(a => a.present());
        }
      }
    ]
  });
  
  await alert.present();
};

const shareReferral = () => {
  alert('Referral sharing feature coming soon!');
};
</script>

<style scoped>
/* ===== VARIABLES ===== */
:root {
  --coffee-dark: #4a2c2a;
  --coffee-medium: #6b4226;
  --coffee-light: #a87b54;
  --text-dark: #2c1810;
  --text-light: #8b7355;
  --green: #27ae60;
  --blue: #2196f3;
  --purple: #9b51e0;
  --orange: #ff9800;
  --red: #ef4444;
}

* {
  -webkit-tap-highlight-color: transparent;
}

/* ===== HEADER ===== */
.page-toolbar {
  --background: white;
  --border-width: 0;
  padding: 8px 4px;
}

.header-button {
  --background: rgba(107, 66, 38, 0.08);
  --color: var(--coffee-dark);
  width: 42px;
  height: 42px;
  margin: 4px;
  border-radius: 50%;
}

.header-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
}

/* ===== CONTENT ===== */
.page-content {
  --background: #f5f5f5;
}

.content-container {
  padding: 12px;
  padding-bottom: 24px;
}

/* ===== CONTENT CARD ===== */
.content-card {
  background: white;
  border-radius: 20px;
  margin-bottom: 16px;
  box-shadow: none;
  border: none;
  overflow: hidden;
}

/* ===== BALANCE CARD ===== */
.balance-card {
  padding: 24px;
  background: linear-gradient(135deg, #fff5e6, #ffe4cc);
}

.balance-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.balance-icon {
  font-size: 56px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.balance-info {
  flex: 1;
}

.balance-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 6px;
}

.balance-amount {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.points-number {
  font-size: 48px;
  font-weight: 900;
  color: var(--coffee-dark);
  line-height: 1;
}

.points-label {
  font-size: 20px;
  font-weight: 700;
  color: var(--coffee-medium);
}

.balance-progress {
  margin-bottom: 20px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.progress-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.progress-value {
  font-size: 14px;
  font-weight: 800;
  color: var(--orange);
}

.progress-bar-container {
  width: 100%;
  height: 10px;
  background: rgba(255, 152, 0, 0.15);
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--orange), #ffb84d);
  border-radius: 10px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.quick-actions {
  display: flex;
  gap: 10px;
}

.quick-action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  background: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 800;
  color: var(--coffee-dark);
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-action-btn:active {
  transform: scale(0.95);
}

.quick-action-btn ion-icon {
  font-size: 20px;
}

/* ===== TIER CARD ===== */
.tier-card {
  padding: 24px;
}

.tier-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.tier-badge {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tier-icon {
  font-size: 36px;
}

.tier-info {
  flex: 1;
}

.tier-name {
  font-size: 20px;
  font-weight: 900;
  color: var(--coffee-dark);
  margin: 0 0 4px 0;
}

.tier-description {
  font-size: 13px;
  color: var(--text-light);
  margin: 0;
  font-weight: 600;
}

.tier-benefits {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background: linear-gradient(135deg, #fafafa, #f8f8f8);
  border-radius: 12px;
  margin-bottom: 20px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--coffee-dark);
  font-weight: 700;
}

.benefit-item ion-icon {
  font-size: 18px;
  color: var(--green);
  flex-shrink: 0;
}

.next-tier-progress {
  padding: 16px;
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.08), rgba(255, 152, 0, 0.05));
  border-radius: 12px;
}

.next-tier-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.next-tier-label {
  font-size: 13px;
  font-weight: 800;
  color: var(--coffee-dark);
}

.next-tier-badge {
  font-size: 24px;
}

.tier-progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 152, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
}

.tier-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--orange), #ffb84d);
  border-radius: 8px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ===== SECTION HEADER ===== */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 4px 12px;
}

.section-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0;
}

.section-count {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-light);
  padding: 6px 12px;
  background: linear-gradient(135deg, #fafafa, #f8f8f8);
  border-radius: 10px;
}

/* ===== EMPTY STATE ===== */
.empty-state {
  text-align: center;
  padding: 48px 24px;
  background: white;
  border-radius: 20px;
  margin-bottom: 16px;
}

.empty-icon {
  font-size: 72px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0 0 8px 0;
}

.empty-message {
  font-size: 14px;
  color: var(--text-light);
  margin: 0;
  font-weight: 600;
}

/* ===== REWARD CARD ===== */
.reward-card {
  padding: 0;
  display: flex;
  flex-direction: column;
}

.reward-image-wrapper {
  position: relative;
  width: 100%;
  height: 160px;
  background: #e8e8e8;
  overflow: hidden;
}

.reward-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reward-image.locked-image {
  opacity: 0.4;
  filter: grayscale(100%);
}

.eligible-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  background: var(--green);
  border-radius: 10px;
  color: white;
  font-size: 12px;
  font-weight: 800;
}

.eligible-badge ion-icon {
  font-size: 16px;
}

.locked-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.locked-overlay ion-icon {
  font-size: 48px;
  color: white;
}

.reward-content {
  padding: 20px;
}

.reward-header-section {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.reward-name {
  font-size: 17px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0;
  line-height: 1.3;
  flex: 1;
}

.reward-category {
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 800;
  color: white;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  flex-shrink: 0;
}

.reward-description {
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-light);
  margin: 0 0 16px 0;
  font-weight: 600;
}

.reward-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.reward-points {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: linear-gradient(135deg, #fafafa, #f8f8f8);
  border-radius: 10px;
}

.points-icon {
  font-size: 20px;
}

.points-cost {
  font-size: 16px;
  font-weight: 900;
  color: var(--coffee-dark);
}

.redeem-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
}

.redeem-btn:active {
  transform: scale(0.95);
}

.redeem-btn ion-icon {
  font-size: 18px;
}

.points-needed {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--orange);
}

.points-needed ion-icon {
  font-size: 16px;
}

/* ===== EARN CARD ===== */
.earn-card {
  padding: 24px;
}

.earn-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.earn-icon {
  font-size: 48px;
}

.earn-info {
  flex: 1;
}

.earn-title {
  font-size: 19px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0 0 4px 0;
}

.earn-subtitle {
  font-size: 13px;
  color: var(--text-light);
  margin: 0;
  font-weight: 600;
}

.earn-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.earn-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  background: linear-gradient(135deg, #fafafa, #f8f8f8);
  border-radius: 12px;
}

.earn-item-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.earn-item-content {
  flex: 1;
}

.earn-item-title {
  font-size: 15px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0 0 4px 0;
}

.earn-item-description {
  font-size: 12px;
  color: var(--text-light);
  margin: 0;
  font-weight: 600;
}

.earn-item-points {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.earn-points-value {
  font-size: 20px;
  font-weight: 900;
  color: var(--green);
  line-height: 1;
}

.earn-points-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-light);
  text-transform: uppercase;
}

/* ===== ACTIVITY CARD ===== */
.activity-card {
  padding: 24px;
}

.activity-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.activity-title {
  font-size: 19px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0;
}

.view-all-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  color: var(--coffee-medium);
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
}

.view-all-btn ion-icon {
  font-size: 16px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: linear-gradient(135deg, #fafafa, #f8f8f8);
  border-radius: 10px;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon.earned {
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.12), rgba(39, 174, 96, 0.08));
  color: var(--green);
}

.activity-icon.redeemed {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(239, 68, 68, 0.08));
  color: var(--red);
}

.activity-icon ion-icon {
  font-size: 20px;
}

.activity-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.activity-description {
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.activity-date {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-light);
}

.activity-points {
  font-size: 16px;
  font-weight: 900;
}

.activity-points.earned {
  color: var(--green);
}

.activity-points.redeemed {
  color: var(--red);
}

/* ===== REFERRAL CARD ===== */
.referral-card {
  padding: 20px;
  background: linear-gradient(135deg, #e3f2e1, #f0f8ee);
  display: flex;
  align-items: center;
  gap: 16px;
}

.referral-content {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
}

.referral-icon {
  font-size: 48px;
}

.referral-text {
  flex: 1;
}

.referral-title {
  font-size: 17px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0 0 4px 0;
}

.referral-description {
  font-size: 13px;
  color: var(--text-light);
  margin: 0;
  font-weight: 600;
}

.referral-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 18px;
  background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.referral-btn:active {
  transform: scale(0.95);
}

.referral-btn ion-icon {
  font-size: 18px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 400px) {
  .referral-card {
    flex-direction: column;
    text-align: center;
  }
  
  .referral-content {
    flex-direction: column;
  }
}
</style>