<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
<style>

/* ===== Color Variables ===== */
:root {
  --bean-bg: #6B4226;
  --bean-accent: #A87B54;
  --bean-light: #f0e6d2;
  --bean-title: white;
  --bean-subtitle: #f0e68c;
}

/* ===== Header ===== */
ion-header::part(background),
ion-toolbar::part(background) {
background-color: var(--bean-bg) !important;
}
ion-title {
  color: var(--bean-title) !important;
}

/* ===== Page Background ===== */
.bean-bg {
  background-color: var(--bean-bg);
  color: var(--bean-title);
}

/* ===== Input Fields ===== */
.bean-input {
  --background: transparent;
  --color: #fff;
  --placeholder-color: #ddd;

  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 12px;
  --padding-bottom: 12px;

  border: solid thin #fff;
  border-radius: 6px;
  margin-bottom: 14px;
}

/* ===== Button ===== */
.btn {
  --background: var(--bean-accent);
  --background-hover: #9d7045;
  --background-activated: #8b5f38;
  --color: white;
  --border-radius: 6px;
  height: 48px;
  font-weight: bold;
  letter-spacing: 1px;
}


/* Remove the blue underline from ion-input (Material Design mode) */
ion-input {
  --highlight-color-focused: transparent !important;
  --highlight-color: transparent !important;
  --highlight-width: 0 !important;
}

/* Remove shadow/underline drawn by the native input part */
ion-input::part(native) {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}

/* Remove MD underline element that Ionic inserts inside ion-input */
ion-input::part(container) {
  border-bottom: none !important;
  box-shadow: none !important;
}

/* For some IOS/Android builds, Ionic adds <div class="input-bottom"> */
.input-bottom {
  display: none !important;
}

/* If ion-input is inside ion-item, remove that underline too */
ion-item::part(native) {
  --border-width: 0 !important;
  border: none !important;
  box-shadow: none !important;
}

ion-toolbar{
border-radius: 0 0 25px 25px;
}


.edit-btn {
--background: #A87B54;
--background-hover: #9d7045;
--background-activated: #8b5f38;
--color: white;
--border-radius: 6px;
height: 44px;
font-weight: bold;
letter-spacing: 0.5px;
--box-shadow:none;
text-transform: none;

}

</style>