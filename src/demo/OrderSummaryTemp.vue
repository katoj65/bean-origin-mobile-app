<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="order-summary-showcase">

    <!-- VARIATION 1: MINIMAL COMPACT -->
    <div class="summary-card minimal-compact">
      <div class="card-header">
        <h3 class="card-title">Order Summary</h3>
        <span class="order-date">Dec 14, 2025</span>
      </div>

      <div class="summary-row">
        <span class="row-label">Items</span>
        <span class="row-value">3 items</span>
      </div>

      <div class="summary-divider"></div>

      <div class="summary-row">
        <span class="row-label">Subtotal</span>
        <span class="row-value">$24.50</span>
      </div>

      <div class="summary-row">
        <span class="row-label">Tax</span>
        <span class="row-value">$2.45</span>
      </div>

      <div class="summary-divider"></div>

      <div class="summary-row total">
        <span class="row-label">Total</span>
        <span class="row-value">$26.95</span>
      </div>

      <ion-button expand="block" class="checkout-btn">
        Proceed to Checkout
      </ion-button>
    </div>

    <!-- VARIATION 2: DETAILED VERTICAL -->
    <div class="summary-card detailed-vertical">
      <div class="date-banner">
        <ion-icon :icon="calendarOutline"></ion-icon>
        <span>Order placed on December 14, 2025</span>
      </div>

      <div class="summary-section">
        <div class="section-header">
          <h4 class="section-title">Order Details</h4>
        </div>
        
        <div class="detail-item">
          <div class="detail-icon">
            <ion-icon :icon="bagHandleOutline"></ion-icon>
          </div>
          <div class="detail-content">
            <span class="detail-label">Items Ordered</span>
            <span class="detail-value">3 items</span>
          </div>
        </div>
      </div>

      <div class="summary-section">
        <div class="section-header">
          <h4 class="section-title">Price Breakdown</h4>
        </div>

        <div class="price-rows">
          <div class="price-row">
            <span class="price-label">Subtotal</span>
            <span class="price-value">$24.50</span>
          </div>
          <div class="price-row">
            <span class="price-label">Tax (10%)</span>
            <span class="price-value">$2.45</span>
          </div>
        </div>

        <div class="total-row">
          <span class="total-label">Order Total</span>
          <span class="total-value">$26.95</span>
        </div>
      </div>

      <ion-button expand="block" class="checkout-btn-detailed">
        <ion-icon slot="start" :icon="cardOutline"></ion-icon>
        Complete Payment
      </ion-button>
    </div>

    <!-- VARIATION 3: SPLIT LAYOUT -->
    <div class="summary-card split-layout">
      <div class="split-header">
        <div class="header-left">
          <h3 class="summary-title">Summary</h3>
          <span class="summary-subtitle">Review your order</span>
        </div>
        <div class="header-right">
          <div class="date-chip">
            <ion-icon :icon="timeOutline"></ion-icon>
            <span>Dec 14</span>
          </div>
        </div>
      </div>

      <div class="split-content">
        <div class="items-section">
          <div class="items-badge">
            <ion-icon :icon="receiptOutline"></ion-icon>
            <span class="items-count">3</span>
          </div>
          <span class="items-label">Items in cart</span>
        </div>

        <div class="pricing-section">
          <div class="pricing-grid">
            <div class="price-item">
              <span class="price-item-label">Subtotal</span>
              <span class="price-item-value">$24.50</span>
            </div>
            <div class="price-item">
              <span class="price-item-label">Tax</span>
              <span class="price-item-value">$2.45</span>
            </div>
          </div>

          <div class="total-display">
            <span class="total-display-label">Total Amount</span>
            <span class="total-display-value">$26.95</span>
          </div>
        </div>
      </div>

      <ion-button expand="block" class="checkout-btn-split">
        Checkout Now
      </ion-button>
    </div>

    <!-- VARIATION 4: PREMIUM ELEGANT -->
    <div class="summary-card premium-elegant">
      <div class="elegant-header">
        <div class="elegant-icon">
          <ion-icon :icon="bagCheckOutline"></ion-icon>
        </div>
        <div class="elegant-title-section">
          <h3 class="elegant-title">Order Summary</h3>
          <p class="elegant-date">December 14, 2025 at 2:30 PM</p>
        </div>
      </div>

      <div class="elegant-divider"></div>

      <div class="elegant-stats">
        <div class="elegant-stat">
          <span class="elegant-stat-value">3</span>
          <span class="elegant-stat-label">Items</span>
        </div>
        <div class="elegant-separator"></div>
        <div class="elegant-stat">
          <span class="elegant-stat-value">$26.95</span>
          <span class="elegant-stat-label">Total</span>
        </div>
      </div>

      <div class="elegant-divider"></div>

      <div class="elegant-breakdown">
        <div class="breakdown-row">
          <span class="breakdown-label">Subtotal</span>
          <span class="breakdown-value">$24.50</span>
        </div>
        <div class="breakdown-row">
          <span class="breakdown-label">Tax (10%)</span>
          <span class="breakdown-value">$2.45</span>
        </div>
        <div class="breakdown-row highlight">
          <span class="breakdown-label">Amount to Pay</span>
          <span class="breakdown-value">$26.95</span>
        </div>
      </div>

      <ion-button expand="block" class="checkout-btn-elegant">
        <ion-icon slot="start" :icon="checkmarkCircleOutline"></ion-icon>
        Confirm Order
      </ion-button>
    </div>

    <!-- VARIATION 5: TABLE STYLE -->
    <div class="summary-card table-style">
      <div class="table-header">
        <h3 class="table-title">Order Summary</h3>
        <div class="order-meta">
          <div class="meta-item">
            <ion-icon :icon="calendarOutline"></ion-icon>
            <span>Dec 14, 2025</span>
          </div>
          <div class="meta-item">
            <ion-icon :icon="bagHandleOutline"></ion-icon>
            <span>3 items</span>
          </div>
        </div>
      </div>

      <div class="price-table">
        <div class="table-row">
          <span class="table-label">Subtotal</span>
          <span class="table-dots"></span>
          <span class="table-value">$24.50</span>
        </div>
        <div class="table-row">
          <span class="table-label">Tax (10%)</span>
          <span class="table-dots"></span>
          <span class="table-value">$2.45</span>
        </div>
        <div class="table-row total">
          <span class="table-label">Total</span>
          <span class="table-dots"></span>
          <span class="table-value">$26.95</span>
        </div>
      </div>

      <ion-button expand="block" class="checkout-btn-table">
        <ion-icon slot="start" :icon="arrowForwardOutline"></ion-icon>
        Proceed to Payment
      </ion-button>
    </div>

    <!-- VARIATION 6: COMPACT HORIZONTAL -->
    <div class="summary-card compact-horizontal">
      <div class="compact-top">
        <div class="compact-date">
          <ion-icon :icon="calendarOutline"></ion-icon>
          <span>Dec 14, 2025</span>
        </div>
        <div class="compact-items">
          <ion-icon :icon="bagHandleOutline"></ion-icon>
          <span>3 items</span>
        </div>
      </div>

      <div class="compact-pricing">
        <div class="compact-price-item">
          <span class="compact-label">Subtotal</span>
          <span class="compact-value">$24.50</span>
        </div>
        <div class="compact-price-item">
          <span class="compact-label">Tax</span>
          <span class="compact-value">$2.45</span>
        </div>
        <div class="compact-price-item total">
          <span class="compact-label">Total</span>
          <span class="compact-value">$26.95</span>
        </div>
      </div>

      <ion-button expand="block" class="checkout-btn-compact">
        Checkout
      </ion-button>
    </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue';
