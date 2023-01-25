import express from "express";
var router = express.Router();
import router_newsletter from "./newsletter";

router.use('/newsletter', router_newsletter);

// router.use('/', require('./users'));

export default router;