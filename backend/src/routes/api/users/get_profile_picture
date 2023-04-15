import express from "express";
import { User } from "../../../models/User";
const router = express.Router();

router.get("/profile_picture", async (req, res) => {
    let user = req.query["id"];
    let mongoUser = await User.findById(user);

    //check if the mongoDB user id exists and has profile picture
    if (!mongoUser || !mongoUser.profile_picture) {
        res.status(400).json({ message: "User Not Found" });
        return;
    }

    //return the profile picture
    res.json(mongoUser.profile_picture);
});

export default router;