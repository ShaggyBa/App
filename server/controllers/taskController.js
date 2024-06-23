import mongoose from "mongoose";
import Notification from "../models/Notification.js";
import Task from "../models/Task.js";
import User from "../models/User.js";
import Project from "../models/Project.js";
import { hasProjectAccess } from "../utils/index.js";

export const createTask = async (req, res) => {
	try {
		const { userId } = req.user;

		const { title, team, stage, date, priority, assets } = req.body;

		const project = await Project.findById(req.projectId);
		if (!project) {
			return res.status(404).json({ message: 'Проект не найден' });
		}

		if (!hasProjectAccess(req.user, project)) {
			return res.status(403).json({ message: 'Доступ к проекту запрещен' });
		}

		let text = "Новая задача - " + title + " была поручена вам";
		if (team.length > 1) {
			text = text + ` и ${team.length - 1} участникам.`;
		}

		text =
			text +
			` Приоритет задачи - ${priority}. 
			Дата задачи - ${date}.`;

		const activity = {
			type: "assigned",
			activity: text,
			by: userId,
		};

		const task = await Task.create({
			title,
			team,
			stage: stage.toLowerCase(),
			date,
			priority: priority.toLowerCase(),
			assets,
			activities: activity,
			projectId: req.projectId,
		});

		project.tasks.push(task._id);
		await project.save();
		await task.save()

		const users = await User.find({ _id: { $in: task.team } });
		users.forEach(async (user) => {
			user.tasks.push(task._id);
			await user.save();
			Notification.create({
				team: user.team,
				text,
				task: task._id,
			});
		})

		const createdTaskData = await Task.findById(task._id).populate({ path: "team", select: "name title role email" });

		res.status(200).json({ status: true, createdTaskData, message: "Task created successfully." });

	} catch (error) {
		return res.status(400).json({ status: false, message: error.message });
	}
};

export const duplicateTask = async (req, res) => {
	try {
		const { id } = req.params;

		const task = await Task.findById(id);

		const project = await Project.findById(req.projectId);
		if (!project) {
			return res.status(404).json({ message: 'Проект не найден' });
		}

		if (!hasProjectAccess(req.user, project)) {
			return res.status(403).json({ message: 'Доступ к проекту запрещен' });
		}

		const newTask = await Task.create({
			...task,
			projectId: task.projectId,
			team: task.team,
			subTasks: task.subTasks,
			assets: task.assets,
			priority: task.priority,
			stage: task.stage,
			title: task.title + " - Duplicate",
		});

		await newTask.save();

		project.tasks.push(newTask._id);
		await project.save();

		//alert users of the task
		let text = "Новая задача - " + newTask.title + " была поручена вам";
		if (task.team.length > 1) {
			text = text + ` и ${task.team.length - 1} участникам.`;
		}

		text =
			text +
			` Приоритет задачи - ${task.priority}. 
			Дата задачи - ${task.date.toDateString()}.`;

		const users = await User.find({ _id: { $in: task.team } });
		users.forEach(async (user) => {
			user.tasks.push(newTask._id);
			await user.save();
			Notification.create({
				team: user.team,
				text,
				task: newTask._id,
			});
		})

		await Notification.create({
			team: task.team,
			text,
			task: newTask._id,
		});

		res.status(200).json({ status: true, message: "Задача дублирована успешно." });
	} catch (error) {
		return res.status(400).json({ status: false, message: error.message });
	}
};

export const postTaskActivity = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.user;
		const { type, activity } = req.body;

		const task = await Task.findById(id);

		const project = await Project.findById(req.projectId);

		if (!task || task.projectId.toString() !== req.projectId) {
			return res.status(404).json({ message: 'Задача не найдена' });
		}

		if (!hasProjectAccess(req.user, project)) {
			return res.status(403).json({ message: 'Доступ к проекту запрещен' });
		}


		const data = {
			type,
			activity,
			by: userId,
		};

		task.activities.push(data);

		await task.save();

		res.status(200).json({ status: true, message: "Activity posted successfully." });
	} catch (error) {

		return res.status(400).json({ status: false, message: error.message });
	}
};

