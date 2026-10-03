import axios from 'axios';

// Shared axios instance: sends the auth cookie with every request.
// VITE_API_URL points at the backend in local dev; in production it is empty
// so requests are relative (same-origin /api/... on Vercel).
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '',
    withCredentials: true,
});

// Turns a failed request into a message the user can act on.
// - Server sent a JSON message (e.g. "Email already in use") → show it.
// - Server replied without a message (timeout page, crash, 404) → show the status.
// - No reply at all (backend down, network, CORS) → say the server can't be reached.
export const getRequestErrorMessage = (error) => {
    if (error?.response) {
        const { status, data } = error.response;
        return data?.message || `Server error (HTTP ${status}). Please try again.`;
    }

    if (error?.request) {
        return import.meta.env.DEV
            ? 'Cannot reach the server. Is the backend running on port 4000?'
            : 'Cannot reach the server. Check your connection and try again.';
    }

    return error?.message || 'Something went wrong. Please try again.';
};

export default api;