import {
  calendarOutline,
  bagHandleOutline,
  cardOutline,
  timeOutline,
  receiptOutline,
  bagCheckOutline,
  checkmarkCircleOutline,
  arrowForwardOutline,
} from 'ionicons/icons';
</script>

<style scoped>
/* ===== VARIABLES ===== */
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
  --amber: #f59e0b;
  --green: #10b981;
}

.order-summary-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 28px;
  padding: 32px 24px;
  background: linear-gradient(135deg, var(--cream-200) 0%, var(--cream-300) 100%);
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
}

.summary-card {
  background: white;
  border-radius: 24px;
  padding: 28px;
  border: 2px solid rgba(107, 66, 38, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.summary-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--coffee-600), var(--coffee-800), var(--gold));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-4px);
  border-color: rgba(107, 66, 38, 0.16);
  background: linear-gradient(135deg, white 0%, var(--cream-50) 100%);
}

.summary-card:hover::before {
  opacity: 1;
}

/* ===== VARIATION 1: MINIMAL COMPACT ===== */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-title {
  font-size: 22px;
  font-weight: 900;
  color: var(--coffee-800);
  margin: 0;
  letter-spacing: -0.8px;
  background: linear-gradient(135deg, var(--coffee-800), var(--coffee-600));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.order-date {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-600);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.row-label {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-600);
}

