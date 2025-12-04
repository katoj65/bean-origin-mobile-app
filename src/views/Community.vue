<template>
  <ion-page>
    <!-- HEADER -->
    <ion-header class="ion-no-border">
      <ion-toolbar class="page-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goBack" class="header-button">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="header-title">Coffee Community</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openSearch" class="header-button">
            <ion-icon :icon="searchOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

      <!-- TABS -->
      <div class="tabs-container">
        <div 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['tab-item', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id">
          <span class="tab-label">{{ tab.label }}</span>
        </div>
      </div>
    </ion-header>

    <ion-content class="page-content">
      <div class="content-container">

        <!-- FEED TAB -->
        <div v-if="activeTab === 'feed'" class="tab-content">
          
          <!-- CREATE POST CARD -->
          <div class="content-card create-post-card" @click="createPost">
            <div class="user-avatar">
              <img src="https://i.pravatar.cc/150?img=12" alt="You" />
            </div>
            <div class="create-post-input">
              <span class="placeholder">Share your coffee moment...</span>
            </div>
            <button class="create-post-btn">
              <ion-icon :icon="cameraOutline"></ion-icon>
            </button>
          </div>

          <!-- USER POSTS -->
          <div v-for="post in posts" :key="post.id" class="content-card post-card">
            <div class="post-header">
              <div class="user-info">
                <img :src="post.user.avatar" :alt="post.user.name" class="user-avatar" />
                <div class="user-details">
                  <h3 class="user-name">{{ post.user.name }}</h3>
                  <span class="post-time">{{ post.time }}</span>
                </div>
              </div>
              <button class="post-menu-btn">
                <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>
              </button>
            </div>

            <p class="post-text">{{ post.text }}</p>

            <div v-if="post.image" class="post-image-wrapper">
              <img :src="post.image" :alt="post.user.name" class="post-image" />
            </div>

            <div v-if="post.coffee" class="post-coffee-tag">
              <ion-icon :icon="cafeOutline"></ion-icon>
              <span>{{ post.coffee }}</span>
            </div>

            <div class="post-stats">
              <span class="stat-item">{{ post.likes }} likes</span>
              <span class="stat-separator">•</span>
              <span class="stat-item">{{ post.comments }} comments</span>
            </div>

            <div class="post-actions">
              <button :class="['action-btn', { active: post.liked }]" @click="toggleLike(post.id)">
                <ion-icon :icon="post.liked ? heartSharp : heartOutline"></ion-icon>
                <span>Like</span>
              </button>
              <button class="action-btn" @click="openComments(post.id)">
                <ion-icon :icon="chatbubbleOutline"></ion-icon>
                <span>Comment</span>
              </button>
              <button class="action-btn" @click="sharePost(post.id)">
                <ion-icon :icon="shareOutline"></ion-icon>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        <!-- DISCUSSIONS TAB -->
        <div v-if="activeTab === 'discussions'" class="tab-content">
          
          <!-- START DISCUSSION BUTTON -->
          <button class="start-discussion-btn" @click="startDiscussion">
            <ion-icon :icon="addCircleOutline"></ion-icon>
            <span>Start a Discussion</span>
          </button>

          <!-- DISCUSSION TOPICS -->
          <div v-for="discussion in discussions" :key="discussion.id" class="content-card discussion-card">
            <div class="discussion-header">
              <div class="category-badge" :style="{ background: discussion.categoryColor }">
                {{ discussion.category }}
              </div>
              <span class="discussion-time">{{ discussion.time }}</span>
            </div>

            <h3 class="discussion-title">{{ discussion.title }}</h3>
            <p class="discussion-preview">{{ discussion.preview }}</p>

            <div class="discussion-footer">
              <div class="discussion-author">
                <img :src="discussion.author.avatar" :alt="discussion.author.name" />
                <span>{{ discussion.author.name }}</span>
              </div>
              <div class="discussion-stats">
                <span class="stat-item">
                  <ion-icon :icon="chatbubblesOutline"></ion-icon>
                  {{ discussion.replies }}
                </span>
                <span class="stat-item">
                  <ion-icon :icon="eyeOutline"></ion-icon>
                  {{ discussion.views }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- EVENTS TAB -->
        <div v-if="activeTab === 'events'" class="tab-content">
          
          <!-- UPCOMING EVENTS -->
          <div class="section-header">
            <h2 class="section-title">Upcoming Events</h2>
            <button class="create-event-btn" @click="createEvent">
              <ion-icon :icon="addOutline"></ion-icon>
            </button>
          </div>

          <div v-for="event in events" :key="event.id" class="content-card event-card">
            <div class="event-image-wrapper">
              <img :src="event.image" :alt="event.title" class="event-image" />
              <div class="event-date-badge">
                <span class="date-day">{{ event.date.day }}</span>
                <span class="date-month">{{ event.date.month }}</span>
              </div>
            </div>

            <div class="event-content">
              <h3 class="event-title">{{ event.title }}</h3>
              <p class="event-description">{{ event.description }}</p>

              <div class="event-details">
                <div class="event-detail-item">
                  <ion-icon :icon="timeOutline"></ion-icon>
                  <span>{{ event.time }}</span>
                </div>
                <div class="event-detail-item">
                  <ion-icon :icon="locationOutline"></ion-icon>
                  <span>{{ event.location }}</span>
                </div>
              </div>

              <div class="event-footer">
                <div class="event-attendees">
                  <div class="attendee-avatars">
                    <img v-for="(attendee, index) in event.attendees.slice(0, 3)" 
                         :key="index" 
                         :src="attendee" 
                         :alt="`Attendee ${index + 1}`" />
                  </div>
                  <span class="attendee-count">{{ event.attendees.length }} going</span>
                </div>
                <button :class="['attend-btn', { attending: event.attending }]" @click="toggleAttend(event.id)">
                  <ion-icon :icon="event.attending ? checkmarkCircleOutline : addCircleOutline"></ion-icon>
                  <span>{{ event.attending ? 'Attending' : 'Attend' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- MEMBERS TAB -->
        <div v-if="activeTab === 'members'" class="tab-content">
          
          <!-- SEARCH MEMBERS -->
          <div class="search-members-card">
            <ion-icon :icon="searchOutline"></ion-icon>
            <input type="text" placeholder="Search members..." v-model="memberSearch" />
          </div>

          <!-- FEATURED MEMBERS -->
          <div class="section-header">
            <h2 class="section-title">Top Contributors</h2>
          </div>

          <div class="members-grid">
            <div v-for="member in members" :key="member.id" class="content-card member-card">
              <img :src="member.avatar" :alt="member.name" class="member-avatar" />
              
              <h3 class="member-name">{{ member.name }}</h3>
              <p class="member-role">{{ member.role }}</p>

              <div class="member-stats">
                <div class="member-stat">
                  <span class="stat-value">{{ member.posts }}</span>
                  <span class="stat-label">Posts</span>
                </div>
                <div class="member-stat">
                  <span class="stat-value">{{ member.followers }}</span>
                  <span class="stat-label">Followers</span>
                </div>
              </div>

              <button :class="['follow-btn', { following: member.following }]" @click="toggleFollow(member.id)">
                <ion-icon :icon="member.following ? checkmarkOutline : personAddOutline"></ion-icon>
                <span>{{ member.following ? 'Following' : 'Follow' }}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </ion-content>

    <!-- FLOATING ACTION BUTTON -->
    <button class="fab-button" @click="quickAction">
      <ion-icon :icon="addOutline"></ion-icon>
    </button>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
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
  searchOutline,
  cameraOutline,
  ellipsisHorizontalOutline,
  cafeOutline,
  heartOutline,
  heartSharp,
  chatbubbleOutline,
  shareOutline,
  addCircleOutline,
  chatbubblesOutline,
  eyeOutline,
  addOutline,
  timeOutline,
  locationOutline,
  checkmarkCircleOutline,
  checkmarkOutline,
  personAddOutline,
} from "ionicons/icons";

const router = useRouter();

const activeTab = ref('feed');
const memberSearch = ref('');

const tabs = [
  { id: 'feed', label: 'Feed' },
  { id: 'discussions', label: 'Discussions' },
  { id: 'events', label: 'Events' },
  { id: 'members', label: 'Members' }
];

const posts = ref([
  {
    id: 1,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    time: '2 hours ago',
    text: 'Just tried the new Ethiopian Yirgacheffe from my local roaster. The floral notes are absolutely incredible! ☕✨',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600',
    coffee: 'Ethiopian Yirgacheffe',
    likes: 42,
    comments: 8,
    liked: false
  },
  {
    id: 2,
    user: {
      name: 'Mike Chen',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    time: '5 hours ago',
    text: 'My latte art is finally improving! Still not perfect, but getting there. Any tips from the pros? 🎨',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600',
    coffee: null,
    likes: 67,
    comments: 15,
    liked: true
  },
  {
    id: 3,
    user: {
      name: 'Emma Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=9'
    },
    time: '8 hours ago',
    text: 'Found this amazing coffee shop in Portland! The pour-over technique here is next level. Highly recommend if you\'re in the area.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600',
    coffee: 'Costa Rica Honey Process',
    likes: 89,
    comments: 23,
    liked: false
  },
  {
    id: 4,
    user: {
      name: 'David Park',
      avatar: 'https://i.pravatar.cc/150?img=14'
    },
    time: '1 day ago',
    text: 'Experimenting with cold brew ratios. This 1:5 ratio with a 24-hour steep is perfection! What\'s your go-to ratio?',
    image: null,
    coffee: 'Colombian Supremo',
    likes: 56,
    comments: 31,
    liked: false
  }
]);

const discussions = ref([
  {
    id: 1,
    category: 'Brewing',
    categoryColor: 'linear-gradient(135deg, #667eea, #764ba2)',
    title: 'What\'s your favorite pour-over technique?',
    preview: 'I\'ve been using the Hario V60 for years, but recently switched to Chemex. Curious what everyone else prefers...',
    time: '3 hours ago',
    author: {
      name: 'Alex Thompson',
      avatar: 'https://i.pravatar.cc/150?img=33'
    },
    replies: 47,
    views: 234
  },
  {
    id: 2,
    category: 'Equipment',
    categoryColor: 'linear-gradient(135deg, #f093fb, #f5576c)',
    title: 'Beginner espresso machine recommendations under $500?',
    preview: 'Looking to upgrade from my Moka pot. What machines would you recommend for someone just starting...',
    time: '6 hours ago',
    author: {
      name: 'Jessica Lee',
      avatar: 'https://i.pravatar.cc/150?img=45'
    },
    replies: 82,
    views: 456
  },
  {
    id: 3,
    category: 'Origins',
    categoryColor: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    title: 'Ethiopian vs Colombian - what\'s the real difference?',
    preview: 'I know they\'re grown in different regions, but what makes Ethiopian coffee taste so distinct...',
    time: '12 hours ago',
    author: {
      name: 'Marco Silva',
      avatar: 'https://i.pravatar.cc/150?img=56'
    },
    replies: 38,
    views: 389
  },
  {
    id: 4,
    category: 'Roasting',
    categoryColor: 'linear-gradient(135deg, #fa709a, #fee140)',
    title: 'Home roasting tips for beginners',
    preview: 'Just got a small home roaster. Any advice on where to start? What should I look out for...',
    time: '1 day ago',
    author: {
      name: 'Nina Patel',
      avatar: 'https://i.pravatar.cc/150?img=25'
    },
    replies: 64,
    views: 512
  }
]);

const events = ref([
  {
    id: 1,
    title: 'Saturday Morning Cupping Session',
    description: 'Join us for a guided coffee tasting session featuring beans from around the world.',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600',
    date: { day: '15', month: 'DEC' },
    time: '10:00 AM - 12:00 PM',
    location: 'Downtown Coffee Lab',
    attendees: [
      'https://i.pravatar.cc/150?img=1',
      'https://i.pravatar.cc/150?img=2',
      'https://i.pravatar.cc/150?img=3',
      'https://i.pravatar.cc/150?img=4',
      'https://i.pravatar.cc/150?img=6'
    ],
    attending: false
  },
  {
    id: 2,
    title: 'Latte Art Workshop',
    description: 'Learn the basics of latte art from a professional barista. All skill levels welcome!',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600',
    date: { day: '18', month: 'DEC' },
    time: '2:00 PM - 4:00 PM',
    location: 'Artisan Espresso Bar',
    attendees: [
      'https://i.pravatar.cc/150?img=7',
      'https://i.pravatar.cc/150?img=8',
      'https://i.pravatar.cc/150?img=9',
      'https://i.pravatar.cc/150?img=10',
      'https://i.pravatar.cc/150?img=11',
      'https://i.pravatar.cc/150?img=12',
      'https://i.pravatar.cc/150?img=13'
    ],
    attending: true
  },
  {
    id: 3,
    title: 'Coffee Farm Virtual Tour',
    description: 'Live virtual tour of a coffee farm in Colombia with Q&A session with the farmers.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600',
    date: { day: '22', month: 'DEC' },
    time: '7:00 PM - 8:30 PM',
    location: 'Online Event',
    attendees: [
      'https://i.pravatar.cc/150?img=15',
      'https://i.pravatar.cc/150?img=16',
      'https://i.pravatar.cc/150?img=17'
    ],
    attending: false
  }
]);

const members = ref([
  {
    id: 1,
    name: 'James Wilson',
    avatar: 'https://i.pravatar.cc/150?img=11',
    role: 'Master Barista',
    posts: 156,
    followers: 892,
    following: false
  },
  {
    id: 2,
    name: 'Sophia Martinez',
    avatar: 'https://i.pravatar.cc/150?img=20',
    role: 'Coffee Roaster',
    posts: 203,
    followers: 1245,
    following: true
  },
  {
    id: 3,
    name: 'Oliver Brown',
    avatar: 'https://i.pravatar.cc/150?img=52',
    role: 'Coffee Enthusiast',
    posts: 89,
    followers: 456,
    following: false
  },
  {
    id: 4,
    name: 'Isabella Garcia',
    avatar: 'https://i.pravatar.cc/150?img=47',
    role: 'Specialty Coffee Trader',
    posts: 178,
    followers: 1089,
    following: true
  },
  {
    id: 5,
    name: 'Liam Anderson',
    avatar: 'https://i.pravatar.cc/150?img=68',
    role: 'Home Brewer',
    posts: 67,
    followers: 234,
    following: false
  },
  {
    id: 6,
    name: 'Mia Taylor',
    avatar: 'https://i.pravatar.cc/150?img=32',
    role: 'Coffee Blogger',
    posts: 234,
    followers: 1567,
    following: false
  }
]);

const goBack = () => {
  router.back();
};

const openSearch = () => {
  console.log('Open search');
};

const createPost = () => {
  console.log('Create post');
  alert('Create post feature coming soon!');
};

const toggleLike = (postId) => {
  const post = posts.value.find(p => p.id === postId);
  if (post) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
  }
};

const openComments = (postId) => {
  console.log('Open comments for post:', postId);
  alert('Comments feature coming soon!');
};

const sharePost = (postId) => {
  console.log('Share post:', postId);
  alert('Share feature coming soon!');
};

const startDiscussion = () => {
  console.log('Start discussion');
  alert('Start discussion feature coming soon!');
};

const createEvent = () => {
  console.log('Create event');
  alert('Create event feature coming soon!');
};

const toggleAttend = (eventId) => {
  const event = events.value.find(e => e.id === eventId);
  if (event) {
    event.attending = !event.attending;
  }
};

const toggleFollow = (memberId) => {
  const member = members.value.find(m => m.id === memberId);
  if (member) {
    member.following = !member.following;
    member.followers += member.following ? 1 : -1;
  }
};

const quickAction = () => {
  if (activeTab.value === 'feed') createPost();
  else if (activeTab.value === 'discussions') startDiscussion();
  else if (activeTab.value === 'events') createEvent();
  else createPost();
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
  --purple: #9b51e0;
  --orange: #ff9800;
  --red: #ef4444;
}

* {
  -webkit-tap-highlight-color: transparent;
}

/* ===== HEADER ===== */
.page-toolbar {
  --background: white;
  --border-width: 0;
  padding: 8px 4px;
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

/* ===== TABS ===== */
.tabs-container {
  display: flex;
  background: white;
  padding: 0 12px;
  gap: 4px;
  border-bottom: 2px solid #f5f5f5;
}

.tab-item {
  flex: 1;
  padding: 14px 8px;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.tab-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-light);
  transition: color 0.3s ease;
}

.tab-item.active .tab-label {
  color: var(--coffee-dark);
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--coffee-dark);
  border-radius: 3px 3px 0 0;
}

/* ===== CONTENT ===== */
.page-content {
  --background: #f5f5f5;
}

.content-container {
  padding: 12px;
  padding-bottom: 80px;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ===== CONTENT CARD ===== */
.content-card {
  background: white;
  border-radius: 20px;
  box-shadow: none;
  border: none;
  overflow: hidden;
}

/* ===== CREATE POST CARD ===== */
.create-post-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.create-post-card:active {
  transform: scale(0.98);
}

.user-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: #e8e8e8;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.create-post-input {
  flex: 1;
  padding: 12px 16px;
  background: #f8f8f8;
  border-radius: 24px;
}

.placeholder {
  font-size: 15px;
  color: var(--text-light);
  font-weight: 600;
}

.create-post-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
}

.create-post-btn ion-icon {
  font-size: 24px;
}

/* ===== POST CARD ===== */
.post-card {
  padding: 20px;
}

.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-size: 15px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0;
}

