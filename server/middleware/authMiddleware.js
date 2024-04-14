import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protectRoute = async (req, res, next) => {
	try {
		let token = req.cookies?.token

		if (token) {
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
			// decodedToken.userId - возможно придется поменять
			const resp = await User.findById(decodedToken.userId).select("isAdmin email")

			req.user = {
				email: resp.email,
				isAdmin: resp.isAdmin,
				userId: decodedToken.userId
			}

			next()
		}
		else {
			return res.status(401).json({ status: false, message: "Not authorized. Try again." })
		}
	}

	catch (err) {
		console.log("Auth middleware error: ", err);
		return res.status(401).json({ status: false, message: "Not authorized. Try again." })
	}
}


const isAdminRoute = async (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next()
	} else {
		return res.status(401).json({ status: false, message: "Not authorized. Try again." })
	}
}

export { protectRoute, isAdminRoute }