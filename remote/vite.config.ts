import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'fs';
import { defineConfig, loadEnv } from 'vite';
import { dependencies } from './package.json';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
	const selfEnv = loadEnv(mode, process.cwd());
	return {
		server: {
			fs: {
				allow: ['.', '../shared'],
			},
		},
		optimizeDeps: {
			include: ['react', 'react-dom', 'framer-motion', '@radix-ui/react-alert-dialog', '@radix-ui/react-popover', '@radix-ui/react-slot'],
		},
		test: {
			environment: 'jsdom',
			globals: true,
			setupFiles: ['./src/setupTests.ts'],

			include: ['src/**/*.{test,spec}.{ts,tsx}'],
			exclude: ['src/@types', 'node_modules'],
			coverage: {
				provider: 'istanbul', // or 'v8',
				reporter: ['text', 'json', 'html'],
			},
			alias: {
				'@': resolve(__dirname, 'src'),
			},
			deps: {
				interopDefault: true, // Enables correct ES module handling
			},
		},
		build: {
			chunkSizeWarningLimit: 500,
			minify: 'esbuild', // Faster and smaller output
			sourcemap: false, // Disable sourcemaps to reduce build size
			target: 'chrome89',
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
			},
		},
		plugins: [
			{
				name: 'generate-environment',
				options: function () {
					console.info('selfEnv', selfEnv);
					writeFileSync('./src/environment.ts', `export default ${JSON.stringify(selfEnv, null, 2)};`);
				},
			},
			federation({
				filename: 'remoteEntry.js',
				name: 'remote',
				exposes: {
					'./remote-app': './src/music-app.tsx',
				},
				remotes: {},
				shared: {
					react: {
						singleton: true,
						requiredVersion: dependencies.react,
					},
					'react-dom': {
						singleton: true,
						requiredVersion: dependencies['react-dom'],
					},
				},
			}),
			visualizer({
				filename: 'stats.html',
				open: true,
			}),
			react(),
		],
	};
});
