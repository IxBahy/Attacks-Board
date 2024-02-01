import * as express from "express";
import * as http from "http";
import * as socketio from "socket.io";

export const createSocket = (
	expressServer: express.Express,
	config: socketio.ServerOptions = {} as socketio.ServerOptions
): socketio.Server => {
	const httpServer = http.createServer(expressServer);
	const io = new socketio.Server(httpServer, config);
	return io;
};
