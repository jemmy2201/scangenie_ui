<template>
  <v-app>
    <!-- App Bar (Top Menu) -->
    <v-app-bar app color="indigo darken-2" dark elevate-on-scroll>
      <v-toolbar-title class="d-flex align-center">
        <v-icon>mdi-rocket-launch</v-icon>
        <span class="ml-2">Sigma2k</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Navigation Buttons in App Bar -->
      <v-btn text to="/" @click="goToDashboard">
        <v-icon left>mdi-home</v-icon>
        Dashboard
      </v-btn>
      <v-btn text to="/reports" @click="goToReports">
        <v-icon left>mdi-file-document</v-icon>
        Reports
      </v-btn>
      <v-btn text to="/settings" @click="goToSettings">
        <v-icon left>mdi-cogs</v-icon>
        Settings
      </v-btn>
      <v-btn text to="/profiles" @click="goToProfile">
        <v-icon left>mdi-account-circle</v-icon>
        Profile
      </v-btn>
    </v-app-bar>

    <!-- Main Content Area -->
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <v-col class="text-center" cols="12">
        <span class="text-h6">© 2025 Sigma2k. All Rights Reserved.</span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
  // Import necessary components from Vuetify and Vue Router
  import { VApp, VAppBar, VToolbarTitle, VSpacer, VIcon, VMain, VContainer, VFooter, VBtn, VCol } from 'vuetify/components';
  import { useRouter } from 'vue-router'; // Import useRouter

  // Access the Vue Router instance
  const router = useRouter();

  // Define methods for navigation
  const goToDashboard = () => {
    router.push('/');
  };

  const goToReports = () => {
    router.push('/reports');
  };

  const goToSettings = () => {
    router.push('/settings');
  };

  const goToProfile = () => {
    router.push('/profiles');
  };
</script>

<style scoped>
  /* App Bar */
  .v-app-bar {
    background-color: #1E1E2D; /* Darker shade of blue for a modern, professional feel */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Subtle shadow for elevation */
  }

  /* Buttons and Icons Styling */
  .v-btn {
    color: #E5E5E5; /* Light color for text in buttons */
    transition: color 0.3s ease-in-out;
    font-size: 16px;
    font-weight: 500;
  }

  .v-btn:hover {
    color: #FF4081; /* Bright accent color when hovering over buttons */
  }

  /* Icon Styling */
  .v-icon {
    font-size: 18px;
    color: inherit; /* Inherit button color for uniform styling */
  }

  /* Active Tab Style */
  .v-btn--active {
    background-color: #FF4081 !important; /* Active tab has a strong highlight */
    color: white !important;
    border-radius: 12px; /* Smooth rounded edges for active button */
  }

  /* Footer Style */
  .v-footer {
    background-color: #37474F;
    color: #FFEB3B;
    padding: 20px 0;
  }

  /* Responsive Design */
  .d-none.d-sm-inline {
    display: inline-block;
  }
</style>
