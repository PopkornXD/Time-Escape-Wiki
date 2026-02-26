import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		plugins: [sveltekit()],
		define: {
			'process.env.DB_HOST': JSON.stringify(env.DB_HOST),
			'process.env.DB_USER': JSON.stringify(env.DB_USER),
			'process.env.DB_PASSWORD': JSON.stringify(env.DB_PASSWORD),
			'process.env.DB_NAME': JSON.stringify(env.DB_NAME),
			'process.env.DB_CONNECTION_LIMIT': JSON.stringify(env.DB_CONNECTION_LIMIT)
		}
	};
});
