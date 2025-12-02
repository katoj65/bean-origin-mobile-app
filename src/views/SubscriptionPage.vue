<template>
  <ion-page>
    <!-- HEADER -->
    <ion-header class="ion-no-border" translucent>
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goBack">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="page-title">My Subscriptions</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="addNew">
            <ion-icon :icon="addOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="content-bg">
      <!-- STATS HEADER -->
      <div class="stats-header">
        <div class="stat-card modern">
          <div class="stat-icon-wrapper active">
            <ion-icon :icon="checkmarkCircleOutline" class="stat-icon"></ion-icon>
          </div>
          <div class="stat-content">
            <span class="stat-number">{{ activeSubscriptions.length }}</span>
            <span class="stat-label">Active</span>
          </div>
        </div>
        <div class="stat-card modern">
          <div class="stat-icon-wrapper monthly">
            <ion-icon :icon="calendarOutline" class="stat-icon"></ion-icon>
          </div>
          <div class="stat-content">
            <span class="stat-number">${{ totalMonthly }}</span>
            <span class="stat-label">Monthly</span>
          </div>
        </div>
        <div class="stat-card modern">
          <div class="stat-icon-wrapper savings">
            <ion-icon :icon="trendingUpOutline" class="stat-icon"></ion-icon>
          </div>
          <div class="stat-content">
            <span class="stat-number">${{ totalSavings }}</span>
            <span class="stat-label">Saved</span>
          </div>
        </div>
      </div>

      <!-- FILTER TABS -->
      <div class="filter-tabs">
        <button 
          :class="['filter-tab', { active: selectedFilter === 'all' }]"
          @click="selectedFilter = 'all'">
          All ({{ allSubscriptions.length }})
        </button>
        <button 
          :class="['filter-tab', { active: selectedFilter === 'active' }]"
          @click="selectedFilter = 'active'">
          Active ({{ activeCount }})
        </button>
        <button 
          :class="['filter-tab', { active: selectedFilter === 'paused' }]"
          @click="selectedFilter = 'paused'">
          Paused ({{ pausedCount }})
        </button>
      </div>

      <!-- SUBSCRIPTIONS LIST -->
      <div class="subscriptions-container">
        <div 
          v-for="sub in filteredSubscriptions" 
          :key="sub.id"
          class="subscription-item-modern"
          @click="viewDetails(sub)">
          
          <div class="sub-card-content">
            <div class="sub-header-row">
              <div class="sub-image-wrapper">
                <img :src="sub.image" :alt="sub.name" class="sub-image-modern" />
                <div :class="['status-badge-modern', sub.status]">
                  <div class="status-pulse"></div>
                </div>
              </div>

              <div class="sub-info-section">
                <h3 class="sub-name-modern">{{ sub.name }}</h3>
                <p class="sub-origin-text">
                  <ion-icon :icon="locationOutline" class="origin-icon"></ion-icon>
                  {{ sub.origin }}
                </p>
              </div>

              <button 
                class="menu-trigger-btn"
                @click.stop="toggleMenu(sub.id)">
                <ion-icon :icon="ellipsisVerticalOutline"></ion-icon>
              </button>
            </div>

            <div class="sub-info-cards">
              <div class="info-card-small">
                <div class="info-card-icon">
                  <ion-icon :icon="timeOutline"></ion-icon>
                </div>
                <div class="info-card-text">
                  <span class="info-card-label">Frequency</span>
                  <span class="info-card-value">{{ sub.frequency }}</span>
                </div>
              </div>

              <div class="info-card-small">
                <div class="info-card-icon">
                  <ion-icon :icon="cubeOutline"></ion-icon>
                </div>
                <div class="info-card-text">
                  <span class="info-card-label">Quantity</span>
                  <span class="info-card-value">{{ sub.quantity }} bags</span>
                </div>
              </div>
            </div>

            <div class="sub-bottom-row">
              <div class="price-display">
                <span class="price-amount">${{ sub.price }}</span>
                <span class="price-period">per delivery</span>
              </div>
              <div class="next-delivery-chip">
                <ion-icon :icon="calendarOutline" class="chip-icon"></ion-icon>
                <span>{{ sub.nextDelivery }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="openMenuId === sub.id" class="action-dropdown">
            <button class="dropdown-item" @click.stop="editSubscription(sub)">
              <div class="dropdown-icon edit">
                <ion-icon :icon="createOutline"></ion-icon>
              </div>
              <span>Edit Subscription</span>
            </button>
            <button class="dropdown-item" @click.stop="pauseSubscription(sub)">
              <div class="dropdown-icon pause">
                <ion-icon :icon="pauseOutline"></ion-icon>
              </div>
              <span>{{ sub.status === 'paused' ? 'Resume' : 'Pause' }}</span>
            </button>
            <button class="dropdown-item" @click.stop="skipNext(sub)">
              <div class="dropdown-icon skip">
                <ion-icon :icon="playSkipForwardOutline"></ion-icon>
              </div>
              <span>Skip Next Delivery</span>
            </button>
            <button class="dropdown-item danger" @click.stop="cancelSubscription(sub)">
              <div class="dropdown-icon cancel">
                <ion-icon :icon="closeCircleOutline"></ion-icon>
              </div>
              <span>Cancel Subscription</span>
            </button>
          </div>
        </div>

        <!-- EMPTY STATE -->
        <div v-if="filteredSubscriptions.length === 0" class="empty-state-modern">
          <div class="empty-illustration">
            <div class="empty-circle">
              <span class="empty-emoji">☕</span>
            </div>
          </div>
          <h3 class="empty-title-modern">No {{ selectedFilter }} subscriptions</h3>
          <p class="empty-text-modern">{{ emptyMessage }}</p>
          <button class="empty-cta-btn" @click="addNew">
            <ion-icon :icon="addCircleOutline"></ion-icon>
            <span>Start New Subscription</span>
          </button>
        </div>
      </div>

      <!-- SPACER -->
      <div class="bottom-spacer"></div>
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
} from "@ionic/vue";
import {
  arrowBackOutline,
  addOutline,
  locationOutline,
  timeOutline,
  cubeOutline,
  ellipsisVerticalOutline,
  createOutline,
  pauseOutline,
  playSkipForwardOutline,
  closeCircleOutline,
  addCircleOutline,
  checkmarkCircleOutline,
  calendarOutline,
  trendingUpOutline,
} from "ionicons/icons";

