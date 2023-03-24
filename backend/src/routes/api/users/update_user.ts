import express from "express";
var router = express.Router();
import VerifyToken from "../../../middlewares/VerifyToken";
import { User } from "../../../models/User";

router.post("/update_user", VerifyToken, async (req, res) => {
  let user = (req as any).user;
  var userId = user._id;
  var newName = req.body.name;
  var newNumber = req.body.number;
  if (!newName || !newNumber) {
    res.status(400).send("Bad user input. Inputs required for all fields.");
    return; // if we have no new info, just return
  } else {
    var update = { name: newName }; // CHANGE NUMBER HERE TOO
    try {
      let doc = await User.findOneAndUpdate(userId, update, {
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
