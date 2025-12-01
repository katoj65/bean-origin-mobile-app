<script setup>
import { IonCol, IonGrid, IonInput, IonRow, IonImg } from '@ionic/vue';

</script>
<template>
<ion-grid>
<ion-row>
<ion-col size="5" id="background">
<!-- <ion-img src="/image1.jpg" style="width:100%;border-radius:10px;" /> -->
</ion-col>
<ion-col size="7" class="left" style="padding:15px;">
<h3>Hello Joshua!</h3>
<p>Discover Premium Coffee Today</p>

</ion-col>
</ion-row>
</ion-grid> 
</template>



<style scoped>
ion-col {
--margin:0;
height:120px;
}

#background{
background-image: url('/image5.jpg');
background-size: cover;
background-position: 100% 100%;
border-radius: 10px 0 0 10px;
height:150px;

}

ion-grid{
background:#fff;
padding:0px;
border-radius:10px;
margin:10px 0;
height:150px;

}
h3{
font-size: 21px;
color:#6B4226;
font-weight:bolder;
}

p{
margin:0;
color: #A87B54;
font-weight:bold
}

.left{
text-align: right;
}
</style>