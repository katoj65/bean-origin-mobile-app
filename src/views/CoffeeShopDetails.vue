<template>
<shop-layout title="0.2 km away">
<template #header-buttons>
<shop-header-buttons/>
</template>
<template #content>

<div style="margin-top:-20px;" v-if="isLoading===false">
<div class="coffee-shop-page">
<!-- Hero Image -->
<div class="hero-container">
<img :src="shopDetails.product.heroImage" :alt="shopDetails.product.name" class="hero-image"/>
<button class="favorite-button" :class="{ active: isFavorite }" @click="toggleFavorite" style="margin-top:20px;">
<ion-icon :icon="isFavorite ? heart : heartOutline"></ion-icon>
</button>
</div>







<!-- Main Content -->
<div class="content-container">

<!-- Shop Info -->
<div class="shop-header">
<h1 class="shop-name">{{ shopDetails.product.name }}</h1>
<div class="info-row">
<div class="rating-section">
<ion-icon :icon="star"></ion-icon>
<span class="rating-value">{{ shop.rating }}</span>
<span class="review-count">({{ shop.reviewCount }})</span>
</div>
<div class="status-label" :class="shop.isOpen ? 'open' : 'closed'">
<span class="status-dot"></span>
{{ shop.isOpen ? 'Open Now' : 'Closed' }}
</div>
</div>
</div>







<!-- Compact Info Row -->
<div class="info-card">
<div class="info-item">
<ion-icon :icon="locationSharp" class="info-icon"></ion-icon>
<div class="info-text">
<span class="info-main">{{ shopDetails.product.address }}</span>
<span class="info-sub">{{ shop.distance }} away</span>
</div>
</div>
<button class="directions-button" @click="setOpen(true)">
<ion-icon :icon="navigateOutline"></ion-icon>
Directions
</button>
</div>





<!-- Opening Hours -->
<div class="simple-card">
<div class="card-header">
<ion-icon :icon="timeOutline" class="header-icon"></ion-icon>
<span class="card-title">Opening Hours</span>
</div>
<div class="hours-text">{{ shopDetails.product.hours }}</div>
</div>





<!-- Quick Actions -->
<div class="action-buttons">
<button class="action-btn call" @click="callShop">
<ion-icon :icon="callOutline"></ion-icon>
<span>Call</span>
</button>
<button class="action-btn favorite" @click="setMenu(true)">
<ion-icon :icon="fastFoodOutline"></ion-icon>
<span>Menu</span>
</button>
<button class="action-btn order" @click="setOrder(true)">
<ion-icon :icon="cartOutline"></ion-icon>
<span>Order</span>
</button>
</div>





<!-- Menu Section -->
<div class="section" v-if="shopDetails.menu.length">
<h2 class="section-title">Menu</h2>
<div class="menu-list">
<div v-for="(i,key) in shopDetails.menu" :key="key" class="menu-item">
<img :src="i.image" :alt="i.name" class="menu-item-image" />
<div class="menu-item-content">
<h3 class="menu-item-name">{{ i.name }}</h3>
<p class="menu-item-notes partial-text-product">{{ i.description }}</p>
<span class="menu-item-price">Shs. {{ i.price }}</span>
</div>
<!-- <button class="menu-add-button" @click="addToCart(item)">
<ion-icon :icon="add"></ion-icon>
</button> -->
</div>
</div>
</div>






<!-- Description -->
<div class="section">
<h2 class="section-title">About</h2>
<div class="simple-card">
<p class="description-text">{{ shopDetails.product.description }}</p>
</div>
</div>









<!-- Amenities -->
<div class="section" v-if="shopDetails.amenity.length>0">
<h2 class="section-title">Amenities</h2>
<div class="amenities-list">
<div v-for="amenity in shopDetails.product.amenity" :key="amenity.name" class="amenity-box">
<ion-icon :icon="amenity.icon" class="amenity-icon"></ion-icon>
<span class="amenity-label">{{ amenity.name }}</span>
</div>
</div>
</div>








