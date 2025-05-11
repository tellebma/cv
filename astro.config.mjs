import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

const isGithubPages = process.env.BUILD_TARGET === 'github';

export default defineConfig({
  base: isGithubPages ? '/cv' : '/',
  vite: {
    plugins: [tailwindcss()],
  },
});
