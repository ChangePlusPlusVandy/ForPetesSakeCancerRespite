import express from "express";
var router = express.Router();
import VerifyToken from "../../../middlewares/VerifyToken";
import { User } from "../../../models/User";
import { parsePhoneNumber } from "libphonenumber-js";

router.post("/update_user", VerifyToken, async (req, res) => {
  let user = (req as any).user;
  var userId = user._id;
  var newName = req.body.name;
  var newNumber = req.body.number;
  var newBio = req.body.bio;

  let phoneNum;
    try {
      phoneNum = parsePhoneNumber(newNumber, "US");
      if (!phoneNum.isValid()) {
        throw new Error();
      }
    } catch (e) {
      res.status(400).send({
        message: `Invalid phone number.`
      });
    }

  if (!newName || !newNumber) {
    // Basically, in the frontend these values are automatically set to the values they were before
    // So, by defult if a user sends an update_user request but doesn't change anything, nothing really needs to be changed
    // because the same values as before are just sent over. 

    // but, this condition will be true if the user were to delete the field and click update, you can't not have
    // a phone number or username, so we return error
    // if the user doesn't want a bio that's okay (bio = ""), no need to give an error
    res.status(400).send("Bad user input. Inputs required for all fields.");
    return;
  } else {
    var update = { $set: { name: newName, phone: newNumber, bio: newBio }};
    try {
      let doc = await User.findOneAndUpdate({_id: userId}, update, {
        new: true,
      });
      res.status(200).send({
        message: `successfully updated the name of this user to ${doc.name}`
      });
    } catch (e) {
      console.log(e.message);
      res.status(500).send({
        message: `Unable to update this user information in the backend`
      });
    }
  }
});

export default router;
