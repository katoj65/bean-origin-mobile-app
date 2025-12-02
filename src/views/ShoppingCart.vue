<template>
  <ion-page>
    <!-- HEADER -->
    <ion-header class="ion-no-border" translucent>
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goBack">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="page-title">Shopping Cart</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="clearCart" v-if="cartItems.length > 0">
            <ion-icon :icon="trashOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="content-bg">
      <!-- EMPTY CART STATE -->
      <div v-if="cartItems.length === 0" class="empty-state">
        <div class="empty-icon">🛒</div>
        <h2 class="empty-title">Your Cart is Empty</h2>
        <p class="empty-text">Add some delicious coffee to get started</p>
        <button class="browse-btn" @click="browseProducts">
          <ion-icon :icon="cafeOutline"></ion-icon>
          <span>Browse Products</span>
        </button>
      </div>

      <!-- CART WITH ITEMS -->
      <div v-else class="cart-container">
        <!-- CART ITEMS -->
        <div class="cart-items-section">
          <div class="section-header">
            <h2 class="section-title">Cart Items</h2>
            <span class="items-count">{{ cartItems.length }} {{ cartItems.length === 1 ? 'item' : 'items' }}</span>
          </div>

          <div class="cart-items-list">
            <div 
              v-for="item in cartItems" 
              :key="item.id"
              class="cart-item-card">
              
              <!-- Item Image -->
              <div class="item-image-wrapper">
                <img :src="item.image" :alt="item.name" class="item-image" />
              </div>

              <!-- Item Details -->
              <div class="item-details">
                <div class="item-header">
                  <div class="item-info">
                    <h3 class="item-name">{{ item.name }}</h3>
                    <p class="item-origin">
                      <ion-icon :icon="locationOutline"></ion-icon>
                      {{ item.origin }}
                    </p>
                    <div class="item-specs">
                      <span class="spec-badge">{{ item.roast }}</span>
                      <span class="spec-badge">{{ item.grind }}</span>
                      <span class="spec-badge">{{ item.size }}</span>
                    </div>
                  </div>
                  <button class="remove-btn" @click="removeItem(item.id)">
                    <ion-icon :icon="closeOutline"></ion-icon>
                  </button>
                </div>

                <!-- Quantity & Price -->
                <div class="item-footer">
                  <div class="quantity-controls">
                    <button 
                      class="qty-btn"
                      @click="decreaseQuantity(item.id)"
                      :disabled="item.quantity <= 1">
                      <ion-icon :icon="removeOutline"></ion-icon>
                    </button>
                    <span class="qty-display">{{ item.quantity }}</span>
                    <button 
                      class="qty-btn"
                      @click="increaseQuantity(item.id)"
                      :disabled="item.quantity >= 10">
                      <ion-icon :icon="addOutline"></ion-icon>
                    </button>
                  </div>
                  <div class="item-pricing">
                    <span v-if="item.discount" class="original-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
                    <span class="item-price">${{ calculateItemTotal(item).toFixed(2) }}</span>
                  </div>
                </div>

                <!-- Savings Badge -->
                <div v-if="item.discount" class="savings-badge">
                  <ion-icon :icon="pricetagOutline"></ion-icon>
                  <span>Save ${{ ((item.price * item.quantity) - calculateItemTotal(item)).toFixed(2) }} ({{ item.discount }}% off)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- PROMO CODE -->
        <div class="promo-section">
          <h3 class="promo-title">
            <ion-icon :icon="giftOutline"></ion-icon>
            Have a Promo Code?
          </h3>
          
          <div v-if="!appliedPromo" class="promo-input-wrapper">
            <input 
              v-model="promoCode"
              type="text"
              placeholder="Enter code"
              class="promo-input"
              @keyup.enter="applyPromo"
            />
            <button 
              class="apply-btn"
              @click="applyPromo"
              :disabled="!promoCode.trim()">
              Apply
            </button>
          </div>

          <div v-else class="applied-promo">
            <div class="promo-info">
              <div class="promo-icon">✓</div>
              <div class="promo-details">
                <span class="promo-code-text">{{ appliedPromo.code }}</span>
                <span class="promo-desc">{{ appliedPromo.description }}</span>
              </div>
            </div>
            <button class="remove-promo-btn" @click="removePromo">
              <ion-icon :icon="closeOutline"></ion-icon>
            </button>
          </div>
        </div>

        <!-- DELIVERY OPTIONS -->
        <div class="delivery-section">
          <h3 class="delivery-title">Delivery Method</h3>
          <div class="delivery-options">
            <button 
              v-for="option in deliveryOptions" 
              :key="option.id"
              :class="['delivery-option', { selected: selectedDelivery === option.id }]"
              @click="selectDelivery(option.id)">
              <div class="delivery-radio">
                <div class="radio-dot"></div>
              </div>
              <div class="delivery-info">
                <div class="delivery-header">
                  <span class="delivery-emoji">{{ option.emoji }}</span>
                  <span class="delivery-name">{{ option.name }}</span>
                </div>
                <span class="delivery-time">{{ option.time }}</span>
              </div>
              <span class="delivery-price">{{ option.price === 0 ? 'FREE' : '$' + option.price.toFixed(2) }}</span>
            </button>
          </div>
        </div>

        <!-- ORDER SUMMARY -->
        <div class="summary-section">
          <h3 class="summary-title">Order Summary</h3>
          
          <div class="summary-rows">
            <div class="summary-row">
              <span class="row-label">Subtotal</span>
              <span class="row-value">${{ subtotal.toFixed(2) }}</span>
            </div>

            <div class="summary-row" v-if="appliedPromo">
              <span class="row-label promo">
                <ion-icon :icon="pricetagOutline"></ion-icon>
                Promo ({{ appliedPromo.code }})
              </span>
              <span class="row-value promo">-${{ promoDiscount.toFixed(2) }}</span>
            </div>

            <div class="summary-row">
              <span class="row-label">Delivery</span>
              <span class="row-value">{{ deliveryFee === 0 ? 'FREE' : '$' + deliveryFee.toFixed(2) }}</span>
            </div>

            <div class="summary-row">
              <span class="row-label">Tax (8%)</span>
              <span class="row-value">${{ tax.toFixed(2) }}</span>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-row total">
              <span class="row-label">Total</span>
              <span class="row-value">${{ total.toFixed(2) }}</span>
            </div>

            <div class="savings-summary" v-if="totalSavings > 0">
              <ion-icon :icon="sparklesOutline"></ion-icon>
              <span>You're saving ${{ totalSavings.toFixed(2) }} on this order!</span>
            </div>
          </div>
        </div>

        <!-- CHECKOUT BUTTON -->
        <div class="checkout-section">
          <button class="checkout-btn" @click="proceedToCheckout">
            <ion-icon :icon="lockClosedOutline"></ion-icon>
            <span>Proceed to Checkout</span>
            <span class="checkout-total">${{ total.toFixed(2) }}</span>
          </button>
          <p class="secure-text">
            <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
            Secure checkout with 256-bit encryption
          </p>
        </div>

        <!-- RECOMMENDED PRODUCTS -->
        <div class="recommended-section">
          <h3 class="recommended-title">You Might Also Like</h3>
          <div class="recommended-grid">
            <div 
              v-for="product in recommendedProducts" 
              :key="product.id"
              class="recommended-card"
              @click="viewProduct(product.id)">
              <img :src="product.image" :alt="product.name" class="recommended-image" />
              <div class="recommended-info">
                <h4 class="recommended-name">{{ product.name }}</h4>
                <p class="recommended-price">${{ product.price }}</p>
              </div>
              <button class="add-to-cart-btn" @click.stop="addToCart(product)">
                <ion-icon :icon="addOutline"></ion-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- SPACER -->
        <div class="bottom-spacer"></div>
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
} from "@ionic/vue";
import {
  arrowBackOutline,
  trashOutline,
  cafeOutline,
  locationOutline,
  closeOutline,
  removeOutline,
  addOutline,
  pricetagOutline,
  giftOutline,
  lockClosedOutline,
  shieldCheckmarkOutline,
  sparklesOutline,
} from "ionicons/icons";

