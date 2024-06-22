import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	name: {
		type: String,
		required: true
	},
	team: [{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		userEmail: {
			type: String,
			required: true
		},
		userName: {
			type: String,
		},
		accessLevel: {
			type: String,
			enum: ['developer', 'teamlead', 'admin', 'superadmin'],
			default: 'developer',
			required: true
		},
		roleName: {
			type: String,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		roleDescription: {
			type: String
		}
	}],
	tasks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task',
	}],

	//! На потом
	// customTaskCards: {
	// 	type: [{
	// 		name: {
	// 			type: String,
	// 			required: true,
	// 			unique: true
	// 		},
	// 		color: {
	// 			type: String,
	// 			enum: ['red', 'blue', 'green', 'orange', 'purple', 'yellow'],
	// 			default: 'blue'
	// 		},
	// 	}],
	// 	validate: [cardsLimit, 'Maximum number of cards reached']
	// },
	// customCategories: {
	// 	type: [{
	// 		name: {
	// 			type: String,
	// 			required: true,
	// 			unique: true
	// 		},
	// 		color: {
	// 			type: String,
	// 			enum: ['red', 'blue', 'green', 'orange', 'purple', 'yellow'],
	// 			default: 'blue'
	// 		},
	// 	}],
	// 	validate: [categoriesLimit, 'Maximum number of categories reached']
	// }
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