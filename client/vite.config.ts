import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://localhost:1234",
				changeOrigin: true
			}
		}
	},
	resolve: {
		alias: {
			types: "/src/types",
			components: "/src/components",
			assets: "/src/assets",
			hooks: "/src/hooks",
			utils: "/src/utils",
			state: "/src/state",
			data: "/src/data"
		}
	}
})

