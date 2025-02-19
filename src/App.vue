<template>
  <v-app>
      <v-app-bar v-if="isLoggedIn" color="white" elevation="0" app absolute>
          <v-toolbar-title>
            <span class="ml-2" style="font-family: 'Montserrat', sans-serif; font-weight: 700; color: #FF5722;">
              ScanGenie
            </span>
            <v-btn icon @click="toggleDrawer">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
          </v-toolbar-title>
          <v-spacer></v-spacer>
      </v-app-bar>

      <!-- Sidebar Drawer -->
      <v-navigation-drawer v-if="isLoggedIn" v-model="drawer" app elevation="0">
          <v-list dense class="d-flex flex-column h-100">
              <!-- Tools Menu -->
              <v-list-group>
                  <template v-slot:activator="{ props }">
                      <v-list-item v-bind="props">
                          <v-icon left>mdi-tools</v-icon>
                          Tools
                      </v-list-item>
                  </template>

                  <!-- HRM Claim Submenu -->
                  <v-list-group>
                      <template v-slot:activator="{ props }">
                          <v-list-item v-bind="props">
                              <v-icon left>mdi-account-group</v-icon>
                              HRM Claim
                          </v-list-item>
                      </template>
                      <v-list-item to="/hrm/claim">
                          <v-icon left>mdi-cog</v-icon>
                          Endpoint Setting
                      </v-list-item>
                  </v-list-group>

                  <!-- Extract Submenu -->
                  <v-list-item to="/upload_data">
                      <v-icon left>mdi-upload</v-icon>
                      Extract
                  </v-list-item>
              </v-list-group>

              <!-- Logout (Paling Bawah) -->
              <v-list-item @click="goToLogout" class="mt-auto">
                  <v-icon left>mdi-logout</v-icon>
                  Logout
              </v-list-item>
          </v-list>
      </v-navigation-drawer>



      <!-- App Bar for Desktop -->
