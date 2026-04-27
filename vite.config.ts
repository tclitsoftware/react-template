import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), tsconfigPaths(), svgr()],
    envPrefix: 'REACT_APP_',
    // Add this resolve block here so index pages got included
    resolve: {
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
