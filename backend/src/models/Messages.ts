import mongoose from "mongoose";
import GroupChats from "./Groupchat";
import User from "./User";

const msgSchema = new mongoose.Schema({
	message: {
		type: String,
		required: true,
	},
	user: {
		type: User,
		required: true,
	},
	groupchat: {
		type: GroupChats,
		required: true,
	},
});

const Messaging = mongoose.model("msg", msgSchema);

export default Messaging;
