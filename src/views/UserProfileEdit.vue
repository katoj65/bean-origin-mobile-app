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
        <ion-title class="page-title">Edit Profile</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="saveProfile" :disabled="!hasChanges || isSaving">
            <span class="save-text">{{ isSaving ? 'Saving...' : 'Save' }}</span>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="content-bg">
      <!-- PROFILE PICTURE SECTION -->
      <div class="profile-picture-section">
        <div class="picture-wrapper">
          <div class="picture-container">
            <img v-if="formData.avatar" :src="formData.avatar" alt="Profile" class="profile-pic" />
            <div v-else class="profile-placeholder">
              <ion-icon :icon="personOutline" class="placeholder-icon"></ion-icon>
            </div>
            <button class="edit-picture-btn" @click="changePicture">
              <ion-icon :icon="cameraOutline"></ion-icon>
            </button>
          </div>
          <div class="picture-actions">
            <button class="action-btn primary" @click="uploadPhoto">
              <ion-icon :icon="cloudUploadOutline"></ion-icon>
              <span>Upload Photo</span>
            </button>
            <button v-if="formData.avatar" class="action-btn secondary" @click="removePicture">
              <ion-icon :icon="trashOutline"></ion-icon>
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>

      <!-- FORM SECTIONS -->
      <div class="form-container">
        
        <!-- PERSONAL INFORMATION -->
        <div class="form-section">
          <div class="section-header">
            <div class="section-icon personal">
              <ion-icon :icon="personOutline"></ion-icon>
            </div>
            <h2 class="section-title">Personal Information</h2>
          </div>

          <div class="form-fields">
            <div class="field-group">
              <label class="field-label">
                Full Name <span class="required">*</span>
              </label>
              <div class="input-wrapper">
                <ion-icon :icon="personOutline" class="input-icon"></ion-icon>
                <input 
                  v-model="formData.fullName"
                  type="text"
                  placeholder="Enter your full name"
                  class="form-input"
                  :class="{ error: errors.fullName }"
                  @input="validateField('fullName')"
                />
              </div>
              <span v-if="errors.fullName" class="error-message">{{ errors.fullName }}</span>
            </div>

            <div class="field-row">
              <div class="field-group">
                <label class="field-label">Date of Birth</label>
                <div class="input-wrapper">
                  <ion-icon :icon="calendarOutline" class="input-icon"></ion-icon>
                  <input 
                    v-model="formData.dateOfBirth"
                    type="date"
                    class="form-input"
                  />
                </div>
              </div>

              <div class="field-group">
                <label class="field-label">Gender</label>
                <div class="input-wrapper">
                  <ion-icon :icon="personOutline" class="input-icon"></ion-icon>
                  <select v-model="formData.gender" class="form-select">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                  <ion-icon :icon="chevronDownOutline" class="select-arrow"></ion-icon>
                </div>
              </div>
            </div>

            <div class="field-group">
              <label class="field-label">Bio</label>
              <div class="input-wrapper textarea">
                <textarea 
                  v-model="formData.bio"
                  placeholder="Tell us about yourself..."
                  class="form-textarea"
                  rows="3"
                  maxlength="200"
                ></textarea>
                <span class="char-count">{{ formData.bio.length }}/200</span>
              </div>
            </div>
          </div>
        </div>

        <!-- CONTACT INFORMATION -->
        <div class="form-section">
          <div class="section-header">
            <div class="section-icon contact">
              <ion-icon :icon="mailOutline"></ion-icon>
            </div>
            <h2 class="section-title">Contact Information</h2>
          </div>

          <div class="form-fields">
            <div class="field-group">
              <label class="field-label">
                Email Address <span class="required">*</span>
              </label>
              <div class="input-wrapper">
                <ion-icon :icon="mailOutline" class="input-icon"></ion-icon>
                <input 
                  v-model="formData.email"
                  type="email"
                  placeholder="your.email@example.com"
                  class="form-input"
                  :class="{ error: errors.email }"
                  @input="validateField('email')"
                />
              </div>
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>

            <div class="field-group">
              <label class="field-label">
                Phone Number <span class="required">*</span>
              </label>
              <div class="input-wrapper">
                <ion-icon :icon="callOutline" class="input-icon"></ion-icon>
                <input 
                  v-model="formData.phone"
                  type="tel"
                  placeholder="+256 700 000 000"
                  class="form-input"
                  :class="{ error: errors.phone }"
                  @input="validateField('phone')"
                />
              </div>
              <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
            </div>

            <div class="field-group">
              <label class="field-label">Website / Social Media</label>
              <div class="input-wrapper">
                <ion-icon :icon="globeOutline" class="input-icon"></ion-icon>
                <input 
                  v-model="formData.website"
                  type="url"
                  placeholder="https://example.com"
                  class="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- ADDRESS INFORMATION -->
        <div class="form-section">
          <div class="section-header">
            <div class="section-icon address">
              <ion-icon :icon="locationOutline"></ion-icon>
            </div>
            <h2 class="section-title">Address</h2>
          </div>

          <div class="form-fields">
            <div class="field-group">
              <label class="field-label">
                Street Address <span class="required">*</span>
              </label>
              <div class="input-wrapper">
                <ion-icon :icon="homeOutline" class="input-icon"></ion-icon>
                <input 
                  v-model="formData.address"
                  type="text"
                  placeholder="123 Coffee Street"
                  class="form-input"
                  :class="{ error: errors.address }"
                  @input="validateField('address')"
                />
              </div>
              <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
            </div>

            <div class="field-group">
              <label class="field-label">Apartment, Suite, etc.</label>
              <div class="input-wrapper">
                <ion-icon :icon="homeOutline" class="input-icon"></ion-icon>
                <input 
                  v-model="formData.apartment"
                  type="text"
                  placeholder="Apt 4B"
                  class="form-input"
                />
              </div>
            </div>

            <div class="field-row">
              <div class="field-group">
                <label class="field-label">
                  City <span class="required">*</span>
                </label>
                <div class="input-wrapper">
                  <ion-icon :icon="businessOutline" class="input-icon"></ion-icon>
                  <input 
                    v-model="formData.city"
                    type="text"
                    placeholder="Kampala"
                    class="form-input"
                    :class="{ error: errors.city }"
                    @input="validateField('city')"
                  />
                </div>
                <span v-if="errors.city" class="error-message">{{ errors.city }}</span>
              </div>

              <div class="field-group">
                <label class="field-label">Postal Code</label>
                <div class="input-wrapper">
                  <ion-icon :icon="mailOutline" class="input-icon"></ion-icon>
                  <input 
                    v-model="formData.postalCode"
                    type="text"
                    placeholder="00000"
                    class="form-input"
                  />
                </div>
              </div>
            </div>

            <div class="field-row">
              <div class="field-group">
                <label class="field-label">State / Province</label>
                <div class="input-wrapper">
                  <ion-icon :icon="locationOutline" class="input-icon"></ion-icon>
                  <input 
                    v-model="formData.state"
                    type="text"
                    placeholder="Central Region"
                    class="form-input"
                  />
                </div>
              </div>

              <div class="field-group">
                <label class="field-label">
                  Country <span class="required">*</span>
                </label>
                <div class="input-wrapper">
                  <ion-icon :icon="globeOutline" class="input-icon"></ion-icon>
                  <select 
                    v-model="formData.country" 
                    class="form-select"
                    :class="{ error: errors.country }"
                    @change="validateField('country')">
                    <option value="">Select Country</option>
                    <option value="uganda">Uganda</option>
                    <option value="kenya">Kenya</option>
                    <option value="rwanda">Rwanda</option>
                    <option value="tanzania">Tanzania</option>
                    <option value="ethiopia">Ethiopia</option>
                    <option value="burundi">Burundi</option>
                  </select>
                  <ion-icon :icon="chevronDownOutline" class="select-arrow"></ion-icon>
                </div>
                <span v-if="errors.country" class="error-message">{{ errors.country }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- COFFEE PREFERENCES -->
        <div class="form-section">
          <div class="section-header">
            <div class="section-icon preferences">
              <ion-icon :icon="cafeOutline"></ion-icon>
            </div>
            <h2 class="section-title">Coffee Preferences</h2>
          </div>

          <div class="form-fields">
            <div class="field-group">
              <label class="field-label">Favorite Coffee Type</label>
              <div class="preference-chips">
                <button 
                  v-for="type in coffeeTypes" 
                  :key="type.value"
                  :class="['preference-chip', { active: formData.coffeeType === type.value }]"
                  @click="formData.coffeeType = type.value">
                  <span class="chip-emoji">{{ type.emoji }}</span>
                  <span class="chip-label">{{ type.label }}</span>
                </button>
              </div>
            </div>

            <div class="field-group">
              <label class="field-label">Preferred Roast Level</label>
              <div class="roast-selector">
                <button 
                  v-for="roast in roastLevels" 
                  :key="roast.value"
                  :class="['roast-option', { active: formData.roastLevel === roast.value }]"
                  @click="formData.roastLevel = roast.value">
                  <span class="roast-emoji">{{ roast.emoji }}</span>
                  <span class="roast-label">{{ roast.label }}</span>
                </button>
              </div>
            </div>

            <div class="field-group">
              <label class="field-label">Brewing Methods</label>
              <div class="checkbox-group">
                <label 
                  v-for="method in brewingMethods" 
                  :key="method.value"
                  class="checkbox-item">
                  <input 
                    type="checkbox" 
                    :value="method.value"
                    v-model="formData.brewingMethods"
                    class="checkbox-input"
                  />
                  <div class="checkbox-custom"></div>
                  <span class="checkbox-label">{{ method.label }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- NOTIFICATION PREFERENCES -->
        <div class="form-section">
          <div class="section-header">
            <div class="section-icon notifications">
              <ion-icon :icon="notificationsOutline"></ion-icon>
            </div>
            <h2 class="section-title">Notifications</h2>
          </div>

          <div class="form-fields">
            <div class="toggle-group">
              <div class="toggle-item">
                <div class="toggle-info">
                  <div class="toggle-icon email">
                    <ion-icon :icon="mailOutline"></ion-icon>
                  </div>
                  <div class="toggle-text">
                    <h4 class="toggle-label">Email Notifications</h4>
                    <p class="toggle-desc">Receive order updates and special offers</p>
                  </div>
                </div>
                <div class="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="email-notif"
                    v-model="formData.emailNotifications"
                    class="toggle-input"
                  />
                  <label for="email-notif" class="toggle-track"></label>
                </div>
              </div>

              <div class="toggle-item">
                <div class="toggle-info">
                  <div class="toggle-icon push">
                    <ion-icon :icon="notificationsOutline"></ion-icon>
                  </div>
                  <div class="toggle-text">
                    <h4 class="toggle-label">Push Notifications</h4>
                    <p class="toggle-desc">Get real-time updates on your device</p>
                  </div>
                </div>
                <div class="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="push-notif"
                    v-model="formData.pushNotifications"
                    class="toggle-input"
                  />
                  <label for="push-notif" class="toggle-track"></label>
                </div>
              </div>

              <div class="toggle-item">
                <div class="toggle-info">
                  <div class="toggle-icon sms">
                    <ion-icon :icon="chatbubbleOutline"></ion-icon>
                  </div>
                  <div class="toggle-text">
                    <h4 class="toggle-label">SMS Notifications</h4>
                    <p class="toggle-desc">Receive text messages for important updates</p>
                  </div>
                </div>
                <div class="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="sms-notif"
                    v-model="formData.smsNotifications"
                    class="toggle-input"
                  />
                  <label for="sms-notif" class="toggle-track"></label>
                </div>
              </div>

              <div class="toggle-item">
                <div class="toggle-info">
                  <div class="toggle-icon marketing">
                    <ion-icon :icon="megaphoneOutline"></ion-icon>
                  </div>
                  <div class="toggle-text">
                    <h4 class="toggle-label">Marketing Communications</h4>
                    <p class="toggle-desc">New products, promotions, and coffee tips</p>
                  </div>
                </div>
                <div class="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="marketing-notif"
                    v-model="formData.marketingCommunications"
                    class="toggle-input"
                  />
                  <label for="marketing-notif" class="toggle-track"></label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SAVE BUTTON -->
        <div class="save-section">
          <button 
            class="save-button"
            @click="saveProfile"
            :disabled="!hasChanges || isSaving || !isValid">
            <ion-icon v-if="!isSaving" :icon="checkmarkCircleOutline"></ion-icon>
            <div v-else class="spinner"></div>
            <span>{{ isSaving ? 'Saving Changes...' : 'Save Changes' }}</span>
          </button>
          <p class="required-note">* Required fields</p>
        </div>

        <!-- SPACER -->
        <div class="bottom-spacer"></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
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
  personOutline,
  cameraOutline,
  cloudUploadOutline,
  trashOutline,
  calendarOutline,
  chevronDownOutline,
  mailOutline,
  callOutline,
  globeOutline,
  locationOutline,
  homeOutline,
  businessOutline,
  cafeOutline,
  notificationsOutline,
  chatbubbleOutline,
  megaphoneOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";

const router = useRouter();

const isSaving = ref(false);
const hasChanges = ref(false);

const formData = ref({
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  fullName: 'Joshua Martinez',
  dateOfBirth: '1995-03-15',
  gender: 'male',
  bio: 'Coffee enthusiast and sustainable living advocate.',
  email: 'joshua.martinez@email.com',
  phone: '+256 700 123 456',
  website: 'https://joshuamartinez.com',
  address: '123 Coffee Street',
  apartment: 'Apt 4B',
  city: 'Kampala',
  postalCode: '00000',
  state: 'Central Region',
  country: 'uganda',
  coffeeType: 'espresso',
  roastLevel: 'medium',
  brewingMethods: ['espresso', 'pour-over'],
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  marketingCommunications: true
});

const originalData = ref(JSON.parse(JSON.stringify(formData.value)));

const errors = ref({
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: ''
});

const coffeeTypes = [
  { value: 'espresso', label: 'Espresso', emoji: '☕' },
  { value: 'latte', label: 'Latte', emoji: '🥛' },
  { value: 'cappuccino', label: 'Cappuccino', emoji: '🍵' },
  { value: 'americano', label: 'Americano', emoji: '🥤' },
  { value: 'cold-brew', label: 'Cold Brew', emoji: '🧊' }
];

const roastLevels = [
  { value: 'light', label: 'Light', emoji: '🌤️' },
  { value: 'medium', label: 'Medium', emoji: '☀️' },
  { value: 'dark', label: 'Dark', emoji: '🌙' }
];

const brewingMethods = [
  { value: 'espresso', label: 'Espresso Machine' },
  { value: 'french-press', label: 'French Press' },
  { value: 'pour-over', label: 'Pour Over' },
  { value: 'drip', label: 'Drip Coffee Maker' },
  { value: 'cold-brew', label: 'Cold Brew' },
  { value: 'aeropress', label: 'AeroPress' }
];

watch(formData, () => {
  hasChanges.value = JSON.stringify(formData.value) !== JSON.stringify(originalData.value);
}, { deep: true });

const isValid = computed(() => {
  return !errors.value.fullName &&
         !errors.value.email &&
         !errors.value.phone &&
         !errors.value.address &&
         !errors.value.city &&
         !errors.value.country &&
         formData.value.fullName &&
         formData.value.email &&
         formData.value.phone &&
         formData.value.address &&
         formData.value.city &&
         formData.value.country;
});

const validateField = (field) => {
  switch (field) {
    case 'fullName':
      errors.value.fullName = formData.value.fullName.trim() ? '' : 'Full name is required';
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.value.email.trim()) {
        errors.value.email = 'Email is required';
      } else if (!emailRegex.test(formData.value.email)) {
        errors.value.email = 'Please enter a valid email';
      } else {
        errors.value.email = '';
      }
      break;
    case 'phone':
      errors.value.phone = formData.value.phone.trim() ? '' : 'Phone number is required';
      break;
    case 'address':
      errors.value.address = formData.value.address.trim() ? '' : 'Address is required';
      break;
    case 'city':
      errors.value.city = formData.value.city.trim() ? '' : 'City is required';
      break;
    case 'country':
      errors.value.country = formData.value.country ? '' : 'Please select a country';
      break;
  }
};

const goBack = () => {
  if (hasChanges.value) {
    if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
      router.back();
    }
  } else {
    router.back();
  }
};

