import express from "express";
import { User } from "../../../models/User";
const router = express.Router();

router.get("/profile_picture", async (req, res) => {
  try {
    let user = req.query["id"];
    let mongoUser = await User.findById(user);
    let url = "";

    //check if the mongoDB user id exists
    if (!mongoUser) {
      res.status(400).json({ message: "User Not Found" });
      return;
    } else if (!mongoUser.profile_picture || mongoUser.profile_picture == "") {
      url =
        "https://firebasestorage.googleapis.com/v0/b/for-petes-sake-cancer-respite.appspot.com/o/defaultProfile.png?alt=media&token=2e4f8b9e-05d6-4c6a-a0fc-0b2c049b5f5d";
    } else {
      url = mongoUser.profile_picture;
    }

    // serve the image at url
    res.writeHead(302, { location: url });
    res.end();
  } catch (e) {
    let url =
      "https://firebasestorage.googleapis.com/v0/b/for-petes-sake-cancer-respite.appspot.com/o/defaultProfile.png?alt=media&token=2e4f8b9e-05d6-4c6a-a0fc-0b2c049b5f5d";
    res.writeHead(302, { location: url });
    res.end();
  }
});

export default router;
