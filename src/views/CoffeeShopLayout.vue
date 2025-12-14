<template>
<ion-page>
<ion-header translucent class="header ion-no-border">
<ion-toolbar style="padding-top:30px;">
<!-- TITLE -->
<ion-title style="font-weight:bold;text-transform: capitalize;">
<ion-item class="item" lines="none">
<!-- <ion-avatar slot="start" v-if="image">
<img :alt="title" :src="image"/>
</ion-avatar> -->
<ion-label style="font-size:20px;font-weight:bold;text-transform: capitalize;"> 
<div> 
{{ business.name }}
</div>
<p style="color:white;font-weight:normal;">  
<!-- {{ subtitle }} -->
</p>
</ion-label>
</ion-item>


<!-- {{ title }} -->


</ion-title>
<!-- RIGHT ICONS -->
<ion-buttons slot="end" class="button">
<ion-button>
<ion-icon slot="icon-only" :md="locationSharp" class="icon"></ion-icon>
</ion-button> 
</ion-buttons>
</ion-toolbar>
</ion-header>
<ion-content style="--background: #f2f2f2;">

<ion-segment-view>
<ion-segment-content id="first">
<coffee-shop v-if="isLoading===false" :products="products"/>
<skeleton v-else style="margin:20px;"/>
</ion-segment-content>
<ion-segment-content id="second">
<about/>
</ion-segment-content>
<ion-segment-content id="third">
<reviews/>
</ion-segment-content>
</ion-segment-view>


</ion-content>
<ion-footer class="header ion-no-border" style="--margin:0;margin:0;">
<ion-segment style="margin:0;padding:0;">
<ion-segment-button value="first" content-id="first">
<ion-label style="font-size:12px;text-transform: capitalize;">Menu</ion-label>
<ion-icon :icon="fastFoodOutline"></ion-icon>
</ion-segment-button>
<ion-segment-button value="second" content-id="second">
<ion-label style="font-size:12px;text-transform: capitalize;">About</ion-label>
<ion-icon :icon="businessOutline"></ion-icon>
</ion-segment-button>
<ion-segment-button value="third" content-id="third">
<ion-label style="font-size:12px;text-transform: capitalize;">Reviews</ion-label>
<ion-icon :icon="chatboxOutline"></ion-icon>
</ion-segment-button>
</ion-segment>
</ion-footer>
</ion-page>
</template>
<script setup>
import { IonPage, IonContent, IonHeader,IonTitle, IonToolbar, IonFooter, IonButtons, IonAvatar,IonItem, IonLabel,IonIcon,IonButton,IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView } from '@ionic/vue';

import CoffeeShop from './coffee-shop/CoffeeShop.vue';
import BusinessService from '../service/BusinessService';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Skeleton from './template/Skeleton.vue';
import { chatboxOutline, businessOutline, cafeOutline,locationSharp,fastFoodOutline } from 'ionicons/icons';
import About from './coffee-shop/About.vue';
import Reviews from './coffee-shop/Reviews.vue';

const url=useRoute();
const business=ref('');
const isLoading=ref(false);
const error=ref(null);
const products=ref([]);


onMounted(async()=>{
try{
isLoading.value=true;
const id=url.params.id;
const service=new BusinessService();
const response=await service.businessDetails(id);
if(response.status===200){
let data=response.data;
data=data[0];
business.value=data;
products.value=data.product;

// console.log(business.value);


}else{
error.value=response.error;
}
}catch(e){
console.log(e);
}finally{
isLoading.value=false;
}


});




</script>
<style scoped>
.button{
color:white
}
ion-item{
--background: #6B4226;
--color: #fff;
--detail-icon-color: white;
--detail-icon-opacity: 1;
--detail-icon-font-size: 20px;
--color:white;
}
.icon{
color:white;
}
p{
color:white;
}


ion-segment-button {
--indicator-color: none;
--indicator-height: 0px;
--margin:0;
}

/* Material Design styles */
ion-segment-button.md {
--color: #000;
--color-checked: #6B4226;
--indicator-height: 0px;
--margin:0;
}

/* iOS styles */
ion-segment-button.ios {
--color: #08a391;
--color-checked: #fff;
--border-radius: 20px;

}



</style>