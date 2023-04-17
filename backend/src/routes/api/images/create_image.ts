const express = require("express");
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
import CONFIG from "../../../Config";

const storage = new Storage({ credentials: CONFIG.firebaseCert });
const bucket = storage.bucket("for-petes-sake-cancer-respite.appspot.com");
const router = express.Router();

const multer = Multer({
	storage: Multer.memoryStorage(),
	limits: {
		fileSize: 25 * 1024 * 1024, // no larger than 8mb
		fieldSize: 25 * 1024 * 1024

	},
});

router.post("/create_image", multer.single("file"), (req, res) => {
	let file = req.file;
	console.log("image received is: ")
	console.log(file)
	if (file) {
		uploadImageToStorage(file)
			.then((url: any) => {
				res.status(200).json({
					status: "success",
					url,
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}
	else
	{
		res.status(400).send();
	}
});

const uploadImageToStorage = (file) => {
	return new Promise((resolve, reject) => {
		if (!file) {
			reject("No image file");
		}
		let newFileName = `${file.originalname}_${Date.now()}`;

		let fileUpload = bucket.file(newFileName);

		const blobStream = fileUpload.createWriteStream({
			metadata: {
				contentType: file.mimetype,
			},
		});

		blobStream.on("error", (error) => {
			reject("ERROR: Unable to Upload File: " + error.message);
		});

		blobStream.on("finish", () => {
			// The public URL can be used to directly access the file via HTTP.
			const url = `https://firebasestorage.googleapis.com/v0/b/for-petes-sake-cancer-respite.appspot.com/o/${fileUpload.name}?alt=media`;
			resolve(url);
		});

		blobStream.end(file.buffer);
	});
};

export default router;
