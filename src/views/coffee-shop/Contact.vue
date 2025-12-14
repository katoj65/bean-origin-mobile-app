<template>

<!-- CARD 3: COMPACT MOBILE-FIRST -->
<ion-card class="contact-card compact-contact">
<div class="card-content">
<h2 class="compact-title">Quick Contact</h2>

<div class="compact-items">
<a href="tel:+18005551234" class="compact-link">
<ion-icon :icon="callOutline"></ion-icon>
<span>+1 (800) 555-1234</span>
</a>

<a href="mailto:hello@beanorigin.com" class="compact-link">
<ion-icon :icon="mailOutline"></ion-icon>
<span>hello@beanorigin.com</span>
</a>

<div class="compact-link">
<ion-icon :icon="locationOutline"></ion-icon>
<span>123 Coffee Lane, Downtown</span>
</div>

<div class="compact-link">
<ion-icon :icon="timeOutline"></ion-icon>
<span>7AM - 9PM Daily</span>
</div>
</div>

<div class="compact-actions">
          <ion-button class="compact-btn primary">
            <ion-icon slot="start" :icon="callOutline"></ion-icon>
            Call
          </ion-button>
          <ion-button class="compact-btn secondary">
            <ion-icon slot="start" :icon="navigateOutline"></ion-icon>
            Directions
          </ion-button>
</div>
</div>
</ion-card>
</template>

<script setup>
import { IonCard, IonIcon, IonButton, IonPage, IonContent } from '@ionic/vue';
import {
callOutline,
mailOutline,
locationOutline,
timeOutline,
navigateOutline,
shareOutline,
mapOutline,
cafeOutline,
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

.contact-cards-showcase {
display: flex;
flex-direction: column;
gap: 24px;
padding: 20px;
background: var(--cream-200);
max-width: 800px;
margin: 0 auto;
}

.contact-card {
 margin: 16px;
 border-radius: 24px;
 background: white;
 box-shadow: none;
}

.card-content {
padding: 28px 24px;
}

/* ===== CARD 3: COMPACT MOBILE-FIRST ===== */
.compact-contact .card-content {
padding: 20px;
}

.compact-title {
font-size: 20px;
font-weight: 900;
color: var(--coffee-800);
margin: 0 0 18px 0;
letter-spacing: -0.3px;
}

.compact-items {
display: flex;
flex-direction: column;
gap: 14px;
margin-bottom: 18px;
}

.compact-link {
display: flex;
align-items: center;
gap: 12px;
padding: 12px 14px;
background: rgba(107, 66, 38, 0.04);
border-radius: 14px;
text-decoration: none;
color: var(--text-800);
font-size: 14px;
font-weight: 700;
transition: all 0.3s ease;
}

.compact-link:active {
background: rgba(107, 66, 38, 0.08);
transform: scale(0.98);
}

.compact-link ion-icon {
font-size: 20px;
color: var(--coffee-600);
}

.compact-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.compact-btn {
--border-radius: 14px;
height: 52px;
margin: 0;
}

.compact-btn.primary {
  --background: linear-gradient(135deg, #4CAF50, #388E3C);
}

.compact-btn.secondary {
  --background: black;
  --color: white;
}
.compact-btn ion-icon {
font-size: 24px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
.contact-cards-showcase {
padding: 16px;
}

.card-content {
padding: 24px 20px;
}

.actions-row {
grid-template-columns: 1fr;
}

.icon-grid {
grid-template-columns: 1fr;
}
}
</style>