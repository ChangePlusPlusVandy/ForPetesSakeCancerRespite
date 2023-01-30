import mongoose from "mongoose"
import user from "../types/user";

// CHANGE TO USER TYPE LATER
const msgSchema = new mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    groupchat:{
        type: Object,
        required: true
    }
})

const Messaging = mongoose.model("msg", msgSchema);

export default Messaging;