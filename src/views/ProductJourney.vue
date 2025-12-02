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
        <ion-title class="page-title">Product Journey</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="verifyProduct">
            <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="content-bg">
      <!-- PRODUCT HEADER -->
      <div class="product-header">
        <div class="product-image-wrapper">
          <img :src="productJourney.productImage" :alt="productJourney.productName" class="product-image" />
          <div class="verified-badge">
            <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
            <span>Verified</span>
          </div>
        </div>
        <h1 class="product-name">{{ productJourney.productName }}</h1>
        <p class="product-batch">Batch #{{ productJourney.batchNumber }}</p>
        <div class="product-meta">
          <div class="meta-chip">
            <ion-icon :icon="calendarOutline"></ion-icon>
            <span>{{ productJourney.harvestDate }}</span>
          </div>
          <div class="meta-chip">
            <ion-icon :icon="cubeOutline"></ion-icon>
            <span>{{ productJourney.weight }}</span>
          </div>
        </div>
      </div>

      <!-- JOURNEY PROGRESS -->
      <div class="progress-section">
        <div class="progress-header">
          <h2 class="progress-title">Journey Progress</h2>
          <span class="progress-percentage">{{ completedPercentage }}%</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" :style="{ width: completedPercentage + '%' }"></div>
        </div>
        <div class="progress-info">
          <span class="progress-text">{{ completedStages }} of {{ totalStages }} stages completed</span>
          <span class="progress-status" :class="currentStageStatus">{{ getCurrentStageLabel }}</span>
        </div>
      </div>

      <!-- JOURNEY MAP -->
      <div class="map-section">
        <h2 class="section-title">Journey Map</h2>
        <div class="map-container">
          <div class="map-placeholder">
            <div class="map-route">
              <div 
                v-for="(location, index) in journeyLocations" 
                :key="index"
                class="map-marker"
                :style="{ left: location.x + '%', top: location.y + '%' }">
                <div :class="['marker-dot', { completed: location.completed }]">
                  <span class="marker-number">{{ index + 1 }}</span>
                </div>
                <div class="marker-label">{{ location.name }}</div>
              </div>
              <svg class="route-line" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline 
                  :points="routePoints"
                  fill="none"
                  stroke="rgba(107, 66, 38, 0.3)"
                  stroke-width="2"
                  stroke-dasharray="5,5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- JOURNEY STAGES -->
      <div class="stages-section">
        <h2 class="section-title">Detailed Journey</h2>
        
        <div class="stages-timeline">
          <div 
            v-for="(stage, index) in productJourney.stages" 
            :key="index"
            :class="['stage-card', stage.status]">
            
            <!-- Stage Number & Icon -->
            <div class="stage-number-wrapper">
              <div class="stage-number">{{ index + 1 }}</div>
              <div v-if="index < productJourney.stages.length - 1" class="stage-connector"></div>
            </div>

            <!-- Stage Content -->
            <div class="stage-content">
              <!-- Header -->
              <div class="stage-header">
                <div class="stage-icon-wrapper" :class="stage.status">
                  <span class="stage-emoji">{{ stage.emoji }}</span>
                </div>
                <div class="stage-title-section">
                  <h3 class="stage-title">{{ stage.title }}</h3>
                  <p class="stage-location">
                    <ion-icon :icon="locationOutline"></ion-icon>
                    {{ stage.location }}
                  </p>
                </div>
                <div :class="['stage-status-badge', stage.status]">
                  <ion-icon 
                    :icon="getStatusIcon(stage.status)" 
                    class="status-icon">
                  </ion-icon>
                </div>
              </div>

              <!-- Description -->
              <p class="stage-description">{{ stage.description }}</p>

              <!-- Details Grid -->
              <div class="stage-details" v-if="stage.details">
                <div 
                  v-for="(detail, key) in stage.details" 
                  :key="key"
                  class="detail-item">
                  <span class="detail-label">{{ key }}</span>
                  <span class="detail-value">{{ detail }}</span>
                </div>
              </div>

              <!-- Timestamps -->
              <div class="stage-timestamps">
                <div v-if="stage.startDate" class="timestamp-item">
                  <ion-icon :icon="playCircleOutline"></ion-icon>
                  <span>Started: {{ stage.startDate }}</span>
                </div>
                <div v-if="stage.endDate" class="timestamp-item">
                  <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
                  <span>Completed: {{ stage.endDate }}</span>
                </div>
              </div>

              <!-- Stage Images -->
              <div v-if="stage.images && stage.images.length > 0" class="stage-images">
                <img 
                  v-for="(image, imgIndex) in stage.images" 
                  :key="imgIndex"
                  :src="image"
                  :alt="stage.title"
                  class="stage-image"
                  @click="viewImage(image)"
                />
              </div>

              <!-- Verified Badge -->
              <div v-if="stage.verified" class="verification-badge">
                <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
                <span>Blockchain Verified</span>
                <button class="view-proof-btn" @click="viewProof(stage)">
                  View Proof
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PARTICIPANTS -->
      <div class="participants-section">
        <h2 class="section-title">Journey Participants</h2>
        <div class="participants-grid">
          <div 
            v-for="participant in productJourney.participants" 
            :key="participant.id"
            class="participant-card">
            <img :src="participant.photo" :alt="participant.name" class="participant-photo" />
            <div class="participant-info">
              <h4 class="participant-name">{{ participant.name }}</h4>
              <p class="participant-role">{{ participant.role }}</p>
              <div class="participant-contribution">
                <ion-icon :icon="checkmarkOutline"></ion-icon>
                <span>{{ participant.contribution }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CERTIFICATIONS & COMPLIANCE -->
      <div class="certifications-section">
        <h2 class="section-title">Certifications & Compliance</h2>
        <div class="cert-grid">
          <div 
            v-for="cert in productJourney.certifications" 
            :key="cert.name"
            class="cert-card">
            <div class="cert-icon-wrapper">
              <span class="cert-emoji">{{ cert.icon }}</span>
            </div>
            <h4 class="cert-name">{{ cert.name }}</h4>
            <p class="cert-issuer">Issued by {{ cert.issuer }}</p>
            <span class="cert-date">{{ cert.date }}</span>
          </div>
        </div>
      </div>

      <!-- ENVIRONMENTAL IMPACT -->
      <div class="impact-section">
        <h2 class="section-title">Environmental Impact</h2>
        <div class="impact-stats">
          <div class="impact-stat">
            <div class="impact-icon">💧</div>
            <div class="impact-content">
              <span class="impact-value">{{ productJourney.impact.waterSaved }}L</span>
              <span class="impact-label">Water Saved</span>
            </div>
          </div>
          <div class="impact-stat">
            <div class="impact-icon">🌱</div>
            <div class="impact-content">
              <span class="impact-value">{{ productJourney.impact.carbonOffset }}kg</span>
              <span class="impact-label">CO₂ Offset</span>
            </div>
          </div>
          <div class="impact-stat">
            <div class="impact-icon">♻️</div>
            <div class="impact-content">
              <span class="impact-value">{{ productJourney.impact.wasteRecycled }}%</span>
              <span class="impact-label">Waste Recycled</span>
            </div>
          </div>
        </div>
      </div>

      <!-- BLOCKCHAIN VERIFICATION -->
      <div class="blockchain-section">
        <div class="blockchain-card">
          <div class="blockchain-icon">
            <ion-icon :icon="linkOutline"></ion-icon>
          </div>
          <div class="blockchain-info">
            <h3 class="blockchain-title">Blockchain Verified</h3>
            <p class="blockchain-desc">This product's journey is permanently recorded on the blockchain</p>
            <div class="blockchain-hash">
              <span class="hash-label">Transaction Hash:</span>
              <code class="hash-code">{{ productJourney.blockchainHash }}</code>
            </div>
          </div>
          <button class="verify-btn" @click="viewOnBlockchain">
            <ion-icon :icon="openOutline"></ion-icon>
            <span>View on Explorer</span>
          </button>
        </div>
      </div>

      <!-- QR CODE -->
      <div class="qr-section">
        <h3 class="qr-title">Share This Journey</h3>
        <div class="qr-code-wrapper">
          <div class="qr-placeholder">
            <div class="qr-grid">
              <div v-for="n in 100" :key="n" class="qr-dot"></div>
            </div>
          </div>
        </div>
        <p class="qr-text">Scan to view this product's complete journey</p>
        <button class="share-btn" @click="shareJourney">
          <ion-icon :icon="shareOutline"></ion-icon>
          <span>Share Journey</span>
        </button>
      </div>

      <!-- SPACER -->
      <div class="bottom-spacer"></div>
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
  shieldCheckmarkOutline,
  checkmarkCircleOutline,
  calendarOutline,
  cubeOutline,
  locationOutline,
  playCircleOutline,
  checkmarkOutline,
  linkOutline,
  openOutline,
  shareOutline,
  timeOutline,
  closeCircleOutline,
} from "ionicons/icons";

