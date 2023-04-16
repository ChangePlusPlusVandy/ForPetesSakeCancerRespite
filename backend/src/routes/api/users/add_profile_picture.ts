
const express = require('express');
const { Storage } = require('@google-cloud/storage');
import { mongo } from "mongoose";
const Multer = require('multer');
import {
	auth,
	getTokenFromReq,
	getFromUserTokenAndAddIfNotFound,
} from "../../../firebase";
import { uploadImageToStorage } from "../images/create_image";
import VerifyToken from "../../../middlewares/VerifyToken";
import CONFIG from "../../../Config";
import { User } from "../../../models/User";

const storage = new Storage({ credentials: CONFIG.firebaseCert });
const bucket = storage.bucket("for-petes-sake-cancer-respite.appspot.com");
const router = express.Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // no larger than 25mb
	fieldSize: 25 * 1024 * 1024, // no larger than 25mb
  }
});

router.post("/add_profile_picture", multer.single("file"), VerifyToken, (req, res) => {
	let file = req.file;
	if (file) {
		uploadImageToStorage(file)
			.then(async (url: any) => {
                let user = (req as any).user;
                console.log(user._id);
                let mongoUser = await User.findByIdAndUpdate({_id: user._id }, { profile_picture: url }, { new: true });

                mongoUser.save();

				res.status(200).json({
					status: "success",
					url,
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}
});

export default router;