import e, { Request, Response } from "express";
import GroupChats from "../../../models/Groupchat";
import VerifyToken from "../../../middlewares/VerifyToken";
import { Messaging } from "../../../models/Messages";
import { User } from "../../../models/User";

async function getGroupsChats(req: Request, res: Response) {
	try {
		// Gets User Information from Verify Token
		let user = (req as any).user;
		// Gets user Object based upon mongodb-id from user obj
		const userObject = await User.findById({ _id: user._id });
		//console.log(userObject)
		// Gets groups a user a is a part of
		const userGroupChats = userObject.groupchats;
		//console.log(userGroupChats)
		// Groupchat Arrays to Return
		let allGroupChat = [];

		// last message may be null
		// Gets ID, name and last_message from the groupchats based upon the IDS
		for (let i = 0; i < userGroupChats.length; ++i) {
			const groupChatObj = await GroupChats.findById({
				_id: userGroupChats[i],
			});

      // sorts messages in the current group in descending order by timestamp
			const messages = await Messaging.find({
				groupchat: userGroupChats[i],
			}).sort({ timestamp: -1 });

			const groupChat = {
				_id: userGroupChats[i],
				name: groupChatObj.name,
				last_message: null,
			};

      // Gets the last message of the Groupchat if exists, if not equals null
      if(messages && messages.length > 0){
        groupChat.last_message = {
					_id: messages[0]._id,
					user: user._id,
					username: user.name,
					message: messages[0].message,
					timestamp: messages[0].timestamp,
				};
      } else{
        groupChat.last_message = null
      }

      /*
			const message_array = groupChatObj.messages;

			if (message_array !== undefined && message_array.length > 0) {
				const last_message = await Messaging.findById({
					_id: message_array[message_array.length - 1],
				});
				const user = await User.findById({ _id: last_message.user[0] });
				groupChat["last_message"] = {
					_id: last_message._id,
					user: user._id,
					username: user.name,
					message: last_message.message,
					timestamp: last_message.timestamp,
				};
			}
      */
			//console.log(groupChat)
			allGroupChat.push(groupChat);
		}

		res.status(200).json({ groupchats: allGroupChat });
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export { getGroupsChats };
