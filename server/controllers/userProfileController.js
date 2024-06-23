import User from "../models/User.js";
import Project from "../models/Project.js"
import Notification from "../models/Notification.js";
import { hasProjectAccess } from "../utils/index.js";

export const updateUserInfo = async (req, res) => {
	try {

		const projectId = req.projectId

		const { id } = req.body

		const project = await Project.findById(projectId).populate({
			path: "team",
			select: "userId",
		});


		if (!project) {
			return res.status(404).json({ message: 'Проект не найден' });
		}

		const isUserHasPermission = project.team.some(
			(member) => {
				return member.userId.toString() === req.user.userId && member.accessLevel === 'admin'
			}
		);

		if (!hasProjectAccess(req.user, project) || !isUserHasPermission) {
			return res.status(403).json({ message: 'Недостаточно прав' });
		}

		const isUserInProject = project.team.some(
			(member) => member.userId.toString() === id
		);

		const user = await User.findById(id)

		if (!user || !isUserInProject) {
			return res.status(404).json({ status: false, message: "Пользователь не найден" })
		}

		project.team.forEach((member) => {
			if (member.userId.toString() === id) {
				member.accessLevel = req.body.role || member.accessLevel
				member.roleName = req.body.title || member.roleName
				member.userName = req.body.name || member.userName

				// // Убрать когда все ок будет
				// member.userEmail = req.body.email || member.email
			}
		});

		const updateProject = await project.save()

		const updateUserInfo = updateProject.team.find((member) => member.userId.toString() === id)

		res.status(201).json({
			status: true,
			message: "User updated successfully",
			user: updateUserInfo
		})

	} catch (err) {
		return res.status(400).json({ status: false, message: err.message })
	}
}

export const addUserToProject = async (req, res) => {
	try {
		const { id } = req.body
		const projectId = req.projectId
		const project = await Project.findById(projectId)

		if (!project) {
			return res.status(404).json({ message: 'Проект не найден' });
		}

		const isUserHasPermission = project.team.some(
			(member) => {
				console.log(member.userId.toString(), req.user.userId)
				return member.userId.toString() === req.user.userId && member.accessLevel === 'admin'
			}
		);

		if (!hasProjectAccess(req.user, project) || !isUserHasPermission) {
			return res.status(403).json({ message: 'Недостаточно прав' });
		}

		const isUserInProject = project.team.some(
			(member) => member.userId.toString() === id
		);

		const user = await User.findById(id)

		if (!user || isUserInProject) {
			return res.status(404).json({ status: false, message: "Ошибка в добавлении пользователя" })
		}

		project.team.push({
			userId: id,
			accessLevel: req.body.accessLevel || 'developer',
			roleName: req.body.roleName || 'Developer',
			userName: user.name,
			userEmail: user.email
		})

		user.projects.push(project._id)

		await user.save()

		//Включить когда все ок
		// await Notification.create({
		// 	team: [user],
		// 	text: `Вы были добавлены в проект "${project.name}".`,
		// 	project: project._id,
		// });

		const updateProject = await project.save()

		res.status(201).json({
			status: true,
			message: "User added successfully",
			user: updateProject
		})
	} catch (err) {
		return res.status(400).json({ status: false, message: err.message })
	}
}

export const activateUser = async (req, res) => {
	try {

		const { id } = req.params

		const projectId = req.projectId

		const project = await Project.findById(projectId)

		const isUserHasPermission = project.team.some(
			(member) => member.userId.toString() === req.user.userId && member.accessLevel === 'admin'
		);

		if (!hasProjectAccess(req.user, project) || !isUserHasPermission) {
			return res.status(403).json({ message: 'Недостаточно прав' });
		}

		const isUserInProject = project.team.some(
			(member) => member.userId.toString() === id
		);

		const user = await User.findById(id)

		if (!user || !isUserInProject) {
			return res.status(404).json({ status: false, message: "Пользователь не найден" })
		}

		let typeAction;

		project.team.forEach((member) => {
			if (member.userId.toString() === id) {
				typeAction = !member.isActive
				member.isActive = typeAction
			}
		});

		await project.save()

		//Включить когда все ок
		// await Notification.create({
		// 	team: [user],
		// 	text: `Вы были ${typeAction ? "активированы" : "деактивированы"} в проекте "${project.name}".`,
		// 	project: project._id,
		// });

		res.status(201).json({
			status: true,
			message: `Пользователь: ${id} был ${typeAction ? "активирован" : "деактивирован"}`,
		})

	} catch (err) {
		return res.status(400).json({ status: false, message: err.message })
	}
}

export const deleteUserFromProject = async (req, res) => {
	try {
		const { id } = req.params

		const projectId = req.projectId

		const project = await Project.findById(projectId)

		const isUserHasPermission = project.team.some(
			(member) => member.userId.toString() === req.user.userId && member.accessLevel === 'admin'
		);

		if (!hasProjectAccess(req.user, project) || !isUserHasPermission) {
			return res.status(403).json({ message: 'Недостаточно прав' });
		}

		const isUserInProject = project.team.some(
			(member) => member.userId.toString() === id
		);

		const user = await User.findById(id)

		if (!user || !isUserInProject) {
			return res.status(404).json({ status: false, message: "Пользователь не найден" })
		}

		project.team = project.team.filter((member) => member.userId.toString() !== id);
		await project.save();
		user.projects = user.projects.filter((project) => project.toString() !== projectId);
		await user.save();

		//Включить когда все ок
		// await Notification.create({
		// 	team: [user],
		// 	text: `Вы были удалены из проекта "${project.name}".`,
		// 	project: project._id,
		// });

		res.status(200).json({
			status: true,
			message: "Пользователь удален из проекта успешно",
		})

	} catch (err) {
		return res.status(400).json({ status: false, message: err.message })
	}
}


export const getTeamList = async (req, res) => {
	try {
		const projectId = req.projectId

		const project = await Project.findById(projectId)

		if (!project) {
			return res.status(404).json({ status: false, message: "Проект не найден" })
		}

		if (!hasProjectAccess(req.user, project)) {
			return res.status(403).json({ message: 'Недостаточно прав' });
		}

		const users = project.team

		res.status(200).json(users);
	} catch (error) {
		return res.status(400).json({ status: false, message: error.message });
	}
}