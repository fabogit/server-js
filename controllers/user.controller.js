const bcrypt = require("bcrypt");

const connection = require('../data/database');
const User = require('../models/user.model');
const ErrorCode = require('../middlewares/http-error.middleware');


async function registerUser(username, password, isAdmin) {
	// search if username exist
	const existAlready = await User.findOne({ username: username });
	if (existAlready) {
		throw new ErrorCode(409 , 'Username already in use');
	}
	// if valid save fields
	try {
		const hashedUser = {
			username: username,
			password: bcrypt.hashSync(password, 10),
			isAdmin: isAdmin
		};
		const newUser = await User.create(hashedUser);
		return newUser;
	} catch (error) {
		throw error;
	}
}

async function loginUser(username, password) {
	const user = await User.findOne({ username: username });
	if (user === null) {
		throw new ErrorCode(404, 'Username not found');
	}
	const passIsValid = bcrypt.compareSync(password, user.password);
	if (passIsValid) {
		return { id: user._id, username: user.username, isAdmin: user.isAdmin };
	}
	throw new ErrorCode(401, 'Invalid credentials password');
}

function logout(params) {

}

// TODO load user
async function findUsername(username) {
	const user = await User.findOne({ username: username });
	return user;
}

async function getAllUsers() {
	return await User.find();
}


async function findUserById(username) {
	return await User.findById();
}

module.exports = { registerUser, loginUser, findUsername, getAllUsers };