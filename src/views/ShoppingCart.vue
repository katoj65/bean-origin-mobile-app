<template>
  <ion-page>
    <!-- HEADER -->
    <ion-header class="ion-no-border">
      <ion-toolbar class="cart-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goBack" class="header-button">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="header-title">Shopping Cart</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="clearCart" class="header-button" v-if="cartItems.length > 0">
            <ion-icon :icon="trashOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="cart-content">
      <div class="content-container">
        
        <!-- EMPTY STATE -->
        <div v-if="cartItems.length === 0" class="empty-state">
          <div class="empty-icon">🛒</div>
          <h2 class="empty-title">Your cart is empty</h2>
          <p class="empty-text">Add some delicious coffee to get started</p>
          <button class="browse-button" @click="goToShop">
            <ion-icon :icon="cafeOutline"></ion-icon>
            Browse Coffee
          </button>
        </div>

        <!-- CART HAS ITEMS -->
        <div v-else class="cart-container">
          
          <!-- ITEMS COUNT CARD -->
          <div class="content-card count-card">
            <div class="count-content">
              <div class="count-icon">
                <ion-icon :icon="bagHandleOutline"></ion-icon>
              </div>
              <div class="count-text">
                <span class="count-number">{{ totalItems }} {{ totalItems === 1 ? 'item' : 'items' }}</span>
                <span class="count-label">in your cart</span>
              </div>
            </div>
          </div>

          <!-- PRODUCTS LIST -->
          <div class="products-section">
            <div class="section-header">
              <h2 class="section-title">Your Items</h2>
            </div>

            <!-- PRODUCT CARD -->
            <div v-for="(item, index) in cartItems" :key="item.id" class="content-card product-card" 
                 :style="{ animationDelay: (index * 0.05) + 's' }">
              <div class="product-content">
                <!-- LEFT SIDE: Image + Quantity -->
                <div class="product-left">
                  <div class="product-image-wrapper">
                    <img :src="item.image" :alt="item.name" class="product-image" />
                    <span v-if="item.discount" class="discount-badge">-{{ item.discount }}%</span>
                  </div>
                  
                  <!-- Quantity Controls Under Image -->
                  <div class="quantity-control">
                    <button class="qty-btn" @click="decreaseQuantity(item.id)" :disabled="item.quantity <= 1">
                      <ion-icon :icon="removeOutline"></ion-icon>
                    </button>
                    <span class="qty-number">{{ item.quantity }}</span>
                    <button class="qty-btn" @click="increaseQuantity(item.id)" :disabled="item.quantity >= 10">
                      <ion-icon :icon="addOutline"></ion-icon>
                    </button>
                  </div>
                </div>

                <!-- RIGHT SIDE: Product Details -->
                <div class="product-details">
                  <div class="product-header">
                    <div class="product-info">
                      <h3 class="product-name">{{ item.name }}</h3>
                      <div class="product-meta">
                        <span class="meta-item">
                          <ion-icon :icon="locationOutline"></ion-icon>
                          {{ item.origin }}
                        </span>
                        <span class="meta-separator">•</span>
                        <span class="meta-item">{{ item.size }}</span>
                        <span class="meta-separator">•</span>
                        <span class="meta-item">{{ item.grind }}</span>
                      </div>
                    </div>
                    <button class="remove-button" @click="removeItem(item.id)">
                      <ion-icon :icon="closeOutline"></ion-icon>
                    </button>
                  </div>

                  <!-- Save for later -->
                  <button class="save-later-btn" @click="saveForLater(item.id)">
                    <ion-icon :icon="bookmarkOutline"></ion-icon>
                    <span>Save for later</span>
                  </button>

                  <!-- Price Section -->
                  <div class="price-section">
                    <span v-if="item.discount" class="price-original">${{ (item.price * item.quantity).toFixed(2) }}</span>
                    <span class="price-current">${{ (item.discountedPrice * item.quantity).toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- FREE SHIPPING PROGRESS -->
          <div class="content-card shipping-progress-card">
            <div class="shipping-progress-content">
              <div class="progress-icon">
                🚚
              </div>
              <div class="progress-info">
                <div class="progress-text">
                  <span class="progress-label">{{ shippingMessage }}</span>
                  <span class="progress-amount" v-if="amountToFreeShipping > 0">${{ amountToFreeShipping.toFixed(2) }} away</span>
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar-fill" :style="{ width: shippingProgress + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- RECOMMENDED PRODUCTS -->
          <div class="content-card recommended-card">
            <div class="recommended-header">
              <div class="header-icon purple">
                <ion-icon :icon="sparklesOutline"></ion-icon>
              </div>
              <div class="header-text">
                <h2 class="recommended-title">You might also like</h2>
                <p class="recommended-subtitle">Handpicked recommendations</p>
              </div>
            </div>

            <div class="recommended-grid">
              <div 
                v-for="product in recommendedProducts" 
                :key="product.id"
                class="recommended-item"
                @click="viewProduct(product.id)">
                <div class="rec-image-wrapper">
                  <img :src="product.image" :alt="product.name" class="rec-image" />
                  <button class="quick-add-btn" @click.stop="quickAdd(product.id)">
                    <ion-icon :icon="addOutline"></ion-icon>
                  </button>
                </div>
                <div class="rec-info">
                  <h4 class="rec-name">{{ product.name }}</h4>
                  <div class="rec-rating">
                    <ion-icon :icon="starOutline"></ion-icon>
                    <span>{{ product.rating }}</span>
                  </div>
                  <div class="rec-price">
                    <span class="rec-current">${{ product.price }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- PROMO CODE CARD -->
          <div class="content-card promo-card">
            <div class="promo-header">
              <div class="header-icon green">
                <ion-icon :icon="giftOutline"></ion-icon>
              </div>
              <div class="header-text">
                <h2 class="promo-title">Promo Code</h2>
                <p class="promo-subtitle">Have a discount code?</p>
              </div>
            </div>

            <div v-if="!appliedPromo" class="promo-input-section">
              <div class="promo-input-wrapper">
                <input 
                  v-model="promoCode" 
                  type="text" 
                  placeholder="Enter code"
                  class="promo-input"
                  @keyup.enter="applyPromo"
                />
                <button class="apply-button" @click="applyPromo" :disabled="!promoCode">
                  Apply
                </button>
              </div>
              
              <!-- Quick Apply Chips -->
              <div class="promo-chips">
                <button 
                  v-for="code in availablePromos" 
                  :key="code.code"
                  class="promo-chip"
                  @click="quickApplyPromo(code.code)">
                  {{ code.code }}
                </button>
              </div>
            </div>

            <div v-else class="promo-applied">
              <div class="applied-icon">
                <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
              </div>
              <div class="applied-content">
                <span class="applied-code">{{ appliedPromo }}</span>
                <span class="applied-text">Code applied successfully</span>
              </div>
              <button class="remove-promo" @click="removePromo">
                <ion-icon :icon="closeOutline"></ion-icon>
              </button>
            </div>
          </div>

          <!-- DELIVERY INFO CARD -->
          <div class="content-card delivery-card">
            <div class="delivery-header">
              <div class="header-icon blue">
                <ion-icon :icon="carOutline"></ion-icon>
              </div>
              <div class="header-text">
                <h2 class="delivery-title">Delivery Information</h2>
                <p class="delivery-subtitle">Estimated delivery time</p>
              </div>
            </div>

            <div class="delivery-options">
              <div 
                v-for="option in deliveryOptions" 
                :key="option.id"
                :class="['delivery-option', { active: selectedDelivery === option.id }]"
                @click="selectDelivery(option.id)">
                <div class="option-radio">
                  <div class="radio-dot" v-if="selectedDelivery === option.id"></div>
                </div>
                <div class="option-content">
                  <div class="option-header">
                    <span class="option-icon">{{ option.icon }}</span>
                    <span class="option-name">{{ option.name }}</span>
                  </div>
                  <span class="option-time">{{ option.time }}</span>
                </div>
                <span class="option-price">{{ option.price === 0 ? 'FREE' : '$' + option.price.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- SUMMARY CARD -->
          <div class="content-card summary-card">
            <div class="summary-header">
              <div class="header-icon">
                <ion-icon :icon="receiptOutline"></ion-icon>
              </div>
              <h2 class="summary-title">Order Summary</h2>
            </div>

            <div class="summary-rows">
              <div class="summary-row">
                <span class="row-label">Subtotal</span>
                <span class="row-value">${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="summary-row savings-row" v-if="totalDiscount > 0">
                <span class="row-label">
                  <ion-icon :icon="giftOutline"></ion-icon>
                  Total Savings
                </span>
                <span class="row-value discount-value">-${{ totalDiscount.toFixed(2) }}</span>
              </div>
              <div class="summary-row">
                <span class="row-label">Shipping</span>
                <span class="row-value shipping-value">{{ shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2) }}</span>
              </div>
              <div class="summary-row" v-if="tax > 0">
                <span class="row-label">Tax (8%)</span>
                <span class="row-value">${{ tax.toFixed(2) }}</span>
              </div>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-total">
              <span class="total-label">Total</span>
              <span class="total-value">${{ total.toFixed(2) }}</span>
            </div>

            <button class="checkout-button" @click="proceedToCheckout">
              <span>Proceed to Checkout</span>
              <ion-icon :icon="arrowForwardOutline"></ion-icon>
            </button>
          </div>

          <!-- PAYMENT METHODS CARD -->
          <div class="content-card payment-card">
            <div class="payment-header">
              <div class="header-icon orange">
                <ion-icon :icon="cardOutline"></ion-icon>
              </div>
              <h2 class="payment-title">Accepted Payment Methods</h2>
            </div>

            <div class="payment-methods">
              <div class="payment-method">💳 Credit Card</div>
              <div class="payment-method">🏦 Debit Card</div>
              <div class="payment-method">📱 Mobile Payment</div>
              <div class="payment-method">💰 PayPal</div>
            </div>
          </div>

          <!-- TRUST BADGES -->
          <div class="trust-badges-section">
            <div class="trust-badge-item">
              <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
              <span>Secure Checkout</span>
            </div>
            <div class="trust-badge-item">
              <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
              <span>Buyer Protection</span>
            </div>
            <div class="trust-badge-item">
              <ion-icon :icon="refreshOutline"></ion-icon>
              <span>Easy Returns</span>
            </div>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed } from 'vue';
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
  alertController,
} from "@ionic/vue";
import {
  arrowBackOutline,
  trashOutline,
  cafeOutline,
  bagHandleOutline,
  locationOutline,
  closeOutline,
  removeOutline,
  addOutline,
  receiptOutline,
  arrowForwardOutline,
  giftOutline,
  checkmarkCircleOutline,
  carOutline,
  cardOutline,
  bookmarkOutline,
  sparklesOutline,
  starOutline,
  shieldCheckmarkOutline,
  refreshOutline,
} from "ionicons/icons";

const router = useRouter();

const promoCode = ref('');
const appliedPromo = ref('');
const selectedDelivery = ref('free');

const FREE_SHIPPING_THRESHOLD = 100;

const availablePromos = [
  { code: 'COFFEE20', discount: 20 },
  { code: 'SAVE10', discount: 10 },
  { code: 'FREESHIP', type: 'shipping' }
];

const deliveryOptions = [
  { id: 'free', name: 'Standard Delivery', time: '5-7 business days', price: 0, icon: '🚚' },
  { id: 'express', name: 'Express Delivery', time: '2-3 business days', price: 12.99, icon: '⚡' },
  { id: 'overnight', name: 'Overnight Delivery', time: 'Next day', price: 24.99, icon: '🚀' }
];

const recommendedProducts = [
  {
    id: 101,
    name: 'Kenya AA',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
    price: 22.99,
    rating: 4.9
  },
  {
    id: 102,
    name: 'Guatemala Antigua',
    image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400',
    price: 20.99,
    rating: 4.7
  },
  {
    id: 103,
    name: 'Peru Organic',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
    price: 19.99,
    rating: 4.8
  }
];

const cartItems = ref([
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    origin: 'Ethiopia',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
    price: 18.99,
    discount: 15,
    discountedPrice: 16.14,
    quantity: 2,
    size: '250g',
    grind: 'Whole Bean'
  },
  {
    id: 2,
    name: 'Colombian Supremo',
    origin: 'Colombia',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    price: 24.99,
    discount: 0,
    discountedPrice: 24.99,
    quantity: 1,
    size: '500g',
    grind: 'Ground'
  },
  {
    id: 3,
    name: 'Costa Rica Honey',
    origin: 'Costa Rica',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    price: 21.99,
    discount: 20,
    discountedPrice: 17.59,
    quantity: 1,
    size: '250g',
    grind: 'Espresso'
  },
  {
    id: 4,
    name: 'Brazilian Santos',
    origin: 'Brazil',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
    price: 19.99,
    discount: 10,
    discountedPrice: 17.99,
    quantity: 1,
    size: '1kg',
    grind: 'Whole Bean'
  }
]);

const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
});

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const totalDiscount = computed(() => {
  const itemsDiscount = cartItems.value.reduce((sum, item) => {
    return sum + ((item.price - item.discountedPrice) * item.quantity);
  }, 0);
  
  let promoDiscount = 0;
  if (appliedPromo.value) {
    const promo = availablePromos.find(p => p.code === appliedPromo.value);
    if (promo && promo.discount) {
      promoDiscount = subtotal.value * (promo.discount / 100);
    }
  }
  
  return itemsDiscount + promoDiscount;
});

const shipping = computed(() => {
  const option = deliveryOptions.find(opt => opt.id === selectedDelivery.value);
  
  if (appliedPromo.value === 'FREESHIP') {
    return 0;
  }
  
  return option ? option.price : 0;
});

const tax = computed(() => {
  const subtotalAfterDiscount = subtotal.value - totalDiscount.value;
  return subtotalAfterDiscount * 0.08;
});

const total = computed(() => {
  return subtotal.value - totalDiscount.value + shipping.value + tax.value;
});

const amountToFreeShipping = computed(() => {
  const currentSubtotal = subtotal.value - totalDiscount.value;
  const remaining = FREE_SHIPPING_THRESHOLD - currentSubtotal;
  return remaining > 0 ? remaining : 0;
});

const shippingProgress = computed(() => {
  const currentSubtotal = subtotal.value - totalDiscount.value;
  const progress = (currentSubtotal / FREE_SHIPPING_THRESHOLD) * 100;
  return Math.min(progress, 100);
});

const shippingMessage = computed(() => {
  if (amountToFreeShipping.value === 0) {
    return '🎉 You qualify for FREE shipping!';
  }
  return 'Add more to unlock FREE shipping';
});

const goBack = () => {
  router.back();
};

const goToShop = () => {
  router.push('/products');
};

const viewProduct = (id) => {
  router.push(`/product/${id}`);
};

const quickAdd = (id) => {
  console.log('Quick add product:', id);
  alert('Product added to cart!');
};

const saveForLater = (id) => {
  console.log('Save for later:', id);
  alert('Item saved for later!');
};

const clearCart = async () => {
  const alert = await alertController.create({
    header: 'Clear Cart',
    message: 'Are you sure you want to remove all items from your cart?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Clear',
        role: 'destructive',
        handler: () => {
          cartItems.value = [];
          appliedPromo.value = '';
        }
      }
    ]
  });
  
  await alert.present();
};