const changePicture = () => {
  console.log('Change picture');
  uploadPhoto();
};

const uploadPhoto = () => {
  console.log('Upload photo');
  // In real app, open file picker
};

const removePicture = () => {
  if (confirm('Remove your profile picture?')) {
    formData.value.avatar = '';
  }
};

const saveProfile = async () => {
  // Validate all required fields
  validateField('fullName');
  validateField('email');
  validateField('phone');
  validateField('address');
  validateField('city');
  validateField('country');

  if (!isValid.value) {
    alert('Please fill in all required fields correctly');
    return;
  }

  isSaving.value = true;

  // Simulate API call
  setTimeout(() => {
    console.log('Profile saved:', formData.value);
    originalData.value = JSON.parse(JSON.stringify(formData.value));
    hasChanges.value = false;
    isSaving.value = false;
    
    // Show success message or navigate
    alert('Profile updated successfully!');
  }, 2000);
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
  --purple: #9c27b0;
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

.save-text {
  font-size: 15px;
  font-weight: 700;
  color: var(--coffee-medium);
}

/* ===== CONTENT ===== */
.content-bg {
  --background: #f5f5f5;
}

/* ===== PROFILE PICTURE ===== */
.profile-picture-section {
  background: white;
  padding: 32px 20px;
  margin-bottom: 16px;
}

.picture-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.picture-container {
  position: relative;
  width: 120px;
  height: 120px;
}

.profile-pic,
.profile-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.profile-placeholder {
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.15), rgba(107, 66, 38, 0.25));
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon {
  font-size: 56px;
  color: var(--coffee-light);
}

