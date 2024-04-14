import mongoose from "mongoose";

const taskContentSchema = new mongoose.Schema({
	taskId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task',
		required: true
	},
	bigDescription: {
		type: String,
	},
	links: [{ type: String }],
	// Другие поля по необходимости
},
	{
		timestamps: true
	});

const TaskContent = mongoose.model('Content', taskContentSchema);

export default TaskContent;