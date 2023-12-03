// themeReload.js
async function initWebSocket() {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket('wss://localhost:5173');

    socket.addEventListener('open', () => {
      console.log('WebSocket connection opened.');
      resolve(socket);
    });

    socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
      reject(error);
    });

    socket.addEventListener('close', (event) => {
      console.log(
        'WebSocket connection closed. Code:',
        event.code,
        'Reason:',
        event.reason
      );
      // You can add logic here to attempt reconnection if needed
      reject(
        new Error(
          `WebSocket connection closed. Code: ${event.code}, Reason: ${event.reason}`
        )
      );
    });
  });
}

async function startWebSocket() {
  try {
    const socket = await initWebSocket();

    socket.addEventListener('message', (event) => {
      const eventData = event.data.trim();
      console.log('Received message:', eventData);

      if (eventData === 'reloadTheme') {
        console.log('Reloading theme...');
        window.location.reload();
      }
    });
  } catch (error) {
    // Handle initialization errors
    console.error('WebSocket initialization error:', error);
  }
}

if (
  typeof window.Shopify !== 'undefined' &&
  window.Shopify.theme.role === 'unpublished'
) {
  startWebSocket();
}
