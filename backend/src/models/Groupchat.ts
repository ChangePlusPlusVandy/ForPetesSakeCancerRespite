import mongoose from "mongoose";
import User from "./User";
import Messaging from "./Messages";

const groupChatSchema = new mongoose.Schema({
  name: String,
  messages: [Messaging],
  users: [User],
});

const GroupChats = mongoose.model("groupchat", groupChatSchema);

export default GroupChats;
