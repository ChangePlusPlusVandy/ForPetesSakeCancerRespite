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
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	},
	
	groupchat: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GroupChats'}]
	},
	
	timestamp:{
		type: Number,
		required: true
	}
});

const Messaging = mongoose.model("Messaging", MessagingSchema)


async function verifyMessage(msg){
	
	if(msg.message && msg.user[0] && msg.groupchat[0] && msg.timestamp){
		//console.log("verifyingMessage...")
		//console.log(msg)
		//console.log(msg.user)
		//console.log(msg.groupchat)

		const user = await User.findById({_id: msg.user[0]})
		if(!user){
			console.log("invalid user")
			return false;
		}
		const groupChat = await Groupchats.findById({_id: msg.groupchat[0]})
		if(!groupChat){
			console.log("invalid groupchat")
			return false;
		}
		let userInGroupChat = false;

		for (let i = 0; i < groupChat.users.length; ++i) {
			if (groupChat.users[i]._id.toString() == user._id.toString()) {
				userInGroupChat = true;
			}
		}
		if(!userInGroupChat){
			console.log("invalid user in groupchat")
			return false;
		}
		
		if(msg.timeStamp < (Date.now()-10000000000)){
			console.log("invalid timestamp")
			return false
		}
		return true
	}
	return false;
}

export {Messaging, verifyMessage};
