<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>My Orders</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon slot="icon-only" :icon="filterOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="orders-page">
        
        <!-- HEADER STATS -->
        <div class="stats-section">
          <div class="stat-card">
            <div class="stat-icon active">
              <ion-icon :icon="timeOutline"></ion-icon>
            </div>
            <div class="stat-content">
              <span class="stat-value">2</span>
              <span class="stat-label">Active</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon completed">
              <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
            </div>
            <div class="stat-content">
              <span class="stat-value">24</span>
              <span class="stat-label">Completed</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon total">
              <ion-icon :icon="receiptOutline"></ion-icon>
            </div>
            <div class="stat-content">
              <span class="stat-value">26</span>
              <span class="stat-label">Total Orders</span>
            </div>
          </div>
        </div>

        <!-- FILTER TABS -->
        <div class="filter-tabs">
          <button class="filter-tab active">All Orders</button>
          <button class="filter-tab">Active</button>
          <button class="filter-tab">Completed</button>
        </div>

        <!-- ACTIVE ORDERS SECTION -->
        <div class="orders-section">
          <div class="section-header">
            <h2 class="section-title">Active Orders</h2>
            <span class="section-count">2 orders</span>
          </div>

          <!-- ACTIVE ORDER CARD 1 -->
          <div class="order-card active-order">
            <div class="order-header">
              <div class="shop-info">
                <ion-avatar class="shop-avatar">
                  <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100" alt="Bean Origin" />
                </ion-avatar>
                <div class="shop-details">
                  <h3 class="shop-name">Bean Origin</h3>
                  <span class="order-id">Order #BO-2847</span>
                </div>
              </div>
              <div class="status-badge preparing">
                <span class="status-dot"></span>
                <span>Preparing</span>
              </div>
            </div>

            <div class="order-time">
              <ion-icon :icon="timeOutline"></ion-icon>
              <span>Ordered today at 2:30 PM</span>
            </div>

            <div class="order-items">
              <div class="order-item">
                <div class="item-info">
                  <span class="item-name">Caramel Macchiato</span>
                  <span class="item-details">Large · Extra Shot · Oat Milk</span>
                </div>
                <div class="item-quantity">×2</div>
                <div class="item-price">$9.80</div>
              </div>
              <div class="order-item">
                <div class="item-info">
                  <span class="item-name">Croissant</span>
                  <span class="item-details">Butter</span>
                </div>
                <div class="item-quantity">×1</div>
                <div class="item-price">$3.50</div>
              </div>
            </div>

            <div class="order-footer">
              <div class="order-type">
                <ion-icon :icon="bagHandleOutline"></ion-icon>
                <span>Pickup</span>
              </div>
              <div class="order-total">
                <span class="total-label">Total</span>
                <span class="total-amount">$13.30</span>
              </div>
            </div>

            <div class="order-actions">
              <ion-button expand="block" class="track-btn">
                <ion-icon slot="start" :icon="navigateCircleOutline"></ion-icon>
                Track Order
              </ion-button>
            </div>
          </div>

          <!-- ACTIVE ORDER CARD 2 -->
          <div class="order-card active-order">
            <div class="order-header">
              <div class="shop-info">
                <ion-avatar class="shop-avatar">
                  <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=100" alt="Coffee House" />
                </ion-avatar>
                <div class="shop-details">
                  <h3 class="shop-name">Downtown Coffee</h3>
                  <span class="order-id">Order #DC-1923</span>
                </div>
              </div>
              <div class="status-badge ready">
                <span class="status-dot"></span>
                <span>Ready</span>
              </div>
            </div>

            <div class="order-time">
              <ion-icon :icon="timeOutline"></ion-icon>
              <span>Ordered today at 10:15 AM</span>
            </div>

            <div class="order-items">
              <div class="order-item">
                <div class="item-info">
                  <span class="item-name">Cold Brew</span>
                  <span class="item-details">Medium · Black</span>
                </div>
                <div class="item-quantity">×1</div>
                <div class="item-price">$4.50</div>
              </div>
            </div>

            <div class="order-footer">
              <div class="order-type">
                <ion-icon :icon="bicycleOutline"></ion-icon>
                <span>Delivery</span>
              </div>
              <div class="order-total">
                <span class="total-label">Total</span>
                <span class="total-amount">$4.50</span>
              </div>
            </div>

            <div class="order-actions">
              <ion-button expand="block" class="pickup-btn">
                <ion-icon slot="start" :icon="checkmarkCircleOutline"></ion-icon>
                Ready for Pickup
              </ion-button>
            </div>
          </div>
        </div>

        <!-- PAST ORDERS SECTION -->
        <div class="orders-section">
          <div class="section-header">
            <h2 class="section-title">This Week</h2>
            <span class="section-count">5 orders</span>
          </div>

          <!-- PAST ORDER CARD 1 -->
          <div class="order-card past-order">
            <div class="order-header">
              <div class="shop-info">
                <ion-avatar class="shop-avatar">
                  <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100" alt="Bean Origin" />
                </ion-avatar>
                <div class="shop-details">
                  <h3 class="shop-name">Bean Origin</h3>
                  <span class="order-id">Order #BO-2801</span>
                </div>
              </div>
              <div class="status-badge completed">
                <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
                <span>Completed</span>
              </div>
            </div>

            <div class="order-time">
              <ion-icon :icon="calendarOutline"></ion-icon>
              <span>Dec 13, 2025 · 3:45 PM</span>
            </div>

            <div class="order-items">
              <div class="order-item">
                <div class="item-info">
                  <span class="item-name">Cappuccino</span>
                  <span class="item-details">Medium · Regular Milk</span>
                </div>
                <div class="item-quantity">×1</div>
                <div class="item-price">$4.80</div>
              </div>
              <div class="order-item">
                <div class="item-info">
                  <span class="item-name">Blueberry Muffin</span>
                  <span class="item-details">-</span>
                </div>
                <div class="item-quantity">×1</div>
                <div class="item-price">$3.20</div>
              </div>
            </div>

            <div class="order-footer">
              <div class="order-type">
                <ion-icon :icon="bagHandleOutline"></ion-icon>
                <span>Pickup</span>
              </div>
              <div class="order-total">
                <span class="total-label">Total</span>
                <span class="total-amount">$8.00</span>
              </div>
            </div>

            <div class="order-actions-row">
              <ion-button fill="outline" class="view-btn">
                View Details
              </ion-button>
              <ion-button class="reorder-btn">
                <ion-icon slot="start" :icon="repeatOutline"></ion-icon>
                Reorder
              </ion-button>
            </div>
          </div>

          <!-- COMPACT PAST ORDERS -->
          <div class="order-card past-order compact">
            <div class="compact-header">
              <div class="compact-left">
                <ion-avatar class="shop-avatar-small">
                  <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=80" alt="Coffee House" />
                </ion-avatar>
                <div class="compact-info">
                  <h4 class="compact-shop-name">Downtown Coffee</h4>
                  <span class="compact-date">Dec 12, 2025 · 8:30 AM</span>
                  <span class="compact-items">2 items · Pickup</span>
                </div>
              </div>
              <div class="compact-right">
                <span class="compact-total">$12.50</span>
                <ion-icon :icon="chevronForwardOutline" class="chevron-icon"></ion-icon>
              </div>
            </div>
          </div>

          <div class="order-card past-order compact">
            <div class="compact-header">
              <div class="compact-left">
                <ion-avatar class="shop-avatar-small">
                  <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80" alt="Bean Origin" />
                </ion-avatar>
                <div class="compact-info">
                  <h4 class="compact-shop-name">Bean Origin</h4>
                  <span class="compact-date">Dec 11, 2025 · 2:15 PM</span>
                  <span class="compact-items">1 item · Delivery</span>
                </div>
              </div>
              <div class="compact-right">
                <span class="compact-total">$5.20</span>
                <ion-icon :icon="chevronForwardOutline" class="chevron-icon"></ion-icon>
              </div>
            </div>
          </div>

          <div class="order-card past-order compact">
            <div class="compact-header">
              <div class="compact-left">
                <ion-avatar class="shop-avatar-small">
                  <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=80" alt="Coffee House" />
                </ion-avatar>
                <div class="compact-info">
                  <h4 class="compact-shop-name">Espresso Bar</h4>
                  <span class="compact-date">Dec 10, 2025 · 4:00 PM</span>
                  <span class="compact-items">3 items · Pickup</span>
                </div>
              </div>
              <div class="compact-right">
                <span class="compact-total">$18.90</span>
                <ion-icon :icon="chevronForwardOutline" class="chevron-icon"></ion-icon>
              </div>
            </div>
          </div>
        </div>

        <!-- EARLIER SECTION -->
        <div class="orders-section">
          <div class="section-header">
            <h2 class="section-title">Earlier</h2>
            <span class="section-count">19 orders</span>
          </div>

          <div class="order-card past-order compact">
            <div class="compact-header">
              <div class="compact-left">
                <ion-avatar class="shop-avatar-small">
                  <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80" alt="Bean Origin" />
                </ion-avatar>
                <div class="compact-info">
                  <h4 class="compact-shop-name">Bean Origin</h4>
                  <span class="compact-date">Dec 5, 2025 · 9:20 AM</span>
                  <span class="compact-items">2 items · Pickup</span>
                </div>
              </div>
              <div class="compact-right">
                <span class="compact-total">$9.40</span>
                <ion-icon :icon="chevronForwardOutline" class="chevron-icon"></ion-icon>
              </div>
            </div>
          </div>

          <ion-button expand="block" fill="outline" class="load-more-btn">
            Load More Orders
          </ion-button>
        </div>

        <!-- EMPTY STATE (Hidden when orders exist) -->
        <!-- <div class="empty-state">
          <div class="empty-icon">
            <ion-icon :icon="receiptOutline"></ion-icon>
          </div>
          <h3 class="empty-title">No Orders Yet</h3>
          <p class="empty-text">
            Start your coffee journey! Browse our menu and place your first order.
          </p>
          <ion-button class="browse-btn">
            <ion-icon slot="start" :icon="cafeOutline"></ion-icon>
            Browse Menu
          </ion-button>
        </div> -->

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonBackButton,
  IonButton,
  IonIcon,
  IonAvatar
} from '@ionic/vue';
import {
  filterOutline,
  timeOutline,
  checkmarkCircleOutline,
  receiptOutline,
  bagHandleOutline,
  bicycleOutline,
  navigateCircleOutline,
  calendarOutline,
  repeatOutline,
  chevronForwardOutline,
  cafeOutline,
} from 'ionicons/icons';

