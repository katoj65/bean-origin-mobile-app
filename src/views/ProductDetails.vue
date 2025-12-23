<template>
<app-layout title="Product Details">
<template #content>
<div v-if="isLoading===false">

<div class="product-details-page">





<!-- Product Card -->
<div class="product-card">
<!-- Product Image -->
<div class="product-image-section">
<img :src="product.image" alt="Coffee" class="product-image" />
<div class="premium-badge">
<ion-icon :icon="starOutline" class="premium-icon"></ion-icon>
<span>Premium</span>
</div>
<div class="image-badge">
<ion-icon :icon="heartOutline" class="heart-icon"></ion-icon>
</div>
</div>

<!-- Product Info -->
<div class="product-info-content">
<div class="product-header">
<h1 class="product-name">
{{ product.name }}
</h1>
<div class="product-rating">
<ion-icon :icon="starOutline" class="star-icon"></ion-icon>
<span class="rating-value">{{ statistics[0]>0?statistics[0]:0 }}</span>
<span class="rating-count">({{ statistics[1]>0?statistics[1]:0 }})</span>
</div>
</div>

<div class="price-section">
<span class="price-value">Shs. {{ product.price }} </span>
</div>

<p class="product-description">
{{ product.description }}
</p>

<!-- Weight -->
<div class="product-weight-section">
<ion-icon :icon="scaleOutline" class="weight-icon"></ion-icon>
<div class="weight-content">
<span class="weight-label">Net Weight</span>
<span class="weight-value">
{{ product.weight }}
</span>
</div>
</div>

<!-- Add to Cart Button -->
<AddProductToCartButton :product="product"/>
<!-- Rate Product Button -->
<ProductRatingButton :product="product"/>
</div>
</div>




<!-- Product Info Section -->
<div class="product-info-section">
<!-- Origin Info -->

<div class="origin-card" v-if="origin.length>0">
<div class="origin-row">
<ion-icon :icon="locationOutline" class="origin-icon"></ion-icon>
<div class="origin-info" v-for="(source,key) in origin" :key="key">
<h4 class="origin-label">Origin</h4>
<p class="origin-value">
{{ farm.name }}
</p>
</div>
</div>

<div class="origin-row" v-if="product.roast_level">
<ion-icon :icon="flameOutline" class="origin-icon"></ion-icon>
<div class="origin-info">
<h4 class="origin-label">Roast Level</h4>
<p class="origin-value text-capitalize">
{{ product.roast_level }}
</p>
</div>
</div>
</div>




<!-- Tasting Notes Card -->
<div class="tasting-notes-card" v-if="taste.length>0">
<div class="notes-header">
<h3 class="notes-title">Tasting Notes</h3>
<span class="notes-subtitle">Flavor Profile</span>
</div>
<div class="notes-grid">
<div class="note-item" v-for="(t,key) in taste" :key="key">
<ion-icon :icon="sparklesOutline" class="note-icon"></ion-icon>
<span class="note-label text-capitalize">
{{ t.taste }}
</span>
</div>

</div>

</div>




