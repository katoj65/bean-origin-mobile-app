<template>
<div class="ratings-container">
<!-- Header Section -->
<div class="ratings-header">
<h1 class="page-title">Product Ratings</h1>
<p class="page-subtitle">Users who rated this product</p>
</div>


<spinner :isLoading="isLoading"/>
<!-- Users List -->
<div v-if="isLoading===false">
<div v-if="productRating.length===0">
<p>No Ratings Yet</p>
<p>Be the first to rate this product!</p>
</div>
<ion-list class="users-list" v-else>
<ion-item 
v-for="(rating, index) in productRating" 
:key="rating.id"
class="user-item"
lines="full"
>
<div class="item-number">{{ index + 1 }}</div>

<div class="user-avatar" slot="start">
<ion-avatar>
<img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
</div>

<ion-label>
<h2 class="user-name text-capitalize">
{{ rating.fname+' '+rating.lname }}
</h2>


<div class="rating-info">
<div class="stars">
<ion-icon :icon="starIcon" class="star-icon filled" v-for="(f,key) in rating.starFill" :key="key"></ion-icon>
<ion-icon :icon="starOutline" class="star-icon" v-for="(o,key) in rating.starOutline" :key="key"></ion-icon>
</div>

<!-- <span class="rating-score">1/5</span> -->
<span class="bullet"></span>
<span class="rating-date">
{{ rating.created_at }}
</span>
</div>
</ion-label>

<div class="rating-badge" slot="end">
<div class="badge-content">
<ion-icon :icon="starIcon" class="badge-icon"></ion-icon>
<span class="badge-rating">
{{ rating.rating }}/{{ scale }}
</span>
</div>
</div>
</ion-item>
</ion-list>
</div>








</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Spinner from '../template/Spinner.vue';
import DateService from '../../service/DateService';
import { useRoute } from 'vue-router';
import {
IonIcon,
IonSpinner,
IonList,
IonItem,
IonLabel,
IonAvatar
} from '@ionic/vue';
import { star, starOutline, chatbubblesOutline } from 'ionicons/icons';
import RatingService from '../../service/RatingService';


const starIcon = star;
const isLoading = ref(true);


const url = useRoute();
const productRating=ref([]);
const scale=ref(5);


// Fetch ratings on mount
onMounted(async () => {
try {
    
isLoading.value = true;

// Get product ID from route params
const id = url.params.id;
const service = new RatingService();
const response = await service.getUsersRating(id);
if(response.status===200){
const data=response.data;
const rating=[];
const scale=5;
const dateService=new DateService();
data.forEach(element => {
let ob={
fname:element.profile.fname,
lname:element.profile.lname,
rating:element.rating,
starFill:element.rating,
starOutline:scale-element.rating,
created_at:dateService.formatDateAmerican(element.created_at)   
}
rating.push(ob);
});

productRating.value=rating;

}else{
console.log(response.error)
}
} catch (error) {
console.error('Error fetching ratings:', error);
productRating.value = [];
} finally {
isLoading.value = false;
}
});









</script>

<style scoped>
/* Bean Origin Theme Variables */
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

--gold: #ffd700;
}

.ratings-container {
width: 100%;
padding: 16px;
height: 100%;
overflow-y: auto;
}

/* Header Section */
.ratings-header {
margin-bottom: 24px;
text-align: left;
}

.page-title {
margin: 0 0 8px 0;
font-size: 22px;
font-weight: 900;
color: var(--coffee-900);
letter-spacing: -0.5px;
}

.page-subtitle {
margin: 0;
font-size: 14px;
font-weight: 500;
color: var(--text-600);
}

/* Loading State */
.loading-state {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 64px 20px;
text-align: center;
}

.loading-state ion-spinner {
margin-bottom: 16px;
--color: var(--coffee-600);
}

.loading-state p {
color: var(--text-600);
font-size: 15px;
font-weight: 500;
}

/* Empty State */
.empty-state {
text-align: center;
padding: 64px 20px;
}

.empty-icon {
font-size: 80px;
color: var(--cream-300);
margin-bottom: 16px;
}

.empty-state h2 {
margin: 0 0 8px 0;
font-size: 22px;
font-weight: 800;
color: var(--text-800);
}

.empty-state p {
margin: 0;
font-size: 15px;
color: var(--text-600);
}

/* Users List */
.users-list {
background: transparent;
padding: 0;
}

.user-item {
--background: white;
--padding-start: 20px;
--padding-end: 20px;
--inner-padding-end: 0;
--min-height: 95px;
margin-bottom: 14px;
border-radius: 18px;
border: 1px solid var(--cream-300);
position: relative;
transition: all 0.3s ease;
overflow: hidden;
}

.user-item::before {
content: '';
position: absolute;
left: 0;
top: 0;
bottom: 0;
width: 4px;
background: linear-gradient(180deg, var(--coffee-600), var(--coffee-500));
}

.user-item:active {
transform: translateY(2px);
background: var(--cream-100);
}

.item-number {
display: none;
}

.user-avatar {
width: 60px;
height: 60px;
border-radius: 50%;
overflow: hidden;
flex-shrink: 0;
margin-right: 16px;
border: 3px solid var(--cream-300);
}

.user-avatar img {
width: 100%;
height: 100%;
object-fit: cover;
}

.avatar-placeholder {
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
background: linear-gradient(135deg, var(--coffee-600), var(--coffee-500));
color: white;
font-size: 22px;
font-weight: 700;
}

ion-label {
margin: 18px 0;
}

.user-name {
margin: 0 0 10px 0;
font-size: 18px;
font-weight: 900;
color: var(--text-900);
letter-spacing: -0.3px;
line-height: 1.2;
}

.rating-info {
display: flex;
align-items: center;
gap: 10px;
flex-wrap: wrap;
}

.stars {
display: flex;
gap: 4px;
}

.star-icon {
font-size: 19px;
color: #6b4226;
opacity: 0.3;
transition: all 0.2s ease;
}

.star-icon.filled {
color: #6b4226;
opacity: 1;
}

.rating-score {
font-size: 15px;
font-weight: 800;
color: var(--coffee-900);
background: var(--cream-200);
padding: 4px 10px;
border-radius: 8px;
}

.bullet {
font-size: 12px;
color: var(--text-600);
opacity: 0.6;
}

.rating-date {
font-size: 14px;
font-weight: 600;
color: var(--text-600);
}

.rating-badge {
display: flex;
align-items: center;
justify-content: center;
background: var(--cream-50);
border: 2px solid var(--coffee-600);
min-width: 62px;
height: 62px;
border-radius: 16px;
flex-shrink: 0;
padding: 8px;
}

.badge-content {
display: flex;
flex-direction: column;
align-items: center;
gap: 2px;
}

.badge-icon {
font-size: 20px;
color: #6b4226;
}

.badge-rating {
font-size: 18px;
font-weight: 900;
color: var(--coffee-900);
line-height: 1;
}
</style>