const router = useRouter();

const allSubscriptions = ref([
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Yirgacheffe, Ethiopia",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400",
    frequency: "Every 2 weeks",
    quantity: 2,
    price: 32.99,
    nextDelivery: "Dec 15",
    status: 'active',
    savings: 15
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Huila, Colombia",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
    frequency: "Every month",
    quantity: 1,
    price: 15.99,
    nextDelivery: "Jan 5",
    status: 'active',
    savings: 20
  },
  {
    id: 3,
    name: "Costa Rica Honey",
    origin: "Tarrazú, Costa Rica",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    frequency: "Every week",
    quantity: 1,
    price: 18.39,
    nextDelivery: "Paused",
    status: 'paused',
    savings: 10
  },
  {
    id: 4,
    name: "Brazilian Santos",
    origin: "Minas Gerais, Brazil",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400",
    frequency: "Every 2 weeks",
    quantity: 3,
    price: 40.77,
    nextDelivery: "Dec 20",
    status: 'active',
    savings: 20
  }
]);

const selectedFilter = ref('all');
const openMenuId = ref(null);

const activeSubscriptions = computed(() => {
  return allSubscriptions.value.filter(sub => sub.status === 'active');
});

const filteredSubscriptions = computed(() => {
  if (selectedFilter.value === 'all') {
    return allSubscriptions.value;
  }
  return allSubscriptions.value.filter(sub => sub.status === selectedFilter.value);
});

const activeCount = computed(() => {
  return allSubscriptions.value.filter(sub => sub.status === 'active').length;
});

const pausedCount = computed(() => {
  return allSubscriptions.value.filter(sub => sub.status === 'paused').length;
});

