/**
 * API Service Configuration Skeleton
 * 
 * This file sets up the foundation for future backend integration.
 * Currently it acts as a structured placeholder, but it is ready to be
 * swapped with `axios` or native `fetch` wrappers when the backend is ready.
 * 
 * Future setup instructions:
 * 1. Install axios: `npm install axios`
 * 2. Set backend URL in `.env`: `VITE_API_URL=http://localhost:5000/api`
 * 3. Replace these mock services with real API calls.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Example generic fetcher (can be replaced by Axios instance with interceptors)
async function fetchAPI(endpoint, options = {}) {
    console.log(`[API Mock] Calling ${API_BASE_URL}${endpoint}`);
    // Simulated delay
    return new Promise(resolve => setTimeout(() => resolve({ success: true, data: [] }), 500));
}

export const authService = {
    login: async (email, password) => {
        // Mock backend implementation
        return fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    },
    logout: async () => {
        return fetchAPI('/auth/logout', { method: 'POST' });
    }
};

export const certificationService = {
    getAll: async () => {
        return fetchAPI('/certifications');
    },
    getById: async (id) => {
        return fetchAPI(`/certifications/${id}`);
    },
    create: async (data, file) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => formData.append(key, data[key]));
        if (file) formData.append('document', file);
        return fetchAPI('/certifications', { method: 'POST', body: formData });
    },
    delete: async (id) => {
        return fetchAPI(`/certifications/${id}`, { method: 'DELETE' });
    }
};

export default {
    auth: authService,
    certifications: certificationService
};
