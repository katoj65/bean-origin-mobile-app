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
        <ion-title class="header-title">Carbon Credits</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="showInfo" class="header-button">
            <ion-icon :icon="informationCircleOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="page-content">
      <div class="content-container">

        <!-- YOUR IMPACT CARD -->
        <div class="content-card impact-card">
          <div class="card-header">
            <div class="header-icon green">
              <ion-icon :icon="leafOutline"></ion-icon>
            </div>
            <div class="header-text">
              <h2 class="card-title">Your Coffee's Carbon Impact</h2>
              <p class="card-subtitle">Based on your purchases</p>
            </div>
          </div>

          <div class="impact-stats">
            <div class="impact-main">
              <span class="impact-number">{{ totalEmissions - userCredits }}</span>
              <span class="impact-unit">kg CO₂</span>
            </div>
            <span class="impact-label">Remaining to Offset</span>
          </div>

          <div class="offset-progress">
            <div class="progress-header">
              <span class="progress-label">Offset Progress</span>
              <span class="progress-percent">{{ offsetPercentage }}%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" :style="{ width: offsetPercentage + '%' }"></div>
            </div>
            <div class="progress-stats">
              <span class="progress-stat">{{ userCredits }} kg offset</span>
              <span class="progress-stat">{{ totalEmissions }} kg total</span>
            </div>
          </div>
        </div>

        <!-- COFFEE PURCHASES BREAKDOWN -->
        <div class="content-card purchases-card">
          <div class="card-header">
            <div class="header-icon brown">
              <ion-icon :icon="cafeOutline"></ion-icon>
            </div>
            <div class="header-text">
              <h2 class="card-title">Your Coffee Purchases</h2>
              <p class="card-subtitle">Carbon footprint breakdown</p>
            </div>
          </div>

          <div class="purchases-list">
            <div v-for="purchase in coffeePurchases" :key="purchase.id" class="purchase-item">
              <div class="purchase-image-wrapper">
                <img :src="purchase.image" :alt="purchase.name" class="purchase-image" />
              </div>
              <div class="purchase-info">
                <h4 class="purchase-name">{{ purchase.name }}</h4>
                <div class="purchase-meta">
                  <span class="meta-detail">{{ purchase.weight }}</span>
                  <span class="meta-separator">•</span>
                  <span class="meta-detail">{{ purchase.quantity }}x purchased</span>
                </div>
                <div class="purchase-emissions">
                  <div class="emission-breakdown">
                    <span class="emission-icon">🚜</span>
                    <span class="emission-label">Farm:</span>
                    <span class="emission-value">{{ purchase.emissions.farm }} kg</span>
                  </div>
                  <div class="emission-breakdown">
                    <span class="emission-icon">🚢</span>
                    <span class="emission-label">Transport:</span>
                    <span class="emission-value">{{ purchase.emissions.transport }} kg</span>
                  </div>
                  <div class="emission-breakdown">
                    <span class="emission-icon">🔥</span>
                    <span class="emission-label">Roasting:</span>
                    <span class="emission-value">{{ purchase.emissions.roasting }} kg</span>
                  </div>
                </div>
                <div class="purchase-total">
                  <span class="total-label">Total CO₂:</span>
                  <span class="total-value">{{ purchase.totalEmissions }} kg</span>
                  <span v-if="!purchase.offset" class="offset-status pending">Not offset</span>
                  <span v-else class="offset-status complete">✓ Offset</span>
                </div>
              </div>
            </div>
          </div>

          <div class="purchases-summary">
            <div class="summary-row">
              <span class="summary-label">Total Emissions from Coffee</span>
              <span class="summary-value">{{ totalEmissions }} kg CO₂</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Already Offset</span>
              <span class="summary-value offset">{{ userCredits }} kg CO₂</span>
            </div>
            <div class="summary-row highlight">
              <span class="summary-label">Remaining to Offset</span>
              <span class="summary-value">{{ totalEmissions - userCredits }} kg CO₂</span>
            </div>
          </div>
        </div>

        <!-- CREDIT PACKAGES -->
        <div class="section-header">
          <h2 class="section-title">Offset Your Coffee Emissions</h2>
          <p class="section-subtitle">Choose the right package for your coffee consumption</p>
        </div>

        <div class="packages-grid">
          <div 
            v-for="pkg in packages" 
            :key="pkg.id"
            :class="['package-card', { popular: pkg.popular, selected: selectedPackage === pkg.id, recommended: pkg.id === recommendedPackageId }]"
            @click="selectPackage(pkg.id)">
            
            <div v-if="pkg.popular" class="popular-badge">
              <ion-icon :icon="sparklesOutline"></ion-icon>
              Most Popular
            </div>

            <div v-if="pkg.id === recommendedPackageId && !pkg.popular" class="recommended-badge">
              <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
              Recommended
            </div>

            <div class="package-header">
              <div class="package-icon" :style="{ background: pkg.color }">
                {{ pkg.icon }}
              </div>
              <h3 class="package-name">{{ pkg.name }}</h3>
            </div>

            <div class="package-amount">
              <span class="amount-number">{{ pkg.amount }}</span>
              <span class="amount-unit">kg CO₂</span>
            </div>

            <div class="package-coverage">
              <span class="coverage-text">Covers ~{{ pkg.bags }} bags of coffee</span>
            </div>

            <div class="package-price">
              <span class="price-value">${{ pkg.price }}</span>
              <span class="price-per">${{ (pkg.price / pkg.amount).toFixed(2) }}/kg</span>
            </div>

            <div class="package-features">
              <div class="feature-item" v-for="(feature, index) in pkg.features" :key="index">
                <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
                <span>{{ feature }}</span>
              </div>
            </div>

            <div class="package-equivalent">
              <span class="pkg-equiv-icon">☕</span>
              <span>{{ Math.round(pkg.amount / 2.5) }} cups carbon neutral</span>
            </div>
          </div>
        </div>

        <!-- MONTHLY SUBSCRIPTION -->
        <div class="content-card subscription-card">
          <div class="subscription-header">
            <div class="sub-badge">
              <ion-icon :icon="calendarOutline"></ion-icon>
              SUBSCRIPTION
            </div>
            <div class="sub-info">
              <h3 class="sub-title">Auto-Offset Your Coffee</h3>
              <p class="sub-subtitle">Automatically offset emissions from your monthly coffee purchases</p>
            </div>
          </div>

          <div class="subscription-options">
            <div 
              v-for="sub in subscriptions" 
              :key="sub.id"
              :class="['sub-option', { active: selectedSubscription === sub.id }]"
              @click="selectSubscription(sub.id)">
              <div class="sub-radio">
                <div class="radio-dot" v-if="selectedSubscription === sub.id"></div>
              </div>
              <div class="sub-content">
                <div class="sub-row">
                  <span class="sub-name">{{ sub.name }}</span>
                  <span class="sub-price">${{ sub.price }}/month</span>
                </div>
                <span class="sub-amount">{{ sub.amount }} kg CO₂ monthly (~{{ sub.bags }} bags)</span>
              </div>
            </div>
          </div>

          <div class="subscription-benefits">
            <div class="benefit-item">
              <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
              <span>Automatic offset for all purchases</span>
            </div>
            <div class="benefit-item">
              <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
              <span>Monthly impact reports</span>
            </div>
            <div class="benefit-item">
              <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
              <span>Carbon neutral badge on profile</span>
            </div>
            <div class="benefit-item">
              <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        <!-- PROJECT SHOWCASE -->
        <div class="content-card projects-card">
          <div class="card-header">
            <div class="header-icon purple">
              <ion-icon :icon="globeOutline"></ion-icon>
            </div>
            <div class="header-text">
              <h2 class="card-title">Coffee Supply Chain Projects</h2>
              <p class="card-subtitle">Where your credits make an impact</p>
            </div>
          </div>

          <div class="projects-list">
            <div v-for="project in projects" :key="project.id" class="project-item">
              <div class="project-image-wrapper">
                <img :src="project.image" :alt="project.name" class="project-image" />
                <div class="project-type-badge">{{ project.type }}</div>
              </div>
              <div class="project-info">
                <h4 class="project-name">{{ project.name }}</h4>
                <p class="project-location">
                  <ion-icon :icon="locationOutline"></ion-icon>
                  {{ project.location }}
                </p>
                <p class="project-description">{{ project.description }}</p>
                <div class="project-stats-row">
                  <span class="project-stat">
                    <ion-icon :icon="leafOutline"></ion-icon>
                    {{ project.offset }} tons/year
                  </span>
                  <span class="project-verified">
                    <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- PURCHASE SUMMARY (if package selected) -->
        <div v-if="selectedPackage || selectedSubscription" class="content-card summary-card">
          <div class="summary-header">
            <h3 class="summary-title">Purchase Summary</h3>
          </div>

          <div class="summary-item" v-if="selectedPackage">
            <span class="summary-label">{{ getSelectedPackageName() }}</span>
            <span class="summary-value">${{ getSelectedPackagePrice() }}</span>
          </div>

          <div class="summary-item" v-if="selectedSubscription">
            <span class="summary-label">{{ getSelectedSubscriptionName() }}</span>
            <span class="summary-value">${{ getSelectedSubscriptionPrice() }}/mo</span>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-total">
            <span class="total-label">Total</span>
            <span class="total-value">${{ getTotalPrice() }}</span>
          </div>

          <button class="checkout-btn" @click="proceedToCheckout">
            <span>Proceed to Checkout</span>
            <ion-icon :icon="arrowForwardOutline"></ion-icon>
          </button>
        </div>

        <!-- TRUST SECTION -->
        <div class="trust-section">
          <div class="trust-item">
            <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
            <span>100% Verified Projects</span>
          </div>
          <div class="trust-item">
            <ion-icon :icon="lockClosedOutline"></ion-icon>
            <span>Secure Payment</span>
          </div>
          <div class="trust-item">
            <ion-icon :icon="receiptOutline"></ion-icon>
            <span>Tax Deductible</span>
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
  alertController,
} from "@ionic/vue";
import {
  arrowBackOutline,
  informationCircleOutline,
  leafOutline,
  sparklesOutline,
  checkmarkCircleOutline,
  calendarOutline,
  globeOutline,
  locationOutline,
  shieldCheckmarkOutline,
  arrowForwardOutline,
  lockClosedOutline,
  receiptOutline,
  cafeOutline,
} from "ionicons/icons";

