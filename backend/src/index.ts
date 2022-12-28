import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";

dotenv.config();
const app = express();
const PORT: number = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});