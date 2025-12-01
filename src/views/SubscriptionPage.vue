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
        <ion-title class="page-title">Subscriptions</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="viewHistory">
            <ion-icon :icon="timeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="content-bg">
      <!-- HERO BANNER -->
      <div class="hero-banner">
        <div class="hero-icon">🔄</div>
        <h2 class="hero-title">Never Run Out of Coffee</h2>
        <p class="hero-subtitle">Save up to 15% with automatic deliveries</p>
      </div>

      <!-- ACTIVE SUBSCRIPTIONS -->
      <div class="section-container" v-if="activeSubscriptions.length > 0">
        <div class="section-header">
          <h3 class="section-title">Active Subscriptions</h3>
          <span class="section-badge">{{ activeSubscriptions.length }}</span>
        </div>
        
        <div 
          v-for="sub in activeSubscriptions" 
          :key="sub.id"
          class="subscription-card active">
          <div class="subscription-header">
            <img :src="sub.image" :alt="sub.name" class="subscription-image" />
            <div class="subscription-info">
              <h4 class="subscription-name">{{ sub.name }}</h4>
              <p class="subscription-origin">{{ sub.origin }}</p>
            </div>
            <span class="subscription-status active">Active</span>
          </div>
          
          <div class="subscription-details">
            <div class="detail-row">
              <span class="detail-label">Frequency</span>
              <span class="detail-value">{{ sub.frequency }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Next Delivery</span>
              <span class="detail-value">{{ sub.nextDelivery }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Price</span>
              <span class="detail-value highlight">${{ sub.price }}/delivery</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">You Save</span>
              <span class="detail-value savings">{{ sub.savings }}%</span>
            </div>
          </div>

          <div class="subscription-actions">
            <ion-button fill="outline" size="small" class="action-btn" @click="pauseSubscription(sub)">
              <ion-icon :icon="pauseOutline" slot="start"></ion-icon>
              Pause
            </ion-button>
            <ion-button fill="outline" size="small" class="action-btn" @click="editSubscription(sub)">
              <ion-icon :icon="createOutline" slot="start"></ion-icon>
              Edit
            </ion-button>
            <ion-button fill="clear" size="small" class="cancel-btn" @click="cancelSubscription(sub)">
              Cancel
            </ion-button>
          </div>
        </div>
      </div>

      <!-- PAUSED SUBSCRIPTIONS -->
      <div class="section-container" v-if="pausedSubscriptions.length > 0">
        <div class="section-header">
          <h3 class="section-title">Paused Subscriptions</h3>
          <span class="section-badge paused">{{ pausedSubscriptions.length }}</span>
        </div>
        
        <div 
          v-for="sub in pausedSubscriptions" 
          :key="sub.id"
          class="subscription-card paused">
          <div class="subscription-header">
            <img :src="sub.image" :alt="sub.name" class="subscription-image" />
            <div class="subscription-info">
              <h4 class="subscription-name">{{ sub.name }}</h4>
              <p class="subscription-origin">{{ sub.origin }}</p>
            </div>
            <span class="subscription-status paused">Paused</span>
          </div>
          
          <div class="paused-message">
            <ion-icon :icon="informationCircleOutline" class="info-icon"></ion-icon>
            <p class="paused-text">Paused since {{ sub.pausedDate }}. Resume anytime.</p>
          </div>

          <div class="subscription-actions">
            <ion-button fill="solid" size="small" class="resume-btn" @click="resumeSubscription(sub)">
              <ion-icon :icon="playOutline" slot="start"></ion-icon>
              Resume
            </ion-button>
            <ion-button fill="clear" size="small" class="cancel-btn" @click="cancelSubscription(sub)">
              Cancel
            </ion-button>
          </div>
        </div>
      </div>

      <!-- SUBSCRIPTION PLANS -->
      <div class="section-container">
        <h3 class="section-title">Available Plans</h3>
        <p class="section-description">Choose your perfect coffee subscription</p>
        
        <div class="plans-grid">
          <div 
            v-for="plan in availablePlans" 
            :key="plan.id"
            :class="['plan-card', { popular: plan.popular }]"
            @click="selectPlan(plan)">
            <div class="plan-badge" v-if="plan.popular">Most Popular</div>
            <div class="plan-icon">{{ plan.icon }}</div>
            <h4 class="plan-name">{{ plan.name }}</h4>
            <p class="plan-description">{{ plan.description }}</p>
            <div class="plan-price">
              <span class="price-amount">${{ plan.price }}</span>
              <span class="price-period">/{{ plan.period }}</span>
            </div>
            <div class="plan-savings">Save {{ plan.savings }}%</div>
            <div class="plan-features">
              <div v-for="feature in plan.features" :key="feature" class="feature-item">
                <ion-icon :icon="checkmarkCircleOutline" class="check-icon"></ion-icon>
                <span>{{ feature }}</span>
              </div>
            </div>
            <ion-button expand="block" :fill="plan.popular ? 'solid' : 'outline'" class="plan-btn">
              Subscribe Now
            </ion-button>
          </div>
        </div>
      </div>

      <!-- BENEFITS SECTION -->
      <div class="benefits-section">
        <h3 class="section-title">Subscription Benefits</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">💰</div>
            <h4 class="benefit-title">Save Money</h4>
            <p class="benefit-text">Up to 15% off regular prices</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">📦</div>
            <h4 class="benefit-title">Free Shipping</h4>
            <p class="benefit-text">On all subscription orders</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🎯</div>
            <h4 class="benefit-title">Flexible</h4>
            <p class="benefit-text">Pause, skip, or cancel anytime</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">⭐</div>
            <h4 class="benefit-title">Priority Access</h4>
            <p class="benefit-text">Early access to new blends</p>
          </div>
        </div>
      </div>

      <!-- FAQ SECTION -->
      <div class="section-container">
        <h3 class="section-title">Frequently Asked Questions</h3>
        <div class="faq-list">
          <div 
            v-for="faq in faqs" 
            :key="faq.id"
            :class="['faq-item', { open: faq.open }]"
            @click="toggleFaq(faq)">
            <div class="faq-question">
              <span>{{ faq.question }}</span>
              <ion-icon :icon="faq.open ? chevronUpOutline : chevronDownOutline" class="faq-icon"></ion-icon>
            </div>
            <div class="faq-answer" v-if="faq.open">
              <p>{{ faq.answer }}</p>
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
  arrowBackOutline,
  timeOutline,
  pauseOutline,
  createOutline,
  playOutline,
  informationCircleOutline,
  checkmarkCircleOutline,
  chevronUpOutline,
  chevronDownOutline,
} from "ionicons/icons";

const router = useRouter();

const activeSubscriptions = ref([
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300",
    frequency: "Every 2 weeks",
    nextDelivery: "Dec 15, 2024",
    price: 16.99,
    savings: 15
  }
]);

