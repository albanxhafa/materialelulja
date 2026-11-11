import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
export default defineConfig({
  base: '/studio-workspace/',
  publicDir: false,
  resolve: {alias: {'@':fileURLToPath(new URL('.', import.meta.url))}},
  plugins: [tailwindcss()],
  build: {outDir:'../dist/studio-workspace',emptyOutDir:true}
});
