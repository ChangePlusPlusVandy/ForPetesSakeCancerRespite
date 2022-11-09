import express from "express";
import cors from "cors";

const app = express();

const PORT:number = 3000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	  res.send("Hello World!");
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
  });