const pausedSubscriptions = ref([
  {
    id: 2,
    name: "Colombian Supreme",
    origin: "Colombia",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300",
    pausedDate: "Nov 20, 2024"
  }
]);

const availablePlans = ref([
  {
    id: 1,
    name: "Weekly",
    icon: "☕",
    description: "Perfect for daily drinkers",
    price: 19.99,
    period: "week",
    savings: 10,
    popular: false,
    features: [
      "Fresh coffee weekly",
      "10% savings",
      "Free shipping",
      "Flexible scheduling"
    ]
  },
  {
    id: 2,
    name: "Bi-Weekly",
    icon: "🔥",
    description: "Our most popular choice",
    price: 16.99,
    period: "2 weeks",
    savings: 15,
    popular: true,
    features: [
      "Delivery every 2 weeks",
      "15% savings",
      "Free shipping",
      "Priority support",
      "Early access to new blends"
    ]
  },
  {
    id: 3,
    name: "Monthly",
    icon: "📅",
    description: "Best value for money",
    price: 14.99,
    period: "month",
    savings: 12,
    popular: false,
    features: [
      "Monthly deliveries",
      "12% savings",
      "Free shipping",
      "Flexible scheduling"
    ]
  }
]);

const faqs = ref([
  {
    id: 1,
    question: "Can I change my delivery frequency?",
    answer: "Yes! You can change your delivery frequency anytime from your subscription settings. Changes will apply to your next scheduled delivery.",
    open: false
  },
  {
    id: 2,
    question: "How do I pause my subscription?",
    answer: "Click the 'Pause' button on your active subscription. You can resume anytime without losing your subscription benefits.",
    open: false
  },
  {
    id: 3,
    question: "Is there a cancellation fee?",
    answer: "No, there are no cancellation fees. You can cancel your subscription at any time without any charges.",
    open: false
  },
  {
    id: 4,
    question: "Can I skip a delivery?",
    answer: "Absolutely! You can skip any delivery up to 24 hours before it's scheduled to ship. Just go to your subscription and click 'Skip Next Delivery'.",
    open: false
  }
]);