<!-- Map -->
<div class="section">
<h2 class="section-title">Location</h2>
<div class="map-card" @click="openMap">
<div class="map-content">
<div class="map-pin">
<ion-icon :icon="locationSharp"></ion-icon>
</div>
<div class="map-text">
<div class="map-address">{{ shopDetails.product.address }}</div>
<div class="map-action">Tap to open map</div>
</div>
</div>
</div>
</div>









<!-- Reviews -->
<div class="section" v-if="shopDetails.rating.length>0">
<div class="reviews-header">
<h2 class="section-title">Reviews</h2>
<div class="rating-badge">
<ion-icon :icon="star"></ion-icon>
<span>{{ shop.rating }}</span>
</div>
</div>
<div class="reviews-container">
<div v-for="review in shopDetails.rating.slice(0, 2)" :key="review.id" class="review-card">
<div class="review-top">
<span class="reviewer-name text-capitalize">{{ review.names }}</span>
<div class="review-stars">
<ion-icon v-for="n in review.rating" :key="n" :icon="star"></ion-icon>
</div>
</div>
<p class="review-comment">{{ review.comment }}</p>
<span class="review-date">{{ review.date }}</span>
</div>










</div>
</div>

<!-- Bottom Spacing -->
<div class="bottom-space"></div>

</div>

</div>
</div>
<skeleton style="margin:20px;" v-else/>













<!-----Modal 1------->
<ion-modal :is-open="isOpen" @didDismiss="isOpen=false">
<shop-layout title="Map">
<template #header-buttons>
<ion-buttons slot="end">
<ion-button @click="setOpen(false)">
<ion-icon :icon="close"></ion-icon>
</ion-button>
</ion-buttons>
</template>
<template #content>
<map-modal-content/>
</template>
</shop-layout>
</ion-modal>




<!-----Modal 2------->
<ion-modal :is-open="isMenu" @didDismiss="isMenu=false">
<shop-layout title="Our menu">
<template #header-buttons>
<ion-buttons slot="end">
<ion-button @click="setMenu(false)">
<ion-icon :icon="close"></ion-icon>
</ion-button>
</ion-buttons>
</template>
<template #content>
<coffee-shop-menu-modal/>
</template>
</shop-layout>
</ion-modal>







<!-----Modal 3------->
<ion-modal :is-open="isOrder" @didDismiss="isOrder=false">
<shop-layout title="Make orders">
<template #header-buttons>
<ion-buttons slot="end">
<ion-button @click="setOrder(false)">
<ion-icon :icon="close"></ion-icon>
</ion-button>

</ion-buttons>
</template>
<template #content>


</template>
</shop-layout>
</ion-modal>








</template>
</shop-layout>
</template>
<script setup>
import { ref, reactive, onMounted, } from 'vue';
  import { IonButtons, IonButton, IonModal,IonIcon  } from '@ionic/vue';
import ShopLayout from './template/ShopLayout.vue';
import ShopHeaderButtons from './template/ShopHeaderButtons.vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import CoffeeShopService from '../service/CoffeeShopService';
import Skeleton from './template/Skeleton.vue';
import DateService from '../service/DateService';
import MapModalContent from './model/MapModalContent.vue';
import CoffeeShopMenuModal from './model/CoffeeShopMenuModal.vue';

import {
heart,
heartOutline,
star,
locationSharp,
navigateOutline,
timeOutline,
callOutline,
cartOutline,
add,
wifi,
card,
leaf,
cafe,
sunny,
water,
fastFoodOutline,
close
} from 'ionicons/icons';


