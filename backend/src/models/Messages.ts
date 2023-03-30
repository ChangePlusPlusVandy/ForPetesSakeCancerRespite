import { sign } from "crypto";
import mongoose from "mongoose";
import { User } from "./User";
import Groupchats from "./Groupchat"
import { timeStamp } from "console";

const MessagingSchema = new mongoose.Schema({
	message: {
		type: String,
		required: true,
	},
	user: {
		type: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	},
	
	groupchat: {
		type: { type: mongoose.Schema.Types.ObjectId, ref: 'GroupChats'}
	},
	
	timestamp:{
		type: Number,
		required: true
	}
});

const Messaging = mongoose.model("Messaging", MessagingSchema)


async function verifyMessage(msg){
	if(msg.message && msg.user && msg.groupchat && msg.timestamp){
		if(msg.message.length <= 0){
			return false;
		}
		const user = await User.findById({_id: msg.user})
		if(!user){
			return false;
		}
		const groupChat = await Groupchats.findById({_id: msg.groupchat})
		if(!groupChat){
			return false;
		} 
		if(msg.timeStamp < (Date.now()-10000000000)){
			return false
		}
		return true
	}
	return false;
}

export {Messaging, verifyMessage};
