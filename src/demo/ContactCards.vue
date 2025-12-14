<template>
  <ion-page>
    <ion-content>
      <div class="contact-cards-showcase">
    
    <!-- CARD 1: MINIMAL MODERN CONTACT -->
    <ion-card class="contact-card minimal-contact">
      <div class="card-content">
        <h2 class="card-title">Get in Touch</h2>
        
        <div class="contact-list">
          <div class="contact-item">
            <ion-icon :icon="callOutline" class="contact-icon"></ion-icon>
            <div class="contact-text">
              <span class="contact-label">Phone</span>
              <a href="tel:+18005551234" class="contact-value">+1 (800) 555-1234</a>
            </div>
          </div>
          
          <div class="contact-item">
            <ion-icon :icon="mailOutline" class="contact-icon"></ion-icon>
            <div class="contact-text">
              <span class="contact-label">Email</span>
              <a href="mailto:hello@beanorigin.com" class="contact-value">hello@beanorigin.com</a>
            </div>
          </div>
          
          <div class="contact-item">
            <ion-icon :icon="locationOutline" class="contact-icon"></ion-icon>
            <div class="contact-text">
              <span class="contact-label">Address</span>
              <span class="contact-value">123 Coffee Lane, Downtown</span>
            </div>
          </div>
          
          <div class="contact-item">
            <ion-icon :icon="timeOutline" class="contact-icon"></ion-icon>
            <div class="contact-text">
              <span class="contact-label">Hours</span>
              <span class="contact-value">Mon-Fri: 7AM - 9PM</span>
            </div>
          </div>
        </div>
        
        <div class="actions-row">
          <ion-button expand="block" class="primary-action">
            <ion-icon slot="start" :icon="callOutline"></ion-icon>
            Call Now
          </ion-button>
          <ion-button expand="block" fill="outline" class="secondary-action">
            <ion-icon slot="start" :icon="navigateOutline"></ion-icon>
            Directions
          </ion-button>
        </div>
      </div>
    </ion-card>

    <!-- CARD 2: PREMIUM ELEGANT CONTACT -->
    <ion-card class="contact-card premium-contact">
      <div class="card-content">
        <div class="premium-header">
          <h2 class="premium-title">Contact Us</h2>
          <p class="premium-subtitle">We'd love to hear from you</p>
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
        
        <ion-button expand="block" class="premium-cta">
          <ion-icon slot="start" :icon="navigateOutline"></ion-icon>
          Get Directions
        </ion-button>
      </div>
    </ion-card>

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
            <ion-icon :icon="callOutline"></ion-icon>
          </ion-button>
          <ion-button class="compact-btn secondary">
            <ion-icon :icon="navigateOutline"></ion-icon>
          </ion-button>
          <ion-button class="compact-btn secondary">
            <ion-icon :icon="shareOutline"></ion-icon>
          </ion-button>
        </div>
      </div>
    </ion-card>

    <!-- CARD 4: ICON-FOCUSED CONTACT -->
    <ion-card class="contact-card icon-focused">
      <div class="card-content">
        <h2 class="icon-title">Reach Out</h2>
        
        <div class="icon-grid">
          <div class="icon-tile phone">
            <div class="tile-icon">
              <ion-icon :icon="callOutline"></ion-icon>
            </div>
            <span class="tile-label">Phone</span>
            <a href="tel:+18005551234" class="tile-value">+1 (800) 555-1234</a>
          </div>
          
          <div class="icon-tile email">
            <div class="tile-icon">
              <ion-icon :icon="mailOutline"></ion-icon>
            </div>
            <span class="tile-label">Email</span>
            <a href="mailto:hello@beanorigin.com" class="tile-value">hello@beanorigin.com</a>
          </div>
          
          <div class="icon-tile location">
            <div class="tile-icon">
              <ion-icon :icon="locationOutline"></ion-icon>
            </div>
            <span class="tile-label">Location</span>
            <span class="tile-value">123 Coffee Lane</span>
          </div>
          
          <div class="icon-tile hours">
            <div class="tile-icon">
              <ion-icon :icon="timeOutline"></ion-icon>
            </div>
            <span class="tile-label">Hours</span>
            <span class="tile-value">7AM - 9PM</span>
          </div>
        </div>
        
        <ion-button expand="block" class="icon-cta">
          Visit Us Today
        </ion-button>
      </div>
    </ion-card>

    <!-- CARD 5: MAP-ACCENTED CONTACT -->
    <ion-card class="contact-card map-contact">
      <div class="card-content">
        <div class="map-section">
          <div class="map-placeholder">
            <ion-icon :icon="mapOutline" class="map-icon"></ion-icon>
            <span class="map-label">123 Coffee Lane, Downtown</span>
          </div>
        </div>
        
        <div class="map-details">
          <h2 class="map-title">Visit Our Café</h2>
          
          <div class="map-info-grid">
            <div class="map-info-item">
              <ion-icon :icon="callOutline"></ion-icon>
              <div>
                <span class="info-small">Call</span>
                <a href="tel:+18005551234" class="info-large">+1 (800) 555-1234</a>
              </div>
            </div>
            
            <div class="map-info-item">
              <ion-icon :icon="timeOutline"></ion-icon>
              <div>
                <span class="info-small">Hours</span>
                <span class="info-large">Mon-Fri: 7AM - 9PM</span>
              </div>
            </div>
            
            <div class="map-info-item">
              <ion-icon :icon="mailOutline"></ion-icon>
              <div>
                <span class="info-small">Email</span>
                <a href="mailto:hello@beanorigin.com" class="info-large">hello@beanorigin.com</a>
              </div>
            </div>
          </div>
          
          <ion-button expand="block" class="map-cta">
            <ion-icon slot="start" :icon="navigateOutline"></ion-icon>
            Get Directions
          </ion-button>
        </div>
      </div>
    </ion-card>

    <!-- CARD 6: FRIENDLY NEIGHBORHOOD -->
    <ion-card class="contact-card friendly-contact">
      <div class="card-content">
        <div class="friendly-header">
          <div class="friendly-icon-header">
            <ion-icon :icon="cafeOutline"></ion-icon>
          </div>
          <h2 class="friendly-title">Come Say Hi!</h2>
          <p class="friendly-subtitle">Your neighborhood coffee spot</p>
        </div>
        
        <div class="friendly-sections">
          <div class="friendly-section">
            <div class="section-header">
              <ion-icon :icon="callOutline" class="section-icon"></ion-icon>
              <span class="section-title">Give us a call</span>
            </div>
            <a href="tel:+18005551234" class="section-content">+1 (800) 555-1234</a>
          </div>
          
          <div class="friendly-section">
            <div class="section-header">
              <ion-icon :icon="locationOutline" class="section-icon"></ion-icon>
              <span class="section-title">Find us at</span>
            </div>
            <span class="section-content">123 Coffee Lane, Downtown District</span>
          </div>
          
          <div class="friendly-section">
            <div class="section-header">
              <ion-icon :icon="timeOutline" class="section-icon"></ion-icon>
              <span class="section-title">We're open</span>
            </div>
            <span class="section-content">Monday - Friday: 7AM - 9PM<br>Weekends: 8AM - 10PM</span>
          </div>
        </div>
        
        <div class="friendly-actions">
          <ion-button expand="block" class="friendly-btn-primary">
            <ion-icon slot="start" :icon="navigateOutline"></ion-icon>
            Get Directions
          </ion-button>
          <ion-button expand="block" fill="outline" class="friendly-btn-secondary">
            <ion-icon slot="start" :icon="shareOutline"></ion-icon>
            Share Location
          </ion-button>
        </div>
      </div>
    </ion-card>

    <!-- CARD 7: AFRICAN-INSPIRED MODERN -->
    <ion-card class="contact-card african-contact">
      <div class="african-pattern"></div>
      <div class="card-content">
        <div class="african-header">
          <div class="african-accent"></div>
          <h2 class="african-title">Connect With Us</h2>
        </div>
        
        <div class="african-contacts">
          <div class="african-contact-item">
            <div class="african-icon-box phone-box">
              <ion-icon :icon="callOutline"></ion-icon>
            </div>
            <div class="african-text">
              <span class="african-label">Phone Number</span>
              <a href="tel:+18005551234" class="african-value">+1 (800) 555-1234</a>
            </div>
          </div>
          
          <div class="african-contact-item">
            <div class="african-icon-box email-box">
              <ion-icon :icon="mailOutline"></ion-icon>
            </div>
            <div class="african-text">
              <span class="african-label">Email Address</span>
              <a href="mailto:hello@beanorigin.com" class="african-value">hello@beanorigin.com</a>
            </div>
          </div>
          
          <div class="african-contact-item">
            <div class="african-icon-box location-box">
              <ion-icon :icon="locationOutline"></ion-icon>
            </div>
            <div class="african-text">
              <span class="african-label">Our Location</span>
              <span class="african-value">123 Coffee Lane, Downtown District</span>
            </div>
          </div>
          
          <div class="african-contact-item">
            <div class="african-icon-box time-box">
              <ion-icon :icon="timeOutline"></ion-icon>
            </div>
            <div class="african-text">
              <span class="african-label">Opening Hours</span>
              <span class="african-value">Mon-Fri: 7AM - 9PM · Weekend: 8AM - 10PM</span>
            </div>
          </div>
        </div>
        
        <div class="african-divider"></div>
        
        <div class="african-actions">
          <ion-button expand="block" class="african-primary">
            <ion-icon slot="start" :icon="navigateOutline"></ion-icon>
            Get Directions
          </ion-button>
          <div class="african-secondary-row">
            <ion-button fill="outline" class="african-secondary">
              <ion-icon slot="start" :icon="callOutline"></ion-icon>
              Call
            </ion-button>
            <ion-button fill="outline" class="african-secondary">
              <ion-icon slot="start" :icon="shareOutline"></ion-icon>
              Share
            </ion-button>
          </div>
        </div>
      </div>
    </ion-card>

  </div>
    </ion-content>
  </ion-page>
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
  margin: 0;
  border-radius: 24px;
  background: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.card-content {
  padding: 28px 24px;
}

/* ===== CARD 1: MINIMAL MODERN ===== */
.minimal-contact .card-title {
  font-size: 24px;
  font-weight: 900;
  color: var(--coffee-800);
  margin: 0 0 24px 0;
  letter-spacing: -0.5px;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
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
  color: var(--text-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-800);
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
  background: linear-gradient(135deg, #ffffff 0%, #faf8f5 100%);
}

.premium-header {
  margin-bottom: 20px;
}

.premium-title {
  font-size: 26px;
  font-weight: 900;
  color: var(--coffee-800);
  margin: 0 0 6px 0;
  letter-spacing: -0.8px;
}

.premium-subtitle {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-500);
  margin: 0;
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
  color: var(--text-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.premium-link,
.premium-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-800);
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
  box-shadow: 0 4px 16px rgba(107, 66, 38, 0.1);
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