const isFavorite = ref(false);
const shop = reactive({
name: 'Brew & Beans Coffee',
heroImage: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&q=80',
rating: 4.8,
reviewCount: 342,
isOpen: true,
address: '123 Coffee Street, Downtown',
distance: '3.2 km',
hours: 'Mon-Fri: 7:00 AM - 8:00 PM, Sat-Sun: 8:00 AM - 9:00 PM',
description: 'A cozy neighborhood coffee shop specializing in single-origin beans and handcrafted espresso drinks. We roast our beans in-house daily and pride ourselves on quality and sustainability.',

menuItems: [
{
id: 1,
name: 'Espresso',
image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80',
flavorNotes: 'Rich, bold, chocolate',
price: 3.50,
},
{
id: 2,
name: 'Cappuccino',
image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80',
flavorNotes: 'Creamy, balanced, smooth',
price: 4.50,
},
{
id: 3,
name: 'Latte',
image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80',
flavorNotes: 'Silky, sweet, comforting',
price: 4.75,
},
{
id: 4,
name: 'Cold Brew',
image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&q=80',
flavorNotes: 'Smooth, refreshing, sweet',
price: 5.00,
},
],

amenities: [
{ name: 'Free Wi-Fi', icon: wifi },
{ name: 'Card Payment', icon: card },
{ name: 'Eco-Friendly', icon: leaf },
{ name: 'Specialty Beans', icon: cafe },
{ name: 'Outdoor Seating', icon: sunny },
{ name: 'Fresh Water', icon: water },
],

reviews: [
{
id: 1,
name: 'Sarah Johnson',
rating: 5,
comment: 'Amazing coffee and friendly staff! Perfect spot for working or relaxing.',
date: '2 days ago',
},
{
id: 2,
name: 'Michael Chen',
rating: 5,
comment: 'Best espresso in town. Love their single-origin selection!',
date: '1 week ago',
},
],
});


const toggleFavorite = () => isFavorite.value = !isFavorite.value;
const getDirections = () => console.log('Getting directions');
const callShop = () => console.log('Calling shop');
const orderNow = () => console.log('Order now');
const openMap = () => console.log('Opening map');
const addToCart = (item) => console.log('Adding to cart:', item.name);




const shopDetails=reactive({
product:{},
menu:[],
rating:[],
amenity:[]
});

const coffeeShop=ref('');
const isLoading=ref(false);
const error=ref(false);
onMounted(async ()=>{
try{
isLoading.value=true;
const url=useRoute();
const id=url.params.id;
const service = new CoffeeShopService();
const response = await service.coffeeShopDetails(id);
if(response.status===200){
const data=response.data[0];

//shop details
shopDetails.product={
name: data.name,
heroImage: data.image,
rating: 4.8,
reviewCount: 342,
isOpen: true,
address: data.address,
distance: '3.2 km',
hours: data.open_hours,
description: data.about,
//amenity
amenity:'',



};

//format amenity
const amenity=[];
data.coffee_shop_amenity.forEach(element => {
const itemName=element.icon;
let icon='';
if(itemName=='wifi'){
icon=wifi;
}else if(itemName=='card'){
icon=card;
}else if(itemName=='leaf'){
icon=leaf;
}else if(itemName=='cafe'){
icon=cafe;
}else if(itemName=='sunny'){
icon=sunny;
}else if(itemName=='water'){
icon=water;
}
amenity.push({
name:itemName,
icon:icon
});
});

//
shopDetails.product.amenity=amenity;
shopDetails.menu=data.business.product;
shopDetails.amenity=data.coffee_shop_amenity;

//format rating date
const dateFormatService = new DateService ();
const rateDate=[];
data.coffee_shop_rating.forEach(element => {
rateDate.push({
names:element.profile.fname+' '+element.profile.lname,
comment:element.comment,
rating:element.rating,
date:dateFormatService.formatDate(element.created_at)
});  
});
shopDetails.rating=rateDate;




console.log(shopDetails.rating);


}else{
console.log(response.error);
}
}catch(e){
console.log(e);
}finally{
isLoading.value=false;
}

});

//get the modal
const isOpen = ref(false);
const setOpen = (open) => (isOpen.value = open);
const isMenu= ref(false);
const setMenu = (open) => (isMenu.value = open);
const isOrder= ref(false);
const setOrder = (open) => (isOrder.value = open);





</script>

<style scoped>
/* ===== BASE STYLES ===== */
.partial-text-product {
  width: 10ch;        /* show first 10 characters */
  white-space: nowrap;
  overflow: hidden;
}
.coffee-shop-page {
min-height: 100vh;

}

/* ===== HERO ===== */
.hero-container {
position: relative;
width: 100%;
height: 300px;
}

.hero-image {
width: 100%;
height: 100%;
object-fit: cover;
}

.back-button,
.favorite-button {
position: absolute;
top: 20px;
width: 44px;
height: 44px;
display: flex;
align-items: center;
justify-content: center;
background: rgba(255, 255, 255, 0.95);
border: none;
border-radius: 50%;
cursor: pointer;
transition: all 0.3s ease;
}