const router = useRouter();

const productJourney = ref({
  productName: "Ethiopian Yirgacheffe Premium",
  batchNumber: "ETH-2024-YRG-1847",
  harvestDate: "November 2024",
  weight: "250g",
  productImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400",
  blockchainHash: "0x7a8f9b2c...4e6d1a3f",

  stages: [
    {
      emoji: "🌱",
      title: "Farm Cultivation",
      location: "Gedeo Zone, Ethiopia",
      status: "completed",
      description: "Coffee plants grown at 1,800-2,200m altitude in shade-grown conditions using organic methods. Regular monitoring and care provided by local farmers.",
      startDate: "Jan 2024",
      endDate: "Oct 2024",
      details: {
        "Farm Size": "2.5 hectares",
        "Altitude": "1,950m",
        "Farmer": "Alemayehu Tadesse",
        "Method": "Organic"
      },
      images: [
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300"
      ],
      verified: true
    },
    {
      emoji: "🍒",
      title: "Cherry Harvesting",
      location: "Gedeo Zone, Ethiopia",
      status: "completed",
      description: "Selective hand-picking of ripe red cherries only. Multiple passes through the farm ensure optimal ripeness and quality.",
      startDate: "Nov 15, 2024",
      endDate: "Nov 28, 2024",
      details: {
        "Method": "Hand-picked",
        "Ripeness": "100% red cherry",
        "Workers": "15 pickers",
        "Yield": "850kg cherries"
      },
      images: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300"
      ],
      verified: true
    },
    {
      emoji: "💧",
      title: "Wet Processing",
      location: "Yirgacheffe Washing Station",
      status: "completed",
      description: "Cherries depulped and fermented for 36 hours, then washed with clean mountain spring water. Careful monitoring ensures perfect fermentation.",
      startDate: "Nov 29, 2024",
      endDate: "Dec 1, 2024",
      details: {
        "Process": "Fully washed",
        "Fermentation": "36 hours",
        "Water Source": "Mountain spring",
        "pH Level": "5.8"
      },
      images: [
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300"
      ],
      verified: true
    },
    {
      emoji: "☀️",
      title: "Sun Drying",
      location: "Yirgacheffe Drying Beds",
      status: "completed",
      description: "Parchment coffee spread on raised African beds and turned regularly. Dried slowly to 11% moisture content over 12 days.",
      startDate: "Dec 2, 2024",
      endDate: "Dec 14, 2024",
      details: {
        "Method": "Raised beds",
        "Duration": "12 days",
        "Final Moisture": "11%",
        "Weather": "Optimal"
      },
      images: [],
      verified: true
    },
    {
      emoji: "🔍",
      title: "Quality Control & Grading",
      location: "ECX Facility, Addis Ababa",
      status: "completed",
      description: "Professional cupping and grading by licensed Q-graders. This lot achieved Grade 1 classification—the highest quality.",
      startDate: "Dec 20, 2024",
      endDate: "Dec 22, 2024",
      details: {
        "Grade": "Grade 1",
        "Cup Score": "88 points",
        "Defects": "0 primary",
        "Q-Grader": "Certified"
      },
      verified: true
    },
    {
      emoji: "🚢",
      title: "Export & Transit",
      location: "Port of Djibouti → Global",
      status: "in-progress",
      description: "Green coffee packaged in GrainPro bags and shipped in refrigerated containers to preserve quality during transit.",
      startDate: "Jan 5, 2025",
      endDate: null,
      details: {
        "Container": "Refrigerated",
        "Packaging": "GrainPro",
        "Weight": "60kg",
        "ETA": "Feb 2, 2025"
      },
      verified: true
    },
    {
      emoji: "🔥",
      title: "Roasting",
      location: "Bean Origin Roastery",
      status: "pending",
      description: "Will be roasted to medium profile to highlight floral and citrus notes. Roasted in small batches for maximum freshness.",
      startDate: null,
      endDate: null,
      details: {
        "Profile": "Medium",
        "Batch Size": "5kg",
        "Rest Period": "48 hours"
      },
      verified: false
    },
    {
      emoji: "📦",
      title: "Packaging & Delivery",
      location: "Distribution Center",
      status: "pending",
      description: "Coffee packed in eco-friendly bags with one-way valve. Ready for delivery to your doorstep within 7 days of roasting.",
      startDate: null,
      endDate: null,
      details: {
        "Packaging": "Recyclable",
        "Valve": "One-way",
        "Freshness": "< 7 days"
      },
      verified: false
    }
  ],

  participants: [
    {
      id: 1,
      name: "Alemayehu Tadesse",
      role: "Coffee Farmer",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
      contribution: "Growing & Harvesting"
    },
    {
      id: 2,
      name: "Yirgacheffe Cooperative",
      role: "Processing Station",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
      contribution: "Wet Processing & Drying"
    },
    {
      id: 3,
      name: "Marta Bekele",
      role: "Quality Controller",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      contribution: "Grading & Cupping"
    },
    {
      id: 4,
      name: "Bean Origin",
      role: "Roaster & Distributor",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      contribution: "Roasting & Delivery"
    }
  ],

  certifications: [
    {
      name: "USDA Organic",
      icon: "🌿",
      issuer: "USDA",
      date: "Valid until 2025"
    },
    {
      name: "Fair Trade",
      icon: "🤝",
      issuer: "FLO",
      date: "Valid until 2025"
    },
    {
      name: "Rainforest Alliance",
      icon: "🐸",
      issuer: "RA",
      date: "Valid until 2026"
    },
    {
      name: "Specialty Coffee",
      icon: "⭐",
      issuer: "SCA",
      date: "Grade 1 - 2024"
    }
  ],

  impact: {
    waterSaved: "2,400",
    carbonOffset: "15",
    wasteRecycled: "98"
  }
});