// Sample data structure
const orders = [
  {
    id: 'BO-2847',
    shopName: 'Bean Origin',
    shopLogo: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100',
    status: 'preparing',
    orderDate: 'Today at 2:30 PM',
    orderType: 'pickup',
    items: [
      { name: 'Caramel Macchiato', details: 'Large · Extra Shot · Oat Milk', quantity: 2, price: 9.80 },
      { name: 'Croissant', details: 'Butter', quantity: 1, price: 3.50 }
    ],
    total: 13.30
  }
  // ... more orders
];
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
  --blue: #3b82f6;
  --red: #ef4444;
  --orange: #f97316;
}

ion-toolbar {
  --background: var(--cream-100);
  --color: var(--coffee-800);
}

ion-title {
  font-weight: 800;
}

.orders-page {
  padding: 20px;
  background: var(--cream-200);
  min-height: 100%;
}

/* ===== STATS SECTION ===== */
.stats-section {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 12px;
margin-bottom: 28px;
}

.stat-card {
background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
border-radius: 20px;
padding: 20px 16px;
display: flex;
flex-direction: column;
align-items: center;
gap: 12px;
box-shadow: none;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
position: relative;
overflow: hidden;
}

.stat-card::before {
content: '';
position: absolute;
inset: 0;
border-radius: 20px;
padding: 2px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.15), rgba(168, 123, 84, 0.15));
-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
-webkit-mask-composite: xor;
mask-composite: exclude;
opacity: 0;
transition: opacity 0.3s ease;
}

