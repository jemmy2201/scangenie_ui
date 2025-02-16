import axios from 'axios'

const baseURL =
    window.location.hostname === 'localhost'
        ? 'http://localhost:8000/api' // Jika diakses secara lokal
        : 'https://api.scangenie.million-cloud.com' // Jika diakses dari server

const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api