const goBack = () => {
  router.back();
};

const viewHistory = () => {
  console.log('View subscription history');
};

const pauseSubscription = (sub) => {
  console.log('Pause subscription:', sub);
};

const editSubscription = (sub) => {
  console.log('Edit subscription:', sub);
};

const cancelSubscription = (sub) => {
  console.log('Cancel subscription:', sub);
};

const resumeSubscription = (sub) => {
  console.log('Resume subscription:', sub);
};

const selectPlan = (plan) => {
  console.log('Select plan:', plan);
};

const toggleFaq = (faq) => {
  faq.open = !faq.open;
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
  --purple: #9c27b0;
}

/* ===== HEADER ===== */
.custom-toolbar {
  --background: transparent;
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

/* ===== HERO BANNER ===== */
.hero-banner {
  margin: 16px 16px 24px;
  padding: 28px 24px;
  background: white;
  border-radius: 20px;
  text-align: center;
  border: 1px solid #e0e0e0;
}

.hero-icon {
  font-size: 56px;
  margin-bottom: 12px;
}

.hero-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
  line-height: 1.3;
  color: var(--coffee-dark);
}

.hero-subtitle {
  font-size: 15px;
  margin: 0;
  color: var(--text-light);
}

/* ===== SECTION CONTAINER ===== */
.section-container {
  background: white;
  margin: 0 16px 16px;
  padding: 20px 16px;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 8px 0;
}

.section-description {
  font-size: 14px;
  color: var(--text-light);
  margin: 0 0 20px 0;
}

.section-badge {
  background: var(--coffee-dark);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
}

.section-badge.paused {
  background: var(--orange);
}

/* ===== SUBSCRIPTION CARD ===== */
.subscription-card {
  background: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  border: 2px solid #e0e0e0;
}

.subscription-card.active {
  border-color: var(--green);
  background: rgba(39, 174, 96, 0.02);
}

.subscription-card.paused {
  border-color: var(--orange);
  background: rgba(255, 152, 0, 0.02);
}

.subscription-header {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}

.subscription-image {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
}

.subscription-info {
  flex: 1;
}

.subscription-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 4px 0;
}

.subscription-origin {
  font-size: 13px;
  color: var(--text-light);
  margin: 0;
}

.subscription-status {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 10px;
}

.subscription-status.active {
  background: rgba(39, 174, 96, 0.15);
  color: var(--green);
}

.subscription-status.paused {
  background: rgba(255, 152, 0, 0.15);
  color: var(--orange);
}

