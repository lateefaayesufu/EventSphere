import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.PROD ? "https://eventsphere-txk2.onrender.com/api/v1" : "/api/v1",
	withCredentials: true, // ✅ always include cookies
});

export default axiosInstance;
