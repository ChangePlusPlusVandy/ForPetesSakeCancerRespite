import {Messaging, verifyMessage} from "../models/Messages";
import { Server, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { getUserFromToken } from "../firebase";
<<<<<<< HEAD
import { addOnlineUser, removeOnlineUser } from "./OnlineUsersManager";
import { mongo } from "mongoose";
=======
import { addOnlineUser, removeOnlineUser, getUserFromSocketID, checkIfUserOnline } from "./OnlineUsersManager";
import mongoose from "mongoose";
import {ObjectId} from "mongoose"
import { verify } from "crypto";
import { User } from "../models/User";
import Groupchats from "../models/Groupchat"
>>>>>>> 436c67108194e5865999e7cac546bc99a6b028f4

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

			// Console Logs the Message
			socket.on("message", this.onMessage.bind(this, socket));
			// Use this to send a message in a groupchat
			socket.on("send_groupchat_message", this.groupchatMessage.bind(this, socket));
			// Handles Auth with the OnlineUsersManager
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

<<<<<<< HEAD
	groupchatMessage(socket, msg, callback) {
		msg.groupchat = new mongo.ObjectId(msg.groupChat);
		const message = new Messaging(msg);	
		if(!verifyMessage(message)){
=======
	async groupchatMessage(socket, msg, callback) {
		
		// Verify and store message from groupchat
		const messageObjectToTry = {
			message: msg.message,
			user: null,
			groupchat: msg.groupchat,
			timestamp: Date.now()
		}
		
		console.log("Current User: " + getUserFromSocketID(socket.id))
		//console.log(msg)
		
		// Get the User and GroupChats objects for the corresponding IDS
		const user =  getUserFromSocketID(socket.id)
		messageObjectToTry.user = user
		if(!user){
			callback({
				status: "error",
				error: "INVALID USER"
			  })
			console.error("INVALID USER " + socket.id)
			return;
		}

		const userObject = await User.findById({_id: user})
		// check if user exists
		if(!userObject){
			callback({
				status: "error",
				error: "INVALID USER"
			})
			console.log("INVALID USER " + socket.id)
			return;
		}

		// check if provided gc exists
		const groupChat = await Groupchats.findById({_id: msg.groupchat})
		if(!groupChat){
			callback({
				status: "error",
				error: "INVALID GROUPCHAT"
			})
			console.error("INVALID GROUPCHAT " + socket.id)
			return;
		}
		
		// check if user in groupchat
		let userInGroupChat = false;
		for (let i = 0; i < groupChat.users.length; ++i) {
			if (groupChat.users[i].toString() === userObject._id.toString()) {
				userInGroupChat = true;
			}
		}
		if(!userInGroupChat){
>>>>>>> 436c67108194e5865999e7cac546bc99a6b028f4
			callback({
				status: "error",
				error: "INVALID USER IN GROUPCHAT"
			})
			console.error("INVALID USER IN GROUPCHAT " + socket.id)
			return;
		} 
		
		messageObjectToTry.user = [userObject._id]
		messageObjectToTry.groupchat = [groupChat._id]
		
		//console.log(messageObjectToTry)

		const message = new Messaging(messageObjectToTry);
		// verify message
		const vMessage = await verifyMessage(message)	
		//console.log(vMessage)
		if(!vMessage){
			console.error("USER " + socket.id + " SENT INVALID MESSAGE")
			return;
		}

		const newMessage = await message.save()

		//console.log("NEW MESSAGE: " + newMessage)
		
		console.log('SAVING MESSAGE "' + newMessage + '" from user ' + user);
		// add saved message to groupchat 

		const addedToGC = await Groupchats.findByIdAndUpdate({_id:newMessage.groupchat[0]},{$push: { messages: newMessage._id } })
		await this.recievedMessageOnlineUsers(newMessage)
		callback({
			status: "success",
			message: newMessage.message,
			groupchat_id: newMessage.groupchat[0],
			user_id: user
		})
	}

	async recievedMessageOnlineUsers(message){
		// needs to emit to each online user
		
		const groupChat = await Groupchats.findById({_id: message.groupchat[0]})
		for(let i = 0; i < groupChat.users.length; ++i){
			const user = await User.findById({_id: groupChat.users[i]})
			console.log("CHECKING IF " + user._id + " IS ONLINE")
			const socketID = checkIfUserOnline(user._id.toString())
			if(socketID){
				console.log("EMITTING MESSAGE TO " + user._id)
				this.socketIO.to(socketID).emit("recieved-message-user", {
					status: "success",
					message: message.message,
					groupchat_id: message.groupchat[0],
					user_id: message.user[0]
				});
			}

		}

	}

	async recievedMessageUser(message){
		console.log("sent message: " + message)
		return {
			status: "success",
			message: message.message,
			groupchat_id: message.groupchat[0],
			user_id: message.user[0]
		}
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