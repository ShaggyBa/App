import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
	// createdBy: {
	// 	user: {
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: 'User',
	// 		required: true
	// 	},
	// 	project: {
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: 'Project',
	// 		required: true
	// 	}
	// },
	title: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: new Date()
	},
	priority: {
		type: String,
		default: "normal",
		enum: ["low", "normal", "medium", "high"]
	},
	stage: {
		type: String,
		enum: ["todo", "in progress", "completed"],
		default: "todo"
	},
	activities: [{
		type: {
			type: String,
			default: "assigned",
			enum: [
				"assigned",
				"started",
				"in progress",
				"bug",
				"completed",
				"commented"
			]
		},
		activity: String,
		date: {
			type: Date,
			default: new Date()
		},
		by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	}],
	subTasks: [
		{
			title: String,
			date: Date,
			tag: String
		}
	],
	assets: [String],
	team: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	isTrashed: {
		type: Boolean,
		default: false
	},
	deadline: {
		type: Date,
	},
	category: {
		type: String
	},
	cards: [{
		type: String
	}],
	content: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'TaskContent'
	}
},
	{
		timestamps: true
	});

const Task = mongoose.model('Task', taskSchema);

export default Task