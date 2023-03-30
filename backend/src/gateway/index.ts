import {Messaging, verifyMessage} from "../models/Messages";
import { Server, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { getUserFromToken } from "../firebase";
import { addOnlineUser, removeOnlineUser } from "./OnlineUsersManager";
import { mongo } from "mongoose";

class Gateway {
	socketIO: Server;
	constructor(http: HTTPServer) {
		this.socketIO = new Server(http, {
			cors: {
				origin: "*",
			},
		});
		console.log("Gateway initialized");
	}

	init() {
		this.socketIO.on("connection", (socket) => {
			console.log(`SOCKETIO: ${socket.id} user just connected!`);
			Messaging.find().then((result) => {
				socket.emit("output-messages", result);
			});

			socket.on("message", this.onMessage.bind(this, socket));

			socket.on("send_groupchat_message", this.groupchatMessage.bind(this, socket));

			socket.on("authentication", this.authHandler.bind(this, socket));

			socket.on("disconnect", () => {
				let userDisconnected = removeOnlineUser(socket.id);

				if (userDisconnected) {
					console.log(
						`SOCKETIO: ${socket.id} user disconnected as ${userDisconnected}`
					);
				} else {
					console.log(`${socket.id} user disconnected`);
				}
			});
		});
	}

	onMessage(socket, msg) {
		console.log(`USER ${socket.id} SENT ${msg}`);
	}

	groupchatMessage(socket, msg, callback) {
		msg.groupchat = new mongo.ObjectId(msg.groupChat);
		const message = new Messaging(msg);	
		if(!verifyMessage(message)){
			callback({
				error: "INVALID MESSAGE"
			})
			console.error("USER " + socket.id + " SENT INVALID MESSAGE")
			return;
		}
		message.save().then((document) => {
			console.log(document);
			console.log('SAVING MESSAGE "' + msg + '" from user ' + socket.id);
			this.socketIO.emit("message", msg);
		});
	}

	async authHandler(socket: Socket, token: string) {
		try {
			let user = await getUserFromToken(token);
			addOnlineUser(socket.id, user._id);
			console.log(`SOCKETIO: ${socket.id} user authenticated as ${user.email}`);
		} catch (e) {
			console.error(e);
			socket.emit("error", "Invalid token");
		}
	}
}

export default Gateway;