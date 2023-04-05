import express, { Request, Response, NextFunction } from "express";
import {
	auth,
	getTokenFromReq,
	getFromUserTokenAndAddIfNotFound,
} from "../../../firebase";
import { User } from "../../../models/User";

const router = express.Router();

router.get(
	"/search",
	async (req: Request, res: Response, next: NextFunction) => {
        try {
            const searchString = req.query.searchString;

            // check if the search string exists
            if (!searchString) {
                res.status(400).json({ message: "Search Paramater Not Provided" });
                return;
            }

            // get the list of users that match the search string
            const users = await User.find({
                username: { $regex: searchString, $options: "i" },
            });

            // remove sensitive information from each user json
            users.forEach((user) => {
                user.email = undefined;
                user.phone = undefined;
                user.groupchats = undefined;
            });

            // return the list of users
            res.json(users);
        } catch (e) {
            console.error(e);
            return res
                .status(401)
                .json({ message: "Unauthorized/invalid credentials" });
        }
	}
);

export default router;