const router = useRouter();

// User's coffee purchase data
const totalPurchases = ref(12);
const totalEmissions = ref(340); // Total kg CO2 from all coffee purchases
const userCredits = ref(120); // Already offset
const selectedPackage = ref(null);
const selectedSubscription = ref(null);

const coffeePurchases = [
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
    weight: '250g',
    quantity: 3,
    emissions: {
      farm: 12,
      transport: 18,
      roasting: 8
    },
    totalEmissions: 114, // (12+18+8) * 3
    offset: false
  },
  {
    id: 2,
    name: 'Colombian Supremo',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    weight: '500g',
    quantity: 2,
    emissions: {
      farm: 20,
      transport: 28,
      roasting: 14
    },
    totalEmissions: 124, // (20+28+14) * 2
    offset: true
  },
  {
    id: 3,
    name: 'Costa Rica Honey',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    weight: '250g',
    quantity: 4,
    emissions: {
      farm: 10,
      transport: 16,
      roasting: 7
    },
    totalEmissions: 132, // (10+16+7) * 4
    offset: false
  }
];

const packages = [
  {
    id: 'light',
    name: 'Light Drinker',
    icon: '☕',
    color: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
    amount: 50,
    bags: 2,
    price: 8,
    popular: false,
    features: [
      'Offsets 2 bags of coffee',
      'Digital certificate',
      'Impact tracking'
    ]
  },
  {
    id: 'regular',
    name: 'Regular Drinker',
    icon: '☕☕',
    color: 'linear-gradient(135deg, #c8e6c9, #a5d6a7)',
    amount: 150,
    bags: 6,
    price: 22,
    popular: true,
    features: [
      'Offsets 6 bags of coffee',
      'Digital certificate',
      'Monthly impact report',
      'Supply chain insights'
    ]
  },
  {
    id: 'enthusiast',
    name: 'Coffee Enthusiast',
    icon: '☕☕☕',
    color: 'linear-gradient(135deg, #a5d6a7, #81c784)',
    amount: 250,
    bags: 10,
    price: 35,
    popular: false,
    features: [
      'Offsets 10 bags of coffee',
      'Digital certificate',
      'Weekly impact reports',
      'Supply chain insights',
      'Farmer stories'
    ]
  },
  {
    id: 'addict',
    name: 'Coffee Addict',
    icon: '☕☕☕☕',
    color: 'linear-gradient(135deg, #81c784, #66bb6a)',
    amount: 500,
    bags: 20,
    price: 65,
    popular: false,
    features: [
      'Offsets 20 bags of coffee',
      'Digital certificate',
      'Real-time tracking',
      'Supply chain insights',
      'Farmer stories',
      'Priority support'
    ]
  }
];

