import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		proxy: {
			"/api": {
				target: "https://eventsphere-txk2.onrender.com/api-docs/", // your backend
				changeOrigin: true,
				secure: true,
			},
		},
	},
});
