import path from 'path';
import { fileURLToPath } from 'url';
import { createServer, build } from 'vite';
import vitePluginSass from 'vite-plugin-sass';
import WebSocket from 'ws';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const command = {
  open: ['shopify', 'theme', 'open', '-e', 'development'],
  push: ['shopify', 'theme', 'push', '-e', 'development'],
};
const consoleLog = {
  buildStart: '[akantro] 🚀 Build starting...',
  buildCompleted: '[akantro] 🚀 Build completed...',
  pushInProgress: '[akantro] 🚀 Pushing theme...',
  pushCompleted: '[akantro] 🚀 Push completed...',
  viteStarting: '[akantro] 🚀 Starting Vite server...',
  viteListening:
    '[akantro] 🚀 Vite server listening @ http://localhost:5173/...',
  socketEstablished: '[akantro] 🚀 WebSocket connection established...',
  socketEmit: '[akantro] 🚀 WebSocket emit refresh...',
  browserOpen: '[akantro] 🚀 Opening theme in browser...',
  changeDetected: (path) => `[akantro] 🚀 Detected change in: ${path}`,
};

async function buildTheme() {
  // Step 1: Build the theme with Vite
  const viteConfig = {
    clearScreen: false,
    root: path.resolve(__dirname, '../'),
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
        key: '../key.pem', // Adjust the path as needed
        cert: '../cert.pem', // Adjust the path as needed
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
  };

  // Build starting
  console.log(`${consoleLog.buildStart}`);
  // Step 2: Push the theme with Shopify CLI API
  await build(viteConfig).then(async () => {
    // Build completed
    console.log(`${consoleLog.buildCompleted}`);
    // Push the theme
    console.log(`${consoleLog.pushInProgress}`);
    shopifyThemePush: await Bun.spawn(command.push, {
      cwd: path.resolve(__dirname, '../'),
      stdio: ['inherit'],
      async onExit(shopifyThemePush, exitCode, signalCode, error) {
        console.log(`${consoleLog.pushCompleted}`);
        // Step 3: Start Vite server
        console.log(`${consoleLog.viteStarting}`);
        const server = await createServer(viteConfig);
        console.log(`${consoleLog.viteListening}`);

        // Create a WebSocket server
        const wss = new WebSocket.Server({ noServer: true });

        wss.on('connection', (socket) => {
          console.log(`${consoleLog.socketEstablished}`);
        });

        // Associate the WebSocket server with the Vite server
        server.httpServer.on('upgrade', (request, socket, head) => {
          wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
          });
        });

        // Start the Vite server
        await server.listen();

        // Step 4: Open theme in browser
        shopifyThemeOpen: await Bun.spawn(command.open, {
          cwd: path.resolve(__dirname, '../'),
          stdio: ['inherit'],
          async onExit(shopifyThemeOpen, exitCode, signalCode, error) {
            console.log(`${consoleLog.browserOpen}`);
          },
        });
        // Step 5: Watch for changes in public, scripts, and styles
        server.watcher.on('change', async (filePath) => {
          if (!filePath.includes('dist' || 'node_modules')) {
            console.log(consoleLog.changeDetected(filePath));
            // Step 6: Shopify theme build
            console.log(`${consoleLog.buildStart}`);
            await build(viteConfig).then(async () => {
              console.log(`${consoleLog.buildCompleted}`);
            });
            // Step 7: Shopify theme push
            console.log(`${consoleLog.pushInProgress}`);
            shopifyThemePush: await Bun.spawn(command.push, {
              cwd: path.resolve(__dirname, '../'),
              stdio: ['inherit'],
              async onExit(shopifyThemePush, exitCode, signalCode, error) {
                console.log(`${consoleLog.pushCompleted}`);
                // Step 8: Reload theme when push is completed
                console.log(`${consoleLog.socketEmit}`);
                // Vite server send notification to the theme script to reload
                wss.clients.forEach((client) => {
                  if (client.readyState === WebSocket.OPEN) {
                    client.send('reloadTheme');
                  }
                });
              },
            });
          }
        });
      },
    });
  });
  return;
}

// Step 10: Error handling
buildTheme().catch((error) => {
  console.error('An error occurred:', error);
});
