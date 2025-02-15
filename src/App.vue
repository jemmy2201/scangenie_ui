<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app color="white" dark  elevation="0">
      <v-spacer></v-spacer>
      <!-- Navigation Buttons -->
      <v-btn text to="" @click="goToAnalytics" class="nav-btn">
        <v-btn icon class="social-btn">
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn icon class="social-btn">
          <v-icon>mdi-youtube</v-icon>
        </v-btn>
        <v-btn icon class="social-btn">
          <v-icon>mdi-vimeo</v-icon>
        </v-btn>
      </v-btn>
      <v-btn text to="" @click="goToSettings" class="nav-btn partners_login">
        Partners Login
      </v-btn>
      <v-btn text to="" @click="goToSettings" class="nav-btn login_btn">
        <v-icon left>mdi-login</v-icon>
        Login
      </v-btn>
    </v-app-bar>
    <v-app-bar app color="white" dark  elevation="0">
      <v-toolbar-title class="d-flex align-center">
        <span class="ml-2" style="font-family: 'Montserrat', sans-serif; font-weight: 700; color: #FF5722;">ScanGenie</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Navigation Buttons -->
      <v-btn text to="/" @click="goToDashboard" class="nav-btn">
        <v-icon left>mdi-home</v-icon>
      </v-btn>
      <v-btn text to="/about" @click="goToDashboard" class="nav-btn">
        About Us
      </v-btn>
      <v-btn text to="/reports" @click="goToServices" class="nav-btn">
        Software
      </v-btn>
      <v-btn text to="/profiles" @click="goToAnalytics" class="nav-btn">
        Courses
      </v-btn>
      <v-btn text to="/settings" @click="goToSettings" class="nav-btn">
        Support
      </v-btn>
      <v-btn text to="" @click="goToSettings" class="nav-btn">
        Contact
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app color="white">
      <v-col class="text-center" cols="12">
        <span style="font-family: 'Roboto', sans-serif; font-size: 14px; color: #B0BEC5;">© 2025 ScanGenie. All Rights Reserved.</span>
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
    color: #141414;
    text-transform: none;
    font-size: 11px;
    font-family: 'Montserrat', sans-serif;
  }
  .social-btn {
    background-color: #ffffff; /* Warna latar belakang putih */
    border-radius: 50%; /* Membuat tombol berbentuk bulat */
    width: 40px; /* Ukuran tombol */
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Efek bayangan */
    transition: background-color 0.3s ease-in-out;
  }

  .social-btn:hover {
    background-color: #f1f1f1; /* Warna saat hover */
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
  .partners_login {
    background-color: #FF5722 !important;
    color: white !important;
    border-radius: 8px; /* Rounded active buttons for modern touch */
  }
  .login_btn {
    color: #FF5722 !important;
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
