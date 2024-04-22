import User from "../models/User.js";

export const updateUserProfile = async (req, res) => {
	try {
		const { userId, isAdmin } = req.user;
		const { _id } = req.body
		const id = isAdmin && userId === _id
			? userId
			: isAdmin && userId !== _id
				? _id
				: userId;

		const user = await User.findById(id)

		if (user) {
			user.name = req.body.name || user.name
			user.title = req.body.title || user.title
			user.role = req.body.role || user.role

			const updateUser = await user.save()

			user.password = undefined

			res.status(201).json({
				status: true,
				message: "User updated successfully",
				user: updateUser
			})
		}
		else {
			return res.status(404).json({ status: false, message: "User not found" })
		}

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
				message: "Password changed successfully"
			})
		}
		else {
			return res.status(404).json({ status: false, message: "User not found" })
		}

	} catch (err) {
		return res.status(400).json({ status: false, message: err.message })
	}
}

export const activateUserProfile = async (req, res) => {
	try {

		const { id } = req.params

		const user = await User.findById(id)

		if (user) {
			user.isActive = req.body.isActive

			await user.save()

			res.status(201).json({
				status: true,
				message: `User: ${id}  has been ${user.isActive ? "activated" : "deactivated"}`,
			})
		}
		else {
			return res.status(404).json({ status: false, message: "User not found" })
		}

	} catch (err) {
		return res.status(400).json({ status: false, message: err.message })
	}
}

export const deleteUserProfile = async (req, res) => {
	try {
		const { id } = req.params

		await User.findByIdAndDelete(id)

		res.status(200).json({
			status: true,
			message: "User deleted successfully"
		})

	} catch (err) {
		return res.status(400).json({ status: false, message: err.message })
	}
}
