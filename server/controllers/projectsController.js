// import mongoose from "mongoose";
import { hasProjectAccess } from "../utils/index.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import Task from "../models/Task.js"




export const getProjects = async (req, res) => {
	try {
		const user = req.user;
		let projects;


		projects = await Project.find({
			$or: [
				{ owner: user.userId },
				{ team: { $elemMatch: { userId: user.userId } } },
			],

		}).populate(['tasks'])
			.populate({
				path: "team",
				select: 'userId._id'
			})
		// Filter projects based on access control
		// projects = projects.filter(project => hasProjectAccess(user, project));

		res.status(200).json({ status: true, projects, message: 'Данные о проектах получены' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ status: false, message: 'Ошибка сервера' });
	}
}

export const getProject = async (req, res) => {
	try {
		const projectId = req.params.projectId;
		const project = await Project.findById(projectId).populate(['tasks'])
			.populate({
				path: "team",
				select: 'userId._id'
			})

		if (!project) {
			return res.status(404).json({ message: 'Проект не найден' });
		}

		if (!hasProjectAccess(req.user, project)) {
			return res.status(403).json({ message: 'Доступ к проекту запрещен' });
		}

		res.json(project);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
};

export const createProject = async (req, res) => {
	try {
		const { name } = req.body;
		const { userId } = req.user;

		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' });
		}

		const project = await Project.create({ name, owner: userId, team: [{ userId: userId, accessLevel: 'admin', roleName: 'owner', userEmail: req.user.email, userName: req.user.userName }], });


		user.projects.push(project._id);
		await user.save();

		res.status(200).json({ status: true, project, message: "Проект создан" });
	} catch (error) {
		return res.status(400).json({ status: false, message: error.message });
	}
}

export const updateProject = async (req, res) => {
	try {
		const projectId = req.params.projectId;
		const projectUpdates = req.body;
		const project = await Project.findById(projectId);

		if (!project) {
			return res.status(404).json({ message: 'Проект не найден' });
		}

		if (!hasProjectAccess(req.user, project)) {
			return res.status(403).json({ message: 'Доступ к проекту запрещен' });
		}

		const updatedProject = await Project.findByIdAndUpdate(projectId, projectUpdates, { new: true });
		res.json(updatedProject);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
};

export const deleteProject = async (req, res) => {
	try {
		const projectId = req.params.projectId;
		const project = await Project.findById(projectId);

		if (!project) {
			return res.status(404).json({ message: 'Проект не найден' });
		}

		if (!hasProjectAccess(req.user, project)) {
			return res.status(403).json({ message: 'Доступ к проекту запрещен' });
		}


		const user = await User.findById(project.owner);
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' });
		}
		user.projects = user.projects.filter(projectId => projectId.toString() !== projectId);

		const tasks = await Task.find({ project: projectId });
		for (const task of tasks) {
			await Task.findByIdAndDelete(task._id);

			user.tasks = user.tasks.filter(taskId => taskId.toString() !== task._id.toString());
		}

		const participants = await User.find({ projects: projectId });
		for (const participant of participants) {
			participant.projects = participant.projects.filter(projectId => projectId.toString() !== projectId.toString());

			participant.tasks = participant.tasks.filter(taskId => taskId.toString() !== projectId.toString());

			await participant.save();
		}

		await user.save();

		await Project.findByIdAndDelete(projectId);



		res.json({ message: 'Проект успешно удален' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
};