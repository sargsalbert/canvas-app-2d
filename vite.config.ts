import { defineConfig } from "vitest/config"; 
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import viteCompression from "vite-plugin-compression";


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({ algorithm: "gzip" }), 
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
  build: {
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true, 
        drop_debugger: true,
      },
      output: {
        comments: false, 
      },
    },
    rollupOptions: {
      treeshake: true, 
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; 
          }
        },
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
