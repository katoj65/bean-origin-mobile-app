<template>
<ion-page>
<!-- HEADER -->
<ion-header class="ion-no-border" translucent>
<ion-toolbar class="custom-toolbar transparent">
<ion-buttons slot="start">
<ion-button class="header-btn" @click="goBack">
<ion-icon :icon="arrowBackOutline"></ion-icon>
</ion-button>
</ion-buttons>
<ion-title class="page-title">Scan Product</ion-title>
<ion-buttons slot="end">
<ion-button class="header-btn" @click="toggleFlash">
<ion-icon :icon="flashActive ? flash : flashOffOutline"></ion-icon>
</ion-button>
</ion-buttons>
</ion-toolbar>
</ion-header>

<ion-content fullscreen class="content-bg">
<!-- SCANNER VIEW -->
<div class="scanner-container" v-if="!scanResult">
<div class="camera-view">
<!-- Camera placeholder - In real app, this would be video feed -->
<div class="camera-placeholder">
<div class="scan-frame">
<div class="corner top-left"></div>
<div class="corner top-right"></div>
<div class="corner bottom-left"></div>
<div class="corner bottom-right"></div>
<div class="scan-line"></div>
</div>
</div>
</div>

<!-- SCAN INSTRUCTIONS -->
<div class="scan-instructions">
<div class="instruction-card">
<ion-icon :icon="qrCodeOutline" class="instruction-icon"></ion-icon>
<p class="instruction-text">Point camera at QR code or barcode</p>
</div>
</div>

<!-- ACTION BUTTONS -->
<div class="scan-actions">
<ion-button fill="solid" class="scan-btn" @click="simulateScan">
<ion-icon :icon="scanOutline" slot="start"></ion-icon>
Scan Now
</ion-button>
<ion-button fill="outline" class="manual-btn" @click="showManualEntry = true">
<ion-icon :icon="createOutline" slot="start"></ion-icon>
Enter Code Manually
</ion-button>
<ion-button fill="clear" class="gallery-btn" @click="selectFromGallery">
<ion-icon :icon="imagesOutline" slot="start"></ion-icon>
Choose from Gallery
</ion-button>
</div>
</div>

<!-- SCAN RESULT -->
<div class="result-container" v-if="scanResult">
<div class="result-header">
<div class="success-animation">
<ion-icon :icon="checkmarkCircleOutline" class="success-icon"></ion-icon>
</div>
<h2 class="result-title">Product Found!</h2>
<p class="result-subtitle">Verified and authenticated</p>
</div>

<!-- PRODUCT CARD -->
<div class="product-result-card">
<img :src="scannedProduct.image" :alt="scannedProduct.name" class="product-result-image" />
<div class="product-result-content">
<div class="verified-badge">
<ion-icon :icon="shieldCheckmarkOutline" class="verified-icon"></ion-icon>
<span>Verified Authentic</span>
</div>
<h3 class="product-result-name">{{ scannedProduct.name }}</h3>
<p class="product-result-type">{{ scannedProduct.type }}</p>

<!-- PRODUCT INFO GRID -->
<div class="info-grid">
<div class="info-item">
<ion-icon :icon="locationOutline" class="info-icon"></ion-icon>
<div class="info-content">
  <span class="info-label">Origin</span>
  <span class="info-value">{{ scannedProduct.origin }}</span>
</div>
</div>
<div class="info-item">
<ion-icon :icon="calendarOutline" class="info-icon"></ion-icon>
<div class="info-content">
  <span class="info-label">Roasted</span>
  <span class="info-value">{{ scannedProduct.roastDate }}</span>
</div>
</div>
<div class="info-item">
<ion-icon :icon="flameOutline" class="info-icon"></ion-icon>
<div class="info-content">
  <span class="info-label">Roast Level</span>
  <span class="info-value">{{ scannedProduct.roastLevel }}</span>
</div>
</div>
<div class="info-item">
<ion-icon :icon="leafOutline" class="info-icon"></ion-icon>
<div class="info-content">
  <span class="info-label">Certification</span>
  <span class="info-value">{{ scannedProduct.certification }}</span>
</div>
</div>
</div>

<!-- FARMER INFO -->
<div class="farmer-info-section">
<h4 class="section-heading">Farmer Information</h4>
<div class="farmer-card">
<img :src="scannedProduct.farmer.photo" :alt="scannedProduct.farmer.name" class="farmer-photo" />
<div class="farmer-details">
  <span class="farmer-name">{{ scannedProduct.farmer.name }}</span>
  <span class="farmer-location">{{ scannedProduct.farmer.location }}</span>
