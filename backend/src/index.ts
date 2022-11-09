import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes"

const app = express();

const PORT: number = 3000;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); //TODO: fix this line it isnt working 
app.use(router);

console.log(path.join(__dirname, '../public'));

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
