<template>
  <div class="header-cards-showcase">
    
    <!-- CARD 2: PREMIUM ELEGANT CONTACT -->
    <ion-card class="contact-card premium-contact">
      <div class="card-content">
        <div class="premium-header">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=120" alt="Coffee Shop" class="premium-avatar">
          <div>
            <h2 class="premium-title">Bean Origin Coffee</h2>
            <p class="premium-subtitle">Your Destination for Exceptional Coffee & Connection</p>
            <div class="premium-rating">
              <span class="rating-stars">
                <ion-icon :icon="star" class="star-icon filled"></ion-icon>
                <ion-icon :icon="star" class="star-icon filled"></ion-icon>
                <ion-icon :icon="star" class="star-icon filled"></ion-icon>
                <ion-icon :icon="star" class="star-icon filled"></ion-icon>
                <ion-icon :icon="starHalf" class="star-icon filled"></ion-icon>
              </span>
              <span class="premium-rating-value">4.8</span>
              <span class="premium-review-count">(324 reviews)</span>
            </div>
            <span class="status-badge open">
              <span class="status-dot"></span>
              Open
            </span>
          </div>
        </div>
        
        <div class="premium-divider"></div>
        
        <div class="premium-grid">
          <div class="premium-item">
            <div class="premium-icon-wrapper">
              <ion-icon :icon="callOutline"></ion-icon>
            </div>
            <div class="premium-content">
              <span class="premium-label">Call Us</span>
              <a href="tel:+18005551234" class="premium-link">+1 (800) 555-1234</a>
            </div>
          </div>
          
          <div class="premium-item">
            <div class="premium-icon-wrapper">
              <ion-icon :icon="mailOutline"></ion-icon>
            </div>
            <div class="premium-content">
              <span class="premium-label">Email</span>
              <a href="mailto:hello@beanorigin.com" class="premium-link">hello@beanorigin.com</a>
            </div>
          </div>
          
          <div class="premium-item">
            <div class="premium-icon-wrapper">
              <ion-icon :icon="locationOutline"></ion-icon>
            </div>
            <div class="premium-content">
              <span class="premium-label">Location</span>
              <span class="premium-value">123 Coffee Lane, Downtown District</span>
            </div>
          </div>
          
          <div class="premium-item">
            <div class="premium-icon-wrapper">
              <ion-icon :icon="timeOutline"></ion-icon>
            </div>
            <div class="premium-content">
              <span class="premium-label">Opening Hours</span>
              <span class="premium-value">Monday - Friday: 7AM - 9PM<br>Weekend: 8AM - 10PM</span>
            </div>
          </div>
        </div>
        
       
      </div>
    </ion-card>

 
  </div>
</template>

<script setup>
import { IonCard, IonIcon, IonButton } from '@ionic/vue';
import {
  callOutline,
  mailOutline,
  locationOutline,
  timeOutline,
  navigateOutline,
  shareOutline,
  mapOutline,
  cafeOutline,
  star,
  starHalf,
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
  margin: 0;
  border-radius: 0;
  background: white;
  box-shadow: none;
}

.card-content {
  padding: 28px 24px;
}

/* ===== CONTACT AVATAR ===== */
.contact-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.contact-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(107, 66, 38, 0.1);
  flex-shrink: 0;
}

.premium-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(107, 66, 38, 0.1);
  flex-shrink: 0;
}

.premium-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}

.premium-header > div {
  flex: 1;
}

.contact-info {
  flex: 1;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  background: rgba(107, 66, 38, 0.1);
  color: var(--text-600);
  margin-top: 4px;
}

.status-badge.open {
  background: rgba(16, 185, 129, 0.12);
  color: var(--green);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  display: inline-block;
}

.card-tagline {
  font-size: 14px;
  font-weight: 600;
  color: #000000;
  margin: 6px 0 12px 0;
  line-height: 1.4;
}

.hours-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* ===== RATING AND STATUS ===== */
.rating-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.star-icon {
  font-size: 16px;
  color: #d1d5db;
}

.star-icon.filled {
  color: var(--gold);
}

.rating-value {
  font-size: 15px;
  font-weight: 800;
  color: #000000;
}

.review-count {
  font-size: 13px;
  color: #000000;
}

.premium-rating-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
}

.premium-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.premium-rating-value {
  font-size: 16px;
  font-weight: 800;
  color: #000000;
}