/* ===== SUBSCRIPTION DETAILS ===== */
.subscription-details {
  background: #f8f8f8;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 12px;
  border: 1px solid #e0e0e0;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.detail-row:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}

.detail-label {
  font-size: 13px;
  color: var(--text-light);
  font-weight: 500;
}

.detail-value {
  font-size: 14px;
  color: var(--coffee-dark);
  font-weight: 600;
}

.detail-value.highlight {
  color: var(--coffee-medium);
  font-size: 15px;
}

.detail-value.savings {
  color: var(--green);
}

/* ===== SUBSCRIPTION ACTIONS ===== */
.subscription-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.action-btn {
  --border-color: var(--coffee-light);
  --color: var(--coffee-dark);
  --border-radius: 12px;
  font-weight: 600;
  flex: 1;
  min-width: 100px;
}

.resume-btn {
  --background: var(--green);
  --border-radius: 12px;
  font-weight: 600;
  flex: 1;
}

.cancel-btn {
  --color: #e74c3c;
  font-weight: 600;
}

/* ===== PAUSED MESSAGE ===== */
.paused-message {
  display: flex;
  gap: 10px;
  padding: 12px;
  background: rgba(255, 152, 0, 0.1);
  border-radius: 12px;
  margin-bottom: 12px;
}

.info-icon {
  font-size: 20px;
  color: var(--orange);
  flex-shrink: 0;
}

.paused-text {
  font-size: 13px;
  color: var(--text-dark);
  margin: 0;
}

/* ===== PLANS GRID ===== */
.plans-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.plan-card {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.plan-card.popular {
  border-color: var(--coffee-dark);
  background: rgba(74, 44, 42, 0.02);
  box-shadow: 0 4px 12px rgba(74, 44, 42, 0.08);
}

.plan-card:active {
  transform: scale(0.98);
}

.plan-badge {
  position: absolute;
  top: -12px;
  right: 20px;
  background: var(--coffee-dark);
  color: white;
  padding: 6px 16px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.plan-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.plan-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 6px 0;
}

.plan-description {
  font-size: 13px;
  color: var(--text-light);
  margin: 0 0 16px 0;
}

.plan-price {
  margin-bottom: 8px;
}

.price-amount {
  font-size: 32px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.price-period {
  font-size: 16px;
  color: var(--text-light);
}

.plan-savings {
  font-size: 13px;
  font-weight: 700;
  color: var(--green);
  background: rgba(39, 174, 96, 0.1);
  padding: 4px 12px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 16px;
}

.plan-features {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-dark);
}

.check-icon {
  font-size: 18px;
  color: var(--green);
  flex-shrink: 0;
}

.plan-btn {
  --border-radius: 14px;
  height: 48px;
  font-weight: 700;
}

.plan-card.popular .plan-btn {
  --background: var(--coffee-dark);
}

/* ===== BENEFITS SECTION ===== */
.benefits-section {
  padding: 20px 16px;
  background: white;
  margin: 0 16px 16px;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.benefit-card {
  text-align: center;
  padding: 20px 12px;
  background: white;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
}

.benefit-icon {
  font-size: 36px;
  margin-bottom: 8px;
}

.benefit-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 6px 0;
}

.benefit-text {
  font-size: 12px;
  color: var(--text-light);
  margin: 0;
  line-height: 1.4;
}

/* ===== FAQ SECTION ===== */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.faq-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: background 0.3s ease;
  border: 1px solid #e0e0e0;
}

.faq-item:active {
  background: #fafafa;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  font-size: 15px;
  font-weight: 600;
  color: var(--coffee-dark);
}

.faq-icon {
  font-size: 20px;
  color: var(--coffee-light);
  flex-shrink: 0;
}

.faq-answer {
  padding: 0 16px 16px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.faq-answer p {
  font-size: 14px;
  color: var(--text-light);
  line-height: 1.6;
  margin: 0;
}

/* ===== SPACER ===== */
.bottom-spacer {
  height: 30px;
}

/* ===== RESPONSIVE ===== */
@media (min-width: 768px) {
  .plans-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 360px) {
  .hero-title {
    font-size: 20px;
  }
  
  .subscription-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
}
</style>