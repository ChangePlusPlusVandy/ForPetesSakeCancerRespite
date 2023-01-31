import express, {Request, Response, NextFunction} from "express";
import { User } from "../models/User"
const router = express.Router();

// add new user data to the mongoDB database
router.post(
    "/api/users/login", 
    async (req: Request, res: Response, next: NextFunction)  => {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const token = req.body.token;

        // check if email in use
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            //check if user tokens match else update tokens
            if(existingUser.password === password && existingUser.token === token) {
                return next({"message": "User exists"});
            }
            else {
                existingUser.token = token;
                await existingUser.save();
                return next({"message": "User token updated"});
            }
        }
        else {
            return next({"message": "User does not exist"});
        }
});

export default router;