const router = useRouter();

const cartItems = ref([
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    roast: "Medium",
    grind: "Whole Bean",
    size: "250g",
    price: 18.99,
    quantity: 2,
    discount: 15,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300"
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Colombia",
    roast: "Dark",
    grind: "Ground",
    size: "500g",
    price: 24.99,
    quantity: 1,
    discount: 0,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300"
  },
  {
    id: 3,
    name: "Costa Rica Honey",
    origin: "Costa Rica",
    roast: "Light",
    grind: "Whole Bean",
    size: "250g",
    price: 21.99,
    quantity: 1,
    discount: 20,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300"
  }
]);

const promoCode = ref('');
const appliedPromo = ref(null);

const availablePromos = {
  'COFFEE20': { code: 'COFFEE20', discount: 0.20, description: '20% off your order' },
  'FIRST10': { code: 'FIRST10', discount: 0.10, description: '10% off first order' },
  'FREESHIP': { code: 'FREESHIP', discount: 0, description: 'Free shipping', freeShipping: true }
};

const deliveryOptions = ref([
  { id: 1, name: 'Standard Delivery', time: '5-7 business days', price: 5.99, emoji: '📦' },
  { id: 2, name: 'Express Delivery', time: '2-3 business days', price: 12.99, emoji: '⚡' },
  { id: 3, name: 'Free Delivery', time: '7-10 business days', price: 0, emoji: '🚚' }
]);

