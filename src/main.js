import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify' // Import Vuetify
import '@mdi/font/css/materialdesignicons.css' // If you want Material Design Icons

const app = createApp(App)

app.use(vuetify) // Use Vuetify

app.mount('#app')
