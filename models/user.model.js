const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		trim: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	}
});

// UserSchema.index({ username: 1})

const User = mongoose.model("User", UserSchema);

module.exports = User;
