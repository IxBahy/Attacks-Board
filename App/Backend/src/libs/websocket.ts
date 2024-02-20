import * as express from "express";
import * as http from "http";
import * as socketio from "socket.io";

export const createSocket = (
	Server: http.Server,
	config: Partial<socketio.ServerOptions> = {} as Partial<socketio.ServerOptions>
): socketio.Server => {
	const io = new socketio.Server(Server, config);

	return io;
};
