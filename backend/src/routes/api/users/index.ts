import express from "express";
import login from "./login";
import signup from "./signup";
const dataRoute = express.Router();

dataRoute.use(login);
dataRoute.use(signup);

export default dataRoute;