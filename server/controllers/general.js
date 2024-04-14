import User from "../models/User.js";
import Project from "../models/Project.js";
import Task from "../models/Tasks.js";

import mongoose from "mongoose";

export const getUser = async (req, res) => {
	try {
		const { id } = req.params
		const user = await User.findById(id)
		// const projects = await Project.find({ createdBy: id });
		// const tasks = await Task.find({ 'createdBy.user': id, 'createdBy.project': "65e341f0c6979fcde6fd9f72" }); // { $in: projects.map(p => p._id) } 
		res.status(200).json(user);
	}
	catch (e) {
		res.status(404).json({ message: e.message })
	}
}