.back-button {
left: 20px;
}

.favorite-button {
right: 20px;
}

.back-button:active,
.favorite-button:active {
transform: scale(0.9);
}

.back-button ion-icon,
.favorite-button ion-icon {
font-size: 24px;
color: #2a2a2a;
}

.favorite-button.active ion-icon {
color: #ef4444;
}

/* ===== CONTENT CONTAINER ===== */
.content-container {
padding: 24px 20px 100px;
}

/* ===== SHOP HEADER ===== */
.shop-header {
margin-bottom: 24px;
}

.shop-name {
font-size: 28px;
font-weight: 900;
color: #1a1a1a;
margin: 0 0 12px 0;
letter-spacing: -0.5px;
line-height: 1.2;
}

.info-row {
display: flex;
align-items: center;
gap: 16px;
flex-wrap: wrap;
}

.rating-section {
display: flex;
align-items: center;
gap: 6px;
}

.rating-section ion-icon {
font-size: 20px;
color: #f59e0b;
}

.rating-value {
font-size: 17px;
font-weight: 800;
color: #1a1a1a;
}

.review-count {
font-size: 15px;
font-weight: 600;
color: #8a8a8a;
}

.status-label {
display: flex;
align-items: center;
gap: 8px;
padding: 8px 16px;
border-radius: 20px;
font-size: 14px;
font-weight: 800;
letter-spacing: 0.3px;
}

.status-label.open {
background: #d1fae5;
color: #065f46;
}

.status-label.closed {
background: #fee2e2;
color: #991b1b;
}

.status-dot {
width: 8px;
height: 8px;
border-radius: 50%;
background: currentColor;
}

/* ===== INFO CARD ===== */
.info-card {
display: flex;
align-items: center;
gap: 16px;
padding: 18px;
background: white;
border-radius: 16px;
margin-bottom: 20px;
}

.info-item {
display: flex;
align-items: center;
gap: 14px;
flex: 1;
}

.info-icon {
font-size: 26px;
color: #6b4423;
flex-shrink: 0;
}

.info-text {
display: flex;
flex-direction: column;
gap: 4px;
}

.info-main {
font-size: 15px;
font-weight: 700;
color: #2a2a2a;
line-height: 1.3;
}

.info-sub {
font-size: 13px;
font-weight: 600;
color: #8a8a8a;
}

.directions-button {
display: flex;
align-items: center;
gap: 6px;
padding: 10px 16px;
background: #6b4423;
border: none;
border-radius: 12px;
font-size: 14px;
font-weight: 800;
color: white;
cursor: pointer;
transition: all 0.3s ease;
white-space: nowrap;
}

.directions-button:active {
transform: scale(0.95);
}

.directions-button ion-icon {
font-size: 18px;
}

/* ===== SIMPLE CARD ===== */
.simple-card {
padding: 18px;
background: white;
border-radius: 16px;
margin-bottom: 20px;
}

.card-header {
display: flex;
align-items: center;
gap: 10px;
margin-bottom: 12px;
}

.header-icon {
font-size: 24px;
color: #6b4423;
}

.card-title {
font-size: 16px;
font-weight: 800;
color: #1a1a1a;
}

.hours-text {
font-size: 14px;
font-weight: 600;
color: #5a5a5a;
line-height: 1.6;
}

/* ===== ACTION BUTTONS ===== */
.action-buttons {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 12px;
margin-bottom: 32px;
}

.action-btn {
display: flex;
flex-direction: column;
align-items: center;
gap: 8px;
padding: 20px 16px;
background: white;
border: none;
border-radius: 16px;
cursor: pointer;
transition: all 0.3s ease;
}

.action-btn:active {
transform: translateY(-2px);

}

.action-btn ion-icon {
font-size: 28px;
color: #6b4423;
}

.action-btn span {
font-size: 14px;
font-weight: 800;
color: #2a2a2a;
}

/* ===== SECTION ===== */
.section {
margin-bottom: 32px;
}

.section-title {
font-size: 22px;
font-weight: 900;
color: #1a1a1a;
margin: 0 0 16px 0;
letter-spacing: -0.4px;
}

