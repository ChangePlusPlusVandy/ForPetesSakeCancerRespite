import { Request, Response } from "express";
import GroupChats from "../../../models/Groupchat";
import groupchat from "../../../types/groupchat";
import Messaging from "../../../models/Messages";
import {User} from "../../../models/User";
import user from "../../../types/user";

async function getGroupChatByID(req: Request, res: Response) {
  try {
    const gcID = req.query.id;
    const groupChat = await GroupChats.findById({ _id: gcID });
    if (groupChat === null) {
      res.status(404).json({ message: "GROUPCHAT DOES NOT EXIST" });
    } else {
      let expandedGroupChat = {
        _id: groupChat._id,
        name: groupChat.name,
        messages: [],
        users: [],
      };
      // add messages to the thing
      for (let i = 0; i < groupChat.messages.length; ++i) {
        const message: any = await Messaging.findById({
          _id: groupChat.messages[i]._id,
        });
        expandedGroupChat.messages.push({
          _id: message._id,
          user: message.user._id,
          message: message.message,
          timestamp: message.timestamp
        });
      }
      for (let i = 0; i < groupChat.users.length; ++i) {
        const userFromArray = await User.findById({
          _id: groupChat.users[i]._id,
        });
        expandedGroupChat.messages.push({
          _id: userFromArray._id,
          name: userFromArray.name,
        });
      }
      // TODO: Double-Check if user is actually in groupchat before returning groupchat
      res.status(200).json({ groupchat: expandedGroupChat });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { getGroupChatByID };
