import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL || "/api/v1", // ✅ proxy in dev
	withCredentials: true, // ✅ always include cookies
});

export default axiosInstance;