const selectedDelivery = ref(1);

const recommendedProducts = ref([
  {
    id: 4,
    name: "Brazilian Santos",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300"
  },
  {
    id: 5,
    name: "Guatemalan Antigua",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300"
  },
  {
    id: 6,
    name: "Kenyan AA",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300"
  }
]);

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + calculateItemTotal(item), 0);
});

const promoDiscount = computed(() => {
  if (!appliedPromo.value || !appliedPromo.value.discount) return 0;
  return subtotal.value * appliedPromo.value.discount;
});

const deliveryFee = computed(() => {
  if (appliedPromo.value?.freeShipping) return 0;
  const selected = deliveryOptions.value.find(d => d.id === selectedDelivery.value);
  return selected ? selected.price : 0;
});

const tax = computed(() => {
  return (subtotal.value - promoDiscount.value) * 0.08;
});

const total = computed(() => {
  return subtotal.value - promoDiscount.value + deliveryFee.value + tax.value;
});

const totalSavings = computed(() => {
  let savings = 0;
  
  // Item discounts
  cartItems.value.forEach(item => {
    if (item.discount) {
      savings += (item.price * item.quantity) - calculateItemTotal(item);
    }
  });
  
  // Promo discount
  savings += promoDiscount.value;
  
  return savings;
});

const calculateItemTotal = (item) => {
  const basePrice = item.price * item.quantity;
  if (item.discount) {
    return basePrice * (1 - item.discount / 100);
  }
  return basePrice;
};

const goBack = () => {
  router.back();
};

const clearCart = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    cartItems.value = [];
  }
};

const browseProducts = () => {
  router.push('/products');
};

const removeItem = (itemId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== itemId);
};

const decreaseQuantity = (itemId) => {
  const item = cartItems.value.find(i => i.id === itemId);
  if (item && item.quantity > 1) {
    item.quantity--;
  }
};

const increaseQuantity = (itemId) => {
  const item = cartItems.value.find(i => i.id === itemId);
  if (item && item.quantity < 10) {
    item.quantity++;
  }
};