const journeyLocations = ref([
  { name: "Farm", x: 20, y: 30, completed: true },
  { name: "Processing", x: 35, y: 45, completed: true },
  { name: "Drying", x: 50, y: 35, completed: true },
  { name: "Grading", x: 65, y: 50, completed: true },
  { name: "Export", x: 80, y: 40, completed: false }
]);

const routePoints = computed(() => {
  return journeyLocations.value
    .map(loc => `${loc.x},${loc.y}`)
    .join(' ');
});

const totalStages = computed(() => productJourney.value.stages.length);

const completedStages = computed(() => {
  return productJourney.value.stages.filter(s => s.status === 'completed').length;
});

const completedPercentage = computed(() => {
  return Math.round((completedStages.value / totalStages.value) * 100);
});

const getCurrentStageLabel = computed(() => {
  const inProgress = productJourney.value.stages.find(s => s.status === 'in-progress');
  return inProgress ? inProgress.title : 'All stages completed';
});

const currentStageStatus = computed(() => {
  const inProgress = productJourney.value.stages.find(s => s.status === 'in-progress');
  return inProgress ? 'in-progress' : 'completed';
});

const getStatusIcon = (status) => {
  if (status === 'completed') return checkmarkCircleOutline;
  if (status === 'in-progress') return timeOutline;
  return closeCircleOutline;
};

