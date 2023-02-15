import express, {Request, Response, NextFunction} from "express";
import auth from "../../../firebase";
import VerifyToken from "../../../middlewares/VerifyToken";
import { User } from "../../../models/User"
const router = express.Router();

// add new user data to the mongoDB database
router.post(
    "/signup", VerifyToken,
    async (req: any, res: Response, next: NextFunction)  => {
        const name = req.body.name;
        const email = req.body.email;

        console.log(req.user);

        // check if email in use
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return next(new Error('Email in use'));
        }
        else {
            const user = User.build({
                name,
                email,
                groupchats: []
            });
            await user.save();
            res.send({ user });
        }
});

export default router;