</div>
</div>
</div>

<!-- ACTION BUTTONS -->
<div class="result-actions">
<ion-button expand="block" fill="solid" class="primary-action-btn" @click="viewFullDetails">
View Full Details
</ion-button>
<ion-button expand="block" fill="outline" class="secondary-action-btn" @click="scanAgain">
Scan Another
</ion-button>
</div>
</div>
</div>
</div>

<!-- SCAN HISTORY -->
<div class="history-section" v-if="!scanResult">
<div class="section-header">
<h3 class="section-title">Recent Scans</h3>
<ion-button fill="clear" class="clear-btn" size="small" @click="clearHistory">
Clear All
</ion-button>
</div>
<div class="history-list">
<div 
v-for="item in scanHistory" 
:key="item.id"
class="history-item"
@click="viewHistoryItem(item)">
<img :src="item.image" :alt="item.name" class="history-image" />
<div class="history-info">
<span class="history-name">{{ item.name }}</span>
<span class="history-date">{{ item.scanDate }}</span>
</div>
<ion-icon :icon="chevronForwardOutline" class="history-chevron"></ion-icon>
</div>
</div>
</div>

<!-- MANUAL ENTRY MODAL -->
<div class="modal-overlay" v-if="showManualEntry" @click="showManualEntry = false">
<div class="modal-content" @click.stop>
<div class="modal-header">
<h3 class="modal-title">Enter Product Code</h3>
<ion-button fill="clear" class="close-btn" @click="showManualEntry = false">
<ion-icon :icon="closeOutline"></ion-icon>
</ion-button>
</div>
<div class="modal-body">
<input 
type="text" 
v-model="manualCode"
placeholder="Enter barcode or QR code"
class="code-input"
/>
<ion-button expand="block" fill="solid" class="submit-btn" @click="submitManualCode">
Verify Code
</ion-button>
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
flash,
flashOffOutline,
qrCodeOutline,
scanOutline,
createOutline,
imagesOutline,
checkmarkCircleOutline,
shieldCheckmarkOutline,
locationOutline,
calendarOutline,
flameOutline,
leafOutline,
chevronForwardOutline,
closeOutline,
} from "ionicons/icons";

const router = useRouter();

const flashActive = ref(false);
const scanResult = ref(false);
const showManualEntry = ref(false);
const manualCode = ref('');

const scannedProduct = ref({
name: "Ethiopian Yirgacheffe",
type: "Single Origin Arabica",
origin: "Yirgacheffe, Ethiopia",
roastDate: "Nov 20, 2024",
roastLevel: "Medium",
certification: "Organic",
image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500",
farmer: {
name: "Alemayehu Tadesse",
location: "Gedeo Zone, Ethiopia",
photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
}
});

const scanHistory = ref([
{
id: 1,
name: "Colombian Supreme",
scanDate: "Nov 28, 2024",
image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200"
},
{
id: 2,
name: "Italian Espresso",
scanDate: "Nov 25, 2024",
image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200"
},
{
id: 3,
name: "Costa Rica Honey",
scanDate: "Nov 22, 2024",
image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200"
}
]);

const goBack = () => {
router.back();
};

const toggleFlash = () => {
flashActive.value = !flashActive.value;
};

const simulateScan = () => {
// Simulate scanning delay
setTimeout(() => {
scanResult.value = true;
}, 1000);
};

const scanAgain = () => {
scanResult.value = false;
};

const selectFromGallery = () => {
console.log('Select from gallery');
};

const submitManualCode = () => {
console.log('Manual code:', manualCode.value);
showManualEntry.value = false;
simulateScan();
};

const viewFullDetails = () => {
console.log('View full details');
// router.push('/product-details');
};

const viewHistoryItem = (item) => {
console.log('View history item:', item);
};

const clearHistory = () => {
console.log('Clear history');
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
}

/* ===== HEADER ===== */
.custom-toolbar {
--background: transparent;
--border-width: 0;
padding: 8px 4px;
}

.custom-toolbar.transparent {
position: absolute;
top: 0;
left: 0;
right: 0;
z-index: 10;
}

