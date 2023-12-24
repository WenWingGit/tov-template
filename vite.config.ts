import Tov from './presets'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [Tov()],
	server: {
		port: 5173,
		proxy: {
			'/myapi': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/myapi/, ''),
			},
		},
	},
})