.row-value {
  font-size: 15px;
  font-weight: 800;
  color: var(--coffee-800);
}

.summary-row.total .row-label {
  font-size: 16px;
  font-weight: 900;
  color: var(--coffee-900);
}

.summary-row.total .row-value {
  font-size: 20px;
  font-weight: 900;
  color: var(--coffee-800);
  letter-spacing: -0.5px;
}

.summary-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--cream-300) 20%, var(--cream-300) 80%, transparent);
  margin: 12px 0;
  border-radius: 2px;
}

.checkout-btn {
  --background: linear-gradient(135deg, var(--coffee-700) 0%, var(--coffee-800) 50%, var(--coffee-900) 100%);
  --border-radius: 16px;
  height: 58px;
  font-weight: 900;
  font-size: 16px;
  text-transform: none;
  letter-spacing: 0.5px;
  margin: 24px 0 0 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.checkout-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.checkout-btn:hover {
  transform: translateY(-3px) scale(1.02);
  border-color: var(--coffee-900);
  --background: linear-gradient(135deg, var(--coffee-600) 0%, var(--coffee-700) 50%, var(--coffee-800) 100%);
}

.checkout-btn:hover::before {
  opacity: 1;
}

.checkout-btn:active {
  transform: translateY(-1px) scale(1.01);
}

/* ===== VARIATION 2: DETAILED VERTICAL ===== */
.date-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 18px;
  background: linear-gradient(135deg, var(--cream-200), var(--cream-100));
  border-radius: 16px;
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-600);
  border: 2px solid rgba(107, 66, 38, 0.08);
}

.date-banner ion-icon {
  font-size: 20px;
  color: var(--coffee-600);
}

.summary-section {
  margin-bottom: 20px;
}

.section-header {
  margin-bottom: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 900;
  color: var(--coffee-800);
  margin: 0;
  letter-spacing: -0.3px;
}

.detail-item {
  display: flex;
  gap: 14px;
  padding: 16px;
  background: linear-gradient(135deg, var(--cream-100), white);
  border-radius: 14px;
  border: 1px solid rgba(107, 66, 38, 0.06);
  transition: all 0.3s ease;
}

.detail-item:hover {
  transform: translateX(4px);
  border-color: rgba(107, 66, 38, 0.12);
}

.detail-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--coffee-600), var(--coffee-700));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 3px solid rgba(107, 66, 38, 0.15);
}

.detail-icon ion-icon {
  font-size: 24px;
  color: white;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.detail-label {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-500);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.detail-value {
  font-size: 16px;
  font-weight: 900;
  color: var(--coffee-800);
}

.price-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: linear-gradient(135deg, var(--cream-100), white);
  border-radius: 12px;
  border: 1px solid rgba(107, 66, 38, 0.06);
  transition: all 0.3s ease;
}

.price-row:hover {
  border-color: rgba(107, 66, 38, 0.12);
  transform: translateX(2px);
}

.price-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-600);
}

.price-value {
  font-size: 15px;
  font-weight: 900;
  color: var(--coffee-800);
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%);
  border-radius: 16px;
  border: 3px solid rgba(252, 211, 77, 0.6);
}