<!-- Grind Type Card -->
<div class="grind-type-card">
<div class="grind-header">
<h3 class="grind-title">Select Grind Type</h3>
<span class="grind-subtitle">Choose your brewing method</span>
</div>
<div class="grind-options">
<button class="grind-option active">
<ion-icon :icon="cafeOutline" class="grind-icon"></ion-icon>
<div class="grind-info">
<span class="grind-name">Whole Bean</span>
<span class="grind-desc">For all methods</span>
</div>
<div class="grind-check">
<ion-icon :icon="checkmarkCircleOutline"></ion-icon>
</div>
</button>
<button class="grind-option">
<ion-icon :icon="cafeOutline" class="grind-icon"></ion-icon>
<div class="grind-info">
<span class="grind-name">Espresso</span>
<span class="grind-desc">Fine grind</span>
</div>
<div class="grind-check">
<ion-icon :icon="checkmarkCircleOutline"></ion-icon>
</div>
</button>
<button class="grind-option">
<ion-icon :icon="waterOutline" class="grind-icon"></ion-icon>
<div class="grind-info">
<span class="grind-name">Pour Over</span>
<span class="grind-desc">Medium-fine grind</span>
</div>
<div class="grind-check">
<ion-icon :icon="checkmarkCircleOutline"></ion-icon>
</div>
</button>
<button class="grind-option">
<ion-icon :icon="beakerOutline" class="grind-icon"></ion-icon>
<div class="grind-info">
<span class="grind-name">French Press</span>
<span class="grind-desc">Coarse grind</span>
</div>
<div class="grind-check">
<ion-icon :icon="checkmarkCircleOutline"></ion-icon>
</div>
</button>
<button class="grind-option">
<ion-icon :icon="filterOutline" class="grind-icon"></ion-icon>
<div class="grind-info">
<span class="grind-name">Drip Coffee</span>
<span class="grind-desc">Medium grind</span>
</div>
<div class="grind-check">
<ion-icon :icon="checkmarkCircleOutline"></ion-icon>
</div>
</button>
<button class="grind-option">
<ion-icon :icon="flaskOutline" class="grind-icon"></ion-icon>
<div class="grind-info">
<span class="grind-name">Cold Brew</span>
<span class="grind-desc">Extra coarse</span>
</div>
<div class="grind-check">
<ion-icon :icon="checkmarkCircleOutline"></ion-icon>
</div>
</button>
</div>
</div>




<!-- Farmer Summary -->
<div class="farmer-card" v-if="farmer">
<div class="farmer-content">
<ion-avatar>
<img src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=120" alt="Farmer" />
</ion-avatar>
<div class="farmer-info">
<span class="farmer-label">Sourced from</span>
<h3 class="farmer-name text-capitalize">
{{ farmer.fname }} {{ farmer.lname}}
</h3>
<span class="farmer-region text-capitalize">
{{ farm.name }}
</span>
</div>
</div>
<button class="farmer-profile-btn">
<span>View Farmer Profile</span>
<ion-icon :icon="arrowForwardOutline"></ion-icon>
</button>
</div>

















<!-- Farm Summary -->
<div class="farm-section" v-if="farm_details.length>0">
<div class="section-header-row">
<h3 class="section-label">Farm Details</h3>
<span class="certification-badge">
<ion-icon :icon="leafOutline"></ion-icon>
<span>Organic Certified</span>
</span>
</div>

<div class="farm-details-grid">



<div class="farm-detail-card" v-for="(d,key) in farm_details" :key="key">
<ion-icon :icon="iconSet(d.icon)" class="detail-icon"></ion-icon>
<div class="detail-info">
<h4 class="detail-label">{{ d.name }} </h4>
<p class="detail-value text-capitalize">
{{ d.description }}
</p>
</div>
</div>






</div>
<div class="sustainability-card">
<div class="sustainability-header">
<ion-icon :icon="leafOutline" class="sustainability-icon"></ion-icon>
<h4 class="sustainability-title">Sustainability Practices</h4>
</div>
<div class="sustainability-tags">
<span class="tag">Organic Farming</span>
<span class="tag">Water Conservation</span>
<span class="tag">Fair Trade</span>
<span class="tag">Biodiversity</span>
</div>
</div>
</div>













<!-- Quick Action Buttons -->
<div class="action-buttons-section">
<ion-button expand="block" class="action-btn subscription-btn">
<ion-icon :icon="reloadOutline" slot="start"></ion-icon>
<div class="btn-content">
<span class="btn-main-text">Subscribe</span>
<span class="btn-sub-text">Save 15%</span>
</div>
</ion-button>
<ion-button expand="block" fill="outline" class="action-btn brew-guide-btn">
<ion-icon :icon="cafeOutline" slot="start"></ion-icon>
<span>Brew Guide</span>
</ion-button>
</div>




<!-- Nutritional Info -->
<div class="nutrition-section" v-if="nutrients.length>0">
<h3 class="section-label">Nutritional Information</h3>
<div class="nutrition-grid">

