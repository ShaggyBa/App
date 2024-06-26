import User from "../models/User.js"
import { createJWT } from "../utils/index.js"

export const registerUser = async (req, res) => {
	try {
		const { name, email, password, isAdmin, role, title } = req.body

		const userExist = await User.findOne({ email })

		if (userExist) {
			return res.status(400).json({
				status: false,
				message: "Пользователь с данным email уже существует"
			})
		}

		const user = await User.create({
			name,
			email,
			password,

			isAdmin: (role === "admin") ? true : false,
			role,
			title
		})

		if (user) {
			isAdmin ? createJWT(res, user._id) : null;

			user.password = undefined

			res.status(201).json(user)
		}
		else {
			return res.status(400).json({ status: false, message: "Неккоректные данные" })
		}

	} catch (err) {
		return res.status(400).json({ status: false, message: "Какая то ошибка: " + err.message })
	}
}

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email })
		if (!user) {
			return res.status(401).json({ status: false, message: "Некорректный email или пароль." })
		}

		if (!user?.isActive) {
			return res.status(401).json({ status: false, message: "Пользователь неактивен и был деактивирован." })
		}

		const isMatch = await user.matchPassword(password)

		if (user && isMatch) {
			createJWT(res, user._id)

			user.password = undefined

			res.status(200).json(user)
		}
		else {
			return res.status(401).json({ status: false, message: "Некорректный email или пароль." })
		}

	} catch (err) {
		return res.status(400).json({ status: false, message: err.message })
	}
}

export const logoutUser = async (req, res) => {
	try {
		res.cookie("token", "", {
			httpOnly: true,
			expires: new Date(0),
		})
		res.status(200).json({ status: true, message: 'Успешный выход из системы.' })
	} catch (err) {
		return res.status(400).json({ status: false, message: err.message })
	}
}

export const getTeamList = async (req, res) => {
	try {
		const users = await User.find().select("name title role email isActive");

		res.status(200).json(users);
	} catch (error) {
		return res.status(400).json({ status: false, message: error.message });
	}
}