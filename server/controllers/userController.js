import User from "../models/User.js"
import Project from "../models/Project.js"
import { createJWT } from "../utils/index.js"

export const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body

		const userExist = await User.findOne({ email })

		const userProjects = await Project.find({ team: { $elemMatch: { userId: userExist._id } } })

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
		})

		if (user) {
			createJWT(res, user._id);

			user.password = undefined

			if (userProjects.length > 0) {
				userProjects.forEach((project) => {
					project.team.forEach((member) => {
						if (member.userId.toString() === user._id.toString()) {
							member.email = user.email
						}
					})
				})
			}

			res.status(201).json(user)
		}
		else {
			return res.status(400).json({ status: false, message: "Неккоректные данные" })
		}

	} catch (err) {
		return res.status(400).json({ status: false, message: "Ошибка при регистрации: " + err.message })
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

export const changeUserPassword = async (req, res) => {
	try {
		const { userId } = req.user;

		const user = await User.findById(userId)

		if (user) {
			user.password = req.body.password || user.password

			await user.save()

			user.password = undefined

			res.status(201).json({
				status: true,
				message: "Пароль изменен успешно",
			})
		}
		else {
			return res.status(404).json({ status: false, message: "Пользователь не найден" })
		}

	} catch (err) {
		return res.status(400).json({ status: false, message: err.message })
	}
}

export const updateUserProfile = async (req, res) => {
	try {
		const { id } = req.body

		const user = await User.findById(id)

		if (user) {
			user.name = req.body.name || user.name

			const updateUser = await user.save()

			user.password = undefined

			res.status(201).json({
				status: true,
				message: "Пользователь обновлен успешно",
				user: updateUser
			})
		}
		else {
			return res.status(404).json({ status: false, message: "Пользователь не найден" })
		}

	} catch (err) {
		return res.status(400).json({ status: false, message: err.message })
	}
}