<div class="nutrition-item" v-for="(n,key) in nutrients" :key="key">
<span class="nutrition-value">{{ n.description }} </span>
<span class="nutrition-label text-capitalize">
{{ n.name }}
</span>
</div>


</div>
</div>








<!-- RECOMMENDED PRODUCTS -->
<div class="recommended-section" v-if="similarProducts.length>0">
<div class="recommended-header">
<h2 class="section-title">You May Also Like</h2>
<button class="view-all-link">
<span>View All</span>
<ion-icon :icon="chevronForwardOutline"></ion-icon>
</button>
</div>

<div class="recommended-carousel">
<div 
v-for="(item,key) in similarProducts" 
:key="key"
class="recommended-card"
>
<div class="recommended-image-wrapper">
<img :src="item.image" :alt="item.name" class="recommended-image" />
</div>
<div class="recommended-info">
<h4 class="recommended-name">{{ item.name }}</h4>
<div class="recommended-meta">
<span class="recommended-type">{{ item.type }}</span>
<div class="recommended-rating">
<ion-icon :icon="starSharp"></ion-icon>
<span>20</span>
</div>
</div>
<span class="recommended-price">Shs. {{ item.price }}</span>
</div>
</div>
</div>
</div>




</div>
</div>
</div>
<skeleton v-else style="margin:20px;"/>

</template>
</app-layout>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AppLayout from './template/AppLayout.vue';
import ProductService from '../service/ProductService';
import RatingService from '../service/RatingService';
import Skeleton from './template/Skeleton.vue';
import ProductRatingButton from './template/ProductRatingButton.vue';
import AddProductToCartButton from './template/AddProductToCartButton.vue';
import {
  IonButton,
  IonIcon,
  IonAvatar
} from '@ionic/vue';
import {
  heartOutline,
  starOutline,
  locationOutline,
  cartOutline,
  arrowForwardOutline,
  leafOutline,
  waterOutline,
  sunnyOutline,
  calendarOutline,
  sparklesOutline,
  flowerOutline,
  nutritionOutline,
  checkmarkCircleOutline,
  timeOutline,
  resizeOutline,
  ribbonOutline,
  reloadOutline,
  cafeOutline,
  chevronForwardOutline,
  starSharp,
  beakerOutline,
  filterOutline,
  flaskOutline,
  informationCircleOutline,
  scaleOutline,
  flameOutline
} from 'ionicons/icons';




const isLoading = ref(false);
const product=ref([]);
const routes=useRoute();
const id=routes.params.id;
const origin=ref([]);
const farm=ref('');
const farmer=ref('');
const rating=ref('');
const taste=ref([]);
const standard=ref('');
const spacification=ref('');
const farm_details=ref([]);
const nutrients=ref([]);
const similarProducts=ref([]);
const statistics=ref([]);

//icon set 
const iconSet=(option)=>{
let icon='';
if(option=='waterOutline'){
icon=waterOutline;
}else if(option=='sunnyOutline'){
icon=sunnyOutline;
}else if(option=='calendarOutline'){
icon=calendarOutline;
}else if(option=='sparklesOutline'){
icon=sparklesOutline;
}else if(option=='leafOutline'){
icon=leafOutline;
}
return icon;
};



//Rating information
const productRating=(rating)=>{
const service=new RatingService();
return service.productRating(rating);
}



onMounted(async ()=>{
try{
isLoading.value=true;
const service=new ProductService();
const response=await service.getProductDetails(id);
if(response.status===200){
const data=response.data;
//product object
const prod=data[0];
product.value=prod;
//array
const pOrigin=prod.product_origin;
//object
const pFarm=pOrigin[0].farm;
//object
const pFarmer=pFarm.profile;
//farm details
rating.value=data[0].product_rating;
taste.value=data[0].product_taste;
standard.value=data[0].product_standard;
spacification.value=data[0].product_spacification;
farm_details.value=data[0].product_farm_details;
taste.value=data[0].product_taste_note;
nutrients.value=data[0].product_nutrient;

//rating  statistics
statistics.value = await ratingStatistics(rating.value);

console.log(statistics.value);

if(pOrigin.length>0){
origin.value=pOrigin;
farm.value=pFarm;
if(pFarm){
farmer.value=pFarmer;
}
}

//Query similar products
const busID=prod.business_id;
const similar=await service.getRelatedProducts(busID,id);
if(similar.status===200){
similarProducts.value=similar.data;
}

}else{
console.log(response.error);
}

}catch(e){
console.log(e);
}finally{
isLoading.value=false;  
}







});




