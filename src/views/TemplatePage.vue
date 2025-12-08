<template>
<div class="orders-page">

<!-- Page Header -->
<div class="page-header">
  <h1 class="page-title">Your Orders</h1>
  <p class="page-subtitle">Order history at Bean Origin Roastery</p>
</div>

<!-- Orders List -->
<div class="orders-list">
  <div 
    v-for="order in orders" 
    :key="order.id"
    class="order-card"
    @click="viewOrderDetails(order.id)"
  >
    
    <!-- Order Header -->
    <div class="order-header">
      <div class="order-info">
        <span class="order-number">Order #{{ order.id }}</span>
        <span class="order-date">{{ order.date }}</span>
      </div>
      <div class="order-status" :class="getStatusClass(order.status)">
        <span class="status-dot"></span>
        {{ order.status }}
      </div>
    </div>

    <!-- Order Items -->
    <div class="order-items">
      <div 
        v-for="item in order.items" 
        :key="item.id"
        class="order-item"
      >
        <img :src="item.image" :alt="item.name" class="item-image" />
        
        <div class="item-details">
          <h3 class="item-name">{{ item.name }}</h3>
          <p class="item-quantity">Qty: {{ item.quantity }}</p>
        </div>

        <div class="item-price">
          Shs. {{ formatPrice(item.price * item.quantity) }}
        </div>
      </div>
    </div>

    <!-- Order Footer -->
    <div class="order-footer">
      <div class="order-total">
        <span class="total-label">Total</span>
        <span class="total-amount">Shs. {{ formatPrice(order.total) }}</span>
      </div>
      <button 
        class="reorder-button" 
        @click.stop="reorderItems(order)"
      >
        <ion-icon :icon="refreshOutline"></ion-icon>
        <span>Re-order</span>
      </button>
    </div>

  </div>
</div>

<!-- Empty State -->
<div v-if="orders.length === 0" class="empty-state">
  <div class="empty-icon">
    <ion-icon :icon="receiptOutline"></ion-icon>
  </div>
  <h3 class="empty-title">No Orders Yet</h3>
  <p class="empty-text">You haven't made any orders at this coffee shop</p>
  <button class="browse-menu-button" @click="goToMenu">
    Browse Menu
  </button>
</div>

</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/vue';
import {
  arrowBack,
  refreshOutline,
  receiptOutline,
} from 'ionicons/icons';

const router = useRouter();

// Sample orders data
const orders = ref([
  {
    id: '1001',
    date: 'Dec 8, 2024 • 10:30 AM',
    status: 'Completed',
    total: 45000,
    items: [
      {
        id: 1,
        name: 'Cappuccino',
        quantity: 2,
        price: 15000,
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80'
      },
      {
        id: 2,
        name: 'Croissant',
        quantity: 1,
        price: 12500,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80'
      }
    ]
  },
  {
    id: '1002',
    date: 'Dec 7, 2024 • 2:15 PM',
    status: 'Completed',
    total: 32000,
    items: [
      {
        id: 3,
        name: 'Cold Brew',
        quantity: 2,
        price: 16000,
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&q=80'
      }
    ]
  },
  {
    id: '1003',
    date: 'Dec 6, 2024 • 9:00 AM',
    status: 'In Progress',
    total: 55000,
    items: [
      {
        id: 4,
        name: 'Espresso',
        quantity: 3,
        price: 12500,
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80'
      },
      {
        id: 5,
        name: 'Latte',
        quantity: 1,
        price: 18000,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80'
      }
    ]
  },
  {
    id: '1004',
    date: 'Dec 5, 2024 • 4:45 PM',
    status: 'Cancelled',
    total: 28000,
    items: [
      {
        id: 6,
        name: 'Americano',
        quantity: 2,
        price: 14000,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80'
      }
    ]
  }
]);

// Methods
const formatPrice = (price) => {
  return price.toLocaleString();
};

