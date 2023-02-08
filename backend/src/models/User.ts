import mongoose from "mongoose";
import GroupChats from "./Groupchat";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: { 
		type: String, 
		required: true },
	password: { 
		type: String, 
		required: true },
	groupchats: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GroupChats' }]
	},
});

export default mongoose.model("User", UserSchema);