const ratingStatistics = async (rate)=>{
const service=new RatingService();
const rating=await service.productRatingStatistics(rate);
return rating;
}








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
  --green: #10b981;
}

.product-details-page {
  background: var(--cream-200);
  min-height: 100%;
  padding-bottom: 120px;
}

/* ===== PRODUCT CARD ===== */
.product-card {
  background: white;
  margin: -20px 0 0 0;
  border-radius: 0 0 20px 20px;
  overflow: hidden;
}

/* ===== PRODUCT IMAGE ===== */
.product-image-section {
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
  margin: 0;
  border-radius: 0 0 20px 20px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-badge {
  position: absolute;
  top: 32px;
  right: 16px;
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.image-badge:hover {
  transform: scale(1.1);
  background: var(--cream-100);
}

.heart-icon {
  font-size: 24px;
  color: var(--coffee-600);
}

.premium-badge {
  position: absolute;
  top: 32px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(135deg, var(--gold) 0%, #f59e0b 100%);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 900;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.premium-icon {
  font-size: 18px;
  color: white;
}

/* ===== PRODUCT INFO ===== */
.product-info-content {
  padding: 20px;
}

.product-info-section {
  padding: 0 20px 20px 20px;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.product-name {
  font-size: 24px;
  font-weight: 900;
  color: #000000;
  margin: 0;
  letter-spacing: -0.5px;
  flex: 1;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.star-icon {
  font-size: 18px;
  color: var(--gold);
}

.rating-value {
  font-size: 16px;
  font-weight: 900;
  color: #000000;
}

.rating-count {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-600);
}

.price-section {
  margin-bottom: 12px;
}

.price-value {
  font-size: 28px;
  font-weight: 900;
  color: var(--coffee-600);
  letter-spacing: -0.5px;
}

.product-description {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-600);
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.product-weight-section {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background: white;
  border: 2px solid var(--cream-300);
  border-radius: 16px;
  margin-bottom: 16px;
}

.weight-icon {
  font-size: 32px;
  color: var(--coffee-600);
  flex-shrink: 0;
}

.weight-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.weight-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.weight-value {
  font-size: 20px;
  font-weight: 900;
  color: var(--coffee-600);
  letter-spacing: -0.3px;
}

.add-cart-btn {
  --background: #6b4226;
  --background-activated: #5d3a2f;
  --background-hover: #5d3a2f;
  --border-radius: 16px;
  height: 56px;
  font-size: 16px;
  font-weight: 900;
  text-transform: none;
  letter-spacing: 0.3px;
  margin: 0;
}

.add-cart-btn ion-icon {
  font-size: 22px;
}

/* ===== RATE PRODUCT BUTTON ===== */
.rate-product-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  margin-top: 12px;
  background: white;
  border: 2px solid var(--coffee-600);
  border-radius: 16px;
  font-size: 15px;
  font-weight: 800;
  color: var(--coffee-600);
  cursor: pointer;
  transition: all 0.3s ease;
}

.rate-product-btn:active {
  transform: scale(0.98);
  background: rgba(107, 66, 38, 0.05);
}

.rate-product-btn ion-icon {
  font-size: 20px;
}

/* ===== ORIGIN CARD ===== */
.origin-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background: white;
  border-radius: 16px;
  margin-bottom: 24px;
}

.origin-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.origin-icon {
  font-size: 28px;
  color: var(--coffee-600);
  flex-shrink: 0;
}

.origin-info {
  flex: 1;
}

.origin-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-600);
  margin: 0 0 4px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.origin-value {
  font-size: 16px;
  font-weight: 900;
  color: #000000;
  margin: 0;
}

/* ===== TASTING NOTES CARD ===== */
.tasting-notes-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
}

