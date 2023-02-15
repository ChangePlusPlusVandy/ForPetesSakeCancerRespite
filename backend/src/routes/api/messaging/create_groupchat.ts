import { Request, Response } from "express";
import GroupChats from "../../../models/Groupchat";
import groupchat from "../../../types/groupchat";
import Messaging from "../../../models/Messages";
import {User} from "../../../models/User";
import user from "../../../types/user";

// MAKE RANDOM USER OBJECTS

async function createGroupChat(req: Request, res: Response) {
	try {
		const body = {
			users: req.body.user,
			name: req.body.name,
		};
		if (body.users.length <= 0 || body.name.length() <= 0) {
			res
				.status(400)
				.json({ message: "ERROR", error: "INVALID NAME OR EMPTY ARRAY" });
		} else {
			// add to User, groupchat
			// go through to make sure valid ids
			for (let i = 0; i < body.users.length; ++i) {
				const user: user = await User.findById(
					body.users[i]._id,
					(err, val) => {
						if (err || val === null) {
							res.status(400).json({ message: "ERROR", error: err });
						}
					}
				);
			}
			// good users, create group chat
			const GroupChatToBeAdded = new GroupChats({
				name: body.name,
				messages: [],
				users: body.users,
			});
			const added = await GroupChatToBeAdded.save();
			// now add users to the groupchats
			for (let i = 0; i < body.users.length; ++i) {
				await User.findByIdAndUpdate(
					{ _id: body.users[i] },
					{ $push: { groupchats: added._id } }
				);
			}
			res.status(200).json({ newGroupChat: added });
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export { createGroupChat };
