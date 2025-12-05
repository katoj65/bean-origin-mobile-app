<template>
  <ion-page>
    <!-- HEADER -->
    <ion-header class="ion-no-border">
      <ion-toolbar class="shop-toolbar">
        <ion-buttons slot="start">
          <ion-button class="header-btn" @click="goBack">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        
        <ion-buttons slot="end">
          <ion-button class="header-btn" @click="toggleFavorite">
            <ion-icon :icon="isFavorite ? heartSharp : heartOutline"></ion-icon>
          </ion-button>
          <ion-button class="header-btn" @click="shareShop">
            <ion-icon :icon="shareOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- CONTENT -->
    <ion-content class="shop-content">
      <div v-if="shop" class="content-wrapper">
        
        <!-- HERO BANNER -->
        <div class="hero-banner">
          <img :src="shop.heroImage" :alt="shop.name" class="hero-image" />
          <div class="hero-overlay"></div>
          
          <!-- Shop Info Overlay -->
          <div class="shop-info-overlay">
            <h1 class="shop-name-hero">{{ shop.name }}</h1>
            <div class="rating-status-row">
              <div class="rating-compact">
                <ion-icon :icon="starSharp"></ion-icon>
                <span class="rating-value">{{ shop.rating.toFixed(1) }}</span>
                <span class="reviews-count">({{ shop.reviewCount }} reviews)</span>
              </div>
              <div class="status-badge" :class="shop.isOpen ? 'open' : 'closed'">
                <span class="status-dot"></span>
                <span>{{ shop.isOpen ? 'Open Now' : 'Closed' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- SHOP ESSENTIALS CARD -->
        <div class="essentials-card" style="margin-top:15px;">
          <div class="essential-item">
            <div class="essential-icon location">
              <ion-icon :icon="locationSharp"></ion-icon>
            </div>
            <div class="essential-content">
              <span class="essential-label">Location</span>
              <span class="essential-value">{{ shop.address }}</span>
              <span class="essential-meta">{{ shop.distance }} away</span>
            </div>
          </div>

          <div class="essential-item">
            <div class="essential-icon clock">
              <ion-icon :icon="timeOutline"></ion-icon>
            </div>
            <div class="essential-content">
              <span class="essential-label">Hours Today</span>
              <span class="essential-value">{{ shop.hoursToday }}</span>
              <button class="view-all-hours" @click="showAllHours = !showAllHours">
                {{ showAllHours ? 'Show Less' : 'View All Hours' }}
              </button>
            </div>
          </div>

          <!-- All Hours Expandable -->
          <div v-if="showAllHours" class="all-hours-section">
            <div v-for="day in shop.hours" :key="day.day" class="hour-row">
              <span class="hour-day">{{ day.day }}</span>
              <span class="hour-time">{{ day.hours }}</span>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div class="quick-actions">
            <button class="quick-btn call" @click="callShop">
              <ion-icon :icon="callSharp"></ion-icon>
              <span>Call</span>
            </button>
            <button class="quick-btn directions" @click="getDirections">
              <ion-icon :icon="navigateSharp"></ion-icon>
              <span>Directions</span>
            </button>
          </div>
        </div>

        <!-- COFFEE PRODUCTS / MENU -->
        <div class="menu-section">
          <h2 class="section-title">Coffee Menu</h2>
          
          <div class="menu-items">
            <div 
              v-for="item in shop.menu" 
              :key="item.id"
              class="menu-item-card"
            >
              <div class="menu-item-image-wrapper">
                <img :src="item.image" :alt="item.name" class="menu-item-image" />
                <div class="roast-badge" :class="item.roastLevel.toLowerCase()">
                  {{ item.roastLevel }}
                </div>
              </div>
              
              <div class="menu-item-content">
                <h3 class="menu-item-name">{{ item.name }}</h3>
                <p class="menu-item-notes">{{ item.flavorNotes }}</p>
                
                <div class="menu-item-footer">
                  <span class="menu-item-price">${{ item.price.toFixed(2) }}</span>
                  <button class="add-to-cart-btn" @click="addToCart(item)">
                    <ion-icon :icon="cartOutline"></ion-icon>
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SHOP DESCRIPTION -->
        <div class="description-card">
          <h2 class="section-title">About {{ shop.name }}</h2>
          <p class="description-text">{{ shop.description }}</p>
          
          <div class="signature-section">
            <h3 class="subsection-title">Signature Brews</h3>
            <div class="signature-list">
              <div v-for="brew in shop.signatureBrews" :key="brew" class="signature-item">
                <ion-icon :icon="cafeSharp"></ion-icon>
                <span>{{ brew }}</span>
              </div>
            </div>
          </div>

          <div class="philosophy-section">
            <h3 class="subsection-title">Sourcing Philosophy</h3>
            <div class="philosophy-badge">
              <ion-icon :icon="leafSharp"></ion-icon>
              <span>{{ shop.sourcingPhilosophy }}</span>
            </div>
          </div>
        </div>

        <!-- AMENITIES & FEATURES -->
        <div class="amenities-section">
          <h2 class="section-title">Amenities & Features</h2>
          <div class="amenities-grid">
            <div 
              v-for="amenity in shop.amenities" 
              :key="amenity.name"
              class="amenity-card"
            >
              <div class="amenity-icon" :class="amenity.color">
                <ion-icon :icon="amenity.icon"></ion-icon>
              </div>
              <span class="amenity-name">{{ amenity.name }}</span>
            </div>
          </div>
        </div>

        <!-- MAP SECTION -->
        <div class="map-section">
          <h2 class="section-title">Location</h2>
          <div class="map-container" @click="openFullMap">
            <div class="map-placeholder">
              <ion-icon :icon="mapSharp"></ion-icon>
              <div class="map-info">
                <span class="map-address">{{ shop.address }}</span>
                <span class="map-distance">{{ shop.distance }} away</span>
              </div>
              <button class="map-expand-btn">
                <ion-icon :icon="expandOutline"></ion-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- REVIEWS SECTION -->
        <div class="reviews-section">
          <div class="reviews-header">
            <h2 class="section-title">Customer Reviews</h2>
            <div class="reviews-summary">
              <span class="reviews-avg">{{ shop.rating.toFixed(1) }}</span>
              <div class="reviews-stars">
                <ion-icon 
                  v-for="i in 5" 
                  :key="i"
                  :icon="i <= Math.floor(shop.rating) ? starSharp : starOutline"
                ></ion-icon>
              </div>
              <span class="reviews-total">{{ shop.reviewCount }} reviews</span>
            </div>
          </div>

          <div class="reviews-list">
            <div 
              v-for="review in shop.reviews" 
              :key="review.id"
              class="review-card"
            >
              <div class="review-header">
                <div class="reviewer-info">
                  <div class="reviewer-avatar">{{ review.avatar }}</div>
                  <div class="reviewer-details">
                    <span class="reviewer-name">{{ review.name }}</span>
                    <span class="review-date">{{ review.date }}</span>
                  </div>
                </div>
                <div class="review-rating">
                  <ion-icon :icon="starSharp"></ion-icon>
                  <span>{{ review.rating.toFixed(1) }}</span>
                </div>
              </div>
              <p class="review-text">{{ review.comment }}</p>
            </div>
          </div>

          <button class="write-review-btn" @click="writeReview">
            <ion-icon :icon="createOutline"></ion-icon>
            <span>Write a Review</span>
          </button>
        </div>

      </div>
    </ion-content>

    <!-- FLOATING ACTION BUTTONS -->
    <div class="floating-actions">
      <button class="floating-btn secondary" @click="bookTable">
        <ion-icon :icon="calendarSharp"></ion-icon>
        <span>Book Table</span>
      </button>
      <button class="floating-btn primary" @click="orderNow">
        <ion-icon :icon="bagHandleSharp"></ion-icon>
        <span>Order Now</span>
      </button>
    </div>

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
  IonContent,
  IonIcon,
} from "@ionic/vue";
import {
  arrowBackOutline,
  heartOutline,
  heartSharp,
  shareOutline,
  starSharp,
  starOutline,
  locationSharp,
  timeOutline,
  callSharp,
  navigateSharp,
  cartOutline,
  cafeSharp,
  leafSharp,
  mapSharp,
  expandOutline,
  createOutline,
  calendarSharp,
  bagHandleSharp,
  wifiOutline,
  cardOutline,
  flowerOutline,
  sparklesOutline,
  waterOutline,
} from "ionicons/icons";

const router = useRouter();
const isFavorite = ref(false);
const showAllHours = ref(false);

const shop = reactive({
  id: 1,
  name: 'Brew & Beans Coffee House',
  heroImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
  rating: 4.8,
  reviewCount: 342,
  isOpen: true,
  address: '123 Coffee Street, Downtown, Kampala',
  distance: '3.2 km',
  hoursToday: '7:00 AM - 8:00 PM',
  hours: [
    { day: 'Monday', hours: '7:00 AM - 8:00 PM' },
    { day: 'Tuesday', hours: '7:00 AM - 8:00 PM' },
    { day: 'Wednesday', hours: '7:00 AM - 8:00 PM' },
    { day: 'Thursday', hours: '7:00 AM - 8:00 PM' },
    { day: 'Friday', hours: '7:00 AM - 9:00 PM' },
    { day: 'Saturday', hours: '8:00 AM - 9:00 PM' },
    { day: 'Sunday', hours: '8:00 AM - 7:00 PM' }
  ],
  description: 'Welcome to Brew & Beans, where passion meets precision. We\'re a specialty coffee house and roastery dedicated to bringing you the finest single-origin coffees from around the world. Our expert baristas craft each cup with care, using state-of-the-art equipment and time-honored techniques. Experience the perfect blend of tradition and innovation in every sip.',
  signatureBrews: [
    'Ethiopian Yirgacheffe Pour-Over',
    'House Blend Espresso',
    'Cold Brew Nitro',
    'Signature Cappuccino'
  ],
  sourcingPhilosophy: 'Direct-from-farm partnerships',
  menu: [
    {
      id: 1,
      name: 'Ethiopian Yirgacheffe',
      roastLevel: 'Light',
      flavorNotes: 'Floral, citrus, honey',
      price: 5.50,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400'
    },
    {
      id: 2,
      name: 'Colombian Supremo',
      roastLevel: 'Medium',
      flavorNotes: 'Caramel, nuts, chocolate',
      price: 4.75,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400'
    },
    {
      id: 3,
      name: 'Sumatra Mandheling',
      roastLevel: 'Dark',
      flavorNotes: 'Earthy, spicy, full-bodied',
      price: 5.25,
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400'
    },
    {
      id: 4,
      name: 'House Blend Espresso',
      roastLevel: 'Medium',
      flavorNotes: 'Balanced, smooth, sweet',
      price: 3.50,
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400'
    }
  ],
  amenities: [
    { name: 'Free Wi-Fi', icon: wifiOutline, color: 'blue' },
    { name: 'Card Payment', icon: cardOutline, color: 'purple' },
    { name: 'Outdoor Seating', icon: flowerOutline, color: 'green' },
    { name: 'Roaster On-Site', icon: sparklesOutline, color: 'orange' },
    { name: 'Specialty Beans', icon: cafeSharp, color: 'brown' },
    { name: 'Sustainable', icon: waterOutline, color: 'teal' }
  ],
  reviews: [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'SJ',
      rating: 5.0,
      date: '2 days ago',
      comment: 'Amazing coffee and atmosphere! The Ethiopian pour-over is absolutely incredible. The baristas are knowledgeable and passionate about their craft.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'MC',
      rating: 4.5,
      date: '1 week ago',
      comment: 'Great place to work remotely. Fast WiFi, comfortable seating, and excellent coffee. The house blend is my go-to!'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      avatar: 'ER',
      rating: 5.0,
      date: '2 weeks ago',
      comment: 'Best coffee shop in the city! Love that they roast their own beans. The staff is always friendly and welcoming.'
    }
  ]
});

