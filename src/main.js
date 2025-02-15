import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css' // Tambahkan ini

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi', // Pastikan ikon default adalah Material Design Icons
    },
})

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app');