export const dashboardStatistics = async (req, res) => {
	try {
		const { userId } = req.user;

		const projectId = req.projectId;

		const project = await Project.findById(projectId).populate({
			path: "team",
			select: "userId",
		});;

		if (!project) {
			return res.status(404).json({ message: 'Проект не найден' });
		}

		if (!hasProjectAccess(req.user, project)) {
			return res.status(403).json({ message: 'Доступ к проекту запрещен' });
		}

		const projectTeam = project.team.map((member) => member.userId.toString());

		const allTasks = await Task.find({
			isTrashed: false,
			projectId: projectId,
		})
			.populate({
				path: "team",
				select: "name role title email",
			})
			.sort({ _id: -1 })
		// : await Task.find({
		// 	isTrashed: false,
		// 	projectId: projectId,
		// 	team: { $all: [userId] },
		// })
		// 	.populate({
		// 		path: "team",
		// 		select: "name role title email",
		// 	})
		// 	.sort({ _id: -1 });

		const users = project.team;

		//   group task by stage and calculate counts
		const groupTasks = allTasks.reduce((result, task) => {
			const stage = task.stage;

			if (!result[stage]) {
				result[stage] = 1;
			} else {
				result[stage] += 1;
			}

			return result;
		}, {});

		// Group tasks by priority
		const groupData = Object.entries(
			allTasks.reduce((result, task) => {
				const { priority } = task;

				result[priority] = (result[priority] || 0) + 1;
				return result;
			}, {})
		).map(([name, total]) => ({ name, total }));

		// calculate total tasks
		const totalTasks = allTasks?.length;
		const last10Task = allTasks?.slice(0, 10);

		const summary = {
			totalTasks,
			last10Task,
			users: users,
			tasks: groupTasks,
			graphData: groupData,
		};
		res.status(200).json({
			status: true, message: "Successfully", body: { ...summary },
		});
	} catch (error) {

		return res.status(400).json({ status: false, message: error.message });
	}
};

export const getTasks = async (req, res) => {
	try {

		const project = await Project.findById(req.projectId)

		if (!project) {
			return res.status(404).json({ status: false, message: "Проект не найден" });
		}

		if (!hasProjectAccess(req.user, project)) {
			return res.status(403).json({ status: false, message: "Доступ к проекту отсутствует" });
		}

		const tasksId = project.tasks

		const { stage, isTrashed } = req.query;
		let query = { _id: { $in: tasksId }, isTrashed: isTrashed ? true : false };

		if (stage) {
			query.stage = stage;
		}

		let queryResult = Task.find(query)
			.populate({
				path: "team",
				select: "name title email",
			})
			.sort({ _id: -1 });

		const tasks = await queryResult;

		res.status(200).json({ status: true, tasks });

	} catch (error) {

		return res.status(400).json({ status: false, message: error.message });
	}
};

export const getTask = async (req, res) => {
	try {
		const { id } = req.params;

		const project = await Project.findById(req.projectId)

		if (!project) {
			return res.status(404).json({ status: false, message: "Проект не найден" });
		}

		if (!hasProjectAccess(req.user, project)) {
			return res.status(403).json({ status: false, message: "Доступ к проекту отсутствует" });
		}

		if (!project.tasks.includes(id)) {
			return res.status(403).json({ status: false, message: "Задача отсутствует" });
		}

		const task = await Task.findById(id)
			.populate({
				path: "team",
				select: "name title role email",
			})
			.populate({
				path: "activities.by",
				select: "name",
			})
			.populate('projectId')

		if (!task || !task.projectId.toString()) {
			return res.status(404).json({ status: false, message: "Задача не найдена" });
		}

		res.status(200).json({ status: true, task });

	} catch (error) {

		return res.status(400).json({ status: false, message: error.message });
	}
};

