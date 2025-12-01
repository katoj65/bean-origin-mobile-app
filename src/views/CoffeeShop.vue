<script setup>
import AppLayout from './template/AppLayout.vue';
import { ref,reactive } from 'vue';
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
  shareOutline,
  star,
  locationOutline,
  timeOutline,
  navigateOutline,
  callOutline,
  mailOutline,
  globeOutline,
  wifiOutline,
  peopleOutline,
  bookOutline,
  musicalNotesOutline,
  laptopOutline,
} from "ionicons/icons";


  const  activeTab='products';
   const  shop= {
        id: 1,
        name: "The Daily Grind",
        category: "Specialty Coffee Shop",
        rating: 4.8,
        reviews: 324,
        logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200",
        address: "123 Main Street, Downtown",
        hours: "7:00 AM - 8:00 PM",
        distance: "0.5 km",
        phone: "+1 (555) 123-4567",
        email: "hello@dailygrind.com",
        website: "www.dailygrind.com",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
        features: ["WiFi", "Outdoor Seating", "Vegan Options", "Takeaway", "Pet Friendly"],
        story: "Established in 2015, The Daily Grind has been serving the finest specialty coffee in the heart of downtown. Our passion for quality beans and expert brewing techniques has made us a beloved destination for coffee enthusiasts. We source our beans directly from sustainable farms and roast them fresh daily.",
        schedule: [
          { day: "Monday", hours: "7:00 AM - 8:00 PM" },
          { day: "Tuesday", hours: "7:00 AM - 8:00 PM" },
          { day: "Wednesday", hours: "7:00 AM - 8:00 PM" },
          { day: "Thursday", hours: "7:00 AM - 8:00 PM" },
          { day: "Friday", hours: "7:00 AM - 9:00 PM" },
          { day: "Saturday", hours: "8:00 AM - 9:00 PM" },
          { day: "Sunday", hours: "8:00 AM - 6:00 PM" },
        ]
      };

 const products= [
        {
          id: 1,
          name: "Espresso",
          description: "Rich, bold single shot",
          price: 3.50,
          image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400"
        },
        {
          id: 2,
          name: "Cappuccino",
          description: "Espresso with steamed milk foam",
          price: 4.50,
          image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400"
        },
        {
          id: 3,
          name: "Latte",
          description: "Smooth espresso with milk",
          price: 4.75,
          image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400"
        },
        {
          id: 4,
          name: "Cold Brew",
          description: "Smooth, refreshing iced coffee",
          price: 4.25,
          image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400"
        },
        {
          id: 5,
          name: "Mocha",
          description: "Espresso with chocolate",
          price: 5.00,
          image: "https://images.unsplash.com/photo-1607260550778-aa9d29444ce1?w=400"
        },
        {
          id: 6,
          name: "Croissant",
          description: "Fresh baked, buttery",
          price: 3.00,
          image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400"
        }
      ];

  const services=[
        {
          id: 1,
          name: "Free WiFi",
          description: "High-speed internet for all customers",
          type: "wifi",
          price: null,
          duration: "Unlimited"
        },
        {
          id: 2,
          name: "Coffee Workshops",
          description: "Learn brewing techniques from our baristas",
          type: "workshop",
          price: 25.00,
          duration: "2 hours"
        },
        {
          id: 3,
          name: "Private Events",
          description: "Book our space for meetings or celebrations",
          type: "events",
          price: 150.00,
          duration: "Per hour"
        },
        {
          id: 4,
          name: "Coffee Subscription",
          description: "Monthly delivery of fresh roasted beans",
          type: "subscription",
          price: 30.00,
          duration: "Monthly"
        },
        {
          id: 5,
          name: "Coworking Space",
          description: "Dedicated workspace with power outlets",
          type: "coworking",
          price: 10.00,
          duration: "Per day"
        },
        {
          id: 6,
          name: "Live Music",
          description: "Enjoy live acoustic performances on weekends",
          type: "music",
          price: null,
          duration: "Weekends 7-9 PM"
        }
      ];


</script>
<template>
<app-layout title="Coffee Shop">

