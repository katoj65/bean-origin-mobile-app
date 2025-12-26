<template>
<div>
<div v-if="isLoading==false">
<!-- Trigger Button -->
<ion-button 
expand="block" 
@click="openCartModal"
class="trigger-btn">
<ion-icon slot="start" :icon="cartIcon"></ion-icon>
Add to Cart
</ion-button>

<!-- Add to Cart Modal -->
<ion-modal 
:is-open="isCartModalOpen" 
@did-dismiss="closeCartModal"
:initial-breakpoint="0.47"
:breakpoints="[0, 0.47, 1]"
class="rating-modal">
<div class="rating-modal-wrapper">
<div class="rating-modal-card">

<div class="modal-header">
<div class="header-content">
<h3>
    {{ title }}
</h3>
<p class="header-subtitle text-capitalize">
Unit cost: Shs. {{ price }}
</p>
<p class="total-cost-text">
Total: Shs. {{ sum }}
</p>
</div>
<button @click="closeCartModal" class="close-btn">
<ion-icon :icon="closeIcon"></ion-icon>
</button>
</div>

<div class="rating-modal-content">
<!-- Quantity Input Section -->
<div class="quantity-section">
<label class="section-label">How many items would you like?</label>
<div class="input-wrapper">
<ion-input
v-model="quantity"
type="text"
inputmode="numeric"
placeholder="Enter quantity"
class="quantity-input"
@ionInput="validateQuantity"
clear-input
@keyup="computePrice"
></ion-input>
</div>
</div>              <!-- Submit Button -->
<ion-button 
expand="block" 
@click="addToCart"
:disabled="isLoading"
class="submit-button">
<ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
<span v-else>Add to Cart</span>
</ion-button>
</div>
</div>
</div>
</ion-modal>
</div>

<div v-else>
<spinner/>
</div>



</div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import Spinner from './Spinner.vue';
import {
IonButton,
IonModal,
IonIcon,
IonSpinner,
IonInput
} from '@ionic/vue';
import { cartOutline, close } from 'ionicons/icons';

// Props
const props = defineProps({
product: Object
});

const cartIcon = cartOutline;
const closeIcon = close;

// Modal state
const isCartModalOpen = ref(false);
const isLoading = ref(false);

// Cart state
const quantity = ref(1);

// Methods
const openCartModal = () => {
isCartModalOpen.value = true;
};

const closeCartModal = () => {
isCartModalOpen.value = false;
quantity.value = 1; // Reset quantity
};

const validateQuantity = () => {
if (!quantity.value || quantity.value < 1) {
quantity.value = 1;
}
};



const title=ref('');
const price=ref('');
const business_name=ref('');
const sum=ref(0);
const isLoading2=ref(false);



onMounted(async ()=>{
try{

isLoading.value=true;
const data = await props.product;

title.value=data.name;
price.value=data.price;
business_name.value=data.business.name;
sum.value=price.value;


console.log(sum.value);

}catch(e){
    console.log(e);
}finally{
isLoading.value=false;
}
});


const computePrice=()=>{
const total=quantity.value===1?price.value:quantity.value*price.value;
sum.value=total;
}











//submit button for the cart
const addToCart = async () => {
try {
isLoading2.value = true;

// Simulate API call
await new Promise(resolve => setTimeout(resolve, 1000));

console.log('Added to cart:', {
quantity: quantity.value
});

// Close modal after success
closeCartModal();
} catch (error) {
console.error('Error adding to cart:', error);
} finally {
isLoading2.value = false;
}
};



</script>

<style scoped>
.trigger-btn {
--background: #6b4226;
--background-activated: #5d3a2f;
--background-hover: #5d3a2f;
--border-radius: 16px;
height: 56px;
font-size: 16px;
font-weight: 900;
text-transform: none;
letter-spacing: 0.3px;
}

.trigger-btn ion-icon {
font-size: 22px;
}

/* Modal Styles - Matching Rating Modal Design */
.rating-modal {
--border-radius: 20px 20px 0 0;
}

.rating-modal::part(content) {
border-radius: 20px 20px 0 0;
}

.rating-modal-wrapper {
height: 100%;
display: flex;
flex-direction: column;
background: #ffffff;
border-radius: 20px 20px 0 0;
}

.rating-modal-card {
flex: 1;
padding: 20px;
overflow-y: auto;
}

