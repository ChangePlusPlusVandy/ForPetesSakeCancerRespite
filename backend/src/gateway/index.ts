import Messaging from "../models/Messages";
import { Server } from "socket.io";
import { Server as HTTPServer } from "http";

class Gateway {
	socketIO: Server;
	constructor(http: HTTPServer) {
		this.socketIO = new Server(http);
		console.log("Gateway initialized");
	}

	init() {
		this.socketIO.on("connection", (socket) => {
			console.log(`SOCKETIO: ${socket.id} user just connected!`);
			Messaging.find().then((result) => {
				socket.emit("output-messages", result);
			});

			socket.on("message", this.messageHandler.bind(this, socket));

			socket.on("disconnect", () => {
				console.log(`${socket.id} user disconnected`);
			});
		});
	}

	messageHandler(socket, msg) {
		const message = new Messaging({ msg });
		message.save().then((document) => {
			console.log(document)
			console.log("SAVING MESSAGE \"" + msg +"\" from user " + socket.id);
			this.socketIO.emit("message", msg);
		});
	}
}

export default Gateway;
