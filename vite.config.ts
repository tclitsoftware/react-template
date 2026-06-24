import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), svgr()],
    envPrefix: 'REACT_APP_',
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts'
    },
    // Add this resolve block here so index pages got included
    resolve: {
        // Vite 8 introduces native tsconfigpath so we no longer need a plugin for it
        tsconfigPaths: true,
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.page.tsx']
    },
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'build',
    },
});