const subscriptions = [
  { id: 'casual', name: 'Casual Drinker', amount: 50, bags: 2, price: 7 },
  { id: 'daily', name: 'Daily Drinker', amount: 150, bags: 6, price: 20 },
  { id: 'heavy', name: 'Heavy Drinker', amount: 300, bags: 12, price: 38 }
];

const projects = [
  {
    id: 1,
    name: 'Shade-Grown Coffee Reforestation',
    location: 'Ethiopian Highlands',
    type: 'Carbon Sequestration',
    description: 'Planting native trees in coffee farms to absorb CO₂ and provide natural shade for coffee plants.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
    offset: 8500,
    verified: true
  },
  {
    id: 2,
    name: 'Solar-Powered Coffee Processing',
    location: 'Colombia',
    type: 'Clean Energy',
    description: 'Installing solar panels in coffee processing facilities to eliminate diesel generator emissions.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    offset: 6200,
    verified: true
  },
  {
    id: 3,
    name: 'Biogas from Coffee Waste',
    location: 'Costa Rica',
    type: 'Waste Reduction',
    description: 'Converting coffee processing waste into biogas for clean cooking fuel in farming communities.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    offset: 4800,
    verified: true
  }
];

const offsetPercentage = computed(() => {
  return Math.round((userCredits.value / totalEmissions.value) * 100);
});

