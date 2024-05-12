import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const dbConnect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	} catch (err) {
		console.log("DB Error: " + err);
	}
}

export const createJWT = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "1d"
	})

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
		maxAge: 1000 * 60 * 60 * 24 * 1,
	})
}