.page-title {
font-size: 20px;
font-weight: 700;
color: white;
text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.header-btn {
--color: white;
--background: rgba(0, 0, 0, 0.3);
--border-radius: 12px;
backdrop-filter: blur(10px);
margin: 0 4px;
}

/* ===== CONTENT ===== */
.content-bg {
--background: #000000;
}

/* ===== SCANNER CONTAINER ===== */
.scanner-container {
min-height: 100vh;
display: flex;
flex-direction: column;
}

.camera-view {
flex: 1;
position: relative;
background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
display: flex;
align-items: center;
justify-content: center;
min-height: 400px;
}

.camera-placeholder {
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
}

.scan-frame {
width: 280px;
height: 280px;
position: relative;
}

.corner {
position: absolute;
width: 40px;
height: 40px;
border: 3px solid var(--green);
}

.corner.top-left {
top: 0;
left: 0;
border-right: none;
border-bottom: none;
border-radius: 8px 0 0 0;
}

.corner.top-right {
top: 0;
right: 0;
border-left: none;
border-bottom: none;
border-radius: 0 8px 0 0;
}

.corner.bottom-left {
bottom: 0;
left: 0;
border-right: none;
border-top: none;
border-radius: 0 0 0 8px;
}

.corner.bottom-right {
bottom: 0;
right: 0;
border-left: none;
border-top: none;
border-radius: 0 0 8px 0;
}

.scan-line {
position: absolute;
top: 0;
left: 0;
right: 0;
height: 2px;
background: var(--green);
box-shadow: 0 0 20px var(--green);
animation: scan 2s ease-in-out infinite;
}

@keyframes scan {
0%, 100% {
top: 0;
}
50% {
top: calc(100% - 2px);
}
}

/* ===== SCAN INSTRUCTIONS ===== */
.scan-instructions {
padding: 24px 16px;
background: #f2f2f2;
}

.instruction-card {
background: white;
padding: 20px;
border-radius: 16px;
display: flex;
flex-direction: column;
align-items: center;
gap: 12px;
border: 1px solid #e0e0e0;
}

.instruction-icon {
font-size: 48px;
color: var(--coffee-light);
}

.instruction-text {
font-size: 15px;
color: var(--text-dark);
text-align: center;
margin: 0;
font-weight: 500;
}

/* ===== SCAN ACTIONS ===== */
.scan-actions {
padding: 0 16px 24px;
display: flex;
flex-direction: column;
gap: 12px;
background: #f2f2f2;
}

.scan-btn {
--background: var(--coffee-dark);
--border-radius: 16px;
height: 52px;
font-weight: 700;
font-size: 15px;
}

.manual-btn {
--border-color: var(--coffee-medium);
--color: var(--coffee-dark);
--border-radius: 16px;
height: 48px;
font-weight: 600;
}

.gallery-btn {
--color: var(--coffee-light);
height: 44px;
font-weight: 600;
}

/* ===== RESULT CONTAINER ===== */
.result-container {
background: #f2f2f2;
min-height: 100vh;
padding-top: 80px;
}

.result-header {
text-align: center;
padding: 24px 16px;
}

.success-animation {
margin-bottom: 16px;
animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
0% {
transform: scale(0);
}
50% {
transform: scale(1.2);
}
100% {
transform: scale(1);
}
}

.success-icon {
font-size: 72px;
color: var(--green);
}

.result-title {
font-size: 26px;
font-weight: 700;
color: var(--coffee-dark);
margin: 0 0 6px 0;
}

.result-subtitle {
font-size: 15px;
color: var(--text-light);
margin: 0;
}

/* ===== PRODUCT RESULT CARD ===== */
.product-result-card {
margin: 0 16px 24px;
background: white;
border-radius: 24px;
overflow: hidden;
border: 1px solid #e0e0e0;
}

.product-result-image {
width: 100%;
height: 200px;
object-fit: cover;
}

.product-result-content {
padding: 24px;
}

.verified-badge {
display: inline-flex;
align-items: center;
gap: 6px;
background: rgba(39, 174, 96, 0.1);
color: var(--green);
padding: 6px 12px;
border-radius: 12px;
font-size: 12px;
font-weight: 700;
margin-bottom: 12px;
}

.verified-icon {
font-size: 16px;
}

.product-result-name {
font-size: 22px;
font-weight: 700;
color: var(--coffee-dark);
margin: 0 0 4px 0;
}

.product-result-type {
font-size: 14px;
color: var(--text-light);
margin: 0 0 20px 0;
}

/* ===== INFO GRID ===== */
.info-grid {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 12px;
margin-bottom: 24px;
}

.info-item {
background: #f8f8f8;
padding: 14px;
border-radius: 12px;
display: flex;
gap: 10px;
}

.info-icon {
font-size: 22px;
color: var(--coffee-light);
flex-shrink: 0;
}

.info-content {
display: flex;
flex-direction: column;
gap: 3px;
}

.info-label {
font-size: 11px;
color: var(--text-light);
font-weight: 600;
text-transform: uppercase;
}

.info-value {
font-size: 13px;
color: var(--coffee-dark);
font-weight: 600;
}

/* ===== FARMER INFO ===== */
.farmer-info-section {
margin-bottom: 24px;
}

.section-heading {
font-size: 16px;
font-weight: 700;
color: var(--coffee-dark);
margin: 0 0 12px 0;
}

.farmer-card {
background: #f8f8f8;
padding: 14px;
border-radius: 12px;
display: flex;
gap: 12px;
align-items: center;
}

.farmer-photo {
width: 50px;
height: 50px;
border-radius: 50%;
object-fit: cover;
border: 2px solid white;
}

.farmer-details {
flex: 1;
display: flex;
flex-direction: column;
gap: 3px;
}

.farmer-name {
font-size: 15px;
font-weight: 700;
color: var(--coffee-dark);
}

.farmer-location {
font-size: 13px;
color: var(--text-light);
}

/* ===== RESULT ACTIONS ===== */
.result-actions {
display: flex;
flex-direction: column;
gap: 10px;
}

.primary-action-btn {
--background: var(--coffee-dark);
--border-radius: 16px;
height: 52px;
font-weight: 700;
}

.secondary-action-btn {
--border-color: var(--coffee-medium);
--color: var(--coffee-dark);
--border-radius: 16px;
height: 48px;
font-weight: 600;
}

/* ===== HISTORY SECTION ===== */
.history-section {
padding: 24px 16px;
background: #f2f2f2;
}

.section-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 16px;
}