const totalMonthly = computed(() => {
  const total = activeSubscriptions.value.reduce((sum, sub) => {
    let monthlyAmount = sub.price;
    if (sub.frequency.includes('week')) {
      monthlyAmount = sub.price * 4;
    } else if (sub.frequency.includes('2 weeks')) {
      monthlyAmount = sub.price * 2;
    }
    return sum + monthlyAmount;
  }, 0);
  return total.toFixed(2);
});

const totalSavings = computed(() => {
  const total = activeSubscriptions.value.reduce((sum, sub) => {
    const savings = (sub.price / (100 - sub.savings)) * sub.savings;
    return sum + savings;
  }, 0);
  return total.toFixed(2);
});

const emptyMessage = computed(() => {
  if (selectedFilter.value === 'active') {
    return 'Start a new subscription to never run out of coffee';
  } else if (selectedFilter.value === 'paused') {
    return 'You have no paused subscriptions';
  }
  return 'Start your first coffee subscription today';
});

const goBack = () => {
  router.back();
};

const addNew = () => {
  router.push('/subscriptions');
};

const viewDetails = (sub) => {
  console.log('View details:', sub);
};

const toggleMenu = (id) => {
  openMenuId.value = openMenuId.value === id ? null : id;
};

const editSubscription = (sub) => {
  console.log('Edit subscription:', sub);
  openMenuId.value = null;
};

const pauseSubscription = (sub) => {
  if (sub.status === 'paused') {
    sub.status = 'active';
    sub.nextDelivery = 'Dec 15'; // Reset to next delivery date
  } else {
    sub.status = 'paused';
    sub.nextDelivery = 'Paused';
  }
  openMenuId.value = null;
};

const skipNext = (sub) => {
  console.log('Skip next delivery:', sub);
  openMenuId.value = null;
};

const cancelSubscription = (sub) => {
  if (confirm('Are you sure you want to cancel this subscription?')) {
    const index = allSubscriptions.value.findIndex(s => s.id === sub.id);
    if (index !== -1) {
      allSubscriptions.value.splice(index, 1);
    }
  }
  openMenuId.value = null;
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
  --green: #27ae60;
  --orange: #ff9800;
  --red: #ef4444;
}

/* ===== HEADER ===== */
.custom-toolbar {
  --background: white;
  --border-width: 0;
  padding: 8px 4px;
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--coffee-dark);
}

/* ===== CONTENT ===== */
.content-bg {
  --background: #f2f2f2;
}

/* ===== STATS HEADER ===== */
.stats-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 16px;
  background: white;
  margin-bottom: 16px;
}

.stat-card.modern {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 12px;
  background: white;
  border-radius: 16px;
  border: 2px solid #f0f0f0;
}

.stat-icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon-wrapper.active {
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.15), rgba(39, 174, 96, 0.25));
}

.stat-icon-wrapper.monthly {
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.15), rgba(107, 66, 38, 0.25));
}

.stat-icon-wrapper.savings {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.15), rgba(255, 152, 0, 0.25));
}

.stat-icon {
  font-size: 22px;
}

.stat-icon-wrapper.active .stat-icon {
  color: var(--green);
}

.stat-icon-wrapper.monthly .stat-icon {
  color: var(--coffee-medium);
}

.stat-icon-wrapper.savings .stat-icon {
  color: var(--orange);
}

.stat-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-number {
  font-size: 22px;
  font-weight: 700;
  color: var(--coffee-dark);
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 600;
}

/* ===== FILTER TABS ===== */
.filter-tabs {
  display: flex;
  gap: 8px;
  padding: 0 16px 16px;
  background: white;
  overflow-x: auto;
}

.filter-tabs::-webkit-scrollbar {
  display: none;
}

