
const express = require('express');
const { Storage } = require('@google-cloud/storage');
import { mongo } from "mongoose";
const Multer = require('multer');
const sharp = require('sharp');
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
	},
	fileFilter: (req, file, cb) => {
		if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
			cb(new Error("Only .png and .jpg format allowed!"), false);
			return;
		}
		cb(null, true);
	},
});

const convertToWebp = async (buffer) => {
	return sharp(buffer).webp().toBuffer();
};

router.post("/add_profile_picture", multer.single("file"), VerifyToken, async (req, res) => {
	let file = req.file;
	if (file) {
		const webpFile = await convertToWebp(file.buffer).catch((error) => {res.status(500).json({status: "error", error: error.message})});
		file.buffer = webpFile;
		file.mimetype = "image/webp";
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
				res.status(500).json({
					status: "error",
					error: error.message,
				});
			});
	}
});

export default router;