.section-title {
font-size: 18px;
font-weight: 700;
color: var(--coffee-dark);
margin: 0;
}

.clear-btn {
--color: var(--text-light);
font-weight: 600;
margin: 0;
}

.history-list {
display: flex;
flex-direction: column;
gap: 10px;
}

.history-item {
background: white;
padding: 12px;
border-radius: 16px;
display: flex;
gap: 12px;
align-items: center;
border: 1px solid #e0e0e0;
cursor: pointer;
transition: transform 0.3s ease;
}

.history-item:active {
transform: scale(0.98);
}

.history-image {
width: 50px;
height: 50px;
border-radius: 12px;
object-fit: cover;
}

.history-info {
flex: 1;
display: flex;
flex-direction: column;
gap: 4px;
}

.history-name {
font-size: 14px;
font-weight: 700;
color: var(--coffee-dark);
}

.history-date {
font-size: 12px;
color: var(--text-light);
}

.history-chevron {
font-size: 20px;
color: var(--text-light);
}

/* ===== MANUAL ENTRY MODAL ===== */
.modal-overlay {
position: fixed;
inset: 0;
background: rgba(0, 0, 0, 0.5);
display: flex;
align-items: flex-end;
z-index: 1000;
animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
from { opacity: 0; }
to { opacity: 1; }
}

.modal-content {
background: white;
width: 100%;
border-radius: 24px 24px 0 0;
padding: 24px;
animation: slideUp 0.3s ease-out;
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
margin-bottom: 20px;
}

.modal-title {
font-size: 20px;
font-weight: 700;
color: var(--coffee-dark);
margin: 0;
}

.close-btn {
--color: var(--text-light);
margin: 0;
}

.modal-body {
display: flex;
flex-direction: column;
gap: 16px;
}

.code-input {
width: 100%;
padding: 16px;
border: 2px solid #e0e0e0;
border-radius: 12px;
font-size: 15px;
font-weight: 500;
color: var(--coffee-dark);
}

.code-input:focus {
outline: none;
border-color: var(--coffee-light);
}

.submit-btn {
--background: var(--coffee-dark);
--border-radius: 14px;
height: 48px;
font-weight: 700;
}

/* ===== SPACER ===== */
.bottom-spacer {
height: 20px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 360px) {
.scan-frame {
width: 240px;
height: 240px;
}

.info-grid {
grid-template-columns: 1fr;
}
}
</style>