const recommendedPackageId = computed(() => {
  const remaining = totalEmissions.value - userCredits.value;
  if (remaining <= 75) return 'light';
  if (remaining <= 175) return 'regular';
  if (remaining <= 300) return 'enthusiast';
  return 'addict';
});

const goBack = () => {
  router.back();
};

const showInfo = async () => {
  const alert = await alertController.create({
    header: 'About Coffee Carbon Credits',
    message: 'Coffee production generates CO₂ emissions at every stage: farming, transport, and roasting. Carbon credits fund projects that reduce these emissions or remove CO₂ from the atmosphere, making your coffee carbon neutral.',
    buttons: ['Got it']
  });
  await alert.present();
};

const selectPackage = (id) => {
  if (selectedPackage.value === id) {
    selectedPackage.value = null;
  } else {
    selectedPackage.value = id;
    selectedSubscription.value = null;
  }
};

const selectSubscription = (id) => {
  if (selectedSubscription.value === id) {
    selectedSubscription.value = null;
  } else {
    selectedSubscription.value = id;
    selectedPackage.value = null;
  }
};

const getSelectedPackageName = () => {
  const pkg = packages.find(p => p.id === selectedPackage.value);
  return pkg ? `${pkg.name} Package (${pkg.amount} kg CO₂)` : '';
};

const getSelectedPackagePrice = () => {
  const pkg = packages.find(p => p.id === selectedPackage.value);
  return pkg ? pkg.price : 0;
};

const getSelectedSubscriptionName = () => {
  const sub = subscriptions.find(s => s.id === selectedSubscription.value);
  return sub ? sub.name : '';
};

const getSelectedSubscriptionPrice = () => {
  const sub = subscriptions.find(s => s.id === selectedSubscription.value);
  return sub ? sub.price : 0;
};

const getTotalPrice = () => {
  let total = 0;
  if (selectedPackage.value) {
    total += getSelectedPackagePrice();
  }
  if (selectedSubscription.value) {
    total += getSelectedSubscriptionPrice();
  }
  return total.toFixed(2);
};

