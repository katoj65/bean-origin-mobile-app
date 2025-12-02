<template>
  <ion-page>
    <!-- HEADER -->
    <ion-header class="ion-no-border" translucent>
      <ion-toolbar class="custom-toolbar" :class="{ 'transparent-toolbar': isScanning }">
        <ion-buttons slot="start">
          <ion-button @click="goBack" class="back-btn">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="page-title">Scan to Buy</ion-title>
        <ion-buttons slot="end" v-if="isScanning">
          <ion-button @click="toggleFlash" class="flash-btn">
            <ion-icon :icon="flashOn ? flash : flashOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="content-bg">
      <!-- SCANNING VIEW -->
      <div v-if="!productFound && !orderPlaced" class="scanner-container">
        <div class="camera-view">
          <div class="camera-background">
            <div class="gradient-orb orb-1"></div>
            <div class="gradient-orb orb-2"></div>
            <div class="gradient-orb orb-3"></div>
          </div>
          <div class="scan-frame">
            <div class="corner corner-tl"></div>
            <div class="corner corner-tr"></div>
            <div class="corner corner-bl"></div>
            <div class="corner corner-br"></div>
            <div class="scan-line" :class="{ scanning: isScanning }"></div>
            <div class="scan-grid"></div>
          </div>
        </div>

        <div class="scanner-overlay">
          <div class="scanner-info-card">
            <div class="info-header">
              <div class="scanner-icon-modern">
                <ion-icon :icon="qrCodeOutline" class="scanner-icon"></ion-icon>
                <div class="icon-pulse"></div>
              </div>
              <div class="info-text">
                <h2 class="scanner-title">Scan Product Code</h2>
                <p class="scanner-description">Position QR code or barcode within frame</p>
              </div>
            </div>

            <div class="scanner-actions">
              <ion-button fill="solid" class="scan-now-btn" @click="simulateScan" :disabled="isScanning">
                <div class="btn-content">
                  <ion-icon :icon="scanOutline" class="btn-icon"></ion-icon>
                  <span>{{ isScanning ? 'Scanning...' : 'Start Scanning' }}</span>
                </div>
              </ion-button>
              
              <div class="secondary-actions">
                <div class="action-card" @click="showManualEntry = true">
                  <div class="action-icon-wrapper gradient-purple">
                    <ion-icon :icon="createOutline"></ion-icon>
                  </div>
                  <span class="action-label">Manual Entry</span>
                </div>
                
                <div class="action-card" @click="selectFromGallery">
                  <div class="action-icon-wrapper gradient-blue">
                    <ion-icon :icon="imagesOutline"></ion-icon>
                  </div>
                  <span class="action-label">From Gallery</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Scans -->
          <div class="recent-scans-modern" v-if="recentScans.length > 0">
            <div class="recent-header">
              <h4 class="recent-title">Recent Scans</h4>
              <span class="recent-count">{{ recentScans.length }}</span>
            </div>
            <div class="recent-grid">
              <div 
                v-for="scan in recentScans" 
                :key="scan.id"
                class="recent-card"
                @click="loadRecentScan(scan)">
                <div class="recent-image-wrapper">
                  <img :src="scan.image" :alt="scan.name" class="recent-image" />
                  <div class="recent-overlay">
                    <ion-icon :icon="chevronForwardOutline"></ion-icon>
                  </div>
                </div>
                <div class="recent-details">
                  <span class="recent-name">{{ scan.name }}</span>
                  <span class="recent-date">{{ scan.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PRODUCT FOUND VIEW -->
      <div v-if="productFound && !orderPlaced" class="product-view">
        <!-- Success Animation Banner -->
        <div class="success-banner-modern">
          <div class="success-particles">
            <div class="particle" v-for="i in 6" :key="i"></div>
          </div>
          <div class="success-content-wrapper">
            <div class="success-icon-modern">
              <ion-icon :icon="checkmarkCircleOutline" class="success-check"></ion-icon>
            </div>
            <div class="success-text">
              <h3 class="success-title-modern">Product Verified!</h3>
              <p class="success-subtitle-modern">✓ 100% Authentic & Traceable</p>
            </div>
          </div>
        </div>

        <!-- Product Card -->
        <div class="product-card-modern">
          <!-- Product Hero -->
          <div class="product-hero">
            <div class="hero-image-wrapper">
              <img :src="scannedProduct.image" :alt="scannedProduct.name" class="hero-image" />
              <div class="hero-gradient"></div>
            </div>
            <div class="hero-badges">
              <div class="badge-modern verified">
                <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
                <span>Verified</span>
              </div>
              <div class="badge-modern organic">
                <ion-icon :icon="leafOutline"></ion-icon>
                <span>Organic</span>
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="product-info-section">
            <div class="product-header-modern">
              <div>
                <h2 class="product-name-modern">{{ scannedProduct.name }}</h2>
                <p class="product-origin-modern">
                  <ion-icon :icon="locationOutline"></ion-icon>
                  {{ scannedProduct.origin }}
                </p>
              </div>
              <div class="product-price-badge">
                <span class="price-currency">$</span>
                <span class="price-amount">{{ scannedProduct.price }}</span>
              </div>
            </div>

            <!-- Info Cards Grid -->
            <div class="info-cards-grid">
              <div class="info-card-modern">
                <div class="info-icon coffee-icon">☕</div>
                <div class="info-content">
                  <span class="info-label-modern">Roast</span>
                  <span class="info-value-modern">{{ scannedProduct.roastLevel }}</span>
                </div>
              </div>
              <div class="info-card-modern">
                <div class="info-icon water-icon">💧</div>
                <div class="info-content">
                  <span class="info-label-modern">Process</span>
                  <span class="info-value-modern">{{ scannedProduct.process }}</span>
                </div>
              </div>
              <div class="info-card-modern">
                <div class="info-icon mountain-icon">⛰️</div>
                <div class="info-content">
                  <span class="info-label-modern">Altitude</span>
                  <span class="info-value-modern">{{ scannedProduct.altitude }}</span>
                </div>
              </div>
              <div class="info-card-modern">
                <div class="info-icon calendar-icon">📅</div>
                <div class="info-content">
                  <span class="info-label-modern">Harvest</span>
                  <span class="info-value-modern">{{ scannedProduct.harvest }}</span>
                </div>
              </div>
            </div>

            <!-- Tasting Notes -->
            <div class="tasting-section-modern">
              <h4 class="section-title-small">Tasting Profile</h4>
              <div class="tasting-pills">
                <div 
                  v-for="(note, index) in scannedProduct.tastingNotes" 
                  :key="note"
                  class="tasting-pill"
                  :style="{ animationDelay: (index * 0.1) + 's' }">
                  <span class="pill-emoji">{{ getNoteEmoji(note) }}</span>
                  <span class="pill-text">{{ note }}</span>
                </div>
              </div>
            </div>

            <!-- Farmer Card -->
            <div class="farmer-card-modern">
              <div class="farmer-card-header">
                <span class="farmer-badge">👨‍🌾 Sourced From</span>
              </div>
              <div class="farmer-content">
                <div class="farmer-avatar-wrapper">
                  <img :src="scannedProduct.farmer.photo" :alt="scannedProduct.farmer.name" class="farmer-avatar" />
                  <div class="farmer-verified-badge">
                    <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
                  </div>
                </div>
                <div class="farmer-details">
                  <span class="farmer-name-modern">{{ scannedProduct.farmer.name }}</span>
                  <span class="farmer-location-modern">
                    <ion-icon :icon="locationOutline"></ion-icon>
                    {{ scannedProduct.farmer.location }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Quantity & Price Card -->
            <div class="purchase-card">
              <div class="quantity-row">
                <span class="quantity-title">Select Quantity</span>
                <div class="quantity-controls">
                  <button class="qty-control-btn minus" @click="decreaseQuantity">
                    <ion-icon :icon="removeOutline"></ion-icon>
                  </button>
                  <div class="qty-display">
                    <span class="qty-number">{{ quantity }}</span>
                    <span class="qty-unit">bags</span>
                  </div>
                  <button class="qty-control-btn plus" @click="increaseQuantity">
                    <ion-icon :icon="addOutline"></ion-icon>
                  </button>
                </div>
              </div>

              <div class="price-breakdown">
                <div class="price-line">
                  <span>Unit Price (250g)</span>
                  <span>${{ scannedProduct.price }}</span>
                </div>
                <div class="price-line">
                  <span>Quantity</span>
                  <span>× {{ quantity }}</span>
                </div>
                <div class="price-line total-line">
                  <span>Total Amount</span>
                  <span class="total-amount">${{ totalPrice }}</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons-modern">
              <button class="btn-primary-modern" @click="buyNow">
                <div class="btn-shine"></div>
                <ion-icon :icon="cartOutline" class="btn-icon-left"></ion-icon>
                <span>Buy Now - ${{ totalPrice }}</span>
              </button>
              <button class="btn-secondary-modern" @click="scanAnother">
                <ion-icon :icon="scanOutline" class="btn-icon-left"></ion-icon>
                <span>Scan Another Product</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ORDER CONFIRMATION VIEW -->
      <div v-if="orderPlaced" class="confirmation-view">
        <div class="confirmation-animation">
          <div class="checkmark-circle">
            <div class="checkmark-wrapper">
              <ion-icon :icon="checkmarkOutline" class="checkmark-icon"></ion-icon>
            </div>
          </div>
        </div>

        <div class="confirmation-content">
          <h2 class="confirmation-title">Order Placed Successfully!</h2>
          <p class="confirmation-subtitle">Your coffee is on its way</p>

          <div class="order-summary-card">
            <div class="order-header">
              <span class="order-number">Order #{{ orderNumber }}</span>
              <span class="order-status">Processing</span>
            </div>

            <div class="order-product">
              <img :src="scannedProduct.image" :alt="scannedProduct.name" class="order-product-image" />
              <div class="order-product-info">
                <span class="order-product-name">{{ scannedProduct.name }}</span>
                <span class="order-product-qty">{{ quantity }} × 250g bags</span>
              </div>
              <span class="order-product-price">${{ totalPrice }}</span>
            </div>

            <div class="delivery-info">
              <div class="delivery-row">
                <ion-icon :icon="locationOutline" class="delivery-icon"></ion-icon>
                <div class="delivery-details">
                  <span class="delivery-label">Delivery Address</span>
                  <span class="delivery-value">{{ deliveryAddress }}</span>
                </div>
              </div>
              <div class="delivery-row">
                <ion-icon :icon="timeOutline" class="delivery-icon"></ion-icon>
                <div class="delivery-details">
                  <span class="delivery-label">Estimated Delivery</span>
                  <span class="delivery-value">{{ estimatedDelivery }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="confirmation-actions">
            <ion-button expand="block" fill="solid" class="track-order-btn" @click="trackOrder">
              <ion-icon :icon="navigateOutline" slot="start"></ion-icon>
              Track Order
            </ion-button>
            <ion-button expand="block" fill="clear" class="continue-shopping-btn" @click="continueShopping">
              <ion-icon :icon="scanOutline" slot="start"></ion-icon>
              Scan Another Product
            </ion-button>
            <ion-button expand="block" fill="clear" class="home-btn" @click="goHome">
              <ion-icon :icon="homeOutline" slot="start"></ion-icon>
              Back to Home
            </ion-button>
          </div>
        </div>
      </div>

      <!-- Manual Entry Modal -->
      <div v-if="showManualEntry" class="manual-entry-modal" @click.self="showManualEntry = false">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Enter Product Code</h3>
            <ion-button fill="clear" class="modal-close" @click="showManualEntry = false">
              <ion-icon :icon="closeOutline"></ion-icon>
            </ion-button>
          </div>
          <div class="modal-body">
            <input 
              v-model="manualCode" 
              type="text" 
              class="code-input"
              placeholder="Enter code (e.g., ETH-YRG-2024)"
              @keyup.enter="verifyManualCode"
            />
            <ion-button expand="block" fill="solid" class="verify-btn" @click="verifyManualCode">
              Verify Code
            </ion-button>
          </div>
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
} from "@ionic/vue";
import {
  arrowBackOutline,
  flashOutline,
  flash,
  qrCodeOutline,
  scanOutline,
  createOutline,
  imagesOutline,
  chevronForwardOutline,
  checkmarkCircleOutline,
  shieldCheckmarkOutline,
  leafOutline,
  locationOutline,
  personOutline,
  removeOutline,
  addOutline,
  cartOutline,
  checkmarkOutline,
  timeOutline,
  navigateOutline,
  homeOutline,
  closeOutline,
} from "ionicons/icons";

const router = useRouter();

const isScanning = ref(false);
const flashOn = ref(false);
const productFound = ref(false);
const orderPlaced = ref(false);
const showManualEntry = ref(false);
const manualCode = ref('');
const quantity = ref(1);
const orderNumber = ref('BO-2024-' + Math.floor(Math.random() * 10000));

const scannedProduct = ref({
  name: "Ethiopian Yirgacheffe",
  origin: "Yirgacheffe, Ethiopia",
  price: 18.99,
  roastLevel: "Medium",
  process: "Washed",
  altitude: "1,800-2,200m",
  harvest: "Nov 2024",
  tastingNotes: ["Citrus", "Floral", "Bergamot", "Honey"],
  image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600",
  farmer: {
    name: "Alemayehu Tadesse",
    location: "Gedeo Zone, Ethiopia",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
  }
});

const recentScans = ref([
  {
    id: 1,
    name: "Colombian Supremo",
    date: "2 days ago",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200"
  },
  {
    id: 2,
    name: "Kenya AA",
    date: "1 week ago",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200"
  }
]);

const deliveryAddress = ref("123 Coffee Street, Kampala, Uganda");
const estimatedDelivery = ref("3-5 business days");

const totalPrice = computed(() => {
  return (scannedProduct.value.price * quantity.value).toFixed(2);
});

const goBack = () => {
  router.back();
};

const toggleFlash = () => {
  flashOn.value = !flashOn.value;
};

const simulateScan = () => {
  isScanning.value = true;
  setTimeout(() => {
    isScanning.value = false;
    productFound.value = true;
  }, 2000);
};

const selectFromGallery = () => {
  console.log('Select from gallery');
  // Simulate selecting image
  setTimeout(() => {
    productFound.value = true;
  }, 1000);
};

const loadRecentScan = (scan) => {
  console.log('Load recent scan:', scan);
  productFound.value = true;
};

const verifyManualCode = () => {
  if (manualCode.value.trim()) {
    showManualEntry.value = false;
    productFound.value = true;
    manualCode.value = '';
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const increaseQuantity = () => {
  quantity.value++;
};

const buyNow = () => {
  orderPlaced.value = true;
};

const scanAnother = () => {
  productFound.value = false;
  quantity.value = 1;
};

const trackOrder = () => {
  console.log('Track order:', orderNumber.value);
  router.push('/orders');
};

const continueShopping = () => {
  orderPlaced.value = false;
  productFound.value = false;
  quantity.value = 1;
  orderNumber.value = 'BO-2024-' + Math.floor(Math.random() * 10000);
};

const goHome = () => {
  router.push('/');
};

const getNoteEmoji = (note) => {
  const emojiMap = {
    'Citrus': '🍋',
    'Floral': '🌸',
    'Bergamot': '🫖',
    'Honey': '🍯',
    'Chocolate': '🍫',
    'Berry': '🫐',
    'Caramel': '🍮'
  };
  return emojiMap[note] || '✨';
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
  --blue: #2196f3;
  --orange: #ff9800;
}

/* ===== HEADER ===== */
.custom-toolbar {
  --background: white;
  --border-width: 0;
  padding: 8px 4px;
  transition: all 0.3s ease;
}

.transparent-toolbar {
  --background: transparent;
}

.transparent-toolbar .page-title,
.transparent-toolbar .back-btn,
.transparent-toolbar .flash-btn {
  --color: white;
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.back-btn,
.flash-btn {
  --color: var(--coffee-dark);
}

/* ===== CONTENT ===== */
.content-bg {
  --background: #f2f2f2;
}

/* ===== SCANNER VIEW ===== */
.scanner-container {
  position: relative;
  min-height: 100%;
}

.camera-view {
  position: relative;
  height: 450px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.camera-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%);
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float 8s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #a87b54 0%, #6b4226 100%);
  bottom: -80px;
  right: -80px;
  animation-delay: 2s;
}

.orb-3 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  top: 50%;
  right: -50px;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.scan-frame {
  position: relative;
  width: 300px;
  height: 300px;
}

.scan-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(39, 174, 96, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(39, 174, 96, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
}

.corner {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 4px solid var(--green);
  border-radius: 4px;
}

.corner-tl {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
}

.corner-tr {
  top: 0;
  right: 0;
  border-left: none;
  border-bottom: none;
}

.corner-bl {
  bottom: 0;
  left: 0;
  border-right: none;
  border-top: none;
}

.corner-br {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
}

.scan-line {
  position: absolute;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--green), transparent);
  box-shadow: 0 0 20px var(--green);
  top: 0;
  opacity: 0;
}

.scan-line.scanning {
  opacity: 1;
  animation: scan 2.5s ease-in-out infinite;
}

@keyframes scan {
  0%, 100% {
    top: 0;
  }
  50% {
    top: calc(100% - 3px);
  }
}

.scanner-overlay {
  padding: 24px 16px;
}

.scanner-info-card {
  background: white;
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.info-header {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
}

.scanner-icon-modern {
  position: relative;
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, rgba(168, 123, 84, 0.1), rgba(168, 123, 84, 0.2));
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.scanner-icon {
  font-size: 36px;
  color: var(--coffee-medium);
  position: relative;
  z-index: 1;
}

.icon-pulse {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  border: 2px solid var(--coffee-light);
  animation: pulse 2s ease-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.3);
    opacity: 0;
  }
}

.info-text {
  flex: 1;
}

.scanner-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 6px 0;
}

.scanner-description {
  font-size: 14px;
  color: var(--text-light);
  margin: 0;
  line-height: 1.5;
}

.scanner-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.scan-now-btn {
  --background: linear-gradient(135deg, var(--coffee-dark) 0%, var(--coffee-medium) 100%);
  --border-radius: 16px;
  height: 56px;
  font-weight: 700;
  font-size: 16px;
  overflow: hidden;
  position: relative;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-icon {
  font-size: 22px;
}

.secondary-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.action-card {
  background: #f8f8f8;
  padding: 20px 16px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.action-card:active {
  transform: scale(0.97);
  border-color: var(--coffee-light);
}

.action-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: white;
}

.gradient-purple {
  background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%);
}

.gradient-blue {
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
}

.action-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--coffee-dark);
  text-align: center;
}

