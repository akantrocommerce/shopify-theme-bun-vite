import { defineConfig } from 'vite';
import vitePluginSass from 'vite-plugin-sass';

export default defineConfig({
  clearScreen: false,
  publicDir: 'theme',
  plugins: [vitePluginSass()],
  assets: ['theme/**/*', 'scripts/**/*', 'styles/**/*', 'workflow/scripts/**/'],
  server: {
    ws: true,
    watch: {
      include: ['theme/**/*', 'scripts/**/*', 'styles/**/*'],
      exclude: ['dist/**', 'node_modules/**'],
    },
  },
  build: {
    rollupOptions: {
      plugins: {
        html: false,
      },
      output: {
        dir: 'dist',
        emptyOutDir: true,
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
