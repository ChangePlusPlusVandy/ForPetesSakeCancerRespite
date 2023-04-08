
const express = require('express');
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');
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

router.post('/create_image', multer.single('file'), (req, res) => {
  let file = req.file;
  if (file) {
    uploadImageToStorage(file).then((success) => {
      res.status(200).send({
        status: 'success'
      });
    }).catch((error) => {
      console.error(error);
    });
  }
});

const uploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    let newFileName = `${file.originalname}_${Date.now()}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      reject('ERROR: Unable to Upload File: ' + error.message);
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = `https://storage.googleapis.com/for-petes-sake-cancer-respite.appspot.com/${fileUpload.name}`;
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
}

export default router;