/* ===== RECENT SCANS MODERN ===== */
.recent-scans-modern {
  background: white;
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.recent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.recent-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0;
}

.recent-count {
  background: var(--coffee-light);
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 10px;
}

.recent-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.recent-card {
  background: #f8f8f8;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.recent-card:active {
  transform: scale(0.97);
}

.recent-image-wrapper {
  position: relative;
  width: 100%;
  height: 120px;
  overflow: hidden;
}

.recent-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recent-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.recent-card:hover .recent-overlay {
  opacity: 1;
}

.recent-overlay ion-icon {
  font-size: 24px;
  color: white;
}

.recent-details {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.recent-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.recent-date {
  font-size: 11px;
  color: var(--text-light);
  font-weight: 600;
}

/* ===== PRODUCT VIEW MODERN ===== */
.product-view {
  padding: 0 0 24px;
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-banner-modern {
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
  padding: 28px 24px;
  position: relative;
  overflow: hidden;
}

.success-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.success-particles .particle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: particleFloat 3s ease-in-out infinite;
}

.success-particles .particle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
.success-particles .particle:nth-child(2) { top: 40%; left: 80%; animation-delay: 0.5s; }
.success-particles .particle:nth-child(3) { top: 60%; left: 30%; animation-delay: 1s; }
.success-particles .particle:nth-child(4) { top: 80%; left: 70%; animation-delay: 1.5s; }
.success-particles .particle:nth-child(5) { top: 30%; left: 50%; animation-delay: 2s; }
.success-particles .particle:nth-child(6) { top: 70%; left: 90%; animation-delay: 2.5s; }

@keyframes particleFloat {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px);
    opacity: 1;
  }
}