const applyPromo = () => {
  const code = promoCode.value.trim().toUpperCase();
  if (availablePromos[code]) {
    appliedPromo.value = availablePromos[code];
    promoCode.value = '';
  } else {
    alert('Invalid promo code');
  }
};

const removePromo = () => {
  appliedPromo.value = null;
};

const selectDelivery = (id) => {
  selectedDelivery.value = id;
};

const proceedToCheckout = () => {
  router.push('/checkout');
};

const viewProduct = (id) => {
  router.push(`/product/${id}`);
};

const addToCart = (product) => {
  console.log('Add to cart:', product);
  // Add product to cart logic
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
  --blue: #2196f3;
  --orange: #ff9800;
  --red: #ef4444;
}

/* ===== HEADER ===== */
.custom-toolbar {
  --background: white;
  --border-width: 0;
  padding: 8px 4px;
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--coffee-dark);
}

/* ===== CONTENT ===== */
.content-bg {
  --background: #f2f2f2;
}

/* ===== EMPTY STATE ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  min-height: 400px;
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
  margin: 0 0 12px 0;
}

.empty-text {
  font-size: 16px;
  color: var(--text-light);
  margin: 0 0 28px 0;
}

.browse-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, var(--coffee-dark) 0%, var(--coffee-medium) 100%);
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.browse-btn:active {
  transform: scale(0.98);
}

.browse-btn ion-icon {
  font-size: 22px;
}

/* ===== CART CONTAINER ===== */
.cart-container {
  padding: 0 0 20px;
}

/* ===== CART ITEMS ===== */
.cart-items-section {
  padding: 16px 16px 24px;
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

.items-count {
  font-size: 14px;
  color: var(--text-light);
  font-weight: 600;
}

.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-item-card {
  background: white;
  border-radius: 16px;
  padding: 14px;
  display: flex;
  gap: 14px;
}

.item-image-wrapper {
  flex-shrink: 0;
}

.item-image {
  width: 90px;
  height: 90px;
  border-radius: 12px;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 4px 0;
}

.item-origin {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-light);
  margin: 0 0 8px 0;
  font-weight: 600;
}

.item-origin ion-icon {
  font-size: 14px;
}

.item-specs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.spec-badge {
  font-size: 10px;
  padding: 4px 8px;
  background: #f0f0f0;
  border-radius: 6px;
  color: var(--coffee-medium);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.remove-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #f8f8f8;
  color: var(--text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.remove-btn:active {
  background: #f0f0f0;
  color: var(--red);
}

.remove-btn ion-icon {
  font-size: 18px;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8f8f8;
  padding: 4px;
  border-radius: 10px;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: white;
  color: var(--coffee-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.qty-btn:active:not(:disabled) {
  background: #f0f0f0;
}

.qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-btn ion-icon {
  font-size: 18px;
}

.qty-display {
  min-width: 28px;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.item-pricing {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.original-price {
  font-size: 12px;
  color: var(--text-light);
  text-decoration: line-through;
}

.item-price {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.savings-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.1), rgba(39, 174, 96, 0.15));
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 11px;
  color: var(--green);
  font-weight: 700;
}

.savings-badge ion-icon {
  font-size: 14px;
}

/* ===== PROMO SECTION ===== */
.promo-section {
  background: white;
  padding: 20px;
  margin: 0 16px 16px;
  border-radius: 16px;
}

.promo-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 14px 0;
}

.promo-title ion-icon {
  font-size: 20px;
  color: var(--orange);
}

.promo-input-wrapper {
  display: flex;
  gap: 10px;
}

.promo-input {
  flex: 1;
  padding: 12px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--coffee-dark);
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.promo-input:focus {
  outline: none;
  border-color: var(--coffee-medium);
}

.apply-btn {
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, var(--coffee-dark) 0%, var(--coffee-medium) 100%);
  color: white;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.apply-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.apply-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.applied-promo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.1), rgba(39, 174, 96, 0.15));
  padding: 14px;
  border-radius: 12px;
}

