const express = require("express");
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
const sharp = require("sharp");
import CONFIG from "../../../Config";

const storage = new Storage({ credentials: CONFIG.firebaseCert });
const bucket = storage.bucket("for-petes-sake-cancer-respite.appspot.com");
const create_image = express.Router();

const multer = Multer({
	storage: Multer.memoryStorage(),
	limits: {
		fileSize: 25 * 1024 * 1024, // no larger than 25mb
		fieldSize: 25 * 1024 * 1024, // no larger than 25mb
	},
});

const convertToWebp = async (buffer) => {
	return sharp(buffer).webp().toBuffer();
};

create_image.post("/create_image", multer.single("file"), async (req, res) => {
	let file = req.file;
	if (file) {
		const webpFile = await convertToWebp(file.buffer);
		file.buffer = webpFile;
		file.mimetype = "image/webp";
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
});

const uploadImageToStorage = (file) => {
	return new Promise((resolve, reject) => {
		if (!file) {
			reject("No image file");
		}
		let newFileName = `${Date.now()}` + ".webp";

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

export { create_image, uploadImageToStorage };
