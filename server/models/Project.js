import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	name: {
		type: String,
		required: true
	},
	participants: [{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		accessLevel: {
			type: String,
			enum: ['developer', 'teamlead', 'admin', 'superadmin'],
			default: 'developer',
			required: true
		},
		roleName: {
			type: String,
			required: true
		},
		roleDescription: {
			type: String
		}
	}],
	tasks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task'
	}],
	status: {
		type: String,
		enum: ['in_progress', 'completed', 'cancelled'],
		default: 'in_progress'
	},
	customTaskCards: {
		type: [{
			name: {
				type: String,
				required: true,
				unique: true
			},
			color: {
				type: String,
				enum: ['red', 'blue', 'green', 'orange', 'purple', 'yellow'],
				default: 'blue'
			},
		}],
		validate: [cardsLimit, 'Maximum number of cards reached']
	},
	customCategories: {
		type: [{
			name: {
				type: String,
				required: true,
				unique: true
			},
			color: {
				type: String,
				enum: ['red', 'blue', 'green', 'orange', 'purple', 'yellow'],
				default: 'blue'
			},
		}],
		validate: [categoriesLimit, 'Maximum number of categories reached']
	}
},
	{
		timestamps: true
	});

function cardsLimit(val) {
	return val.length <= 10; // Change 10 to your desired maximum number
}

function categoriesLimit(val) {
	return val.length <= 7; // Change 10 to your desired maximum number
}

const Project = mongoose.model('Project', projectSchema);

export default Project