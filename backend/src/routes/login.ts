import express, {Request, Response, NextFunction} from "express";
import auth from "../firebase";
import { User } from "../models/User"
const router = express.Router();

// add new user data to the mongoDB database
router.post(
    "/api/users/login", 
    async (req: Request, res: Response, next: NextFunction)  => {
        const name = req.body.name;
        const email = req.body.email;

        // check if email in use
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return next({"message": "User exists"});
        }
        else {
            // create new mongoDB user but first check if firebase user exists
            auth.getUserByEmail(email)
            .then(async (userRecord) => {
                const user = User.build({
                    name,
                    email,
                });
                await user.save();
                res.send({ user });
            })
            // if firebase user does not exist, do not create mongodb user
            .catch((error) => {
                console.log(error);
                return next(new Error('Firebase user not found'));
            });
        }
});

export default router;