const goBack = () => {
  router.back();
};

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

const shareShop = () => {
  console.log('Share shop');
};

const callShop = () => {
  console.log('Call shop');
};

const getDirections = () => {
  console.log('Get directions');
};

const addToCart = (item) => {
  console.log('Add to cart:', item);
};

const openFullMap = () => {
  console.log('Open full map');
};

const writeReview = () => {
  console.log('Write review');
};

const bookTable = () => {
  console.log('Book table');
};

const orderNow = () => {
  console.log('Order now');
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
  --purple: #8b5cf6;
  --teal: #14b8a6;
  --red: #ef4444;
}

/* ===== HEADER ===== */
.shop-toolbar {
  --background: transparent;
  --border-width: 0;
  position: absolute;
  top: 0;
  z-index: 10;
  padding: 8px 4px;
}

.header-btn {
  --background: rgba(255, 255, 255, 0.95);
  --color: var(--text-dark);
  width: 44px;
  height: 44px;
  margin: 4px;
  border-radius: 50%;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.header-btn:active {
  transform: scale(0.92);
}

/* ===== CONTENT ===== */
.shop-content {
  --background: var(--bean-cream);
}

.content-wrapper {
  padding: 0 0 120px;
}

/* ===== HERO BANNER ===== */
.hero-banner {
  position: relative;
  width: 100%;
  height: 360px;
  overflow: hidden;
  animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}

.shop-info-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 20px;
  z-index: 5;
}