const proceedToCheckout = () => {
  console.log('Proceeding to checkout...');
  alert('Checkout functionality coming soon!');
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
  --green-light: #2ecc71;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
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
  --background: #f2f2f2;
}

.content-container {
  padding: 12px;
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

/* ===== HERO CARD ===== */
.hero-card {
  padding: 40px 24px;
  text-align: center;
  background: linear-gradient(135deg, #e3f2e1, #f0f8ee);
}

.hero-icon {
  font-size: 72px;
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.hero-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0 0 14px 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 16px;
  color: var(--text-light);
  margin: 0 0 28px 0;
  line-height: 1.6;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 24px;
  background: white;
  border-radius: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.stat-value {
  font-size: 24px;
  font-weight: 800;
  color: var(--green);
  line-height: 1;
}

.stat-label {
  font-size: 13px;
  color: var(--text-light);
  font-weight: 600;
}

.stat-divider {
  width: 1px;
  height: 50px;
  background: #e8e8e8;
}

/* ===== CARD HEADER ===== */
.card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}

.header-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-icon.green {
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.12), rgba(39, 174, 96, 0.08));
  color: var(--green);
}

.header-icon.blue {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.12), rgba(33, 150, 243, 0.08));
  color: var(--blue);
}

.header-icon.purple {
  background: linear-gradient(135deg, rgba(155, 81, 224, 0.12), rgba(155, 81, 224, 0.08));
  color: var(--purple);
}

.header-icon.brown {
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.12), rgba(107, 66, 38, 0.08));
  color: var(--coffee-medium);
}

.header-icon ion-icon {
  font-size: 26px;
}

.header-text {
  flex: 1;
}

.card-title {
  font-size: 19px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0;
}

.card-subtitle {
  font-size: 14px;
  color: var(--text-light);
  margin: 4px 0 0 0;
  font-weight: 600;
}

/* ===== OFFSET PROGRESS ===== */
.offset-progress {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.progress-percent {
  font-size: 20px;
  font-weight: 900;
  color: var(--green);
}

.progress-bar-container {
  width: 100%;
  height: 12px;
  background: rgba(39, 174, 96, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--green), var(--green-light));
  border-radius: 12px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
  padding-top: 4px;
}

.progress-stat {
  color: var(--text-light);
}

/* ===== PURCHASES CARD ===== */
.purchases-card {
  padding: 24px;
}

.purchases-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.purchase-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #fafafa, #f8f8f8);
  border-radius: 16px;
}

.purchase-image-wrapper {
  width: 90px;
  height: 90px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: #e8e8e8;
}

.purchase-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.purchase-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.purchase-name {
  font-size: 16px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0;
  line-height: 1.3;
}

.purchase-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-light);
  font-weight: 600;
}

.meta-separator {
  color: #d0d0d0;
}

.purchase-emissions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  background: white;
  border-radius: 10px;
}

.emission-breakdown {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
}

.emission-icon {
  font-size: 16px;
}

.emission-label {
  color: var(--text-light);
  min-width: 75px;
}

.emission-value {
  color: var(--coffee-dark);
  font-weight: 800;
}

.purchase-total {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: white;
  border-radius: 10px;
}

.total-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.total-value {
  font-size: 16px;
  font-weight: 900;
  color: var(--red);
}

.offset-status {
  margin-left: auto;
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
}

.offset-status.pending {
  background: rgba(239, 68, 68, 0.12);
  color: var(--red);
}

.offset-status.complete {
  background: rgba(39, 174, 96, 0.12);
  color: var(--green);
}

.purchases-summary {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(135deg, #fafafa, #f8f8f8);
  border-radius: 16px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-row.highlight {
  padding: 16px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.06));
  border-radius: 12px;
  margin-top: 8px;
}

.summary-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.summary-value {
  font-size: 15px;
  font-weight: 900;
  color: var(--coffee-dark);
}

.summary-value.offset {
  color: var(--green);
}

.summary-row.highlight .summary-value {
  font-size: 20px;
  color: var(--red);
}