.total-label {
  font-size: 16px;
  font-weight: 900;
  color: var(--coffee-900);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.total-value {
  font-size: 22px;
  font-weight: 900;
  color: var(--coffee-800);
  letter-spacing: -0.8px;
}

.checkout-btn-detailed {
  --background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
  --border-radius: 16px;
  height: 58px;
  font-weight: 900;
  font-size: 16px;
  text-transform: none;
  letter-spacing: 0.5px;
  margin: 20px 0 0 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
}

.checkout-btn-detailed:hover {
  transform: translateY(-3px) scale(1.02);
  --background: linear-gradient(135deg, var(--coffee-600), var(--coffee-700));
  border-color: var(--coffee-900);
}

.checkout-btn-detailed ion-icon {
  transition: transform 0.3s ease;
}

.checkout-btn-detailed:hover ion-icon {
  transform: scale(1.15) rotate(5deg);
}

/* ===== VARIATION 3: SPLIT LAYOUT ===== */
.split-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.header-left {
  flex: 1;
}

.summary-title {
  font-size: 22px;
  font-weight: 900;
  color: var(--coffee-800);
  margin: 0 0 4px 0;
  letter-spacing: -0.8px;
}

.summary-subtitle {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-600);
}

.date-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: var(--cream-200);
  border-radius: 12px;
  font-size: 13px;
  font-weight: 800;
  color: var(--coffee-700);
}

.date-chip ion-icon {
  font-size: 18px;
}

.split-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  margin-bottom: 24px;
}

.items-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  background: var(--cream-100);
  border-radius: 16px;
}

.items-badge {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, white, var(--cream-100));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 4px solid var(--cream-300);
}

.items-badge ion-icon {
  font-size: 28px;
  color: var(--coffee-600);
}

.items-count {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--coffee-700), var(--coffee-900));
  color: white;
  font-size: 13px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
}

.items-label {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-600);
  text-align: center;
}

.pricing-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.pricing-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.price-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.price-item-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-600);
}

.price-item-value {
  font-size: 15px;
  font-weight: 900;
  color: var(--coffee-800);
}

.total-display {
  display: flex;
  justify-content: space-between;
  padding: 14px;
  background: var(--cream-200);
  border-radius: 12px;
  border: 2px solid var(--cream-300);
}

.total-display-label {
  font-size: 15px;
  font-weight: 900;
  color: var(--coffee-800);
}

.total-display-value {
  font-size: 20px;
  font-weight: 900;
  color: var(--coffee-800);
  letter-spacing: -0.5px;
}

.checkout-btn-split {
  --background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
  --border-radius: 16px;
  height: 56px;
  font-weight: 900;
  font-size: 16px;
  text-transform: none;
  letter-spacing: 0.5px;
  margin: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
}

.checkout-btn-split:hover {
  transform: translateY(-3px) scale(1.02);
  --background: linear-gradient(135deg, var(--coffee-600), var(--coffee-700));
  border-color: var(--coffee-900);
}

/* ===== VARIATION 4: PREMIUM ELEGANT ===== */
.elegant-header {
  display: flex;
  gap: 14px;
  margin-bottom: 20px;
}

.elegant-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--gold) 0%, var(--amber) 50%, #f59e0b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 4px solid rgba(254, 243, 199, 0.9);
  outline: 2px solid var(--cream-300);
  outline-offset: 2px;
}

.elegant-icon ion-icon {
  font-size: 28px;
  color: white;
}

.elegant-title-section {
  flex: 1;
}

.elegant-title {
  font-size: 20px;
  font-weight: 900;
  color: var(--coffee-800);
  margin: 0 0 6px 0;
  letter-spacing: -0.5px;
}

.elegant-date {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-600);
  margin: 0;
  line-height: 1.4;
}

.elegant-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cream-300) 20%, var(--cream-300) 80%, transparent);
  margin: 20px 0;
}