.edit-picture-btn {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid white;
  background: linear-gradient(135deg, var(--coffee-dark) 0%, var(--coffee-medium) 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-picture-btn:active {
  transform: scale(0.95);
}

.edit-picture-btn ion-icon {
  font-size: 20px;
}

.picture-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 12px;
  border: none;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:active {
  transform: scale(0.98);
}

.action-btn.primary {
  background: linear-gradient(135deg, var(--coffee-dark) 0%, var(--coffee-medium) 100%);
  color: white;
}

.action-btn.secondary {
  background: white;
  color: var(--red);
  border: 2px solid var(--red);
}

.action-btn ion-icon {
  font-size: 18px;
}

/* ===== FORM CONTAINER ===== */
.form-container {
  padding: 0 0 20px;
}

/* ===== FORM SECTION ===== */
.form-section {
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin: 0 16px 16px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.section-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.section-icon.personal {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.15), rgba(33, 150, 243, 0.25));
}

.section-icon.contact {
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.15), rgba(39, 174, 96, 0.25));
}

.section-icon.address {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.15), rgba(255, 152, 0, 0.25));
}

.section-icon.preferences {
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.15), rgba(107, 66, 38, 0.25));
}

.section-icon.notifications {
  background: linear-gradient(135deg, rgba(156, 39, 176, 0.15), rgba(156, 39, 176, 0.25));
}

