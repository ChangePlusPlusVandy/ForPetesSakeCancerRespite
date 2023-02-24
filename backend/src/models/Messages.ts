import mongoose from "mongoose";

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


export default mongoose.model("Messaging", MessagingSchema);
