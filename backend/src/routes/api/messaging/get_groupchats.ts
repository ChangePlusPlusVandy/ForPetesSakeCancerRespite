import { Request, Response } from "express";
import GroupChats from "../../../models/Groupchat";
import VerifyToken from "../../../middlewares/VerifyToken";
import Messaging from "../../../models/Messages";
import {User} from "../../../models/User";

async function getGroupsChats(req: Request, res: Response) {
  try {
    let user = (req as any).user;
    const userObject = await User.findById({ _id: user._id });
    //console.log(userObject)
    const userGroupChats = userObject.groupchats;
    //console.log(userGroupChats)
    let allGroupChat = [];
    // return all the groupchats the user is in

    // last message may be null
    
    for (let i = 0; i < userGroupChats.length; ++i) {
      const groupChatObj = await GroupChats.findById({_id: userGroupChats[i]});
      const groupChat = {
        "_id": userGroupChats[i],
        "name": groupChatObj.name,
        "last_message": null
    }
   // console.log(groupChat)
      // sort DOES NOT WORK - check for undefined messages
      // ASSUMPTION - ARRAY IS IN ORDER
      const message_array = groupChatObj.messages
      
      if(message_array !== undefined && message_array.length > 0){
        const last_message = Messaging.findById({_id:message_array[message_array.length - 1]})
        const user = await User.findById({_id: last_message[0].user})
        groupChat["last_message"] = {
          "_id": last_message[0]._id,
          "user": user._id,
          "username" : user.name,
          "message": last_message[0].message,
          "timestamp": last_message[0].timestamp
        }
      } 
      //console.log(groupChat)
      allGroupChat.push(groupChat);
    }

    res.status(200).json({ groupchats: allGroupChat});
  } catch (error) {
    console.log(error);
    throw error;
  }
}




export { getGroupsChats };