const removeItem = async (id) => {
  const alert = await alertController.create({
    header: 'Remove Item',
    message: 'Remove this item from your cart?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Remove',
        role: 'destructive',
        handler: () => {
          cartItems.value = cartItems.value.filter(item => item.id !== id);
        }
      }
    ]
  });
  
  await alert.present();
};

const decreaseQuantity = (id) => {
  const item = cartItems.value.find(item => item.id === id);
  if (item && item.quantity > 1) {
    item.quantity--;
  }
};

const increaseQuantity = (id) => {
  const item = cartItems.value.find(item => item.id === id);
  if (item && item.quantity < 10) {
    item.quantity++;
  }
};

const applyPromo = () => {
  const code = promoCode.value.trim().toUpperCase();
  const validPromo = availablePromos.find(p => p.code === code);
  
  if (validPromo) {
    appliedPromo.value = code;
    promoCode.value = '';
  } else {
    alert('Invalid promo code');
  }
};

const quickApplyPromo = (code) => {
  appliedPromo.value = code;
};

const removePromo = () => {
  appliedPromo.value = '';
};

const selectDelivery = (id) => {
  selectedDelivery.value = id;
};

const proceedToCheckout = () => {
  console.log('Proceeding to checkout...');
  alert('Checkout functionality coming soon!');
};
</script>

