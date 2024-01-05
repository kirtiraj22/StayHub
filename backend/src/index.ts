import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
	res.json({
		message: "Hello from StayHub",
	});
});

app.listen(3000, () => {
	console.log("App running on localhost: 3000");
});