.section-icon ion-icon {
  font-size: 24px;
}

.section-icon.personal ion-icon {
  color: var(--blue);
}

.section-icon.contact ion-icon {
  color: var(--green);
}

.section-icon.address ion-icon {
  color: var(--orange);
}

.section-icon.preferences ion-icon {
  color: var(--coffee-medium);
}

.section-icon.notifications ion-icon {
  color: var(--purple);
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0;
}

/* ===== FORM FIELDS ===== */
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--coffee-dark);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.required {
  color: var(--red);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper.textarea {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 14px;
  font-size: 20px;
  color: var(--coffee-medium);
  z-index: 1;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 14px 14px 14px 46px;
  border: 2px solid #e8e8e8;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  color: var(--coffee-dark);
  background: #fafafa;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--coffee-medium);
  background: white;
}

.form-input.error,
.form-select.error {
  border-color: var(--red);
}

.form-select {
  appearance: none;
  cursor: pointer;
}

.select-arrow {
  position: absolute;
  right: 14px;
  font-size: 18px;
  color: var(--text-light);
  pointer-events: none;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  padding-right: 60px;
}

.char-count {
  position: absolute;
  bottom: 12px;
  right: 14px;
  font-size: 11px;
  color: var(--text-light);
  font-weight: 600;
}

.error-message {
  font-size: 12px;
  color: var(--red);
  font-weight: 600;
  margin-top: -4px;
}

/* ===== PREFERENCES ===== */
.preference-chips {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.preference-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  border: 2px solid #e8e8e8;
  border-radius: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.preference-chip:active {
  transform: scale(0.97);
}

.preference-chip.active {
  border-color: var(--coffee-medium);
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.05), rgba(107, 66, 38, 0.1));
}

