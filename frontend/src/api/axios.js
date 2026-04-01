import axios from 'axios';

const getBaseURL = () => {
    const rawURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    // If it's the onrender URL from fromService, append /api
    if (rawURL.includes('.onrender.com') && !rawURL.endsWith('/api')) {
        return `${rawURL.replace(/\/$/, '')}/api`;
    }
    return rawURL;
};

const instance = axios.create({
    baseURL: getBaseURL(),
});

// Add a request interceptor to add the auth token to headers
instance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