.premium-review-count {
  font-size: 14px;
  color: #000000;
}

/* ===== CARD 1: MINIMAL MODERN ===== */
.minimal-contact .card-title {
  font-size: 24px;
  font-weight: 900;
  color: #000000;
  margin: 0;
  letter-spacing: -0.5px;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 24px 0;
}

.contact-item {
  display: flex;
  gap: 16px;
}

.contact-icon {
  font-size: 24px;
  color: var(--coffee-600);
  flex-shrink: 0;
  margin-top: 2px;
}

.contact-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.contact-label {
  font-size: 13px;
  font-weight: 800;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-value {
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  text-decoration: none;
}

.contact-value:hover {
  color: var(--coffee-600);
}

.actions-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.primary-action {
  --background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
  --border-radius: 16px;
  height: 52px;
  font-weight: 800;
  text-transform: none;
}

.secondary-action {
  --border-color: var(--coffee-600);
  --color: var(--coffee-700);
  --border-radius: 16px;
  --border-width: 2px;
  height: 52px;
  font-weight: 800;
  text-transform: none;
}

/* ===== CARD 2: PREMIUM ELEGANT ===== */
.premium-contact {
  background: #ffffff;
}

.premium-header {
  margin-bottom: 20px;
}

.premium-title {
  font-size: 26px;
  font-weight: 900;
  color: #000000;
  margin: 0;
  letter-spacing: -0.8px;
}

.premium-subtitle {
  font-size: 15px;
  font-weight: 600;
  color: #000000;
  margin: 8px 0 0 0;
}

.premium-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cream-300) 20%, var(--cream-300) 80%, transparent);
  margin-bottom: 24px;
}

.premium-grid {
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
}

.premium-item {
  display: flex;
  gap: 16px;
}

