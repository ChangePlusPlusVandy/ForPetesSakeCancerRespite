import express from "express";
import router_api from "./api";
import * as Mongoose from "mongoose";
import * as mongoDB from "mongodb";

const router = express.Router();

const uri = 'mongodb://localhost/Newsletter'; // can change 


// // initialize connection
// const client: mongoDB.MongoClient = new mongoDB.MongoClient("mongodb://localhost/Newsletter");
// const account = async () => {
// 	await client.connect()
// 	.then(()=>console.log('successfully connected to db!'))
// 	.catch(e=>console.log(e));;
// };
// account();

Mongoose.connect(uri, (err: any) => {
	if (err) {
	  console.log(err.message);
	} else {
	  console.log("Successfully Connected!");
	}
  });

router.get("/", async (req, res) => {
	res.send("Hello World!");
});

router.use('/api', router_api);

export default router;