import mongoose from "mongoose";
import GroupChats from "./Groupchat";

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	groupchats: [GroupChats],
});

export default mongoose.model("User", UserSchema);