<style scoped>
/* ===== VARIABLES ===== */
:root {
  --coffee-dark: #4a2c2a;
  --coffee-medium: #6b4226;
  --coffee-light: #a87b54;
  --text-dark: #2c1810;
  --text-light: #8b7355;
  --green: #27ae60;
  --blue: #2196f3;
  --orange: #ff9800;
  --red: #ef4444;
}

* {
  -webkit-tap-highlight-color: transparent;
}

/* ===== HEADER ===== */
.cart-toolbar {
  --background: white;
  --border-width: 0;
  padding: 8px 4px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); */
}

.header-button {
  --background: rgba(107, 66, 38, 0.08);
  --color: var(--coffee-dark);
  width: 42px;
  height: 42px;
  margin: 4px;
  border-radius: 50%;
}

.header-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
}

/* ===== CONTENT ===== */
.cart-content {
  --background: #f2f2f2;
}

.content-container {
  padding: 12px;
}

/* ===== CONTENT CARD ===== */
.content-card {
  background: white;
  border-radius: 16px;
  margin-bottom: 12px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); */
  overflow: hidden;
}

/* ===== EMPTY STATE ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 8px 0;
}

.empty-text {
  font-size: 15px;
  color: var(--text-light);
  margin: 0 0 24px 0;
}

.browse-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: linear-gradient(135deg, var(--coffee-dark), var(--coffee-medium));
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

.browse-button ion-icon {
  font-size: 20px;
}

/* ===== COUNT CARD ===== */
.count-card {
  padding: 20px;
}

