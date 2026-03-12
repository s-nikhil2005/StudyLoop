const http = require('http');   // Node's built-in HTTP module.

const app = require('./app');
const { PORT } = require('./constants');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');

const { startWebSocketServer } = require("./websocket/index.js") // Import WebSocket initializer.

const startServer = async () => {
    try {
        await connectDB();
        console.log("MongoDB Connected");
        await connectRedis();

        const server = http.createServer(app); // Create an HTTP server using the Express app.
        startWebSocketServer(server); // Start the WebSocket server on the same HTTP server.
    //    console.log(startWebSocketServer);
       console.log("WebSocket server started");
       
       
       server.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});

    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

startServer();
