import axios from 'axios';

// Shared axios instance: sends the auth cookie with every request.
// VITE_API_URL points at the backend in local dev; in production it is empty
// so requests are relative (same-origin /api/... on Vercel).
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '',
    withCredentials: true,
});

export default api;