const goBack = () => {
  router.back();
};

const verifyProduct = () => {
  console.log('Verify product authenticity');
};

const viewImage = (image) => {
  console.log('View image:', image);
};

const viewProof = (stage) => {
  console.log('View blockchain proof for stage:', stage.title);
};

const viewOnBlockchain = () => {
  console.log('View on blockchain explorer');
};

const shareJourney = () => {
  console.log('Share journey');
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

/* ===== PRODUCT HEADER ===== */
.product-header {
  background: white;
  padding: 24px 20px;
  text-align: center;
  margin-bottom: 16px;
}

.product-image-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 16px;
}

.product-image {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
}

.verified-badge {
  position: absolute;
  bottom: -8px;
  right: -8px;
  background: var(--green);
  color: white;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  border: 3px solid white;
}

.verified-badge ion-icon {
  font-size: 14px;
}

.product-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 6px 0;
}

.product-batch {
  font-size: 13px;
  color: var(--text-light);
  font-weight: 600;
  margin: 0 0 16px 0;
  font-family: monospace;
}

.product-meta {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.meta-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f8f8f8;
  padding: 8px 14px;
  border-radius: 12px;
  font-size: 13px;
  color: var(--coffee-medium);
  font-weight: 700;
}

.meta-chip ion-icon {
  font-size: 16px;
}

