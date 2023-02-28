import express from "express";
var router = express.Router();
import router_newsletter from "./newsletter";
import router_messaging from "./messaging";
import users from "./users";

router.use("/newsletter", router_newsletter);
router.use("/messaging", router_messaging);
router.use("/users", users);
// router.use('/', require('./users'));

export default router;