<!--    <v-app-bar v-if="!isMobile" app color="white" dark  elevation="0">-->
<!--      <v-spacer></v-spacer>-->
<!--      &lt;!&ndash; Navigation Buttons &ndash;&gt;-->
<!--&lt;!&ndash;      <v-btn text to="" @click="goToAnalytics" class="nav-btn">&ndash;&gt;-->
<!--&lt;!&ndash;        <v-btn icon class="social-btn">&ndash;&gt;-->
<!--&lt;!&ndash;          <v-icon>mdi-facebook</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;        </v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;        <v-btn icon class="social-btn">&ndash;&gt;-->
<!--&lt;!&ndash;          <v-icon>mdi-youtube</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;        </v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;        <v-btn icon class="social-btn">&ndash;&gt;-->
<!--&lt;!&ndash;          <v-icon>mdi-vimeo</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;        </v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;      </v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;      <v-btn text to="" @click="goToSettings" class="nav-btn partners_login">&ndash;&gt;-->
<!--&lt;!&ndash;        Partners Login&ndash;&gt;-->
<!--&lt;!&ndash;      </v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;      <v-btn text  @click="goToLogin" class="nav-btn login_btn" v-if="!isLoggedIn">&ndash;&gt;-->
<!--&lt;!&ndash;        <v-icon left>mdi-login</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;        Login&ndash;&gt;-->
<!--&lt;!&ndash;      </v-btn>&ndash;&gt;-->
<!--        <v-btn text @click="goToLogout" class="nav-btn logout_btn" v-if="isLoggedIn">-->
<!--            <v-icon left>mdi-logout</v-icon>-->
<!--            Logout-->
<!--        </v-btn>-->
<!--    </v-app-bar>-->
<!--    <v-app-bar v-if="!isMobile" app color="white" dark elevation="0">-->
<!--&lt;!&ndash;      <v-toolbar-title class="d-flex align-center">&ndash;&gt;-->
<!--&lt;!&ndash;        <span class="ml-2" style="font-family: 'Montserrat', sans-serif; font-weight: 700; color: #FF5722;">ScanGenie</span>&ndash;&gt;-->
<!--&lt;!&ndash;      </v-toolbar-title>&ndash;&gt;-->
<!--      <v-spacer></v-spacer>-->
<!--&lt;!&ndash;      <v-btn text to="/" @click="goToDashboard" class="nav-btn">&ndash;&gt;-->
<!--&lt;!&ndash;        <v-icon left>mdi-home</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;      </v-btn>&ndash;&gt;-->
<!--        <v-btn v-if="isLoggedIn" text to="/hrm/claim" class="nav-btn">-->
<!--            <v-icon left>mdi-account-group</v-icon>-->
<!--            HRM Claim-->
<!--        </v-btn>-->
<!--        <v-btn v-if="isLoggedIn" text to="/upload_data" class="nav-btn">-->
<!--            <v-icon left>mdi-upload</v-icon>-->
<!--              Upload-->
<!--        </v-btn>-->
<!--&lt;!&ndash;      <v-btn text to="/reports" @click="goToServices" class="nav-btn">&ndash;&gt;-->
<!--&lt;!&ndash;        Software&ndash;&gt;-->
<!--&lt;!&ndash;      </v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;      <v-btn text to="/profiles" @click="goToAnalytics" class="nav-btn">&ndash;&gt;-->
<!--&lt;!&ndash;        Courses&ndash;&gt;-->
<!--&lt;!&ndash;      </v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;      <v-btn text to="/settings" @click="goToSettings" class="nav-btn">&ndash;&gt;-->
<!--&lt;!&ndash;        Support&ndash;&gt;-->
<!--&lt;!&ndash;      </v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;      <v-btn text to="" @click="goToSettings" class="nav-btn">&ndash;&gt;-->
<!--&lt;!&ndash;        Contact&ndash;&gt;-->
<!--&lt;!&ndash;      </v-btn>&ndash;&gt;-->
<!--    </v-app-bar>-->

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app color="white">
      <v-col class="text-center" cols="12">
        <span style="font-family: 'Roboto', sans-serif; font-size: 14px; color: #B0BEC5;">COPYRIGHT © {{ new Date().getFullYear() }} MILLION SOFTWARE SDN. BHD | ALL RIGHTS RESERVED.</span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
  import { VApp, VAppBar, VToolbarTitle, VSpacer, VIcon, VMain, VContainer, VFooter, VCol, VBtn,VListItem,VList,VNavigationDrawer,VListGroup } from 'vuetify/components';
  import { useRouter } from 'vue-router';
  import { ref, onMounted, watch, watchEffect, nextTick,} from 'vue';
  const router = useRouter();
  const drawer = ref(true);
  const isMobile = ref(window.innerWidth <= 768);
  // const isLoggedIn = ref(false);
  import { isLoggedIn } from '@/store/auth';
  import { setToken } from '@/store/auth';

  // Cek apakah pengguna sudah login
  const checkLoginStatus = () => {
      isLoggedIn.value = !!localStorage.getItem('token');
  };
  watchEffect(() => {
      checkLoginStatus(); // Cek ulang saat state berubah
  });
  const goToLogout = async () => {
      // localStorage.removeItem('token');
      setToken('');
      localStorage.removeItem('user');
      isLoggedIn.value = false;
      await nextTick();

      isLoggedIn.value = false;
      router.push('/');
  };
  const checkScreenSize = () => {
    isMobile.value = window.innerWidth <= 768;
  };

  const toggleDrawer = () => {
    drawer.value = !drawer.value;
    console.log("Drawer state:", drawer.value); // Debugging
  };

  // Pantau perubahan nilai drawer
  watch(drawer, (newVal) => {
    console.log("Drawer changed:", newVal);
  });

  onMounted(() => {
    checkLoginStatus();
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });
  // const goToDashboard = () => {
  //   router.push('/');
  // };

  // const goToUpload = () => {
  //   router.push('/upload_data');
  // };
  //
  // const goToAnalytics = () => {
  //   router.push('/profiles');
  // };
  //
  // const goToSettings = () => {
  //   router.push('/settings');
  // };
  // const goToLogin = () => {
  //   router.push('/');
  // };
</script>

<style scoped>
  /* Importing Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;500&display=swap');
  .v-navigation-drawer {
    z-index: 1500 !important; /* Pastikan drawer tampil di atas elemen lain */
  }
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