.success-content-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 1;
}

.success-icon-modern {
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scaleIn 0.5s ease-out;
}

.success-check {
  font-size: 32px;
  color: white;
}

.success-text {
  flex: 1;
}

.success-title-modern {
  font-size: 22px;
  font-weight: 700;
  color: white;
  margin: 0 0 4px 0;
}

.success-subtitle-modern {
  font-size: 14px;
  color: white;
  margin: 0;
  opacity: 0.95;
}

.product-card-modern {
  background: white;
  border-radius: 32px 32px 0 0;
  overflow: hidden;
  margin-top: -16px;
  position: relative;
  z-index: 2;
}

.product-hero {
  position: relative;
  height: 320px;
}

.hero-image-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%);
}

.hero-badges {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.badge-modern {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 700;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: slideInRight 0.6s ease-out;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.badge-modern.verified {
  background: rgba(39, 174, 96, 0.95);
  color: white;
}

.badge-modern.organic {
  background: rgba(255, 255, 255, 0.95);
  color: var(--green);
}

.badge-modern ion-icon {
  font-size: 16px;
}

.product-info-section {
  padding: 28px 24px 32px;
}

.product-header-modern {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 28px;
}

.product-name-modern {
  font-size: 28px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.product-origin-modern {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  color: var(--text-light);
  margin: 0;
  font-weight: 600;
}

.product-origin-modern ion-icon {
  font-size: 18px;
}

.product-price-badge {
  background: linear-gradient(135deg, var(--green) 0%, #229954 100%);
  padding: 12px 18px;
  border-radius: 16px;
  display: flex;
  align-items: baseline;
  gap: 2px;
  box-shadow: 0 4px 16px rgba(39, 174, 96, 0.3);
  flex-shrink: 0;
}

.price-currency {
  font-size: 18px;
  font-weight: 700;
  color: white;
}

.price-amount {
  font-size: 28px;
  font-weight: 700;
  color: white;
}

.info-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}

.info-card-modern {
  background: #f8f8f8;
  padding: 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.info-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.info-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label-modern {
  font-size: 11px;
  color: var(--text-light);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value-modern {
  font-size: 14px;
  color: var(--coffee-dark);
  font-weight: 700;
}

.tasting-section-modern {
  margin-bottom: 28px;
}

.section-title-small {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 14px 0;
}

.tasting-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tasting-pill {
  background: linear-gradient(135deg, rgba(168, 123, 84, 0.08), rgba(168, 123, 84, 0.12));
  padding: 10px 16px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 2px solid rgba(168, 123, 84, 0.2);
  animation: fadeInScale 0.6s ease-out both;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.pill-emoji {
  font-size: 18px;
}

.pill-text {
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-medium);
}

.farmer-card-modern {
  background: linear-gradient(135deg, #f8f8f8 0%, #f0f0f0 100%);
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 28px;
  border: 2px solid rgba(168, 123, 84, 0.1);
}

.farmer-card-header {
  margin-bottom: 16px;
}

.farmer-badge {
  background: white;
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  color: var(--coffee-medium);
  display: inline-block;
}

.farmer-content {
  display: flex;
  align-items: center;
  gap: 14px;
}

.farmer-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.farmer-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.farmer-verified-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 24px;
  height: 24px;
  background: var(--green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
}

.farmer-verified-badge ion-icon {
  font-size: 14px;
  color: white;
}

.farmer-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.farmer-name-modern {
  font-size: 16px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.farmer-location-modern {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--text-light);
  font-weight: 600;
}

.farmer-location-modern ion-icon {
  font-size: 14px;
}

.purchase-card {
  background: linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%);
  padding: 24px;
  border-radius: 20px;
  margin-bottom: 24px;
  border: 2px solid rgba(168, 123, 84, 0.15);
}

.quantity-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.quantity-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.qty-control-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: none;
  background: white;
  color: var(--coffee-medium);
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.qty-control-btn:active {
  transform: scale(0.95);
}

.qty-control-btn.minus {
  background: #f0f0f0;
}

.qty-control-btn.plus {
  background: var(--coffee-medium);
  color: white;
}

.qty-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 50px;
}

.qty-number {
  font-size: 24px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.qty-unit {
  font-size: 11px;
  color: var(--text-light);
  font-weight: 600;
}

.price-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.price-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: var(--text-light);
  font-weight: 600;
}

.price-line.total-line {
  padding-top: 12px;
  border-top: 2px solid #e0e0e0;
  margin-top: 8px;
}

.price-line.total-line span:first-child {
  font-size: 16px;
  color: var(--coffee-dark);
  font-weight: 700;
}

.total-amount {
  font-size: 28px;
  font-weight: 700;
  color: var(--green);
}

.action-buttons-modern {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-primary-modern {
  width: 100%;
  height: 58px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, var(--coffee-dark) 0%, var(--coffee-medium) 100%);
  color: white;
  font-size: 17px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(74, 44, 42, 0.3);
}

.btn-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shine 3s ease-in-out infinite;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%);
  }
  100% {
    transform: translateX(100%) translateY(100%);
  }
}

.btn-primary-modern:active {
  transform: scale(0.98);
}

.btn-icon-left {
  font-size: 22px;
  position: relative;
  z-index: 1;
}

.btn-primary-modern span {
  position: relative;
  z-index: 1;
}

.btn-secondary-modern {
  width: 100%;
  height: 54px;
  border-radius: 16px;
  border: 2px solid var(--coffee-medium);
  background: transparent;
  color: var(--coffee-medium);
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary-modern:active {
  transform: scale(0.98);
  background: rgba(168, 123, 84, 0.05);
}

/* ===== CONFIRMATION VIEW ===== */
.confirmation-view {
  padding: 40px 16px 24px;
  text-align: center;
}

.confirmation-animation {
  margin-bottom: 32px;
}

.checkmark-circle {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, var(--green) 0%, #229954 100%);
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scaleIn 0.6s ease-out;
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.checkmark-wrapper {
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkmark-icon {
  font-size: 56px;
  color: white;
}

.confirmation-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 8px 0;
}

.confirmation-subtitle {
  font-size: 15px;
  color: var(--text-light);
  margin: 0 0 32px 0;
}

.order-summary-card {
  background: white;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 24px;
  text-align: left;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.order-number {
  font-size: 15px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.order-status {
  background: rgba(255, 152, 0, 0.1);
  color: var(--orange);
  padding: 4px 12px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
}

.order-product {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.order-product-image {
  width: 70px;
  height: 70px;
  border-radius: 12px;
  object-fit: cover;
}

.order-product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-product-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.order-product-qty {
  font-size: 13px;
  color: var(--text-light);
}

.order-product-price {
  font-size: 18px;
  font-weight: 700;
  color: var(--green);
}

.delivery-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.delivery-row {
  display: flex;
  gap: 12px;
}

.delivery-icon {
  font-size: 22px;
  color: var(--coffee-light);
  flex-shrink: 0;
}

.delivery-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.delivery-label {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 600;
}

.delivery-value {
  font-size: 14px;
  color: var(--coffee-dark);
  font-weight: 600;
}

.confirmation-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.track-order-btn {
  --background: var(--coffee-dark);
  --border-radius: 14px;
  height: 52px;
  font-weight: 700;
}

.continue-shopping-btn,
.home-btn {
  --color: var(--coffee-medium);
  --border-radius: 14px;
  height: 48px;
  font-weight: 600;
}

/* ===== MANUAL ENTRY MODAL ===== */
.manual-entry-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  border-radius: 24px 24px 0 0;
  width: 100%;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0;
}

.modal-close {
  --color: var(--text-light);
  margin: 0;
}

.modal-body {
  padding: 24px;
}

.code-input {
  width: 100%;
  padding: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  color: var(--coffee-dark);
  margin-bottom: 16px;
}

.code-input:focus {
  outline: none;
  border-color: var(--coffee-light);
}

.verify-btn {
  --background: var(--coffee-dark);
  --border-radius: 12px;
  height: 52px;
  font-weight: 700;
}
</style>