.count-content {
  display: flex;
  align-items: center;
  gap: 14px;
}

.count-icon {
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.15), rgba(107, 66, 38, 0.25));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--coffee-medium);
  flex-shrink: 0;
}

.count-icon ion-icon {
  font-size: 26px;
}

.count-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.count-number {
  font-size: 22px;
  font-weight: 800;
  color: var(--coffee-dark);
  line-height: 1;
}

.count-label {
  font-size: 14px;
  color: var(--text-light);
  font-weight: 600;
}

/* ===== PRODUCTS SECTION ===== */
.products-section {
  margin-bottom: 12px;
}

.section-header {
  padding: 0 4px 12px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0;
}

/* ===== PRODUCT CARD ===== */
.product-card {
  padding: 14px;
  animation: slideInUp 0.4s ease-out backwards;
}

.product-content {
  display: flex;
  gap: 14px;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* LEFT SIDE: Image + Quantity */
.product-left {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
}

.product-image-wrapper {
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 12px;
  overflow: hidden;
  background: #f5f5f5;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.discount-badge {
  position: absolute;
  top: 6px;
  left: 6px;
  padding: 4px 8px;
  background: var(--red);
  color: white;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15); */
}

/* RIGHT SIDE: Product Details */
.product-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.product-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 6px 0;
  line-height: 1.2;
}

