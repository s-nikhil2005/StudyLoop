const { WebSocketServer } = require("ws");
// Import WebSocket server class

const { handleChatMessage } = require("./chatHandler");
// Import chat logic

function startWebSocketServer(server) {

  const wss = new WebSocketServer({ server });

  console.log("WebSocket server initialized");

  const clients = new Map();
  // Map: userId -> socket

  wss.on("connection", (socket, req) => {

    console.log("New WebSocket connection received");

    const url = new URL(req.url, `http://${req.headers.host}`);

    const userId = url.searchParams.get("userId");

    console.log("User trying to connect:", userId);

    if (!userId) {
      console.log("Connection rejected: missing userId");
      socket.close();
      return;
    }

    clients.set(userId, socket);

    console.log(`User connected: ${userId}`);
    console.log(`Active users: ${clients.size}`);

    socket.on("message", (data) => {

      console.log("Message received from:", userId);

      handleChatMessage(data, clients);

    });

    socket.on("close", () => {

      console.log(`User disconnected: ${userId}`);

      clients.delete(userId);

      console.log(`Active users: ${clients.size}`);

    });

  });

}

module.exports = { startWebSocketServer };