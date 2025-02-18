import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '../views/DashboardPage.vue';
import UserRegister from '../views/FormRegister.vue';
import Reports from '../views/ReportsPage.vue';
import Settings from '../views/SettingsPage.vue';
import Profiles from '../views/ProfilePage.vue';
import UserLogin from '../views/FormLogin.vue';
import UploadData from '../views/UploadData.vue';

// Definisi rute
const routes = [
    { path: '/', component: UserLogin },
    { path: '/register', component: UserRegister },
    { path: '/dashboardPage', component: DashboardPage, meta: { requiresAuth: true, roles: ['admin', 'user'] } },
    { path: '/upload_data', component: UploadData, meta: { requiresAuth: true, roles: ['admin', 'user'] } },
    { path: '/reports', component: Reports, meta: { requiresAuth: true, roles: ['admin'] } },
    { path: '/settings', component: Settings, meta: { requiresAuth: true, roles: ['admin'] } },
    { path: '/profiles', component: Profiles, meta: { requiresAuth: true, roles: ['admin'] } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Middleware untuk proteksi rute
router.beforeEach((to, from, next) => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (to.meta.requiresAuth) {
        if (!userData || !token) {
            return next('/'); // Redirect ke login jika tidak ada user
        }

        const user = JSON.parse(userData);

        // Cek apakah role user memiliki izin akses ke route ini
        if (to.meta.roles && !to.meta.roles.includes(user.role)) {
            return next('/dashboardPage'); // Redirect ke dashboard jika tidak memiliki izin
        }
    }

    next();
});

export default router;
