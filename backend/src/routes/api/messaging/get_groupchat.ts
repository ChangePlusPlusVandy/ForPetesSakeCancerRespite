import { Request, Response } from "express";
import GroupChats from "../../../models/Groupchat";
import {Messaging} from "../../../models/Messages";
import { User } from "../../../models/User";
import VerifyToken from "../../../middlewares/VerifyToken";

async function getGroupChatByID(req: Request, res: Response) {
	try {

		// Gets the User Information from Verfiy Token
		let user = (req as any).user;
		// Gets the GroupChat ID from the request
		const gcID = req.query.id;

		// Checks if groupchat id exists
		if (!gcID) {
			res.status(400).json({ message: "GROUPCHAT ID NOT PROVIDED" });
			return;
		}
		// Checks if the GroupChat Exists
		const groupChat = await GroupChats.findById({ _id: gcID });
		if (!groupChat) {
			res.status(404).json({ message: "GROUPCHAT DOES NOT EXIST" });
			return;
		}
		// Create the object to return
		let expandedGroupChat = {
			_id: groupChat._id,
			name: groupChat.name,
			messages: [],
			users: [],
		};
		
		// Loop to get get Messages in the GroupChat
		for (let i = 0; i < groupChat.messages.length; ++i) {
			const message: any = await Messaging.findById({
				_id: groupChat.messages[i]._id,
			});
			expandedGroupChat.messages.push({
				_id: message._id,
				user: message.user[0]._id,
				message: message.message,
				timestamp: message.timestamp,
			});
		}
		// make sure that user is in groupchat
		let userInGroupChat = false;
		// Loop to get Users in the GroupChat and check if user in groupchat
		for (let i = 0; i < groupChat.users.length; ++i) {
			const userFromArray = await User.findById({
				_id: groupChat.users[i]._id,
			});
			if (groupChat.users[i]._id == user._id) {
				userInGroupChat = true;
			}
			expandedGroupChat.users.push({
				_id: userFromArray._id,
				name: userFromArray.name,
			});
		}
		// Check if user is in GroupChat
		if (!userInGroupChat) {
			res.status(403).json({ message: "USER NOT IN GROUPCHAT" });
			return;
		}
		res.status(200).json({ groupchat: expandedGroupChat });
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { getGroupChatByID };
