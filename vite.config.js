import { defineConfig } from 'vite';
import vitePluginSass from 'vite-plugin-sass';

export default async () => {
  return defineConfig({
    clearScreen: false,
    publicDir: 'theme',
    plugins: [vitePluginSass()],
    assets: [
      'theme/**/*',
      'scripts/**/*',
      'styles/**/*',
      'workflow/scripts/**/',
    ],
    server: {
      https: {
        key: './key.pem', // Adjust the path as needed
        cert: './cert.pem', // Adjust the path as needed
      },
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
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
        },
      },
    },
  });
};
