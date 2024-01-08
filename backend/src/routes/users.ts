import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

// /api/users/register
router.post(
	"/register",
	[
		check("firstName", "First Name is required").isString(),
		check("lastName", "Last Name is required").isString(),
		check("email", "Email is required").isEmail(),
		check(
			"password",
			"Password with 6 or more characters required"
		).isLength({ min: 6 }),
	],
	async (req: Request, res: Response) => {
		// get errors from express validators(if any)
		const errors = validationResult(req);
		// if errors is not empty, return status 400
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: errors.array() });
		}
		try {
			let user = await User.findOne({
				email: req.body.email,
			});

			if (user) {
				return res.status(400).json({
					message: "User already exists",
				});
			}

			// adding all the fields(firstName,email,etc) directly from the request body
			user = new User(req.body);
			await user.save();

			const token = jwt.sign(
				{ userId: user.id },
				process.env.JWT_SECRET_KEY as string,
				{
					expiresIn: "1d",
				}
			);

			res.cookie("auth_token", token, {
				httpOnly: true,
				// use secure only when the code is in production
				secure: process.env.NODE_ENV === "production",
				// 864000000 in milliseconds(i.e 1 day)
				maxAge: 86400000,
			});

			return res.status(200).send({
				message: "User registered OK",
			});
		} catch (error) {
			console.log(error);
			res.status(500).send({
				message: "Something went wrong!",
			});
		}
	}
);

export default router;
