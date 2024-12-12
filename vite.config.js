import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
	const env = loadEnv(mode, process.cwd());
	return (
		{
			plugins: [react(), mkcert()],
			server: {
				proxy: {
					'/api': {
						target: "https://atelier-manon.bernouy.fr",
						changeOrigin: true,
					},
				},
			},

	});
})