.product-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--text-light);
  font-weight: 600;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 3px;
}

.meta-item ion-icon {
  font-size: 12px;
}

.meta-separator {
  color: #e0e0e0;
}

.remove-button {
  width: 32px;
  height: 32px;
  background: rgba(239, 68, 68, 0.1);
  border: none;
  border-radius: 50%;
  color: var(--red);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.remove-button ion-icon {
  font-size: 18px;
}

.quantity-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 10px;
  width: 110px;
}

.qty-btn {
  width: 28px;
  height: 28px;
  background: white;
  border: none;
  border-radius: 50%;
  color: var(--coffee-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); */
  flex-shrink: 0;
}

.qty-btn:disabled {
  opacity: 0.3;
}

.qty-btn ion-icon {
  font-size: 16px;
}

.qty-number {
  font-size: 15px;
  font-weight: 700;
  min-width: 24px;
  text-align: center;
  color: var(--coffee-dark);
}

.price-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: auto;
  padding-top: 8px;
}

.price-original {
  font-size: 13px;
  color: var(--text-light);
  text-decoration: line-through;
  font-weight: 600;
}

.price-current {
  font-size: 18px;
  font-weight: 800;
  color: var(--coffee-dark);
  line-height: 1;
}

/* Save for Later Button */
.save-later-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  color: var(--coffee-medium);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  width: fit-content;
}

