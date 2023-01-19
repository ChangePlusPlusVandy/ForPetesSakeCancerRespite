import express from "express";
import cors from "cors";
import router from "./routes";
import mongoose from "mongoose";

const app = express();
const PORT: number = parseInt(process.env.PORT as any) || 3000;
const MONGODB_URI: string = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/FPSCR";
require("./gateway")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

async function main() {
	await mongoose.connect(MONGODB_URI);
	console.log("Successfully connected to MongoDB")

	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

main().catch(err => console.log(err));

export default app;