/* ===== IMPACT CARD ===== */
.impact-card {
  padding: 24px;
}

.impact-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px;
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.06), rgba(39, 174, 96, 0.03));
  border-radius: 16px;
  margin-bottom: 24px;
}

.impact-main {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 10px;
}

.impact-number {
  font-size: 56px;
  font-weight: 900;
  color: var(--green);
  line-height: 1;
}

.impact-unit {
  font-size: 22px;
  font-weight: 700;
  color: var(--green);
}

.impact-label {
  font-size: 15px;
  color: var(--text-light);
  font-weight: 600;
}

.impact-equivalent {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.equivalent-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--coffee-dark);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.equivalent-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.equivalent-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f8f8;
  border-radius: 10px;
}

.equiv-icon {
  font-size: 24px;
}

.equiv-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--coffee-dark);
}

/* ===== SECTION HEADER ===== */
.section-header {
  padding: 24px 4px 16px;
}

.section-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0 0 6px 0;
}

.section-subtitle {
  font-size: 15px;
  color: var(--text-light);
  margin: 0;
  font-weight: 600;
}

/* ===== PACKAGES GRID ===== */
.packages-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.package-card {
  position: relative;
  background: white;
  border: 3px solid #f0f0f0;
  border-radius: 20px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.package-card:active {
  transform: scale(0.98);
}

.package-card.selected {
  border-color: var(--green);
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.04), rgba(39, 174, 96, 0.02));
}

.package-card.popular {
  border-color: var(--green);
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.02), rgba(39, 174, 96, 0.01));
}

.package-card.recommended {
  border-color: var(--blue);
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.04), rgba(33, 150, 243, 0.02));
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  background: var(--green);
  color: white;
  border-radius: 14px;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
  letter-spacing: 0.3px;
}

.popular-badge ion-icon {
  font-size: 13px;
}

.recommended-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  background: var(--blue);
  color: white;
  border-radius: 14px;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
  letter-spacing: 0.3px;
}

.recommended-badge ion-icon {
  font-size: 13px;
}

.package-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.package-icon {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
}

.package-name {
  font-size: 17px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0;
  text-align: center;
}

.package-amount {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
}

.amount-number {
  font-size: 36px;
  font-weight: 900;
  color: var(--coffee-dark);
  line-height: 1;
}

.amount-unit {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-light);
}

.package-coverage {
  text-align: center;
  font-size: 13px;
  color: var(--coffee-medium);
  font-weight: 700;
  padding: 8px 12px;
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.06), rgba(107, 66, 38, 0.03));
  border-radius: 10px;
}

.coverage-text {
  display: block;
}

.package-price {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 14px;
  background: linear-gradient(135deg, #fafafa, #f8f8f8);
  border-radius: 12px;
}

.price-value {
  font-size: 28px;
  font-weight: 900;
  color: var(--green);
  line-height: 1;
}

.price-per {
  font-size: 13px;
  color: var(--text-light);
  font-weight: 700;
}

.package-features {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 0;
  border-top: 2px solid #f5f5f5;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--coffee-dark);
  font-weight: 700;
}

.feature-item ion-icon {
  font-size: 18px;
  color: var(--green);
  flex-shrink: 0;
}

.package-equivalent {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.08), rgba(39, 174, 96, 0.05));
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  color: var(--green);
}

.pkg-equiv-icon {
  font-size: 18px;
}

/* ===== SUBSCRIPTION CARD ===== */
.subscription-card {
  padding: 20px;
}

.subscription-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.sub-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  padding: 6px 12px;
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.15), rgba(33, 150, 243, 0.25));
  color: var(--blue);
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.sub-badge ion-icon {
  font-size: 14px;
}

.sub-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0;
}

.sub-subtitle {
  font-size: 13px;
  color: var(--text-light);
  margin: 4px 0 0 0;
  font-weight: 600;
}

.subscription-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.sub-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #f5f5f5;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sub-option.active {
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.08), rgba(39, 174, 96, 0.05));
  border-color: var(--green);
}

.sub-radio {
  width: 24px;
  height: 24px;
  border: 2px solid #d0d0d0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sub-option.active .sub-radio {
  border-color: var(--green);
}