/* ===== MENU LIST ===== */
.menu-list {
display: flex;
flex-direction: column;
gap: 14px;
}

.menu-item {
display: flex;
align-items: center;
gap: 16px;
padding: 14px;
background: white;
border-radius: 16px;

transition: all 0.3s ease;
}

.menu-item:active {
transform: scale(0.98);
}

.menu-item-image {
width: 90px;
height: 90px;
border-radius: 12px;
object-fit: cover;
flex-shrink: 0;
}

.menu-item-content {
flex: 1;
display: flex;
flex-direction: column;
gap: 6px;
}

.menu-item-name {
font-size: 16px;
font-weight: 800;
color: #1a1a1a;
margin: 0;
letter-spacing: -0.2px;
}

.menu-item-notes {
font-size: 13px;
font-weight: 500;
color: #8a8a8a;
margin: 0;
line-height: 1.4;
}

.menu-item-price {
font-size: 18px;
font-weight: 900;
color: #6b4423;
letter-spacing: -0.3px;
margin-top: 2px;
}

.menu-add-button {
width: 40px;
height: 40px;
display: flex;
align-items: center;
justify-content: center;
background: #6b4423;
border: none;
border-radius: 50%;
cursor: pointer;
flex-shrink: 0;
transition: all 0.3s ease;
}

.menu-add-button:active {
transform: scale(0.9);
}

.menu-add-button ion-icon {
font-size: 22px;
color: white;
}

/* ===== DESCRIPTION ===== */
.description-text {
font-size: 15px;
font-weight: 500;
color: #5a5a5a;
line-height: 1.7;
margin: 0;
}

/* ===== AMENITIES ===== */
.amenities-list {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 14px;
}

.amenity-box {
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
padding: 20px 12px;
background: white;
border-radius: 16px;

}

.amenity-icon {
font-size: 32px;
color: #6b4423;
}

.amenity-label {
font-size: 12px;
font-weight: 700;
color: #2a2a2a;
text-align: center;
line-height: 1.3;
}

/* ===== MAP CARD ===== */
.map-card {
padding: 20px;
background: white;
border-radius: 16px;

cursor: pointer;
transition: all 0.3s ease;
}

.map-card:active {
transform: scale(0.98);
}

.map-content {
display: flex;
align-items: center;
gap: 16px;
}

.map-pin {
width: 56px;
height: 56px;
display: flex;
align-items: center;
justify-content: center;
background: linear-gradient(135deg, #ef4444, #dc2626);
border-radius: 50%;
flex-shrink: 0;
}

.map-pin ion-icon {
font-size: 30px;
color: white;
}

.map-text {
flex: 1;
}

.map-address {
font-size: 15px;
font-weight: 700;
color: #2a2a2a;
margin-bottom: 6px;
line-height: 1.4;
}

.map-action {
font-size: 13px;
font-weight: 700;
color: #6b4423;
}

/* ===== REVIEWS ===== */
.reviews-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 16px;
}

.rating-badge {
display: flex;
align-items: center;
gap: 6px;
padding: 8px 14px;
background: #fef3c7;
border-radius: 14px;
}

.rating-badge ion-icon {
font-size: 16px;
color: #f59e0b;
}

.rating-badge span {
font-size: 15px;
font-weight: 900;
color: #92400e;
}

.reviews-container {
display: flex;
flex-direction: column;
gap: 14px;
}

.review-card {
padding: 18px;
background: white;
border-radius: 16px;
}

.review-top {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 10px;
}

.reviewer-name {
font-size: 15px;
font-weight: 800;
color: #1a1a1a;
}

.review-stars {
display: flex;
gap: 2px;
}

.review-stars ion-icon {
font-size: 14px;
color: #f59e0b;
}

.review-comment {
font-size: 14px;
font-weight: 500;
color: #5a5a5a;
line-height: 1.6;
margin: 0 0 8px 0;
}

.review-date {
font-size: 12px;
font-weight: 600;
color: #8a8a8a;
}

/* ===== BOTTOM SPACING ===== */
.bottom-space {
height: 40px;
}

/* ===== RESPONSIVE ===== */
@media (min-width: 768px) {
.content-container {
max-width: 600px;
margin: 0 auto;
}
}
</style>