import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify'; // Pastikan Vuetify diimpor

// 🔹 Import Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

// 🔹 Import Material Design Icons
import '@mdi/font/css/materialdesignicons.css';

// 🔹 Buat instance Vuetify dengan konfigurasi ikon & tema
const vuetifyInstance = createVuetify({
    theme: {
        defaultTheme: 'light', // Bisa 'dark' atau 'light' sesuai kebutuhan
    },
    icons: {
        defaultSet: 'mdi', // Pastikan ikon default adalah Material Design Icons
    },
});

// 🔹 Buat aplikasi Vue & pasang plugin
createApp(App)
    .use(router)
    .use(vuetify) // Ini dari import './plugins/vuetify'
    .use(vuetifyInstance) // Ini adalah instance baru
    .mount('#app');