const getStatusClass = (status) => {
  return status.toLowerCase().replace(' ', '-');
};

const viewOrderDetails = (orderId) => {
  console.log('View order:', orderId);
  // Navigate to order details
};

const reorderItems = (order) => {
  console.log('Re-order:', order.id);
  alert(`Re-ordering items from Order #${order.id}`);
  // Add items to cart and navigate to checkout
};

const goBack = () => {
  router.back();
};

const goToMenu = () => {
  router.push('/menu');
};
</script>

<style scoped>
/* ===== BASE ===== */
.orders-page {
  min-height: 100vh;
  background: #faf8f5;
  padding: 20px;
  padding-bottom: 40px;
}

/* ===== PAGE HEADER ===== */
.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.page-subtitle {
  font-size: 15px;
  font-weight: 600;
  color: #8a8a8a;
  margin: 0;
}

/* ===== ORDERS LIST ===== */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ===== ORDER CARD ===== */
.order-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
}

.order-card:active {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* ===== ORDER HEADER ===== */
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
  border-bottom: 1px solid #f5f3f0;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-number {
  font-size: 16px;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: -0.2px;
}

.order-date {
  font-size: 13px;
  font-weight: 600;
  color: #8a8a8a;
}

/* ===== ORDER STATUS ===== */
.order-status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 800;
  text-transform: capitalize;
  letter-spacing: 0.3px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.order-status.completed {
  background: #d1fae5;
  color: #065f46;
}

.order-status.in-progress {
  background: #fef3c7;
  color: #92400e;
}

.order-status.cancelled {
  background: #fee2e2;
  color: #991b1b;
}

/* ===== ORDER ITEMS ===== */
.order-items {
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 14px;
}

.item-image {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.item-name {
  font-size: 15px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-quantity {
  font-size: 13px;
  font-weight: 600;
  color: #8a8a8a;
  margin: 0;
}

.item-price {
  font-size: 15px;
  font-weight: 800;
  color: #6b4423;
  flex-shrink: 0;
  letter-spacing: -0.2px;
}

/* ===== ORDER FOOTER ===== */
.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
  border-top: 1px solid #f5f3f0;
  background: #faf8f5;
}

.order-total {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.total-label {
  font-size: 12px;
  font-weight: 700;
  color: #8a8a8a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.total-amount {
  font-size: 20px;
  font-weight: 900;
  color: #6b4423;
  letter-spacing: -0.4px;
}

/* ===== RE-ORDER BUTTON ===== */
.reorder-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 18px;
  background: linear-gradient(135deg, #6b4423, #4a2f18);
  border: none;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 800;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(107, 68, 35, 0.3);
}

.reorder-button:active {
  transform: scale(0.96);
}

.reorder-button ion-icon {
  font-size: 18px;
}

/* ===== EMPTY STATE ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}

.empty-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6b4423, #4a2f18);
  border-radius: 50%;
  margin-bottom: 24px;
}

.empty-icon ion-icon {
  font-size: 40px;
  color: white;
}

.empty-title {
  font-size: 22px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  letter-spacing: -0.4px;
}

.empty-text {
  font-size: 15px;
  font-weight: 600;
  color: #8a8a8a;
  margin: 0 0 32px 0;
  line-height: 1.5;
}

.browse-menu-button {
  padding: 14px 32px;
  background: linear-gradient(135deg, #6b4423, #4a2f18);
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 800;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(107, 68, 35, 0.3);
}

.browse-menu-button:active {
  transform: scale(0.96);
}

/* ===== RESPONSIVE ===== */
@media (min-width: 768px) {
  .orders-page {
    max-width: 700px;
    margin: 0 auto;
  }

  .page-title {
    font-size: 32px;
  }

  .order-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }

  .reorder-button:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 16px rgba(107, 68, 35, 0.4);
  }

  .browse-menu-button:hover {
    transform: scale(1.02);
  }
}
</style>