.premium-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(107, 66, 38, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.premium-icon-wrapper ion-icon {
  font-size: 24px;
  color: var(--coffee-600);
}

.premium-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.premium-label {
  font-size: 13px;
  font-weight: 800;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.premium-link,
.premium-value {
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  text-decoration: none;
  line-height: 1.5;
}

.premium-link:hover {
  color: var(--coffee-600);
}

.premium-cta {
  --background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
  --border-radius: 18px;
  height: 56px;
  font-size: 16px;
  font-weight: 800;
  text-transform: none;
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
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.compact-btn {
  --border-radius: 14px;
  height: 52px;
  margin: 0;
}

.compact-btn.primary {
  --background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
}

.compact-btn.secondary {
  --background: rgba(107, 66, 38, 0.08);
  --color: var(--coffee-700);
}

.compact-btn ion-icon {
  font-size: 24px;
}

/* ===== CARD 4: ICON-FOCUSED ===== */
.icon-focused .icon-title {
  font-size: 24px;
  font-weight: 900;
  color: var(--coffee-800);
  margin: 0 0 24px 0;
  letter-spacing: -0.5px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.icon-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  background: var(--cream-200);
  border-radius: 20px;
  text-align: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.icon-tile:active {
  transform: translateY(-4px);
}

.tile-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

.icon-tile.phone .tile-icon {
  background: linear-gradient(135deg, #34d399, #10b981);
}

.icon-tile.email .tile-icon {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
}

.icon-tile.location .tile-icon {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
}

.icon-tile.hours .tile-icon {
  background: linear-gradient(135deg, #a78bfa, #8b5cf6);
}

.tile-icon ion-icon {
  font-size: 32px;
  color: white;
}

.tile-label {
  font-size: 12px;
  font-weight: 800;
  color: var(--text-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tile-value {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-800);
  text-decoration: none;
  line-height: 1.4;
}

.tile-value:hover {
  color: var(--coffee-600);
}

.icon-cta {
  --background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
  --border-radius: 18px;
  height: 54px;
  font-weight: 800;
  text-transform: none;
}

/* ===== CARD 5: MAP-ACCENTED ===== */
.map-contact .card-content {
  padding: 0;
}

.map-section {
  background: linear-gradient(135deg, var(--cream-300), var(--cream-200));
  padding: 48px 24px;
  text-align: center;
}

.map-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.map-icon {
  font-size: 64px;
  color: var(--coffee-600);
}

.map-label {
  font-size: 16px;
  font-weight: 800;
  color: var(--coffee-800);
}

.map-details {
  padding: 28px 24px;
}

.map-title {
  font-size: 24px;
  font-weight: 900;
  color: var(--coffee-800);
  margin: 0 0 20px 0;
  letter-spacing: -0.5px;
}

.map-info-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.map-info-item {
  display: flex;
  gap: 14px;
  padding: 16px;
  background: var(--cream-200);
  border-radius: 16px;
}

.map-info-item ion-icon {
  font-size: 24px;
  color: var(--coffee-600);
  flex-shrink: 0;
}

.map-info-item div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.info-small {
  font-size: 12px;
  font-weight: 800;
  color: var(--text-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-large {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-800);
  text-decoration: none;
}

.info-large:hover {
  color: var(--coffee-600);
}

.map-cta {
  --background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
  --border-radius: 18px;
  height: 56px;
  font-weight: 800;
  text-transform: none;
}

/* ===== CARD 6: FRIENDLY NEIGHBORHOOD ===== */
.friendly-contact {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
}

.friendly-header {
  text-align: center;
  margin-bottom: 28px;
}

.friendly-icon-header {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  box-shadow: none;
}

.friendly-icon-header ion-icon {
  font-size: 40px;
  color: var(--coffee-600);
}

.friendly-title {
  font-size: 26px;
  font-weight: 900;
  color: var(--coffee-800);
  margin: 0 0 6px 0;
  letter-spacing: -0.8px;
}

.friendly-subtitle {
  font-size: 15px;
  font-weight: 600;
  color: var(--coffee-700);
  margin: 0;
}

.friendly-sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.friendly-section {
  background: white;
  padding: 20px;
  border-radius: 18px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.section-icon {
  font-size: 20px;
  color: var(--coffee-600);
}

.section-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-content {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-800);
  text-decoration: none;
  line-height: 1.6;
  display: block;
}

.section-content:hover {
  color: var(--coffee-600);
}

.friendly-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.friendly-btn-primary {
  --background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
  --border-radius: 18px;
  height: 54px;
  font-weight: 800;
  text-transform: none;
}

.friendly-btn-secondary {
  --border-color: var(--coffee-600);
  --color: var(--coffee-700);
  --border-radius: 18px;
  --border-width: 2px;
  height: 54px;
  font-weight: 800;
  text-transform: none;
}

/* ===== CARD 7: AFRICAN-INSPIRED ===== */
.african-contact {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
}

.african-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(139, 90, 60, 0.03) 10px, rgba(139, 90, 60, 0.03) 20px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(139, 90, 60, 0.03) 10px, rgba(139, 90, 60, 0.03) 20px);
  pointer-events: none;
}

.african-header {
  position: relative;
  margin-bottom: 24px;
}

.african-accent {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--coffee-600), var(--amber));
  border-radius: 2px;
  margin-bottom: 12px;
}

.african-title {
  font-size: 26px;
  font-weight: 900;
  color: var(--coffee-800);
  margin: 0;
  letter-spacing: -0.8px;
}

.african-contacts {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 24px;
  position: relative;
}

.african-contact-item {
  display: flex;
  gap: 16px;
  background: white;
  padding: 18px;
  border-radius: 18px;
}

.african-icon-box {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.phone-box {
  background: linear-gradient(135deg, #34d399, #10b981);
}

.email-box {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
}

.location-box {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
}

.time-box {
  background: linear-gradient(135deg, #a78bfa, #8b5cf6);
}

.african-icon-box ion-icon {
  font-size: 26px;
  color: white;
}

.african-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.african-label {
  font-size: 12px;
  font-weight: 800;
  color: var(--text-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.african-value {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-800);
  text-decoration: none;
  line-height: 1.5;
}

.african-value:hover {
  color: var(--coffee-600);
}

.african-divider {
  height: 3px;
  background: linear-gradient(90deg, var(--coffee-600), var(--amber), var(--coffee-600));
  border-radius: 2px;
  margin-bottom: 24px;
  position: relative;
}

.african-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
}

.african-primary {
  --background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
  --border-radius: 18px;
  height: 56px;
  font-weight: 800;
  text-transform: none;
}

.african-secondary-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.african-secondary {
  --border-color: var(--coffee-600);
  --color: var(--coffee-700);
  --border-radius: 18px;
  --border-width: 2px;
  height: 54px;
  font-weight: 800;
  text-transform: none;
  margin: 0;
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