.stat-card:hover {
transform: translateY(-4px);
box-shadow: none;
}

.stat-card:hover::before {
opacity: 1;
}

.stat-icon {
width: 52px;
height: 52px;
border-radius: 16px;
display: flex;
align-items: center;
justify-content: center;
box-shadow: none;
transition: transform 0.3s ease;
}

.stat-card:hover .stat-icon {
transform: scale(1.1) rotate(5deg);
}

.stat-icon ion-icon {
font-size: 28px;
color: white;
}

.stat-icon.active {
background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.stat-icon.completed {
background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.stat-icon.total {
background: linear-gradient(135deg, #6b4226 0%, #4a2c2a 100%);
}

.stat-content {
display: flex;
flex-direction: column;
align-items: center;
gap: 4px;
}

.stat-value {
font-size: 26px;
font-weight: 900;
color: #000000;
letter-spacing: -0.8px;
}

.stat-label {
font-size: 12px;
font-weight: 700;
color: #6b4226;
text-transform: uppercase;
letter-spacing: 0.5px;
}/* ===== FILTER TABS ===== */
.filter-tabs {
display: flex;
gap: 10px;
margin-bottom: 28px;
overflow-x: auto;
padding-bottom: 4px;
}

.filter-tabs::-webkit-scrollbar {
display: none;
}

.filter-tab {
padding: 12px 24px;
background: #ffffff;
border: none;
border-radius: 24px;
font-size: 14px;
font-weight: 700;
color: #6b4226;
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
white-space: nowrap;
box-shadow: none;
position: relative;
}

.filter-tab::before {
content: '';
position: absolute;
inset: 0;
border-radius: 24px;
background: linear-gradient(135deg, #6b4226 0%, #4a2c2a 100%);
opacity: 0;
transition: opacity 0.3s ease;
z-index: -1;
}

.filter-tab.active {
color: white;
transform: translateY(-2px);
box-shadow: none;
}

.filter-tab.active::before {
opacity: 1;
}

.filter-tab:hover:not(.active) {
transform: translateY(-2px);
box-shadow: none;
color: #4a2c2a;
}/* ===== ORDERS SECTION ===== */
.orders-section {
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
font-size: 22px;
font-weight: 900;
color: #000000;
margin: 0;
letter-spacing: -0.8px;
}

.section-count {
font-size: 13px;
font-weight: 700;
color: #6b4226;
background: rgba(107, 66, 38, 0.1);
padding: 4px 12px;
border-radius: 12px;
}/* ===== ORDER CARD ===== */
.order-card {
background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
border-radius: 24px;
padding: 24px;
margin-bottom: 16px;
box-shadow: none;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
position: relative;
overflow: hidden;
}

.order-card::before {
content: '';
position: absolute;
inset: 0;
border-radius: 24px;
padding: 2px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.2), rgba(168, 123, 84, 0.2));
-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
-webkit-mask-composite: xor;
mask-composite: exclude;
opacity: 0;
transition: opacity 0.3s ease;
}

.order-card:hover {
transform: translateY(-4px);
box-shadow: none;
}

.order-card:hover::before {
opacity: 1;
}

.order-card.active-order {
border: none;
background: linear-gradient(135deg, #fff7ed 0%, #ffffff 100%);
box-shadow: none;
}

.order-card.active-order::before {
background: linear-gradient(135deg, rgba(249, 115, 22, 0.3), rgba(234, 88, 12, 0.3));
}/* ORDER HEADER */
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 14px;
}

.shop-info {
  display: flex;
  gap: 12px;
  flex: 1;
}

.shop-avatar {
width: 52px;
height: 52px;
border-radius: 16px;
border: none;
box-shadow: none;
}

.shop-details {
display: flex;
flex-direction: column;
gap: 4px;
}

.shop-name {
font-size: 17px;
font-weight: 900;
color: #000000;
margin: 0;
letter-spacing: -0.5px;
}.order-id {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-500);
}

/* STATUS BADGE */
.status-badge {
display: flex;
align-items: center;
gap: 6px;
padding: 8px 16px;
border-radius: 16px;
font-size: 13px;
font-weight: 800;
flex-shrink: 0;
box-shadow: none;
transition: all 0.3s ease;
}

.status-badge:hover {
transform: scale(1.05);
}

.status-badge.preparing {
background: linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(249, 115, 22, 0.2) 100%);
color: #ea580c;
border: none;
}

