import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
	try {
		const pageSize = 5;
		const pageNumber = parseInt(
			req.query.page ? req.query.page.toString() : "1"
		);
		const skip = (pageNumber - 1) * pageSize;

		const hotels = await Hotel.find().skip(skip).limit(pageSize);

		const total = await Hotel.countDocuments();

		// send complete data of documents, pages when dealing with pagination
		const response: HotelSearchResponse = {
			data: hotels,
			pagination: {
				total,
				page: pageNumber,
				// total pages = total docs / size of each page
				pages: Math.ceil(total / pageSize),
			},
		};

		res.json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Something went wrong!",
		});
	}
});

export default router;