<template #content>








    <ion-content fullscreen class="content-bg">
      <!-- SHOP INFO CARD -->
      <div class="info-card">
        <!-- Logo and Basic Info -->
        <div class="shop-header">
          <div class="logo-wrapper">
            <div class="logo-container">
              <img :src="shop.logo" :alt="shop.name" class="shop-logo" />
            </div>
          </div>
          
          <div class="shop-main-info">
            <div class="name-rating-row">
              <div class="name-section">
                <h1 class="shop-name">{{ shop.name }}</h1>
                <p class="shop-category">{{ shop.category }}</p>
              </div>
              <div class="rating-box">
                <ion-icon :icon="star" class="star-icon"></ion-icon>
                <span class="rating-text">{{ shop.rating }}</span>
              </div>
            </div>
            
            <div class="reviews-features">
              <span class="reviews-count">{{ shop.reviews }} reviews</span>
              <div class="top-features">
                <span v-for="(feature, index) in shop.features.slice(0, 2)" :key="index" class="mini-tag">
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Info -->
        <div class="quick-info">
          <div class="info-item">
            <ion-icon :icon="locationOutline" class="info-icon"></ion-icon>
            <div>
              <p class="info-label">Address</p>
              <p class="info-value">{{ shop.address }}</p>
            </div>
          </div>
          
          <div class="info-item">
            <ion-icon :icon="timeOutline" class="info-icon"></ion-icon>
            <div>
              <p class="info-label">Hours</p>
              <p class="info-value">{{ shop.hours }}</p>
            </div>
          </div>
          
          <div class="info-item">
            <ion-icon :icon="navigateOutline" class="info-icon"></ion-icon>
            <div>
              <p class="info-label">Distance</p>
              <p class="info-value">{{ shop.distance }}</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <ion-button expand="block" fill="solid" class="primary-btn" @click="getDirections">
            <ion-icon :icon="navigateOutline" slot="start"></ion-icon>
            Get Directions
          </ion-button>
          <ion-button expand="block" fill="outline" class="secondary-btn" @click="callShop">
            <ion-icon :icon="callOutline" slot="start"></ion-icon>
            Call Now
          </ion-button>
        </div>

        <!-- Features -->
        <div class="features">
          <span v-for="feature in shop.features" :key="feature" class="feature-tag">
            {{ feature }}
          </span>
        </div>
      </div>

      <!-- TABS -->
      <div class="tabs">
        <div 
          class="tab" 
          :class="{ active: activeTab === 'products' }"
          @click="activeTab = 'products'">
          Products
        </div>
        <div 
          class="tab" 
          :class="{ active: activeTab === 'services' }"
          @click="activeTab = 'services'">
          Services
        </div>
        <div 
          class="tab" 
          :class="{ active: activeTab === 'about' }"
          @click="activeTab = 'about'">
          About
        </div>
      </div>

      <!-- PRODUCTS TAB -->
      <div v-if="activeTab === 'products'" class="tab-content">
        <div class="products-container">
          <div 
            v-for="(product, index) in products" 
            :key="product.id" 
            class="product-card"
            :style="{ animationDelay: `${index * 0.05}s` }">
            
            <div class="product-image-container">
              <img :src="product.image" :alt="product.name" class="product-image" />
            </div>

            <div class="product-content">
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-description">{{ product.description }}</p>
              </div>

              <div class="product-footer">
                <div class="product-price">
                  <span class="price-label">From</span>
                  <span class="price">${{ product.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SERVICES TAB -->
      <div v-if="activeTab === 'services'" class="tab-content">
        <div class="services-container">
          <div 
            v-for="(service, index) in services" 
            :key="service.id" 
            class="service-card"
            :style="{ animationDelay: `${index * 0.05}s` }">
            
            <div class="service-icon-container">
              <ion-icon :icon="getServiceIcon(service.type)" class="service-icon"></ion-icon>
            </div>

            <div class="service-content">
              <h3 class="service-name">{{ service.name }}</h3>
              <p class="service-description">{{ service.description }}</p>
              <div class="service-footer">
                <span v-if="service.price" class="service-price">${{ service.price }}</span>
                <span v-else class="service-free">Free</span>
                <span class="service-duration">{{ service.duration }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ABOUT TAB -->
      <div v-if="activeTab === 'about'" class="tab-content">
        <div class="about-container">
          <div class="about-section">
            <h3 class="section-title">Our Story</h3>
            <p class="section-text">{{ shop.story }}</p>
          </div>

          <div class="about-section">
            <h3 class="section-title">Contact Information</h3>
            <div class="contact-item">
              <ion-icon :icon="callOutline" class="contact-icon"></ion-icon>
              <span>{{ shop.phone }}</span>
            </div>
            <div class="contact-item">
              <ion-icon :icon="mailOutline" class="contact-icon"></ion-icon>
              <span>{{ shop.email }}</span>
            </div>
            <div class="contact-item">
              <ion-icon :icon="globeOutline" class="contact-icon"></ion-icon>
              <span>{{ shop.website }}</span>
            </div>
          </div>

          <div class="about-section">
            <h3 class="section-title">Opening Hours</h3>
            <div v-for="day in shop.schedule" :key="day.day" class="schedule-item">
              <span class="day-name">{{ day.day }}</span>
              <span class="day-hours">{{ day.hours }}</span>
            </div>
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
  --accent: #d4a574;
  --text-dark: #2c1810;
  --text-light: #8b7355;
  --card-bg: #ffffff;
  --shadow-sm: 0 2px 8px rgba(74, 44, 42, 0.08);
  --shadow-md: 0 8px 24px rgba(74, 44, 42, 0.12);
  --shadow-lg: 0 16px 48px rgba(74, 44, 42, 0.16);
}

/* ===== HEADER ===== */
.custom-toolbar {
  --background: transparent;
  --border-width: 0;
  padding: 8px 4px;
}

.header-btn-circle {
  --color: var(--coffee-dark);
  --background: rgba(245, 241, 232, 0.8);
  --border-radius: 12px;
  backdrop-filter: blur(10px);
  margin: 0 4px;
}

/* ===== CONTENT ===== */
.content-bg {
  --background: #f2f2f2;
}

/* ===== INFO CARD ===== */
.info-card {
  background: white;
  margin: 16px 16px 16px;
  padding: 24px;
  border-radius: 24px;
  animation: fadeInUp 0.6s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.8);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.shop-header {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.logo-wrapper {
  flex-shrink: 0;
}

.logo-container {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  overflow: hidden;
  background: #f5f1e8;
  border: 3px solid white;
}

.shop-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shop-main-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.name-rating-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.name-section {
  flex: 1;
  min-width: 0;
}

.shop-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0 0 4px 0;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.shop-category {
  font-size: 13px;
  color: var(--text-light);
  margin: 0;
  font-weight: 500;
}

.rating-box {
  display: flex;
  align-items: center;
  gap: 3px;
  background: rgba(243, 156, 18, 0.15);
  padding: 6px 10px;
  border-radius: 10px;
  flex-shrink: 0;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.star-icon {
  color: #f39c12;
  font-size: 14px;
}

.rating-text {
  font-weight: 700;
  font-size: 15px;
  color: var(--coffee-dark);
}

.reviews-features {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.reviews-count {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 500;
}

.top-features {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.mini-tag {
  background: rgba(168, 123, 84, 0.12);
  color: var(--coffee-medium);
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
}

/* ===== QUICK INFO ===== */
.quick-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  background: rgba(168, 123, 84, 0.04);
  padding: 16px;
  border-radius: 16px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  transition: transform 0.2s ease;
}

.info-item:active {
  transform: translateX(4px);
}

.info-icon {
  color: var(--coffee-light);
  font-size: 22px;
  margin-top: 2px;
}

.info-label {
  font-size: 11px;
  color: var(--text-light);
  margin: 0 0 2px 0;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 14px;
  color: var(--text-dark);
  margin: 0;
  font-weight: 500;
}

/* ===== ACTION BUTTONS ===== */
.action-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.primary-btn {
  --background: var(--coffee-dark);
  --color: var(--cream);
  --border-radius: 14px;
  --border-style: solid;
  --border-width: 2px;
  --border-color: var(--coffee-medium);
  height: 48px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
}

.primary-btn:active {
  transform: scale(0.98);
  --border-color: var(--coffee-dark);
}

.secondary-btn {
  --border-color: var(--coffee-dark);
  --border-width: 2px;
  --color: var(--coffee-dark);
  --border-radius: 14px;
  --background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  height: 48px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
}

.secondary-btn:active {
  transform: scale(0.98);
  --background: rgba(245, 241, 232, 0.5);
}

/* ===== FEATURES ===== */
.features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tag {
  background: rgba(168, 123, 84, 0.12);
  color: var(--coffee-medium);
  padding: 8px 14px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid rgba(168, 123, 84, 0.2);
  transition: all 0.3s ease;
}

.feature-tag:active {
  transform: scale(0.95);
  background: rgba(168, 123, 84, 0.2);
}

/* ===== TABS ===== */
.tabs {
  display: flex;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  margin: 16px;
  border-radius: 16px;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.tab {
  flex: 1;
  text-align: center;
  padding: 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-light);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
}

.tab.active {
  background: var(--coffee-dark);
  color: var(--cream);
  transform: scale(1.02);
}

/* ===== TAB CONTENT ===== */
.tab-content {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ===== PRODUCTS ===== */
.products-container {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-card {
  background: white;
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  min-height: 100px;
  animation: fadeInUp 0.4s ease-out both;
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.product-card:active {
  transform: scale(0.98);
}

.product-image-container {
  width: 100px;
  min-width: 100px;
  height: 100px;
  overflow: hidden;
  background: #f5f1e8;
  position: relative;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.product-card:active .product-image {
  transform: scale(1.05);
}

.product-content {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0 0 4px 0;
}

.product-description {
  font-size: 12px;
  color: var(--text-light);
  margin: 0;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.product-price {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-size: 9px;
  color: var(--text-light);
  text-transform: uppercase;
  font-weight: 600;
}

.price {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
}

/* ===== SERVICES ===== */
.services-container {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.service-card {
  background: white;
  border-radius: 18px;
  padding: 18px;
  display: flex;
  gap: 16px;
  animation: fadeInUp 0.4s ease-out both;
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.service-card:active {
  transform: scale(0.98);
}

.service-icon-container {
  width: 56px;
  height: 56px;
  background: rgba(168, 123, 84, 0.12);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(168, 123, 84, 0.2);
}

.service-icon {
  font-size: 26px;
  color: var(--coffee-dark);
}

.service-content {
  flex: 1;
}

.service-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0 0 4px 0;
}

.service-description {
  font-size: 13px;
  color: var(--text-light);
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.service-footer {
  display: flex;
  gap: 12px;
  align-items: center;
}

.service-price {
  font-size: 15px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.service-free {
  font-size: 13px;
  font-weight: 700;
  color: #27ae60;
}

.service-duration {
  font-size: 12px;
  color: var(--text-light);
}

/* ===== ABOUT ===== */
.about-container {
  padding: 0 16px;
}

.about-section {
  background: white;
  border-radius: 18px;
  padding: 20px;
  margin-bottom: 12px;
  animation: fadeInUp 0.4s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0 0 14px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(168, 123, 84, 0.15);
}

.section-text {
  font-size: 14px;
  color: var(--text-light);
  line-height: 1.6;
  margin: 0;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  font-size: 14px;
  color: var(--text-dark);
  border-bottom: 1px solid #f0f0f0;
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-icon {
  color: var(--coffee-light);
  font-size: 18px;
}

.schedule-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.schedule-item:last-child {
  border-bottom: none;
}

.day-name {
  font-size: 14px;
  color: var(--text-dark);
  font-weight: 600;
}

.day-hours {
  font-size: 14px;
  color: var(--text-light);
}

/* ===== SPACER ===== */
.bottom-spacer {
  height: 20px;
}

/* ===== MOBILE OPTIMIZATIONS ===== */
@media (max-width: 360px) {
  .shop-name {
    font-size: 18px;
  }
  
  .logo-container {
    width: 70px;
    height: 70px;
  }
  
  .action-buttons {
    grid-template-columns: 1fr;
  }
  
  .top-features {
    display: none;
  }
}
</style>