/* ===== PROGRESS SECTION ===== */
.progress-section {
  background: white;
  padding: 20px;
  margin: 0 16px 16px;
  border-radius: 16px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.progress-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0;
}

.progress-percentage {
  font-size: 20px;
  font-weight: 700;
  color: var(--green);
}

.progress-bar-container {
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--green) 0%, #34d058 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-text {
  font-size: 13px;
  color: var(--text-light);
  font-weight: 600;
}

.progress-status {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 10px;
}

.progress-status.completed {
  background: rgba(39, 174, 96, 0.15);
  color: var(--green);
}

.progress-status.in-progress {
  background: rgba(255, 152, 0, 0.15);
  color: var(--orange);
}

/* ===== MAP SECTION ===== */
.map-section {
  padding: 0 16px 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 14px 0;
}

.map-container {
  background: white;
  border-radius: 16px;
  overflow: hidden;
}

.map-placeholder {
  position: relative;
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #f8f8f8 0%, #f0f0f0 100%);
}

.map-route {
  position: relative;
  width: 100%;
  height: 100%;
}

.route-line {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.map-marker {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.marker-dot {
  width: 32px;
  height: 32px;
  background: white;
  border: 3px solid #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-light);
}

.marker-dot.completed {
  border-color: var(--green);
  background: var(--green);
  color: white;
}

.marker-number {
  font-size: 12px;
}

.marker-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--coffee-dark);
  background: white;
  padding: 4px 8px;
  border-radius: 8px;
  white-space: nowrap;
}

/* ===== STAGES TIMELINE ===== */
.stages-section {
  padding: 0 16px 24px;
}

.stages-timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stage-card {
  background: white;
  border-radius: 18px;
  padding: 20px;
  display: flex;
  gap: 16px;
  position: relative;
}

.stage-number-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.stage-number {
  width: 36px;
  height: 36px;
  background: #f8f8f8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.stage-card.completed .stage-number {
  background: var(--green);
  color: white;
}

.stage-card.in-progress .stage-number {
  background: var(--orange);
  color: white;
}

.stage-connector {
  width: 2px;
  flex: 1;
  background: #e0e0e0;
  margin: 8px 0;
}

.stage-card.completed .stage-connector {
  background: var(--green);
}

.stage-content {
  flex: 1;
}

.stage-header {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.stage-icon-wrapper {
  width: 48px;
  height: 48px;
  background: #f8f8f8;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stage-card.completed .stage-icon-wrapper {
  background: rgba(39, 174, 96, 0.15);
}

.stage-card.in-progress .stage-icon-wrapper {
  background: rgba(255, 152, 0, 0.15);
}

.stage-emoji {
  font-size: 24px;
}

.stage-title-section {
  flex: 1;
}

.stage-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 4px 0;
}

.stage-location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-light);
  margin: 0;
  font-weight: 600;
}

.stage-location ion-icon {
  font-size: 14px;
}

.stage-status-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stage-status-badge.completed {
  background: rgba(39, 174, 96, 0.15);
  color: var(--green);
}

.stage-status-badge.in-progress {
  background: rgba(255, 152, 0, 0.15);
  color: var(--orange);
}

.stage-status-badge.pending {
  background: #f0f0f0;
  color: var(--text-light);
}

.status-icon {
  font-size: 18px;
}

.stage-description {
  font-size: 14px;
  color: var(--text-dark);
  line-height: 1.6;
  margin: 0 0 14px 0;
}

.stage-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 14px;
}

.detail-item {
  background: #f8f8f8;
  padding: 10px 12px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-size: 11px;
  color: var(--text-light);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 13px;
  color: var(--coffee-dark);
  font-weight: 700;
}

.stage-timestamps {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.timestamp-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-light);
  font-weight: 600;
}

.timestamp-item ion-icon {
  font-size: 16px;
}

.stage-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 14px;
}

.stage-image {
  width: 100%;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s ease;
}

.stage-image:active {
  transform: scale(0.97);
}

.verification-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.1), rgba(39, 174, 96, 0.15));
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 13px;
  color: var(--green);
  font-weight: 700;
}

.verification-badge ion-icon {
  font-size: 20px;
}

