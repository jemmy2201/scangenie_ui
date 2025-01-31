import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage  from '../views/DashboardPage.vue';
import Reports from '../views/ReportsPage.vue';
import Settings from '../views/SettingsPage.vue';
import Profiles from '../views/ProfilePage.vue';

const routes = [
    { path: '/', component: DashboardPage  },
    { path: '/reports', component: Reports },
    { path: '/settings', component: Settings },
    { path: '/profiles', component: Profiles },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
