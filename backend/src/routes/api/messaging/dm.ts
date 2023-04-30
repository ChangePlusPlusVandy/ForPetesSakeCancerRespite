import { Request, Response } from "express";
import { User } from "../../../models/User";
import Groupchat from "../../../models/Groupchat";

async function private_messaging(req: Request, res: Response) {
	try {
		// Gets the User Information from Request
		const userID = req.body.userToDM;
		const userIDINFO = await User.findById(userID);
		// Get Self Information
		const selfUser = (req as any).user;
		const selfIDINFO = await User.findById(selfUser._id);

        console.log(userIDINFO)
        console.log(selfIDINFO)
		// Check if userID is valid
		if (!userIDINFO) {
            res.status(404).json({error:"USER NOT FOUND"})
			return;
		}

		// Check if GroupChat betweeen both IDs exist

		// const groupChatPossibleID = await Groupchat.findOne({users: {$in:[selfIDINFO._id, userIDINFO._id]}})
		const groupChatPossibleID = await Groupchat.findOne({
			$and: [
				{ users: { $in: [selfIDINFO._id] } },
				{ users: { $in: [userIDINFO._id] } },
			],
		});
		// If so, return first ID
        if(groupChatPossibleID && groupChatPossibleID.users.length == 2){
            res.status(200).json({"groupchat": groupChatPossibleID._id})
            return;
        }

		// If not, create the groupchat and return the groupchat ID
        const newGroupChat = new Groupchat({
            name: "DM: " + selfIDINFO.name + " " + userIDINFO.name,
            users: [selfIDINFO._id, userIDINFO._id],
            messages: []
        })
        const addedGC = await newGroupChat.save()
        // add gc id to users
        await User.findByIdAndUpdate(
            { _id: selfIDINFO._id },
            { $push: { groupchats: addedGC._id } }
        );
        await User.findByIdAndUpdate(
            { _id: userIDINFO._id },
            { $push: { groupchats: addedGC._id } }
        );

        res.status(200).json({"groupchat": newGroupChat._id})

	} catch (error) {
        res.status(500).send(error);
		console.error(error);
		throw error;
	}
}

export { private_messaging };