.save-later-btn:active {
  background: rgba(107, 66, 38, 0.05);
}

.save-later-btn ion-icon {
  font-size: 16px;
}

/* ===== SUMMARY CARD ===== */
.summary-card {
  padding: 20px;
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.header-icon {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.15), rgba(107, 66, 38, 0.25));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--coffee-medium);
  flex-shrink: 0;
}

.header-icon.green {
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.15), rgba(39, 174, 96, 0.25));
  color: var(--green);
}

.header-icon.blue {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.15), rgba(33, 150, 243, 0.25));
  color: var(--blue);
}

.header-icon.orange {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.15), rgba(255, 152, 0, 0.25));
  color: var(--orange);
}

.header-icon ion-icon {
  font-size: 22px;
}

.summary-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0;
}

.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.row-label {
  font-size: 14px;
  color: var(--text-light);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.row-label ion-icon {
  font-size: 16px;
}

.savings-row .row-label {
  color: var(--green);
}

.savings-row {
  padding: 12px;
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.08), rgba(39, 174, 96, 0.05));
  border-radius: 10px;
  margin: 4px 0;
}

.row-value {
  font-size: 15px;
  color: var(--text-dark);
  font-weight: 700;
}

.discount-value {
  color: var(--green);
}

.shipping-value {
  color: var(--green);
}

.summary-divider {
  height: 1px;
  background: #e8e8e8;
  margin: 16px 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.total-label {
  font-size: 16px;
  color: var(--text-dark);
  font-weight: 700;
}

.total-value {
  font-size: 28px;
  color: var(--coffee-dark);
  font-weight: 800;
  line-height: 1;
}

.checkout-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px;
  background: linear-gradient(135deg, var(--coffee-dark), var(--coffee-medium));
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  /* box-shadow: 0 4px 12px rgba(107, 66, 38, 0.3); */
}

.checkout-button ion-icon {
  font-size: 22px;
  margin-left: auto;
}

/* ===== PROMO CARD ===== */
.promo-card {
  padding: 20px;
}

.promo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.promo-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0;
}

.promo-subtitle {
  font-size: 13px;
  color: var(--text-light);
  margin: 2px 0 0 0;
  font-weight: 600;
}

.promo-input-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.promo-input-wrapper {
  display: flex;
  gap: 8px;
}

.promo-input {
  flex: 1;
  padding: 12px 16px;
  background: #f5f5f5;
  border: 2px solid transparent;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
}

.promo-input:focus {
  outline: none;
  background: white;
  border-color: var(--coffee-medium);
}

.apply-button {
  padding: 12px 24px;
  background: linear-gradient(135deg, var(--coffee-dark), var(--coffee-medium));
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.apply-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.promo-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.promo-chip {
  padding: 8px 14px;
  background: white;
  border: 2px dashed #d0d0d0;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  color: var(--coffee-medium);
  cursor: pointer;
  font-family: 'Courier New', monospace;
}

.promo-applied {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.1), rgba(39, 174, 96, 0.05));
  border-radius: 12px;
  border: 2px solid rgba(39, 174, 96, 0.2);
}