.shop-name-hero {
  font-size: 28px;
  font-weight: 900;
  color: white;
  margin: 0 0 12px 0;
  line-height: 1.2;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.rating-status-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.rating-compact {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 14px;
}

.rating-compact ion-icon {
  font-size: 18px;
  color: var(--orange);
}

.rating-value {
  font-size: 15px;
  font-weight: 900;
  color: var(--text-dark);
}

.reviews-count {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-light);
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 800;
  backdrop-filter: blur(10px);
}

.status-badge.open {
  background: rgba(39, 174, 96, 0.95);
  color: white;
}

.status-badge.closed {
  background: rgba(158, 158, 158, 0.95);
  color: white;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.status-badge.open .status-dot {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.2); }
}

/* ===== ESSENTIALS CARD ===== */
.essentials-card {
  margin: -30px 20px 20px;
  padding: 24px;
  background: white;
  border-radius: 28px;
  box-shadow: 0 8px 24px rgba(107, 66, 38, 0.12);
  position: relative;
  z-index: 10;
  animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s backwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.essential-item {
  display: flex;
  gap: 16px;
  padding: 16px 0;
}

.essential-item:not(:last-child) {
  border-bottom: 1px solid rgba(107, 66, 38, 0.08);
}

.essential-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
}

.essential-icon ion-icon {
  font-size: 24px;
  color: white;
}

