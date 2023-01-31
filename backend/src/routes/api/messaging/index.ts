import express from "express";
const router = express.Router();
import { createGroupChat } from "./create_groupchat";
import { getGroupChatByID } from "./get_groupchat";
import { getGroupsChats } from "./get_groupchats";

router.get("/get_groupchat", getGroupChatByID);

router.get("/get_groupchats", getGroupsChats);

router.post("/create_groupchat", createGroupChat);

export default router;