.post-time {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 600;
}

.post-menu-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  cursor: pointer;
}

.post-text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--coffee-dark);
  margin: 0 0 14px 0;
  font-weight: 600;
}

.post-image-wrapper {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 12px;
  background: #e8e8e8;
}

.post-image {
  width: 100%;
  height: auto;
  display: block;
}

.post-coffee-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.08), rgba(107, 66, 38, 0.05));
  border-radius: 10px;
  margin-bottom: 12px;
}

.post-coffee-tag ion-icon {
  font-size: 18px;
  color: var(--coffee-medium);
}

.post-coffee-tag span {
  font-size: 13px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.post-stats {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  border-top: 2px solid #f5f5f5;
  border-bottom: 2px solid #f5f5f5;
  margin-bottom: 8px;
}

.stat-item {
  font-size: 13px;
  color: var(--text-light);
  font-weight: 700;
}

.stat-separator {
  color: #d0d0d0;
}

.post-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: transparent;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:active {
  transform: scale(0.95);
  background: #f8f8f8;
}

.action-btn ion-icon {
  font-size: 20px;
  color: var(--text-light);
}

.action-btn span {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-light);
}

.action-btn.active ion-icon {
  color: var(--red);
}

.action-btn.active span {
  color: var(--red);
}

/* ===== START DISCUSSION BUTTON ===== */
.start-discussion-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px;
  background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-discussion-btn:active {
  transform: scale(0.98);
}

