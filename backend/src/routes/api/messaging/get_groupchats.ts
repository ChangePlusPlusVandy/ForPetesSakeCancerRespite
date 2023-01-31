import { Request, Response } from "express";
import GroupChats from "../../../models/Groupchat";
import groupchat from "../../../types/groupchat";
import Messaging from "../../../models/Messages";
import User from "../../../models/User";
import user from "../../../types/user";

async function getGroupsChats(req: Request, res: Response) {
  try {
    let groupChatIds = [];
    const groupChats: groupchat[] = await GroupChats.find();
    for (let i = 0; i < groupChats.length; ++i) {
      groupChatIds.push(groupChats[i]._id);
    }
    res.status(200).json({ groupchatIds: groupChatIds });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { getGroupsChats };