export const createSubTask = async (req, res) => {
	try {
		const { title, tag, date } = req.body;

		const { id } = req.params;

		const project = await Project.findById(req.projectId)

		if (!project) {
			return res.status(404).json({ status: false, message: "Проект не найден" });
		}

		if (!hasProjectAccess(req.user, project)) {
			return res.status(403).json({ status: false, message: "Доступ к проекту отсутствует" });
		}

		if (!project.tasks.includes(id)) {
			return res.status(403).json({ status: false, message: "Задача отсутствует" });
		}

		const newSubTask = {
			title,
			date,
			tag,
		};

		const task = await Task.findById(id);

		task.subTasks.push(newSubTask);

		await task.save();

		res.status(200).json({ status: true, message: "SubTask added successfully." });

	} catch (error) {

		return res.status(400).json({ status: false, message: error.message });
	}
};

export const updateTask = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, date, team, stage, priority, assets } = req.body;

		const project = await Project.findById(req.projectId)

		if (!project) {
			return res.status(404).json({ status: false, message: "Проект не найден" });
		}

		if (!hasProjectAccess(req.user, project)) {
			return res.status(403).json({ status: false, message: "Доступ к проекту отсутствует" });
		}

		// if (!project.tasks.includes(id)) {
		// 	return res.status(403).json({ status: false, message: "Задача отсутствует" });
		// }

		const task = await Task.findById(id);


		// убрать когда все норм будет
		// if (!project.tasks.includes(id)) {
		// 	project.tasks.push(id);
		// 	await project.save();
		// }

		task.title = title;
		task.date = date;
		task.priority = priority.toLowerCase();
		task.assets = assets;
		task.stage = stage.toLowerCase();

		task.projectId = project._id;

		// Find users added to the team
		const newTeamMembers = team.filter(user => {
			console.log(user._id)
			return !task.team.some(existingUser => {
				console.log(existingUser._id, user._id)
				// return existingUser._id.toString() === user._id.toString()
			})
		});

		// Update task and create notifications in parallel
		await Promise.all([
			...newTeamMembers.map(async (user) => {
				await Notification.create({
					team: [user],
					text: `Вы были добавлены в задачу "${task.title}".`,
					task: task._id,
				});
			}),
			task.team = team,
			task.save(),
		]);

		const updatedTaskData = await Task.findById(task._id).populate({ path: "team", select: "name title role email" });

		res.status(200).json({ status: true, updatedTaskData, message: "Task updated successfully." });
	} catch (error) {
		return res.status(400).json({ status: false, message: req.body.team });
	}
};

export const trashTask = async (req, res) => {
	try {
		const { id } = req.params;

		const project = await Project.findById(req.projectId)

		if (!project) {
			return res.status(404).json({ status: false, message: "Проект не найден" });
		}

		if (!hasProjectAccess(req.user, project)) {
			return res.status(403).json({ status: false, message: "Доступ к проекту отсутствует" });
		}

		if (!project.tasks.includes(id)) {
			return res.status(403).json({ status: false, message: "Задача отсутствует" });
		}

		const task = await Task.findById(id);

		task.isTrashed = true;

		await task.save();

		res.status(200).json({ status: true, message: `Task trashed successfully.` });
	} catch (error) {

		return res.status(400).json({ status: false, message: error.message });
	}
};

export const deleteRestoreTask = async (req, res) => {
	try {
		const { id } = req.params;
		const { actionType } = req.query;

		const project = await Project.findById(req.projectId)

		if (!project) {
			return res.status(404).json({ status: false, message: "Проект не найден" });
		}

		if (!hasProjectAccess(req.user, project)) {
			return res.status(403).json({ status: false, message: "Доступ к проекту отсутствует" });
		}

		if (!project.tasks.includes(id)) {
			return res.status(403).json({ status: false, message: "Задача отсутствует" });
		}

		if (actionType === "delete") {
			await Task.findByIdAndDelete(id);
		} else if (actionType === "deleteAll") {
			await Task.deleteMany({ isTrashed: true });
		} else if (actionType === "restore") {
			const resp = await Task.findById(id);
			resp.isTrashed = false;
			resp.save();
		} else if (actionType === "restoreAll") {
			await Task.updateMany(
				{ isTrashed: true },
				{ $set: { isTrashed: false } }
			);
		}

		res.status(200).json({ status: true, message: `Операция завершена успешно.` });
	} catch (error) {

		return res.status(400).json({ status: false, message: error.message });
	}
};