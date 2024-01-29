import express from "express";
import * as WebSocket from "ws";
const wss = new WebSocket.Server({ noServer: true });
const app = express();
const port = 3000 as const;

wss.on("connection", (ws: WebSocket) => {
	console.log("WebSocket connection opened");

	ws.on("message", (message: string) => {
		console.log(`Received message: ${message}`);

		// Broadcast the received message to all connected clients
		wss.clients.forEach((client) => {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(message);
			}
		});
	});

	ws.on("close", () => {
		console.log("WebSocket connection closed");
	});
});

const httpServer = app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

httpServer.on("upgrade", (req, socket, head) => {
	wss.handleUpgrade(req, socket, head, (ws) => {
		wss.emit("connection", ws, req);
	});
});