.elegant-stats {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.elegant-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.elegant-stat-value {
  font-size: 26px;
  font-weight: 900;
  color: var(--coffee-800);
  letter-spacing: -1px;
}

.elegant-stat-label {
  font-size: 12px;
  font-weight: 800;
  color: var(--text-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.elegant-separator {
  width: 1px;
  background: var(--cream-300);
}

.elegant-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.breakdown-row.highlight {
  padding: 14px 16px;
  background: var(--cream-200);
  border-radius: 12px;
  margin-top: 4px;
}

.breakdown-label {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-600);
}

.breakdown-row.highlight .breakdown-label {
  font-size: 16px;
  font-weight: 900;
  color: var(--coffee-800);
}

.breakdown-value {
  font-size: 16px;
  font-weight: 900;
  color: var(--coffee-800);
}

.breakdown-row.highlight .breakdown-value {
  font-size: 20px;
  letter-spacing: -0.5px;
}

.checkout-btn-elegant {
  --background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
  --border-radius: 16px;
  height: 58px;
  font-weight: 900;
  font-size: 16px;
  text-transform: none;
  letter-spacing: 0.5px;
  margin: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
}

.checkout-btn-elegant:hover {
  transform: translateY(-3px) scale(1.02);
  --background: linear-gradient(135deg, var(--coffee-600), var(--coffee-700));
  border-color: var(--coffee-900);
}

.checkout-btn-elegant ion-icon {
  transition: transform 0.3s ease;
}

.checkout-btn-elegant:hover ion-icon {
  transform: scale(1.2) rotate(-5deg);
}

/* ===== VARIATION 5: TABLE STYLE ===== */
.table-header {
  margin-bottom: 20px;
}

.table-title {
  font-size: 20px;
  font-weight: 900;
  color: var(--coffee-800);
  margin: 0 0 14px 0;
  letter-spacing: -0.5px;
}

.order-meta {
  display: flex;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-600);
}

.meta-item ion-icon {
  font-size: 18px;
  color: var(--coffee-600);
}

.price-table {
  background: linear-gradient(135deg, var(--cream-100), white);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
  border: 2px solid rgba(107, 66, 38, 0.12);
}

.table-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 12px 0;
}

.table-row:not(:last-child) {
  border-bottom: 1px dashed var(--cream-300);
}

.table-row.total {
  padding: 16px 0 0 0;
  border-bottom: none;
}

.table-label {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-600);
}

.table-row.total .table-label {
  font-size: 16px;
  font-weight: 900;
  color: var(--coffee-800);
}

.table-dots {
  border-bottom: 2px dotted var(--cream-300);
  height: 1px;
}

.table-value {
  font-size: 16px;
  font-weight: 900;
  color: var(--coffee-800);
  text-align: right;
}

.table-row.total .table-value {
  font-size: 22px;
  letter-spacing: -0.8px;
}

.checkout-btn-table {
  --background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
  --border-radius: 16px;
  height: 56px;
  font-weight: 900;
  font-size: 16px;
  text-transform: none;
  letter-spacing: 0.5px;
  margin: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
}

.checkout-btn-table:hover {
  transform: translateY(-3px) scale(1.02);
  --background: linear-gradient(135deg, var(--coffee-600), var(--coffee-700));
  border-color: var(--coffee-900);
}

.checkout-btn-table ion-icon {
  transition: transform 0.3s ease;
}

.checkout-btn-table:hover ion-icon {
  transform: translateX(4px);
}

/* ===== VARIATION 6: COMPACT HORIZONTAL ===== */
.compact-top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.compact-date,
.compact-items {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: var(--cream-200);
  border-radius: 12px;
  font-size: 13px;
  font-weight: 800;
  color: var(--text-600);
}

.compact-date ion-icon,
.compact-items ion-icon {
  font-size: 18px;
  color: var(--coffee-600);
}

.compact-pricing {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 18px;
}

.compact-price-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: var(--cream-100);
  border-radius: 10px;
}

.compact-price-item.total {
  background: var(--cream-200);
  border: 2px solid var(--cream-300);
  padding: 12px 14px;
}

.compact-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-600);
}

.compact-price-item.total .compact-label {
  font-size: 15px;
  font-weight: 900;
  color: var(--coffee-800);
}

.compact-value {
  font-size: 15px;
  font-weight: 900;
  color: var(--coffee-800);
}

.compact-price-item.total .compact-value {
  font-size: 18px;
  letter-spacing: -0.5px;
}

.checkout-btn-compact {
  --background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
  --border-radius: 16px;
  height: 54px;
  font-weight: 900;
  font-size: 15px;
  text-transform: none;
  letter-spacing: 0.5px;
  margin: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
}

.checkout-btn-compact:hover {
  transform: translateY(-3px) scale(1.02);
  --background: linear-gradient(135deg, var(--coffee-600), var(--coffee-700));
  border-color: var(--coffee-900);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .order-summary-showcase {
    grid-template-columns: 1fr;
    padding: 16px;
  }

  .split-content {
    grid-template-columns: 1fr;
  }

  .items-section {
    flex-direction: row;
    justify-content: flex-start;
  }
}
</style>