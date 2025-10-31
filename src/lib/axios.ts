import axios from "axios";

// Create axios instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000", // Django base URL
    withCredentials: true, // allows sending cookies if you use session auth
    headers: {
        "Content-Type": "application/json",
    },
});

// Optionally attach token automatically if using JWT
api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