.chip-emoji {
  font-size: 28px;
}

.chip-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--coffee-dark);
  text-align: center;
}

.roast-selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.roast-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: 2px solid #e8e8e8;
  border-radius: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.roast-option:active {
  transform: scale(0.97);
}

.roast-option.active {
  border-color: var(--coffee-medium);
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.05), rgba(107, 66, 38, 0.1));
}

.roast-emoji {
  font-size: 32px;
}

.roast-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--coffee-dark);
}

/* ===== CHECKBOX GROUP ===== */
.checkbox-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: #fafafa;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkbox-item:active {
  background: #f0f0f0;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 22px;
  height: 22px;
  border: 2px solid #d0d0d0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  position: relative;
}

.checkbox-input:checked + .checkbox-custom {
  border-color: var(--coffee-medium);
  background: var(--coffee-medium);
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '✓';
  color: white;
  font-size: 14px;
  font-weight: 700;
}

.checkbox-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--coffee-dark);
}

/* ===== TOGGLE GROUP ===== */
.toggle-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: #fafafa;
  border-radius: 14px;
}

.toggle-info {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
}

.toggle-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.toggle-icon.email {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.15), rgba(33, 150, 243, 0.25));
}

.toggle-icon.push {
  background: linear-gradient(135deg, rgba(156, 39, 176, 0.15), rgba(156, 39, 176, 0.25));
}

