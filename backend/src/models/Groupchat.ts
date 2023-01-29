import mongoose from 'mongoose'

const groupChatSchema = new mongoose.Schema({
    name: String,
    messages: [],
    users: []
})

const GroupChats = mongoose.model("groupchat", groupChatSchema);

export default GroupChats;