.filter-tab {
  padding: 10px 18px;
  border-radius: 20px;
  border: none;
  background: #f8f8f8;
  color: var(--text-light);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.filter-tab.active {
  background: linear-gradient(135deg, var(--coffee-dark) 0%, var(--coffee-medium) 100%);
  color: white;
}

/* ===== SUBSCRIPTIONS LIST MODERN ===== */
.subscriptions-container {
  padding: 0 16px 24px;
}

.subscription-item-modern {
  background: white;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border: 2px solid #f0f0f0;
}

.subscription-item-modern:active {
  transform: scale(0.98);
}

.sub-card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sub-header-row {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.sub-image-wrapper {
  position: relative;
  flex-shrink: 0;
}

.sub-image-modern {
  width: 70px;
  height: 70px;
  border-radius: 16px;
  object-fit: cover;
}

.status-badge-modern {
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-badge-modern.active {
  background: var(--green);
}

.status-badge-modern.paused {
  background: var(--orange);
}

.status-pulse {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: pulse-badge 2s ease-in-out infinite;
}

@keyframes pulse-badge {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.8);
  }
}

.sub-info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.sub-name-modern {
  font-size: 17px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sub-origin-text {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-light);
  margin: 0;
  font-weight: 600;
}

.origin-icon {
  font-size: 15px;
}

.menu-trigger-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #f8f8f8;
  color: var(--coffee-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.menu-trigger-btn:active {
  background: #f0f0f0;
}

.menu-trigger-btn ion-icon {
  font-size: 20px;
}

.sub-info-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.info-card-small {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #f8f8f8;
  border-radius: 12px;
}

.info-card-icon {
  width: 36px;
  height: 36px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-card-icon ion-icon {
  font-size: 18px;
  color: var(--coffee-medium);
}

.info-card-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.info-card-label {
  font-size: 10px;
  color: var(--text-light);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-card-value {
  font-size: 13px;
  color: var(--coffee-dark);
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sub-bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 2px solid #f0f0f0;
}

.price-display {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.price-amount {
  font-size: 22px;
  font-weight: 700;
  color: var(--coffee-dark);
  line-height: 1;
}

.price-period {
  font-size: 11px;
  color: var(--text-light);
  font-weight: 600;
}

.next-delivery-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.1), rgba(107, 66, 38, 0.15));
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  color: var(--coffee-medium);
}

.chip-icon {
  font-size: 16px;
}

/* ===== ACTION DROPDOWN ===== */
.action-dropdown {
  position: absolute;
  top: 70px;
  right: 20px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  z-index: 10;
  min-width: 200px;
  border: 2px solid #f0f0f0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border: none;
  background: white;
  color: var(--coffee-dark);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
  text-align: left;
}

.dropdown-item:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}

.dropdown-item:active {
  background: #f8f8f8;
}

.dropdown-item.danger {
  color: var(--red);
}

.dropdown-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dropdown-icon.edit {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.15), rgba(33, 150, 243, 0.25));
}

.dropdown-icon.pause {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.15), rgba(255, 152, 0, 0.25));
}

.dropdown-icon.skip {
  background: linear-gradient(135deg, rgba(156, 39, 176, 0.15), rgba(156, 39, 176, 0.25));
}

.dropdown-icon.cancel {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.25));
}

.dropdown-icon ion-icon {
  font-size: 18px;
}

.dropdown-icon.edit ion-icon {
  color: #2196f3;
}

.dropdown-icon.pause ion-icon {
  color: var(--orange);
}

.dropdown-icon.skip ion-icon {
  color: #9c27b0;
}

.dropdown-icon.cancel ion-icon {
  color: var(--red);
}

/* ===== EMPTY STATE MODERN ===== */
.empty-state-modern {
  text-align: center;
  padding: 60px 24px;
}

.empty-illustration {
  margin-bottom: 24px;
}

.empty-circle {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, rgba(168, 123, 84, 0.1), rgba(168, 123, 84, 0.15));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.empty-emoji {
  font-size: 60px;
  opacity: 0.6;
}

.empty-title-modern {
  font-size: 20px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 10px 0;
}

.empty-text-modern {
  font-size: 14px;
  color: var(--text-light);
  margin: 0 0 28px 0;
  line-height: 1.5;
  max-width: 280px;
  margin-left: auto;
  margin-right: auto;
}

.empty-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 28px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, var(--coffee-dark) 0%, var(--coffee-medium) 100%);
  color: white;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.empty-cta-btn:active {
  transform: scale(0.97);
}

.empty-cta-btn ion-icon {
  font-size: 22px;
}

/* ===== SPACER ===== */
.bottom-spacer {
  height: 30px;
}
</style>