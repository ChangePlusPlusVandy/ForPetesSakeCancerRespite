import express from "express";
const router = express.Router();
import VerifyToken from "../../../middlewares/VerifyToken";
import { createGroupChat } from "./create_groupchat";
import { getGroupChatByID } from "./get_groupchat";
import { getGroupsChats } from "./get_groupchats";

router.get("/get_groupchat", VerifyToken, getGroupChatByID);

router.get("/get_groupchats",  VerifyToken, getGroupsChats);

router.post("/create_groupchat",  VerifyToken, createGroupChat);

export default router;