.notes-header {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--cream-200);
}

.notes-title {
  font-size: 20px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 4px 0;
  letter-spacing: -0.5px;
}

.notes-subtitle {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.note-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px 10px;
  background: var(--cream-200);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.note-item:active {
  transform: scale(0.95);
  background: var(--cream-300);
}

.note-icon {
  font-size: 36px;
  color: var(--coffee-600);
}

.note-label {
  font-size: 12px;
  font-weight: 800;
  color: var(--coffee-700);
  text-align: center;
}

.intensity-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
  background: var(--cream-200);
  border-radius: 16px;
}

.intensity-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.intensity-label {
  font-size: 13px;
  font-weight: 800;
  color: var(--coffee-700);
  min-width: 80px;
}

.intensity-bar {
  flex: 1;
  height: 8px;
  background: var(--cream-300);
  border-radius: 4px;
  overflow: hidden;
}

.intensity-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--coffee-600) 0%, var(--gold) 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.intensity-value {
  font-size: 12px;
  font-weight: 800;
  color: var(--coffee-600);
  min-width: 90px;
  text-align: right;
}

/* ===== GRIND TYPE CARD ===== */
.grind-type-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
}

.grind-header {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--cream-200);
}

.grind-title {
  font-size: 20px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 4px 0;
  letter-spacing: -0.5px;
}

.grind-subtitle {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.grind-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.grind-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: var(--cream-200);
  border: 2px solid transparent;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.grind-option:active {
  transform: scale(0.97);
}

.grind-option.active {
  background: white;
  border-color: var(--coffee-600);
  box-shadow: 0 2px 8px rgba(107, 66, 38, 0.15);
}

.grind-icon {
  font-size: 28px;
  color: var(--coffee-600);
  flex-shrink: 0;
}

.grind-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.grind-name {
  font-size: 14px;
  font-weight: 900;
  color: var(--text-900);
  line-height: 1.2;
}

.grind-desc {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-600);
}

.grind-check {
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.grind-option.active .grind-check {
  opacity: 1;
}

.grind-check ion-icon {
  font-size: 24px;
  color: var(--coffee-600);
}

/* ===== FARMER SECTION ===== */
.farmer-section,
.farm-section {
  margin-bottom: 24px;
}

.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

/* ===== FARMER CARD ===== */
.farmer-card {
  padding: 24px;
  background: white;
  border-radius: 20px;
  margin-bottom: 20px;
}

.farmer-content {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.farmer-image-wrapper {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f1ed, #ebe4dc);
  flex-shrink: 0;
}

.farmer-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.farmer-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.farmer-label {
  font-size: 11px;
  font-weight: 800;
  color: var(--text-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.farmer-name {
  font-size: 20px;
  font-weight: 900;
  color: #000000;
  margin: 0;
  letter-spacing: -0.3px;
}

.farmer-region {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-600);
}

.farmer-profile-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.10), rgba(107, 66, 38, 0.06));
  border: none;
  border-radius: 16px;
  font-size: 15px;
  font-weight: 900;
  color: var(--coffee-600);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.farmer-profile-btn:active {
  transform: scale(0.97);
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.15), rgba(107, 66, 38, 0.10));
}

.farmer-profile-btn ion-icon {
  font-size: 20px;
}

