import express from "express";
import { Express } from "express";
import { createServer } from "http";
import * as socketio from "socket.io";
import { consume } from "./libs/consumer";
import { createSocket } from "./libs/websocket";
import { searchRouter } from "./routes/searchRoutes";
import morgan from "morgan";
import cors from "cors";
const app: Express = express();
const port = 5000;
var corsOptions = {
	origin: `*`,
	optionsSuccessStatus: 200,
};
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/query", searchRouter);
app.get("/", (req, res) => {
	console.log("hi");
});
const httpServer = createServer(app);

httpServer.listen(port, () => {
	return console.log(
		`Express server is listening at http://localhost:${port} 🚀`
	);
});

export const handleConnection = (socket: socketio.Socket): void => {
	console.log("here is the socket ", socket.id);
};

const io: socketio.Server = createSocket(httpServer, {
	cors: {
		origin: "*",
	},
});

io.on("connection", handleConnection);

consume((value: string) => {
	console.log(value);
	io.sockets.emit("attack-event", value);
});
