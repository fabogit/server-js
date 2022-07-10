const bcrypt = require("bcrypt");

const User = require('../models/user.model');
const ErrorCode = require('../middlewares/http-error.middleware');

// TODO
/**
 *
 * @param {*} username
 * @param {*} password
 * @param {*} isAdmin
 * @returns
 */
async function registerUser(username, password, isAdmin) {
	// search if username exist
	const existAlready = await User.findOne({ username: username });
	if (existAlready) {
		throw new ErrorCode(409, 'Username already in use');
	}
	// if valid save fields
	try {
		const hashedUser = {
			username,
			password: bcrypt.hashSync(password, 10),
			isAdmin
		};
		const newUser = await User.create(hashedUser);
		return newUser;
	} catch (error) {
		throw error;
	}
}


// FIXME docs

/**
 *  @typedef {{myvar: number}} Nome
 *  @property {number} x The X-coordinate.
 *  @property {number} y The Y-coordinate.
 */

/**
 *
 * @example loginUser("username", "****")
 *
 * @param {string} username - user username
 * @param {string} password - user entered password to compare on the encripted password
 *
 */

/**
 *
 * @param {*} username
 * @param {*} password
 * @returns
 */
async function loginUser(username, password) {
	// check if username exist
	const user = await User.findOne({ username: username });
	if (user === null) {
		throw new ErrorCode(404, 'Username not found');
	}
	// verify entered password
	const passIsValid = bcrypt.compareSync(password, user.password);
	if (passIsValid) {
		return { id: user._id, username: user.username, isAdmin: user.isAdmin };
	}
	throw new ErrorCode(401, 'Invalid password');
}

function logout(params) {

}

// TODO load user serve??
async function findUsername(username) {
	const user = await User.findOne({ username: username });
	return user;
}

// TODO
async function getAllUsers() {
	return await User.find();
}

// TODO
async function findUserById(username) {
	return await User.findById();
}

module.exports = { registerUser, loginUser, findUsername, getAllUsers };