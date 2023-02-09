import express from "express";
var router = express.Router();
import router_newsletter from "./newsletter";
import users from "./users";

router.use('/newsletter', router_newsletter);

router.use('/users', users);

export default router;