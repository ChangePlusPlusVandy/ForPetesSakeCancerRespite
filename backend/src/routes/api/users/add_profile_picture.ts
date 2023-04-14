
const express = require('express');
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');
import {
	auth,
	getTokenFromReq,
	getFromUserTokenAndAddIfNotFound,
} from "../../../firebase";
import { uploadImageToStorage } from "../images/create_image";
import VerifyToken from "../../../middlewares/VerifyToken";
import CONFIG from "../../../Config";

const storage = new Storage({ credentials: CONFIG.firebaseCert });
const bucket = storage.bucket("for-petes-sake-cancer-respite.appspot.com");
const router = express.Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024 // no larger than 20mb
  }
});

router.post("/add_profile_picture", multer.single("file"), VerifyToken, (req, res) => {
	let file = req.file;
	if (file) {
		uploadImageToStorage(file)
			.then(async (url: any) => {
                let user = (req as any).user;

                //update user with new profile picture
                user.profile_picture = url;
                user.save();

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