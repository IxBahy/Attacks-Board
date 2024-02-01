import express from "express";
import { Express } from "express";
import * as socketio from "socket.io";
import { consume } from "./libs/consumer";
import { createSocket } from "./libs/websocket";

const app: Express = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello NOD Readers!");
});

app.listen(port, () => {
	return console.log(
		`Express server is listening at http://localhost:${port} 🚀`
	);
});

export const handleConnection = (socket: socketio.Socket): void => {
	console.log("here s the socket ", socket.id);
};

const io: socketio.Server = createSocket(app);

io.on("connection", handleConnection);

consume((value) => {
	console.log(value);
	// io.sockets.emit("newMessage", { from, to, message });
});