/* ===== ACTION BUTTONS ===== */
.action-buttons-section {
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.action-btn {
  height: 64px;
  font-weight: 900;
  font-size: 15px;
  text-transform: none;
  letter-spacing: 0.3px;
  margin: 0;
  transition: all 0.3s ease;
}

.subscription-btn {
  --background: linear-gradient(135deg, #6b4226 0%, #8b5a3c 50%, #6b4226 100%);
  --border-radius: 16px;
  position: relative;
  overflow: visible;
}

.subscription-btn::before {
  content: '';
  position: absolute;
  top: -2px;
  right: -2px;
  padding: 4px 10px;
  background: var(--gold);
  border-radius: 12px;
  font-size: 10px;
  font-weight: 900;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.subscription-btn .btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.btn-main-text {
  font-size: 16px;
  font-weight: 900;
  line-height: 1;
}

.btn-sub-text {
  font-size: 11px;
  font-weight: 800;
  opacity: 0.95;
  letter-spacing: 0.5px;
}

.subscription-btn:hover {
  transform: translateY(-2px);
  --background: linear-gradient(135deg, #8b5a3c 0%, #6b4226 50%, #8b5a3c 100%);
}

.brew-guide-btn {
  --border-color: var(--coffee-600);
  --color: var(--coffee-700);
  --background: white;
  --border-radius: 16px;
  --border-width: 2px;
}

.brew-guide-btn:hover {
  --background: var(--cream-100);
  transform: translateY(-2px);
}

/* ===== FARM SECTION ===== */
.certification-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 800;
  color: var(--green);
}

.certification-badge ion-icon {
  font-size: 16px;
}

.farm-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.farm-detail-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 16px;
}

.detail-icon {
  font-size: 28px;
  color: var(--coffee-600);
  flex-shrink: 0;
}

.detail-info {
  flex: 1;
  min-width: 0;
}

.detail-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-600);
  margin: 0 0 4px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 15px;
  font-weight: 900;
  color: #000000;
  margin: 0;
}

.sustainability-card {
  padding: 20px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%);
  border-radius: 16px;
}

.sustainability-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.sustainability-icon {
  font-size: 24px;
  color: var(--green);
}

.sustainability-title {
  font-size: 16px;
  font-weight: 900;
  color: #000000;
  margin: 0;
}

.sustainability-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 8px 14px;
  background: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 800;
  color: var(--green);
}

/* ===== OPTIONS SECTION ===== */
.options-section {
  margin-bottom: 24px;
}

.section-label {
  font-size: 18px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
}

/* ===== NUTRITION ===== */
.nutrition-section {
  margin-bottom: 24px;
}

.nutrition-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.nutrition-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 12px;
  background: white;
  border-radius: 16px;
}

.nutrition-value {
  font-size: 18px;
  font-weight: 900;
  color: var(--coffee-600);
  margin-bottom: 4px;
}

.nutrition-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-600);
  text-align: center;
}

/* ===== RECOMMENDED SECTION ===== */
.recommended-section {
  margin: 0 0 20px 0;
}

.recommended-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 16px 0;
}

.section-title {
  font-size: 20px;
  font-weight: 900;
  color: #000000;
  margin: 0;
  letter-spacing: -0.5px;
}

.view-all-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.08), rgba(107, 66, 38, 0.05));
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 900;
  color: var(--coffee-600);
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-all-link:active {
  transform: scale(0.95);
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.12), rgba(107, 66, 38, 0.08));
}

.view-all-link ion-icon {
  font-size: 18px;
}

.recommended-carousel {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0 20px 4px 0;
}

.recommended-carousel::-webkit-scrollbar {
  display: none;
}

.recommended-card {
  flex-shrink: 0;
  width: 180px;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.recommended-card:active {
  transform: scale(0.97);
}

.recommended-image-wrapper {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, #f5f1ed, #ebe4dc);
  overflow: hidden;
}

.recommended-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recommended-info {
  padding: 16px;
}

.recommended-name {
  font-size: 16px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 8px 0;
  line-height: 1.3;
  letter-spacing: -0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recommended-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.recommended-type {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-600);
}

.recommended-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 800;
  color: #000000;
}

.recommended-rating ion-icon {
  font-size: 14px;
  color: var(--gold);
}

.recommended-price {
  font-size: 18px;
  font-weight: 900;
  color: var(--coffee-600);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .product-info-section {
    padding: 16px;
  }
  
  .nutrition-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .size-options {
    flex-direction: column;
  }
}
</style>