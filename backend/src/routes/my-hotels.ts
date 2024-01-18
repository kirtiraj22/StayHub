import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
const router = express.Router();

// store files/image(from post request) in memory
const storage = multer.memoryStorage();
// add limits to file upload
const upload = multer({
	storage: storage,
	limits: {
		// 5MB
		fileSize: 5 * 1024 * 1024,
	},
});

// api/my-hotels
// upload middleware will expect an array of maximum 6 images
router.post(
	"/",
	verifyToken,
	[
		body("name").notEmpty().withMessage("Name is required"),
		body("city").notEmpty().withMessage("City is required"),
		body("country").notEmpty().withMessage("Country is required"),
		body("description").notEmpty().withMessage("Description is required"),
		body("type").notEmpty().withMessage("Hotel type is required"),
		body("pricePerNight")
			.notEmpty()
			.isNumeric()
			.withMessage("Price per night is required and must be a number"),
		body("facilities")
			.notEmpty()
			.isArray()
			.withMessage("Facilities are required"),
	],
	upload.array("imageFiles", 6),
	async (req: Request, res: Response) => {
		try {
			const imageFiles = req.files as Express.Multer.File[];
			const newHotel: HotelType = req.body;

			// 1.upload images to cloudinary
			const uploadPromises = imageFiles.map(async (image) => {
				// convert image to base 64 string(so it can be processed by cloudinary)
				const b64 = Buffer.from(image.buffer).toString("base64");
				let dataURI = "data:" + image.mimetype + ";base64," + b64;
				const res = await cloudinary.v2.uploader.upload(dataURI);
				return res.url;
			});

			// wait for all images to get uploaded
			const imageUrls = await Promise.all(uploadPromises);

			// 2.if upload successful, add URLs to new hotel
			newHotel.imageUrls = imageUrls;

			newHotel.lastUpdated = new Date();
			newHotel.userId = req.userId;

			// 3. save new hotel in DB
			const hotel = new Hotel(newHotel);
			await hotel.save();

			// 4. return 201 status
			res.status(201).send(hotel);
		} catch (err) {
			console.log("Error creating hotel: ", err);
			res.status(500).json({
				message: "Something went wrong",
			});
		}
	}
);

export default router;
