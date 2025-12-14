<template>
  <!-- SHOP HEADER CARD -->
  <ion-card class="shop-header-card">
    <!-- Background Pattern -->
    <div class="header-card-pattern"></div>
    
    <div class="shop-header-content">
      <div class="shop-logo-section">
        <div class="shop-logo-large">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop" alt="Bean Origin" />
          <div class="logo-shine"></div>
        </div>
        <div class="status-indicator" :class="{ open: shopData.isOpen }">
          <span class="status-dot"></span>
          <span class="status-text">{{ shopData.isOpen ? 'Open Now' : 'Closed' }}</span>
        </div>
      </div>

      <div class="shop-details">
        <div class="shop-title-row">
          <h1 class="shop-name-large">{{ shopData.name }}</h1>
          <div class="rating-badge-large">
            <ion-icon :icon="starIcon" class="rating-star"></ion-icon>
            <span class="rating-value">{{ shopData.rating }}</span>
          </div>
        </div>
        
        <p class="shop-description">{{ shopData.description }}</p>
        
        <div class="shop-meta-row">
          <div class="meta-item">
            <ion-icon :icon="locationOutline" class="meta-icon"></ion-icon>
            <span class="meta-text">{{ shopData.distance }} km away</span>
          </div>
          <div class="meta-item">
            <ion-icon :icon="timeOutline" class="meta-icon"></ion-icon>
            <span class="meta-text">{{ shopData.hours }}</span>
          </div>
        </div>

        <div class="shop-tags">
          <span class="shop-tag">Premium Coffee</span>
          <span class="shop-tag">Artisan Roasted</span>
          <span class="shop-tag">Eco-Friendly</span>
        </div>
      </div>
    </div>
  </ion-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  IonCard,
  IonIcon,
} from '@ionic/vue';
import {
  star,
  locationOutline,
  timeOutline,
} from 'ionicons/icons';

const starIcon = computed(() => star);

// Shop Data
const shopData = ref({
  name: 'Bean Origin',
  tagline: 'Premium Coffee',
  description: 'Artisan coffee roasted daily with a commitment to sustainability and exceptional taste',
  distance: 0.8,
  isOpen: true,
  rating: 4.8,
  hours: '7:00 AM - 9:00 PM',
});
</script>

<style scoped>
/* ===== VARIABLES ===== */
:root {
  --coffee-dark: #4a2c2a;
  --coffee-medium: #6b4226;
  --coffee-light: #a87b54;
  --cream: #faf8f5;
  --cream-dark: #f5f1e8;
  --text-dark: #2c1810;
  --text-light: #8b7355;
  --green: #10b981;
  --red: #ef4444;
  --gold: #d4af37;
}

/* ===== SHOP HEADER CARD ===== */
.shop-header-card {
  position: relative;
  margin: 0;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(145deg, var(--cream), #ffffff);
  box-shadow: none;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.shop-header-card:hover {
  transform: translateY(-5px);
}

.header-card-pattern {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 250px;
  height: 250px;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 50 C25 63.807, 36.193 75, 50 75 C63.807 75, 75 63.807, 75 50 C75 36.193, 63.807 25, 50 25 C36.193 25, 25 36.193, 25 50 Z M50 52 C48.895 52, 48 51.105, 48 50 C48 48.895, 48.895 48, 50 48 C51.105 48, 52 48.895, 52 50 C52 51.105, 51.105 52, 50 52 Z' fill='%236b4226' fill-opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.5;
  pointer-events: none;
  transform: rotate(15deg);
}

.shop-header-content {
  display: flex;
  gap: 24px;
  padding: 28px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.shop-logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.shop-logo-large {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 6px solid var(--cream);
  box-shadow: none;
}

.shop-logo-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.logo-shine {
  display: none; /* Removing for a cleaner look */
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--cream-dark);
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-indicator.open {
  background: #e7f7f0;
  border-color: rgba(16, 185, 129, 0.2);
  color: #0d9263;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #b8b8b8;
}

.status-indicator.open .status-dot {
  background: var(--green);
  animation: pulse-glow 2s infinite ease-in-out;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}

.status-text {
  font-weight: 700;
}

.shop-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.shop-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.shop-name-large {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-dark);
  margin: 0;
  line-height: 1.2;
}

.rating-badge-large {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid var(--cream-dark);
  border-radius: 16px;
  flex-shrink: 0;
}

.rating-star {
  font-size: 18px;
  color: var(--gold);
}

.rating-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-dark);
}

.shop-description {
  font-size: 16px;
  color: var(--text-light);
  line-height: 1.6;
  margin: 0;
}

.shop-meta-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.meta-icon {
  font-size: 18px;
  color: var(--coffee-light);
}

.meta-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
}

.shop-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.shop-tag {
  padding: 6px 14px;
  background: var(--cream-dark);
  border-radius: 14px;
  font-size: 12px;
  font-weight: 600;
  color: var(--coffee-medium);
  border: 1px solid transparent;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .shop-header-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px;
  }

  .shop-logo-large {
    width: 100px;
    height: 100px;
  }

  .shop-title-row {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  
  .shop-name-large {
    font-size: 26px;
  }

  .shop-meta-row {
    justify-content: center;
    gap: 16px;
  }

  .shop-tags {
    justify-content: center;
  }
}
</style>