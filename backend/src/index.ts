import express from "express";
import cors from "cors";
import router from "./routes";
import mongoose from "mongoose";
import Gateway from "./gateway";
import { createServer } from "http";

const app = express();
const PORT: number = parseInt(process.env.PORT as any) || 4000;
const MONGODB_URI: string = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/FPSCR";
mongoose.set('strictQuery', false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const httpServer = createServer(app);

async function main() {
	await mongoose.connect(MONGODB_URI);
	console.log("Successfully connected to MongoDB")

	const gateway = new Gateway(httpServer);
	gateway.init();

	httpServer.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

main().catch(err => console.log(err));

export default app;