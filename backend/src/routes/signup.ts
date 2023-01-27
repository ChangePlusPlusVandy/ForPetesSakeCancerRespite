import express, {Request, Response, NextFunction} from "express";
import { User } from "../models/User"
const router = express.Router();

// add new user data to the mongoDB database
router.post(
    "/api/users/signup", 
    async (req: Request, res: Response, next: NextFunction)  => {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // check if email in use
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return next(new Error('Email in use'));
        }

        const user = User.build({
            name,
            email,
            password,
        });
        await user.save();
        res.send({ user });
});

export default router;