.start-discussion-btn ion-icon {
  font-size: 24px;
}

/* ===== DISCUSSION CARD ===== */
.discussion-card {
  padding: 20px;
}

.discussion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.category-badge {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 800;
  color: white;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.discussion-time {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 600;
}

.discussion-title {
  font-size: 17px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0 0 10px 0;
  line-height: 1.3;
}

.discussion-preview {
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-light);
  margin: 0 0 16px 0;
  font-weight: 600;
}

.discussion-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 2px solid #f5f5f5;
}

.discussion-author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.discussion-author img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.discussion-author span {
  font-size: 13px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.discussion-stats {
  display: flex;
  align-items: center;
  gap: 14px;
}

.discussion-stats .stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-light);
}

.discussion-stats .stat-item ion-icon {
  font-size: 16px;
}

/* ===== SECTION HEADER ===== */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 4px;
}

.section-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0;
}

.create-event-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
}

.create-event-btn ion-icon {
  font-size: 24px;
}

/* ===== EVENT CARD ===== */
.event-card {
  padding: 0;
  overflow: hidden;
}

.event-image-wrapper {
  position: relative;
  width: 100%;
  height: 180px;
  background: #e8e8e8;
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-date-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 14px;
  background: white;
  border-radius: 12px;
}

.date-day {
  font-size: 24px;
  font-weight: 900;
  color: var(--coffee-dark);
  line-height: 1;
}