.status-badge.ready {
background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.2) 100%);
color: #059669;
border: none;
}

.status-badge.completed {
background: linear-gradient(135deg, rgba(107, 114, 128, 0.15) 0%, rgba(107, 114, 128, 0.2) 100%);
color: #4b5563;
border: none;
}

.status-dot {
width: 10px;
height: 10px;
border-radius: 50%;
background: currentColor;
animation: pulse 2s infinite;
box-shadow: none;
}@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* ORDER TIME */
.order-time {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-600);
}

.order-time ion-icon {
  font-size: 18px;
  color: var(--coffee-600);
}

/* ORDER ITEMS */
.order-items {
margin-bottom: 16px;
padding-bottom: 16px;
border-bottom: none;
}.order-item {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 12px;
  align-items: flex-start;
  padding: 10px 0;
}

.order-item:first-child {
  padding-top: 0;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  font-size: 15px;
  font-weight: 800;
  color: var(--coffee-800);
  line-height: 1.3;
}

.item-details {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-500);
  line-height: 1.3;
}

.item-quantity {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-600);
  align-self: center;
}

.item-price {
  font-size: 15px;
  font-weight: 900;
  color: var(--coffee-800);
  text-align: right;
  align-self: center;
}

/* ORDER FOOTER */
.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.order-type {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-600);
}