.view-proof-btn {
  margin-left: auto;
  padding: 6px 12px;
  border-radius: 8px;
  border: 2px solid var(--green);
  background: white;
  color: var(--green);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-proof-btn:active {
  background: rgba(39, 174, 96, 0.1);
}

/* ===== PARTICIPANTS ===== */
.participants-section {
  padding: 0 16px 24px;
}

.participants-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.participant-card {
  background: white;
  padding: 16px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
}

.participant-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.participant-info {
  width: 100%;
}

.participant-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 4px 0;
}

.participant-role {
  font-size: 12px;
  color: var(--text-light);
  margin: 0 0 8px 0;
  font-weight: 600;
}

.participant-contribution {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: #f8f8f8;
  padding: 6px 10px;
  border-radius: 10px;
  font-size: 11px;
  color: var(--coffee-medium);
  font-weight: 700;
}

.participant-contribution ion-icon {
  font-size: 14px;
  color: var(--green);
}

/* ===== CERTIFICATIONS ===== */
.certifications-section {
  padding: 0 16px 24px;
}

.cert-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.cert-card {
  background: white;
  padding: 16px;
  border-radius: 16px;
  text-align: center;
}

.cert-icon-wrapper {
  width: 56px;
  height: 56px;
  background: #f8f8f8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}

.cert-emoji {
  font-size: 28px;
}

.cert-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 4px 0;
}

.cert-issuer {
  font-size: 12px;
  color: var(--text-light);
  margin: 0 0 6px 0;
  font-weight: 600;
}

.cert-date {
  font-size: 11px;
  color: var(--text-light);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ===== IMPACT ===== */
.impact-section {
  background: white;
  padding: 24px 20px;
  margin: 0 16px 16px;
  border-radius: 16px;
}

.impact-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.impact-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}

.impact-icon {
  font-size: 40px;
}

.impact-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.impact-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.impact-label {
  font-size: 11px;
  color: var(--text-light);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ===== BLOCKCHAIN ===== */
.blockchain-section {
  padding: 0 16px 24px;
}

.blockchain-card {
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.05), rgba(107, 66, 38, 0.1));
  padding: 20px;
  border-radius: 16px;
}

.blockchain-icon {
  width: 56px;
  height: 56px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.blockchain-icon ion-icon {
  font-size: 28px;
  color: var(--coffee-medium);
}

.blockchain-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 8px 0;
}

.blockchain-desc {
  font-size: 14px;
  color: var(--text-dark);
  margin: 0 0 14px 0;
  line-height: 1.5;
}

.blockchain-hash {
  background: white;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 16px;
}

.hash-label {
  display: block;
  font-size: 11px;
  color: var(--text-light);
  font-weight: 600;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hash-code {
  display: block;
  font-size: 12px;
  color: var(--coffee-dark);
  font-weight: 700;
  font-family: monospace;
  word-break: break-all;
}

.verify-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px;
  border-radius: 12px;
  border: 2px solid var(--coffee-medium);
  background: white;
  color: var(--coffee-medium);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.verify-btn:active {
  background: rgba(107, 66, 38, 0.1);
}

.verify-btn ion-icon {
  font-size: 20px;
}

/* ===== QR CODE ===== */
.qr-section {
  background: white;
  padding: 24px 20px;
  margin: 0 16px 16px;
  border-radius: 16px;
  text-align: center;
}

.qr-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 16px 0;
}

.qr-code-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 14px;
}

.qr-placeholder {
  width: 160px;
  height: 160px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 12px;
}

.qr-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 2px;
  height: 100%;
}

.qr-dot {
  background: var(--coffee-dark);
  border-radius: 1px;
}

.qr-dot:nth-child(3n) {
  opacity: 0.3;
}

.qr-text {
  font-size: 13px;
  color: var(--text-light);
  margin: 0 0 16px 0;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: 12px;
  border: 2px solid var(--coffee-medium);
  background: white;
  color: var(--coffee-medium);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-btn:active {
  background: rgba(107, 66, 38, 0.1);
}

.share-btn ion-icon {
  font-size: 20px;
}

/* ===== SPACER ===== */
.bottom-spacer {
  height: 30px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 400px) {
  .stage-details {
    grid-template-columns: 1fr;
  }

  .participants-grid,
  .cert-grid {
    grid-template-columns: 1fr;
  }

  .impact-stats {
    grid-template-columns: 1fr;
  }
}
</style>