.essential-icon.location {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.essential-icon.clock {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.essential-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.essential-label {
  font-size: 12px;
  font-weight: 800;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.essential-value {
  font-size: 15px;
  font-weight: 800;
  color: var(--text-dark);
  line-height: 1.4;
}

.essential-meta {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-medium);
}

.view-all-hours {
  margin-top: 4px;
  padding: 0;
  background: none;
  border: none;
  font-size: 13px;
  font-weight: 800;
  color: var(--bean-primary);
  cursor: pointer;
  text-align: left;
}

.all-hours-section {
  margin-top: 12px;
  padding-top: 16px;
  border-top: 1px solid rgba(107, 66, 38, 0.08);
}

.hour-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
}

.hour-day {
  font-weight: 700;
  color: var(--text-dark);
}

.hour-time {
  font-weight: 600;
  color: var(--text-medium);
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(107, 66, 38, 0.08);
}

.quick-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border: none;
  border-radius: 16px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-btn:active {
  transform: scale(0.96);
}

.quick-btn ion-icon {
  font-size: 20px;
}

.quick-btn.call {
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.25);
}

.quick-btn.directions {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

/* ===== MENU SECTION ===== */
.menu-section {
  margin: 0 20px 20px;
  animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards;
}

.section-title {
  font-size: 22px;
  font-weight: 900;
  color: var(--text-dark);
  margin: 0 0 16px 0;
  letter-spacing: -0.3px;
}

.menu-items {
  display: grid;
  gap: 16px;
}

.menu-item-card {
  display: flex;
  gap: 14px;
  padding: 14px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(107, 66, 38, 0.08);
  transition: all 0.3s ease;
}

.menu-item-card:active {
  transform: scale(0.98);
}

.menu-item-image-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 16px;
  overflow: hidden;
}

