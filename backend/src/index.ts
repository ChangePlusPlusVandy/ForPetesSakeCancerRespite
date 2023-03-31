import express from "express";
import cors from "cors";
import router from "./routes";
import mongoose from "mongoose";
import Gateway from "./gateway";
import { createServer } from "http";
import rateLimit from "express-rate-limit";

const app = express();
const PORT: number = parseInt(process.env.PORT as any) || 3000;
const MONGODB_URI: string = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/FPSCR";
mongoose.set('strictQuery', false);

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 100, // limit ip to 100 requests every 15 minutes
	standardHeaders: true,
	legacyHeaders: false,
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use(limiter); // rate limiting

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