.promo-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.promo-icon {
  width: 36px;
  height: 36px;
  background: var(--green);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
}

.promo-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.promo-code-text {
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
  font-family: monospace;
}

.promo-desc {
  font-size: 12px;
  color: var(--green);
  font-weight: 600;
}

.remove-promo-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: white;
  color: var(--text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.remove-promo-btn:active {
  background: #f8f8f8;
}

.remove-promo-btn ion-icon {
  font-size: 18px;
}

/* ===== DELIVERY SECTION ===== */
.delivery-section {
  background: white;
  padding: 20px;
  margin: 0 16px 16px;
  border-radius: 16px;
}

.delivery-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 14px 0;
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
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delivery-option:active {
  background: #f8f8f8;
}

.delivery-option.selected {
  border-color: var(--coffee-medium);
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.05), rgba(107, 66, 38, 0.08));
}

.delivery-radio {
  width: 24px;
  height: 24px;
  border: 2px solid #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.delivery-option.selected .delivery-radio {
  border-color: var(--coffee-medium);
  background: var(--coffee-medium);
}

.radio-dot {
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s ease;
}

.delivery-option.selected .radio-dot {
  opacity: 1;
}

.delivery-info {
  flex: 1;
}

.delivery-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.delivery-emoji {
  font-size: 18px;
}

.delivery-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.delivery-time {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 600;
}

.delivery-price {
  font-size: 15px;
  font-weight: 700;
  color: var(--coffee-dark);
  flex-shrink: 0;
}

/* ===== SUMMARY SECTION ===== */
.summary-section {
  background: white;
  padding: 20px;
  margin: 0 16px 16px;
  border-radius: 16px;
}

.summary-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 16px 0;
}

.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.row-label {
  font-size: 14px;
  color: var(--text-dark);
  font-weight: 600;
}

.row-label.promo {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--green);
}

.row-label.promo ion-icon {
  font-size: 16px;
}

.row-value {
  font-size: 15px;
  color: var(--coffee-dark);
  font-weight: 700;
}

.row-value.promo {
  color: var(--green);
}

.summary-divider {
  height: 1px;
  background: #e0e0e0;
  margin: 4px 0;
}

.summary-row.total .row-label {
  font-size: 18px;
  color: var(--coffee-dark);
  font-weight: 700;
}

.summary-row.total .row-value {
  font-size: 24px;
  color: var(--coffee-dark);
}

.savings-summary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.1), rgba(39, 174, 96, 0.15));
  padding: 12px;
  border-radius: 10px;
  font-size: 14px;
  color: var(--green);
  font-weight: 700;
  margin-top: 4px;
}

.savings-summary ion-icon {
  font-size: 18px;
}

/* ===== CHECKOUT ===== */
.checkout-section {
  padding: 0 16px 24px;
}

.checkout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, var(--coffee-dark) 0%, var(--coffee-medium) 100%);
  color: white;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 12px;
}

.checkout-btn:active {
  transform: scale(0.98);
}

.checkout-btn ion-icon {
  font-size: 22px;
}

.checkout-total {
  margin-left: auto;
  font-size: 20px;
}

.secure-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-light);
  margin: 0;
  font-weight: 600;
}

.secure-text ion-icon {
  font-size: 16px;
  color: var(--green);
}

/* ===== RECOMMENDED ===== */
.recommended-section {
  padding: 0 16px 24px;
}

.recommended-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 14px 0;
}

.recommended-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.recommended-card {
  background: white;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.recommended-card:active {
  transform: scale(0.97);
}

.recommended-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

.recommended-info {
  padding: 10px;
}

.recommended-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.recommended-price {
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-medium);
  margin: 0;
}

.add-to-cart-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: white;
  color: var(--coffee-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.add-to-cart-btn:active {
  transform: scale(0.95);
}

.add-to-cart-btn ion-icon {
  font-size: 18px;
}

/* ===== SPACER ===== */
.bottom-spacer {
  height: 30px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 400px) {
  .recommended-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>