.menu-item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.roast-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.roast-badge.light {
  color: #f59e0b;
}

.roast-badge.medium {
  color: #d97706;
}

.roast-badge.dark {
  color: #92400e;
}

.menu-item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu-item-name {
  font-size: 16px;
  font-weight: 900;
  color: var(--text-dark);
  margin: 0 0 4px 0;
  letter-spacing: -0.2px;
}

.menu-item-notes {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-medium);
  margin: 0;
  line-height: 1.4;
}

.menu-item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.menu-item-price {
  font-size: 18px;
  font-weight: 900;
  color: var(--bean-primary);
}

.add-to-cart-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: linear-gradient(135deg, var(--bean-primary), var(--bean-secondary));
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart-btn:active {
  transform: scale(0.94);
}

.add-to-cart-btn ion-icon {
  font-size: 18px;
}

/* ===== DESCRIPTION CARD ===== */
.description-card {
  margin: 0 20px 20px;
  padding: 24px;
  background: white;
  border-radius: 28px;
  box-shadow: 0 4px 12px rgba(107, 66, 38, 0.08);
  animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s backwards;
}

.description-text {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-medium);
  margin: 0 0 24px 0;
  font-weight: 500;
}

.signature-section {
  margin-bottom: 24px;
}

.subsection-title {
  font-size: 17px;
  font-weight: 800;
  color: var(--text-dark);
  margin: 0 0 14px 0;
  letter-spacing: -0.2px;
}

.signature-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.signature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.08), rgba(107, 66, 38, 0.05));
  border-radius: 14px;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-dark);
}

.signature-item ion-icon {
  font-size: 20px;
  color: var(--bean-primary);
}

.philosophy-section {
  padding-top: 24px;
  border-top: 1px solid rgba(107, 66, 38, 0.08);
}

.philosophy-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.12), rgba(39, 174, 96, 0.08));
  border-radius: 16px;
  font-size: 15px;
  font-weight: 800;
  color: var(--green);
}

.philosophy-badge ion-icon {
  font-size: 22px;
}

/* ===== AMENITIES SECTION ===== */
.amenities-section {
  margin: 0 20px 20px;
  animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s backwards;
}

.amenities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.amenity-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 18px 12px;
  background: white;
  border-radius: 18px;
  box-shadow: 0 4px 12px rgba(107, 66, 38, 0.08);
}

.amenity-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.amenity-icon ion-icon {
  font-size: 26px;
  color: white;
}