.applied-icon {
  width: 40px;
  height: 40px;
  background: var(--green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.applied-icon ion-icon {
  font-size: 24px;
}

.applied-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.applied-code {
  font-size: 15px;
  font-weight: 700;
  color: var(--coffee-dark);
  font-family: 'Courier New', monospace;
}

.applied-text {
  font-size: 12px;
  color: var(--green);
  font-weight: 600;
}

.remove-promo {
  width: 32px;
  height: 32px;
  background: white;
  border: 2px solid var(--green);
  border-radius: 50%;
  color: var(--green);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.remove-promo ion-icon {
  font-size: 18px;
}

/* ===== DELIVERY CARD ===== */
.delivery-card {
  padding: 20px;
}

.delivery-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.header-text {
  flex: 1;
}

.delivery-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0;
}

.delivery-subtitle {
  font-size: 13px;
  color: var(--text-light);
  margin: 2px 0 0 0;
  font-weight: 600;
}

.delivery-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.delivery-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #f5f5f5;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delivery-option.active {
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.08), rgba(107, 66, 38, 0.05));
  border-color: var(--coffee-medium);
}

.option-radio {
  width: 24px;
  height: 24px;
  border: 2px solid #d0d0d0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.delivery-option.active .option-radio {
  border-color: var(--coffee-medium);
}

.radio-dot {
  width: 12px;
  height: 12px;
  background: var(--coffee-medium);
  border-radius: 50%;
}

.option-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.option-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.option-icon {
  font-size: 18px;
}

.option-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.option-time {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 600;
}

.option-price {
  font-size: 15px;
  font-weight: 700;
  color: var(--green);
  flex-shrink: 0;
}

/* ===== PAYMENT CARD ===== */
.payment-card {
  padding: 20px;
}

.payment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.payment-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0;
}

.payment-methods {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.payment-method {
  padding: 14px;
  background: linear-gradient(135deg, #fafafa, #f5f5f5);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--coffee-dark);
  text-align: center;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 400px) {
  .payment-methods {
    grid-template-columns: 1fr;
  }
  
  .recommended-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ===== SHIPPING PROGRESS CARD ===== */
.shipping-progress-card {
  padding: 20px;
}

.shipping-progress-content {
  display: flex;
  align-items: center;
  gap: 14px;
}

.progress-icon {
  font-size: 40px;
  flex-shrink: 0;
}

.progress-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.progress-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.progress-amount {
  font-size: 13px;
  font-weight: 700;
  color: var(--green);
}

.progress-bar-container {
  width: 100%;
  height: 8px;
  background: #e8e8e8;
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--green), #2ecc71);
  border-radius: 10px;
  transition: width 0.5s ease;
}

/* ===== RECOMMENDED PRODUCTS ===== */
.recommended-card {
  padding: 20px;
}

.recommended-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.header-icon.purple {
  background: linear-gradient(135deg, rgba(155, 81, 224, 0.15), rgba(155, 81, 224, 0.25));
  color: #9b51e0;
}

.recommended-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0;
}

.recommended-subtitle {
  font-size: 13px;
  color: var(--text-light);
  margin: 2px 0 0 0;
  font-weight: 600;
}

.recommended-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.recommended-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
}

.rec-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  background: #f5f5f5;
}

.rec-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.recommended-item:active .rec-image {
  transform: scale(1.05);
}

.quick-add-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background: white;
  border: none;
  border-radius: 50%;
  color: var(--coffee-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); */
  opacity: 0;
  transition: opacity 0.3s ease;
}

.recommended-item:hover .quick-add-btn {
  opacity: 1;
}

.quick-add-btn ion-icon {
  font-size: 18px;
}

.rec-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rec-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rec-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--orange);
}

.rec-rating ion-icon {
  font-size: 12px;
}

.rec-price {
  display: flex;
  align-items: center;
  gap: 6px;
}

.rec-current {
  font-size: 15px;
  font-weight: 800;
  color: var(--coffee-dark);
  line-height: 1;
}

/* ===== SAVE FOR LATER ===== */
.save-later-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  color: var(--coffee-medium);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  margin: 8px 0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.save-later-btn:active {
  background: rgba(107, 66, 38, 0.05);
}

.save-later-btn ion-icon {
  font-size: 16px;
}

/* ===== TRUST BADGES SECTION ===== */
.trust-badges-section {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 24px 12px;
  flex-wrap: wrap;
}

.trust-badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: var(--text-light);
}

.trust-badge-item ion-icon {
  font-size: 24px;
  color: var(--green);
}

.trust-badge-item span {
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}
</style>