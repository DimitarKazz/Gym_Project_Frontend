// src/services/api.js - CELE POPRAVENO
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 30000, // Povisen timeout za upload
});

// Interceptors
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        console.log('✅ API Response:', response.status, response.data);
        return response;
    },
    (error) => {
        console.error('❌ API Error:', error.response?.status, error.response?.data);
        return Promise.reject(error);
    }
);

// ===== AUTH API =====
export const authAPI = {
    login: async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        return res.data;
    },
    register: async (userData) => {
        const res = await api.post('/auth/register', userData);
        return res.data;
    }
};

// ===== DAYS API =====
export const dayAPI = {
    // User endpoints
    getAll: async () => {
        const res = await api.get('/days');
        return res.data || [];
    },
    getById: async (id) => {
        const res = await api.get(`/days/${id}`);
        return res.data;
    },
    getVideos: async (dayId) => {
        const res = await api.get(`/days/${dayId}/videos`);
        return res.data || [];
    },
    create: async (dayData) => {
        const res = await api.post('/days', dayData);
        return res.data;
    },
    update: async (id, dayData) => {
        const res = await api.put(`/days/${id}`, dayData);
        return res.data;
    },
    delete: async (id) => {
        await api.delete(`/days/${id}`);
    },
    reorder: async (dayIds) => {
        const res = await api.put('/days/reorder', dayIds);
        return res.data;
    },

    // Admin endpoints
    admin: {
        getAll: async () => {
            const res = await api.get('/admin/days');
            return res.data || [];
        },
        create: async (dayData) => {
            const res = await api.post('/admin/days', dayData);
            return res.data;
        },
        update: async (id, dayData) => {
            const res = await api.put(`/admin/days/${id}`, dayData);
            return res.data;
        },
        delete: async (id) => {
            await api.delete(`/admin/days/${id}`);
        },
        reorder: async (dayIds) => {
            const res = await api.put('/admin/days/reorder', dayIds);
            return res.data;
        }
    }
};

// ===== VIDEOS API =====
export const videoAPI = {
    // User endpoints
    getAll: async () => {
        const res = await api.get('/videos');
        return res.data || [];
    },
    getByDay: async (dayId) => {
        const res = await api.get(`/videos/day/${dayId}`);
        return res.data || [];
    },
    getById: async (id) => {
        const res = await api.get(`/videos/${id}`);
        return res.data;
    },
    getVideoFile: async (videoId) => {
        const res = await api.get(`/videos/file/${videoId}`, {
            responseType: 'blob' // Za da go zeme video fajlot
        });
        return res.data;
    },

    // Admin endpoints
    admin: {
        getAll: async () => {
            const res = await api.get('/admin/videos');
            return res.data || [];
        },
        create: async (videoData) => {
            const res = await api.post('/admin/videos', videoData);
            return res.data;
        },
        update: async (id, videoData) => {
            const res = await api.put(`/admin/videos/${id}`, videoData);
            return res.data;
        },
        delete: async (id) => {
            await api.delete(`/admin/videos/${id}`);
        },
        reorder: async (videoIds) => {
            const res = await api.put('/admin/videos/reorder', videoIds);
            return res.data;
        },
        updateOrder: async (id, newOrder) => {
            const res = await api.put(`/admin/videos/${id}/order/${newOrder}`);
            return res.data;
        },
        // POPRAVEN UPLOAD - koristi /videos/upload
        upload: async (file, title, description = '', orderIndex = 1, dayId = null) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('orderIndex', orderIndex.toString());
            if (dayId) formData.append('dayId', dayId.toString());

            console.log('📤 Uploading video:', {
                title,
                description,
                orderIndex,
                dayId,
                fileName: file.name,
                fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
            });

            const res = await api.post('/videos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 60000 // 60 sekundi za golemi fajlovi
            });
            return res.data;
        },
        getFile: async (videoId) => {
            const res = await api.get(`/videos/file/${videoId}`, {
                responseType: 'blob'
            });
            return res.data;
        }
    }
};

// ===== USERS API =====
export const userAPI = {
    getAll: async () => {
        const res = await api.get('/users');
        return res.data || [];
    },
    getById: async (id) => {
        const res = await api.get(`/users/${id}`);
        return res.data;
    },

    // Admin endpoints
    admin: {
        getAll: async () => {
            const res = await api.get('/admin/users');
            return res.data || [];
        },
        update: async (id, userData) => {
            const res = await api.put(`/admin/users/${id}`, userData);
            return res.data;
        },
        delete: async (id) => {
            await api.delete(`/admin/users/${id}`);
        },
        updateRole: async (id, role) => {
            const res = await api.put(`/admin/users/${id}/role?role=${role}`);
            return res.data;
        }
    }
};


export default api;