.modal-handle {
width: 48px;
height: 5px;
background: #6b4226;
border-radius: 3px;
margin: 0 auto 24px;
opacity: 0.3;
}

.modal-header {
display: flex;
justify-content: space-between;
align-items: flex-start;
margin-bottom: 28px;
gap: 12px;
}

.header-content {
flex: 1;
}

.modal-header h3 {
margin: 0 0 4px 0;
font-size: 22px;
font-weight: 900;
color: #1a0f0a;
letter-spacing: -0.3px;
line-height: 1.2;
}

.header-subtitle {
margin: 0;
font-size: 16px;
font-weight: 600;
color: #6b5444;
letter-spacing: 0;
line-height: 1.4;
}

.total-cost-text {
margin: 8px 0 0 0;
font-size: 20px;
font-weight: 900;
color: #6b4226;
letter-spacing: -0.3px;
line-height: 1.4;
}

.close-btn {
width: 38px;
height: 38px;
display: flex;
align-items: center;
justify-content: center;
background: #6b4226;
border: none;
border-radius: 50%;
cursor: pointer;
transition: all 0.3s ease;
flex-shrink: 0;
}

.close-btn:active {
transform: scale(0.9);
background: #4a2c2a;
}

.close-btn ion-icon {
font-size: 22px;
color: white;
transition: transform 0.3s ease;
}

.rating-modal-content {
display: flex;
flex-direction: column;
gap: 32px;
}

.quantity-section {
margin-bottom: 0;
}

.section-label {
display: block;
font-size: 16px;
font-weight: 700;
color: #000000;
margin: 0 0 12px 0;
}

.input-wrapper {
border: 2px solid #6b4226;
border-radius: 16px;
background: #ffffff;
overflow: hidden;
}

.quantity-input {
--background: transparent;
--padding-start: 20px;
--padding-end: 20px;
--color: #000000;
font-size: 18px;
font-weight: 700;
height: 56px;
text-align: center;
}

.quantity-input::part(native) {
font-weight: 700;
color: #000000;
}

.section-label {
font-size: 16px;
font-weight: 600;
color: #6b5444;
margin: 0 0 16px 0;
text-align: center;
}

.quantity-controls {
display: flex;
align-items: center;
justify-content: center;
gap: 24px;
background: transparent;
padding: 20px;
border-radius: 0;
border: none;
}

.quantity-btn {
width: 50px;
height: 50px;
border-radius: 50%;
background: #6b4226;
color: white;
border: none;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
transition: all 0.3s ease;
box-shadow: 0 4px 12px rgba(107, 66, 38, 0.25);
}

.quantity-btn:disabled {
background: #d4c4b3;
cursor: not-allowed;
opacity: 0.5;
box-shadow: none;
}

.quantity-btn:active:not(:disabled) {
transform: scale(0.9);
}

.quantity-btn ion-icon {
font-size: 28px;
}

.quantity-value {
font-size: 42px;
font-weight: 900;
color: #3d2419;
min-width: 80px;
text-align: center;
}

.price-summary {
background: linear-gradient(135deg, #faf8f5, #f5f1e8);
border-radius: 20px;
padding: 24px;
margin-bottom: 0;
border: 2px solid #f5f1e8;
}

.price-row {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 14px;
font-size: 15px;
color: #6b5444;
font-weight: 600;
}

.price-row:last-child {
margin-bottom: 0;
}

.price-row.total {
padding-top: 16px;
border-top: 2px solid rgba(107, 66, 38, 0.15);
margin-top: 16px;
font-size: 18px;
font-weight: 900;
color: #3d2419;
}

.price {
font-weight: 900;
color: #6b4226;
font-size: 16px;
}

.price-row.total .price {
font-size: 28px;
background: linear-gradient(135deg, #6b4226, #8b5a3c);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
}

.submit-button {
--background: #6b4226;
--background-hover: #5d3a2f;
--background-activated: #5d3a2f;
--color: white;
--box-shadow: 0 4px 16px rgba(107, 66, 38, 0.3);
--border-radius: 16px;
font-weight: 900;
font-size: 16px;
height: 56px;
border-radius: 16px;
margin-top: 0;
letter-spacing: 0.3px;
text-transform: none;
transition: all 0.3s ease;
}

.submit-button ion-icon {
margin-right: 10px;
font-size: 22px;
}

.submit-button ion-spinner {
--color: white;
}
</style>
