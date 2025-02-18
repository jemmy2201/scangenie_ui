import { ref, computed } from 'vue';

const token = ref(localStorage.getItem('token') || '');

export const isLoggedIn = computed(() => !!token.value);

export const setToken = (newToken) => {
    token.value = newToken;
    if (newToken) {
        localStorage.setItem('token', newToken);
    } else {
        localStorage.removeItem('token');
    }
};
