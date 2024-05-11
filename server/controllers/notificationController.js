import Notification from "../models/Notification.js"
export const getNotificationsList = async (req, res) => {
	try {
		const { id } = req.params

		const notification = await Notification.find(
			{
				team: id,
				isRead: { $nin: [id] }
			}
		).populate("task", "title")

		res.status(201).json(notification)

	} catch (err) {
		return res.status(400).json({ status: false, message: err.message })
	}
}


export const markNotificationRead = async (req, res) => {
	try {
		const { userId } = req.user
		const { isReadType, id } = req.query

		if (isReadType === "all") {
			await Notification.updateMany(
				{ team: userId, isRead: { $nin: [userId] } },
				{ $push: { isRead: userId } },
				{ new: true }
			)
		}
		else {
			await Notification.findOneAndUpdate(
				{ _id: id, isRead: { $nin: [userId] } },
				{ $push: { isRead: userId } },
				{ new: true }
			)
		}

		try {
			await Notification.deleteMany({ team: userId, isRead: userId });
		} catch (error) {
			console.log("Error when clean notification: ", error);
		}

		res.status(201).json({ status: true, message: "Done" });

	} catch (err) {
		return res.status(400).json({ status: false, message: err.message })
	}
}