<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app color="#1E2A47" dark elevate-on-scroll>
      <v-toolbar-title class="d-flex align-center">
        <v-icon>mdi-cloud</v-icon>
        <span class="ml-2" style="font-family: 'Montserrat', sans-serif; font-weight: 700; color: #FF5722;">Sigma2k</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Navigation Buttons -->
      <v-btn text to="/" @click="goToDashboard" class="nav-btn">
        <v-icon left>mdi-view-dashboard</v-icon>
        Dashboard
      </v-btn>
      <v-btn text to="/reports" @click="goToServices" class="nav-btn">
        <v-icon left>mdi-cloud-outline</v-icon>
        Services
      </v-btn>
      <v-btn text to="/profiles" @click="goToAnalytics" class="nav-btn">
        <v-icon left>mdi-chart-line</v-icon>
        Analytics
      </v-btn>
      <v-btn text to="/settings" @click="goToSettings" class="nav-btn">
        <v-icon left>mdi-cogs</v-icon>
        Settings
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <v-col class="text-center" cols="12">
        <span style="font-family: 'Roboto', sans-serif; font-size: 14px; color: #B0BEC5;">© 2025 CloudTech. All Rights Reserved.</span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
  import { VApp, VAppBar, VToolbarTitle, VSpacer, VIcon, VMain, VContainer, VFooter, VCol, VBtn } from 'vuetify/components';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const goToDashboard = () => {
    router.push('/');
  };

  const goToServices = () => {
    router.push('/reports');
  };

  const goToAnalytics = () => {
    router.push('/profiles');
  };

  const goToSettings = () => {
    router.push('/settings');
  };
</script>

<style scoped>
  /* Importing Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;500&display=swap');

  /* App Bar Styling */
  .v-app-bar {
    background-color: #1E2A47; /* Deep Blue for cloud tech look */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Slight shadow for professionalism */
  }

  /* Buttons Styling */
  .v-btn {
    color: #E5E5E5;
    transition: color 0.3s ease-in-out;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
  }

  /* Hover Effect */
  .v-btn:hover {
    color: #FF5722; /* Orange highlight for hover effect */
  }

  /* Active Button */
  .v-btn--active {
    background-color: #FF5722 !important;
    color: white !important;
    border-radius: 8px; /* Rounded active buttons for modern touch */
  }

  /* Footer Styling */
  .v-footer {
    background-color: #37474F;
    color: #B0BEC5;
    padding: 20px 0;
  }

  .v-footer span {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: #B0BEC5;
  }
</style>
