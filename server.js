const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const server = new WebSocket.Server({ port: 8080 });

let clients = [];

// Handle new connections
server.on('connection', (socket) => {
    console.log('New client connected');
    clients.push(socket);

    // Handle incoming messages from a client
    socket.on('message', (message) => {
        // Relay the message to all other clients
        clients.forEach(client => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle client disconnection
    socket.on('close', () => {
        console.log('Client disconnected');
        clients = clients.filter(client => client !== socket);
    });
});

console.log('WebSocket signaling server is running on ws://localhost:8080');