.radio-dot {
  width: 12px;
  height: 12px;
  background: var(--green);
  border-radius: 50%;
}

.sub-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sub-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sub-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.sub-price {
  font-size: 16px;
  font-weight: 800;
  color: var(--green);
}

.sub-amount {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 600;
}

.subscription-benefits {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background: #f8f8f8;
  border-radius: 12px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--coffee-dark);
  font-weight: 600;
}

.benefit-item ion-icon {
  font-size: 18px;
  color: var(--green);
}

/* ===== CALCULATOR CARD ===== */
.calculator-card {
  padding: 20px;
}

.calculator-section {
  margin-bottom: 16px;
}

.calc-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin-bottom: 8px;
}

.calc-label ion-icon {
  font-size: 18px;
  color: var(--blue);
}

.calc-input {
  width: 100%;
  padding: 14px 16px;
  background: #f5f5f5;
  border: 2px solid transparent;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: var(--coffee-dark);
  transition: all 0.3s ease;
}

.calc-input:focus {
  outline: none;
  background: white;
  border-color: var(--blue);
}

.calculate-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  background: linear-gradient(135deg, var(--blue), #1976d2);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 16px;
}

.calculate-btn ion-icon {
  font-size: 20px;
}

.calculator-result {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.08), rgba(33, 150, 243, 0.05));
  border-radius: 12px;
  border: 2px solid rgba(33, 150, 243, 0.2);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.result-value {
  font-size: 20px;
  font-weight: 800;
  color: var(--blue);
}

.result-recommendation {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--coffee-dark);
  font-weight: 600;
}

.result-recommendation ion-icon {
  font-size: 18px;
  color: var(--blue);
  flex-shrink: 0;
}

/* ===== PROJECTS CARD ===== */
.projects-card {
  padding: 20px;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #f8f8f8;
  border-radius: 12px;
}

.project-image-wrapper {
  position: relative;
  width: 90px;
  height: 90px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-type-badge {
  position: absolute;
  bottom: 6px;
  left: 6px;
  padding: 4px 8px;
  background: rgba(39, 174, 96, 0.95);
  color: white;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
}

.project-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.project-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0;
  line-height: 1.3;
}

.project-location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-light);
  font-weight: 600;
}

.project-location ion-icon {
  font-size: 12px;
}

.project-description {
  font-size: 12px;
  color: var(--text-light);
  margin: 0;
  line-height: 1.5;
}

.project-stats-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
}

.project-stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--green);
  font-weight: 700;
}

.project-stat ion-icon {
  font-size: 12px;
}

.project-verified {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--blue);
  font-weight: 700;
}

.project-verified ion-icon {
  font-size: 12px;
}

/* ===== SUMMARY CARD ===== */
.summary-card {
  padding: 24px;
}

.summary-header {
  margin-bottom: 20px;
}

.summary-title {
  font-size: 19px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 2px solid #f5f5f5;
}

.summary-label {
  font-size: 15px;
  color: var(--text-light);
  font-weight: 700;
}

.summary-value {
  font-size: 16px;
  color: var(--coffee-dark);
  font-weight: 900;
}

.summary-divider {
  height: 2px;
  background: #f0f0f0;
  margin: 20px 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #fafafa, #f8f8f8);
  border-radius: 16px;
}

.total-label {
  font-size: 17px;
  color: var(--coffee-dark);
  font-weight: 800;
}

.total-value {
  font-size: 32px;
  color: var(--green);
  font-weight: 900;
  line-height: 1;
}

.checkout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(135deg, var(--green), var(--green-light));
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 18px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.checkout-btn:active {
  transform: scale(0.98);
}

.checkout-btn ion-icon {
  font-size: 24px;
  margin-left: auto;
}

/* ===== TRUST SECTION ===== */
.trust-section {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 24px 12px;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: var(--text-light);
}

.trust-item ion-icon {
  font-size: 24px;
  color: var(--green);
}

.trust-item span {
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 450px) {
  .packages-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 16px;
  }
  
  .stat-divider {
    width: 100%;
    height: 1px;
  }
}
</style>