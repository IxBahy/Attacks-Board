import express from "express";
import { Express } from "express";
import * as socketio from "socket.io";
import { consume } from "./libs/consumer";
import { createSocket } from "./libs/websocket";
import { searchRouter } from "./routes/searchRoutes";
import morgan from "morgan";
import cors from "cors";
const app: Express = express();

const port = 5000;
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/query", searchRouter);
app.get("/", (req, res) => {
	console.log("hi");
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

consume((value: string) => {
	console.log(value);
	io.sockets.emit(value);
});
