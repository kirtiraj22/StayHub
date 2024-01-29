import express, { Request, Response, query } from "express";
import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
	try {
		const query = constructSearchQuery(req.query);

		let sortOptions = {};
		switch (req.query.Option) {
			case "starRating":
				// sorts high to low
				sortOptions = { starRating: -1 };
				break;
			case "pricePerNightAsc":
				sortOptions = { pricePerNight: 1 };
				break;
			case "pricePerNightDesc":
				sortOptions = { pricePerNight: -1 };
				break;
		}

		const pageSize = 5;
		const pageNumber = parseInt(
			req.query.page ? req.query.page.toString() : "1"
		);
		const skip = (pageNumber - 1) * pageSize;

		const hotels = await Hotel.find(query)
			.sort(sortOptions)
			.skip(skip)
			.limit(pageSize);

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

const constructSearchQuery = (queryParams: any) => {
	let constructedQuery: any = {};
	if (queryParams.destination) {
		// This condition searches for documents where either the city or country fields match the provided destination(using case-insensitive regex)
		constructedQuery.$or = [
			{ city: new RegExp(queryParams.destination, "i") },
			{ country: new RegExp(queryParams.destination, "i") },
		];
	}
	if (queryParams.adultCount) {
		constructedQuery.adultCount = {
			// greater than or equal to specified count
			$gte: parseInt(queryParams.adultCount),
		};
	}
	if (queryParams.childCount) {
		constructedQuery.childCount = {
			$gte: parseInt(queryParams.childCount),
		};
	}

	if (queryParams.facilities) {
		// checks for documents where the facilities field matches all the specified values provided in queryParams.facilities
		constructedQuery.facilities = {
			$all: Array.isArray(queryParams.facilities)
				? queryParams.facilities
				: [queryParams.facilities],
		};
	}

	if (queryParams.types) {
		constructedQuery.type = {
			$in: Array.isArray(queryParams.types)
				? queryParams.types
				: [queryParams.types],
		};
	}

	if (queryParams.stars) {
		const starRating = parseInt(queryParams.stars.toString());
		// eq : equal to specified number(starRating)
		constructedQuery.starRating = { $eq: starRating };
	}

	if (queryParams.maxPrice) {
		constructedQuery.maxPrice = {
			$lte: parseInt(queryParams.maxPrice).toString(),
		};
	}

	return constructedQuery;
};

export default router;
