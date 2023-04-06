import { Request, Response } from "express";
import GroupChats from "../../../models/Groupchat";
import { User } from "../../../models/User";


async function createGroupChat(req: Request, res: Response) {
	try {
		// Gets the User Information from Verfiy Token
		let user = (req as any).user;

		// Gets the User ids and Groupchat Name from Request
		const body = {
			users: req.body.users,
			name: req.body.name,
		};
		// Checks the entered parameters
		if (body.users.length <= 0) {
			res.status(400).json({ error: "EMPTY ARRAY" });
			return;
		}
		if (Array.isArray(body.users) === false || typeof body.name !== "string" || (typeof body.name === "string" && body.name === "")){
			res.status(400).json({ error: "INVALID NAME OR EMPTY ARRAY" });
			return;
		}

		// add to Users, groupchat
		// Array of users
		const users = [];

		for (let i = 0; i < body.users.length; ++i) {
			try {
				// Checks if the user exists if not, throw error
				//  If user exists, then add to the user array
				const user = await User.findById(body.users[i]);
				if(!user)
				{
					throw new Error("User not found");
				}
				users.push(user._id)
			} catch (error) {
				console.error(error);
				res.status(400).json({ error: "User not found" });
				return;
			}
		}
		// good users, create group chat
		const GroupChatToBeAdded = new GroupChats({
			name: body.name,
			messages: [],
			users,
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
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export { createGroupChat };
