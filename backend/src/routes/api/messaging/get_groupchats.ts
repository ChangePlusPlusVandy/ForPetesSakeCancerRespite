import { Request, Response } from "express";
import GroupChats from "../../../models/Groupchat";
import groupchat from "../../../types/groupchat";
import Messaging from "../../../models/Messages";
import {User} from "../../../models/User";
import user from "../../../types/user";

async function getGroupsChats(req: Request, res: Response) {
  try {
    let allGroupChat = [];
    // last message may be null
    const groupChats: any = await GroupChats.find();
    for (let i = 0; i < groupChats.length; ++i) {
      const message_array = groupChats[i].messages.sort('timestamp', -1).toArray()

      const groupChat = {
          "_id": groupChats[i]._id,
          "last_message": lastMessageFormat(message_array),
          "name": groupChats[i].name
      }
      allGroupChat.push(groupChat);
    }
    res.status(200).json({ groupchats: allGroupChat});
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function lastMessageFormat(message: any){
  if(message === null){
    return null
  } else{
    const last_message = message[0]
    return {
      "_id": last_message._id,
			"user": last_message.user._id,
			"username" : last_message.user.name,
			"message": last_message.message,
			"timestamp": last_message.timestamp
    } 
  }
}




export { getGroupsChats };
