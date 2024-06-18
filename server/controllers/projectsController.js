// import mongoose from "mongoose";
import Project from "../models/Project.js";


export const getProjects = async (req, res) => {
	try {
		const { userId } = req.user;
		const projects = await Project.find({ owner: userId });

		res.status(200).json({ status: true, projects, message: "Данные о проектах получены" });
	} catch (error) {
		return res.status(400).json({ status: false, message: error.message });
	}
}

export const createProject = async (req, res) => {
	try {
		const { name } = req.body;
		const { userId } = req.user;
		const project = await Project.create({ name, owner: userId });

		res.status(200).json({ status: true, project, message: "Проект создан" });
	} catch (error) {
		return res.status(400).json({ status: false, message: error.message });
	}
}