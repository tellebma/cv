import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

const isDev = process.env.NODE_ENV === 'development';
const isGithubPages = process.env.BUILD_TARGET === 'github';

export default defineConfig({
  site: 'https://tellebma.github.io',
  base: isGithubPages ? '/cv' : '/',
  
  output: 'static',
  
  vite: {
    plugins: [tailwindcss()],
    
    build: {
      // Enable source maps for better debugging
      sourcemap: !isDev,
      
      // Optimize bundle
      rollupOptions: {
        output: {
          // Separate vendor chunks for better caching
          manualChunks: {
            vendor: ['phosphor-icons'],
          },
        },
      },
      
      // Asset optimization
      assetsInlineLimit: 4096, // Inline assets < 4KB
      cssCodeSplit: true,
      
      // Minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: !isDev,
          drop_debugger: !isDev,
        },
      },
    },
    
    // CSS optimization
    css: {
      devSourcemap: isDev,
    },
  },
  
  // Experimental features for performance
  experimental: {
    optimizeHoistedScript: true,
  },
  
  // Prefetch configuration
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: false,
  },
  
  // Security headers
  security: {
    checkOrigin: true,
  },
  
  // Dev server configuration
  server: {
    port: 4321,
    host: true,
  },
  
  // Build optimizations
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
});
