const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
		type:  Boolean,
		required: true,
		default: false
	}
});

const User = mongoose.model("User", UserSchema)

module.exports = User;