.toggle-icon.sms {
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.15), rgba(39, 174, 96, 0.25));
}

.toggle-icon.marketing {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.15), rgba(255, 152, 0, 0.25));
}

.toggle-icon ion-icon {
  font-size: 22px;
}

.toggle-icon.email ion-icon {
  color: var(--blue);
}

.toggle-icon.push ion-icon {
  color: var(--purple);
}

.toggle-icon.sms ion-icon {
  color: var(--green);
}

.toggle-icon.marketing ion-icon {
  color: var(--orange);
}

.toggle-text {
  flex: 1;
}

.toggle-label {
  font-size: 15px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 4px 0;
}

.toggle-desc {
  font-size: 12px;
  color: var(--text-light);
  margin: 0;
  line-height: 1.4;
}

.toggle-switch {
  flex-shrink: 0;
}

.toggle-input {
  display: none;
}

.toggle-track {
  position: relative;
  display: block;
  width: 52px;
  height: 30px;
  background: #e0e0e0;
  border-radius: 15px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.toggle-track::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.toggle-input:checked + .toggle-track {
  background: var(--green);
}

.toggle-input:checked + .toggle-track::after {
  transform: translateX(22px);
}

/* ===== SAVE SECTION ===== */
.save-section {
  padding: 0 16px 24px;
}

.save-button {
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

.save-button:active:not(:disabled) {
  transform: scale(0.98);
}

.save-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.save-button ion-icon {
  font-size: 24px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.required-note {
  font-size: 13px;
  color: var(--text-light);
  text-align: center;
  margin: 0;
}

/* ===== SPACER ===== */
.bottom-spacer {
  height: 30px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 400px) {
  .field-row {
    grid-template-columns: 1fr;
  }

  .preference-chips,
  .roast-selector {
    grid-template-columns: repeat(2, 1fr);
  }

  .checkbox-group {
    grid-template-columns: 1fr;
  }
}
</style>