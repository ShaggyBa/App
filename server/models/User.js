import bcrypt from "bcryptjs";
import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 2,
		max: 100
	},
	title: {
		type: String,
	},
	role: {
		type: String,
		enum: ['developer', 'teamlead', 'admin', 'superadmin'],
		default: 'developer',
	},

	email: {
		type: String,
		required: true,
		max: 50,
		unique: true
	},

	password: {
		type: String,
		required: true,
		min: 5
	},
	projects: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project'
	}],
	tasks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task'
	}],
	isActive: {
		type: Boolean,
		default: true
	},
	profileImage: String,
	country: String,
	company: String,

},
	{
		timestamps: true
	}
)

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", UserSchema)

export default User