.date-month {
  font-size: 12px;
  font-weight: 800;
  color: var(--coffee-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.event-content {
  padding: 20px;
}

.event-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0 0 10px 0;
  line-height: 1.3;
}

.event-description {
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-light);
  margin: 0 0 16px 0;
  font-weight: 600;
}

.event-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
  padding: 16px;
  background: #f8f8f8;
  border-radius: 12px;
}

.event-detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.event-detail-item ion-icon {
  font-size: 18px;
  color: var(--coffee-medium);
}

.event-detail-item span {
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.event-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 2px solid #f5f5f5;
}

.event-attendees {
  display: flex;
  align-items: center;
  gap: 10px;
}

.attendee-avatars {
  display: flex;
  align-items: center;
  margin-left: -4px;
}

.attendee-avatars img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid white;
  margin-left: -8px;
  object-fit: cover;
}

.attendee-count {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-light);
}

.attend-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
}

.attend-btn:active {
  transform: scale(0.95);
}

.attend-btn ion-icon {
  font-size: 18px;
}

.attend-btn.attending {
  background: linear-gradient(135deg, var(--green), #2ecc71);
}

/* ===== SEARCH MEMBERS ===== */
.search-members-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: white;
  border-radius: 16px;
}

.search-members-card ion-icon {
  font-size: 22px;
  color: var(--text-light);
}

.search-members-card input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  font-weight: 600;
  color: var(--coffee-dark);
  background: transparent;
}

.search-members-card input::placeholder {
  color: var(--text-light);
}

/* ===== MEMBERS GRID ===== */
.members-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.member-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}

.member-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f5f5f5;
}

.member-name {
  font-size: 16px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0;
  line-height: 1.2;
}

.member-role {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 700;
  margin: -4px 0 0 0;
}

.member-stats {
  display: flex;
  gap: 20px;
  padding: 12px 0;
}

.member-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: 18px;
  font-weight: 900;
  color: var(--coffee-dark);
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  color: var(--text-light);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.follow-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
}

.follow-btn:active {
  transform: scale(0.95);
}

.follow-btn ion-icon {
  font-size: 16px;
}

.follow-btn.following {
  background: linear-gradient(135deg, #f8f8f8, #f0f0f0);
  color: var(--coffee-dark);
}

/* ===== FAB BUTTON ===== */
.fab-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(74, 44, 42, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
}

.fab-button:active {
  transform: scale(0.9);
}

.fab-button ion-icon {
  font-size: 32px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 400px) {
  .members-grid {
    grid-template-columns: 1fr;
  }
}
</style>