.order-type ion-icon {
  font-size: 20px;
  color: var(--coffee-600);
}

.order-total {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.total-label {
  font-size: 12px;
  font-weight: 800;
  color: var(--text-500);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.total-amount {
  font-size: 20px;
  font-weight: 900;
  color: var(--coffee-800);
  letter-spacing: -0.5px;
}

/* ORDER ACTIONS */
.order-actions {
  display: flex;
  gap: 10px;
}

.track-btn {
  --background: linear-gradient(135deg, var(--orange), #ea580c);
  --border-radius: 14px;
  height: 48px;
  font-weight: 800;
  text-transform: none;
  margin: 0;
}

.pickup-btn {
  --background: linear-gradient(135deg, var(--green), #059669);
  --border-radius: 14px;
  height: 48px;
  font-weight: 800;
  text-transform: none;
  margin: 0;
}

.order-actions-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.view-btn {
  --border-color: var(--coffee-600);
  --color: var(--coffee-700);
  --border-radius: 14px;
  --border-width: 2px;
  height: 48px;
  font-weight: 800;
  text-transform: none;
  margin: 0;
}

.reorder-btn {
  --background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
  --border-radius: 14px;
  height: 48px;
  font-weight: 800;
  text-transform: none;
  margin: 0;
}

/* ===== COMPACT ORDER CARD ===== */
.order-card.compact {
  padding: 16px;
  cursor: pointer;
}

.order-card.compact:hover {
  background: var(--cream-100);
}

.compact-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.compact-left {
  display: flex;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.shop-avatar-small {
width: 44px;
height: 44px;
border-radius: 10px;
border: none;
flex-shrink: 0;
}.compact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.compact-shop-name {
  font-size: 15px;
  font-weight: 900;
  color: var(--coffee-800);
  margin: 0;
  letter-spacing: -0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.compact-date {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-600);
}

.compact-items {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-500);
}

.compact-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.compact-total {
  font-size: 16px;
  font-weight: 900;
  color: var(--coffee-800);
  letter-spacing: -0.3px;
}

.chevron-icon {
  font-size: 20px;
  color: var(--text-500);
}

/* ===== LOAD MORE BUTTON ===== */
.load-more-btn {
  --border-color: var(--coffee-600);
  --color: var(--coffee-700);
  --border-radius: 16px;
  --border-width: 2px;
  height: 48px;
  font-weight: 800;
  text-transform: none;
  margin: 16px 0 0 0;
}

/* ===== EMPTY STATE ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  min-height: 400px;
}

.empty-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--cream-200);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.empty-icon ion-icon {
  font-size: 56px;
  color: var(--coffee-600);
  opacity: 0.5;
}

.empty-title {
  font-size: 24px;
  font-weight: 900;
  color: var(--coffee-800);
  margin: 0 0 12px 0;
  letter-spacing: -0.8px;
}

.empty-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-600);
  line-height: 1.6;
  margin: 0 0 32px 0;
  max-width: 300px;
}

.browse-btn {
  --background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
  --border-radius: 16px;
  height: 52px;
  font-weight: 800;
  text-transform: none;
  padding: 0 32px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .orders-page {
    padding: 16px;
  }

  .stats-section {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .stat-card {
    flex-direction: row;
    justify-content: flex-start;
    padding: 14px 16px;
  }

  .stat-content {
    align-items: flex-start;
    flex: 1;
  }

  .order-actions-row {
    grid-template-columns: 1fr;
  }
}

/* ===== ANIMATIONS ===== */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.order-card {
  animation: slideIn 0.3s ease-out;
}
</style>