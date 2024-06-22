// import mongoose from "mongoose";
import { hasProjectAccess } from "../utils/index.js";
import Project from "../models/Project.js";
import User from "../models/User.js";




export const getProjects = async (req, res) => {
	try {
		const user = req.user;
		let projects;


		projects = await Project.find({
			$or: [
				{ owner: user.userId },
				{ team: { $elemMatch: { userId: user.userId } } },
			],
		}).populate(['tasks', 'owner', 'team.userId']);
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
		const project = await Project.findById(projectId).populate(['tasks', 'owner', 'team.userId']);

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
		console.log(req.user.email)
		const project = await Project.create({ name, owner: userId, team: [{ userId: userId, accessLevel: 'admin', roleName: 'owner', userEmail: req.user.email }] });

		const user = await User.findById(userId);

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

		await Project.findByIdAndDelete(projectId);
		res.json({ message: 'Проект успешно удален' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
};