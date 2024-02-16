import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/a11y/',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "../src/assets/styles/scss/variables.scss";`
      }
    },
    postcss: { plugins: [autoprefixer()] }
  },
  plugins: [vue()],
  build: {
    // In a lot of guides & use-cases, this is turned off as it's too buggy.
    cssCodeSplit: false
  }
});
