import mongoose from "mongoose";

const groupChatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  messages:{
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Messaging'}]
  } ,
  users:{
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
  },
});

export default mongoose.model("GroupChats", groupChatSchema);
