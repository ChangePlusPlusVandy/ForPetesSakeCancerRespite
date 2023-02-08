import Messaging from "../models/Messages";
import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import GroupChats from "../models/Groupchat";

class Gateway {
  socketIO: Server;
  constructor(http: HTTPServer) {
    this.socketIO = new Server(http);
    console.log("Gateway initialized");
  }

  init() {
    this.socketIO.use((socket, next) => {
      const username = socket.handshake.auth.username;
      if (!username) {
        return next(new Error("invalid username"));
      }
      (socket as any).username = username;
      next();
    });

    this.socketIO.on("connection", (socket) => {
      console.log(`SOCKETIO: ${socket.id} user just connected!`);

      socket.on("send_message", this.onSendMessage.bind(this, socket));

      Messaging.find().then((result) => {
        socket.emit("output-messages", result);
      });

      socket.on("message", this.messageHandler.bind(this, socket));

      socket.on("disconnect", () => {
        console.log(`${socket.id} user disconnected`);
      });
    });
  }

  async onSendMessage(socket, content, group_id, userName) {
    try {
      const date = Date.now()
      const messageToBeAdded = new Messaging({
        message: content,
        groupChat: group_id,
        user: userName,
        timestamp: date
      });
      const added = await messageToBeAdded.save();
      // emit to all of the ids in the group
      const groupchat = await GroupChats.findById({ _id: { group_id } });
      for (let i = 0; i < groupchat.users.length; i++) {
        socket.to(groupchat.users[i]).emit("send_message", { added });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  messageHandler(socket, msg) {
    const message = new Messaging({ msg });
    message.save().then((document) => {
      console.log(document);
      console.log('SAVING MESSAGE "' + msg + '" from user ' + socket.id);
      this.socketIO.emit("message", msg);
    });
  }
}

export default Gateway;
