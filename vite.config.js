import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';


// https://vite.dev/config/
export default defineConfig(({mode}) => {
	const env = loadEnv(mode, process.cwd());
	return (
		{
			plugins: [react()],
			server: {
				host: 'atelier-manon.bernouy.fr',
				proxy: {
					'/api': {
						target: "https://api.atelier-manon.bernouy.fr",
						changeOrigin: true,
					},
				},
			},

	});
})