.amenity-icon.blue {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.amenity-icon.purple {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.amenity-icon.green {
  background: linear-gradient(135deg, #27ae60, #229954);
}

.amenity-icon.orange {
  background: linear-gradient(135deg, #ff9800, #f57c00);
}

.amenity-icon.brown {
  background: linear-gradient(135deg, #6b4226, #3d2317);
}

.amenity-icon.teal {
  background: linear-gradient(135deg, #14b8a6, #0d9488);
}

.amenity-name {
  font-size: 11px;
  font-weight: 800;
  color: var(--text-dark);
  text-align: center;
  line-height: 1.3;
}

/* ===== MAP SECTION ===== */
.map-section {
  margin: 0 20px 20px;
  animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.5s backwards;
}

.map-container {
  width: 100%;
  height: 200px;
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
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  position: relative;
}

.map-placeholder > ion-icon {
  font-size: 56px;
  color: var(--bean-primary);
}

.map-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.map-address {
  font-size: 15px;
  font-weight: 800;
  color: var(--text-dark);
  line-height: 1.4;
}

.map-distance {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-medium);
}

.map-expand-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(107, 66, 38, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
}

.map-expand-btn:active {
  transform: scale(0.9);
}

.map-expand-btn ion-icon {
  font-size: 20px;
  color: var(--bean-primary);
}

/* ===== REVIEWS SECTION ===== */
.reviews-section {
  margin: 0 20px 20px;
  animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s backwards;
}

.reviews-header {
  margin-bottom: 16px;
}

.reviews-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}

.reviews-avg {
  font-size: 32px;
  font-weight: 900;
  color: var(--text-dark);
  line-height: 1;
}

.reviews-stars {
  display: flex;
  gap: 4px;
}

.reviews-stars ion-icon {
  font-size: 18px;
  color: var(--orange);
}

.reviews-total {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-light);
  margin-left: 4px;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 16px;
}

.review-card {
  padding: 18px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(107, 66, 38, 0.08);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.reviewer-info {
  display: flex;
  gap: 12px;
}

.reviewer-avatar {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bean-accent), #c49563);
  border-radius: 50%;
  font-size: 16px;
  font-weight: 900;
  color: white;
  flex-shrink: 0;
}

.reviewer-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.reviewer-name {
  font-size: 15px;
  font-weight: 800;
  color: var(--text-dark);
}

.review-date {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-light);
}

.review-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.12), rgba(255, 152, 0, 0.08));
  border-radius: 12px;
  font-size: 14px;
  font-weight: 900;
  color: var(--orange);
}

.review-rating ion-icon {
  font-size: 16px;
}

.review-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-medium);
  margin: 0;
  font-weight: 500;
}

.write-review-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  background: white;
  border: 2px dashed rgba(107, 66, 38, 0.2);
  border-radius: 18px;
  font-size: 15px;
  font-weight: 800;
  color: var(--bean-primary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.write-review-btn:active {
  transform: scale(0.98);
}

.write-review-btn ion-icon {
  font-size: 20px;
}

/* ===== FLOATING ACTIONS ===== */
.floating-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 16px 20px;
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
  background: linear-gradient(to top, rgba(250, 248, 245, 0.98), rgba(250, 248, 245, 0.95));
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(107, 66, 38, 0.08);
  z-index: 100;
  animation: slideUpBottom 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.7s backwards;
}

@keyframes slideUpBottom {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.floating-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  border: none;
  border-radius: 18px;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.2px;
}

.floating-btn:active {
  transform: scale(0.96);
}

.floating-btn ion-icon {
  font-size: 22px;
}

.floating-btn.primary {
  background: linear-gradient(135deg, #6b4226, #3d2317);
  color: white;
  box-shadow: 0 6px 20px rgba(107, 66, 38, 0.3);
}

.floating-btn.secondary {
  background: white;
  color: var(--text-dark);
  box-shadow: 0 4px 16px rgba(107, 66, 38, 0.12);
}

.floating-btn.secondary ion-icon {
  color: var(--bean-primary);
}

/* ===== RESPONSIVE ===== */
@media (min-width: 480px) {
  .amenities-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (min-width: 768px) {
  .content-wrapper {
    max-width: 700px;
    margin: 0 auto;
  }
}
</style>