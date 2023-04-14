import express from "express";
import create_image from "./create_image";
const router = express.Router();

router.use(create_image);

export default router;
