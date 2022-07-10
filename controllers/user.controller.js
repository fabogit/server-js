const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const ErrorCode = require("../middlewares/http-error.middleware");

// FIXME DOCS
/**
 *
 * @param {*} username
 * @param {*} password
 * @param {*} isAdmin
 * @returns
 */
async function registerUser(username, password, isAdmin) {
	// search if username exist
	const existAlready = await User.findOne({ username });
	if (existAlready) {
		throw new ErrorCode(409, "Username already in use");
	}
	// if valid save fields
	try {
		const hashedUser = {
			username,
			password: bcrypt.hashSync(password, 10),
			isAdmin,
		};
		const newUser = await User.create(hashedUser);
		return newUser;
	} catch (error) {
		throw error;
	}
}

// FIXME DOCS

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
 * @param {string} username - username used to register an user
 * @param {string} password - password compare based on the hashedPassword present in the db
 * @returns	User credentials for the logged in user if the credentials are correct
 */
async function loginUser(username, password) {
	// check if username exist
	const user = await User.findOne({ username });
	if (user === null) {
		throw new ErrorCode(404, "Username not found");
	}
	// verify entered password
	const passIsValid = bcrypt.compareSync(password, user.password);
	if (passIsValid) {
		return { userId: user._id, username: user.username, isAdmin: user.isAdmin };
	}
	throw new ErrorCode(401, "Invalid password");
}

// FIXME DOCS
/**
 *
 * @param {string} username - the username to delete
 * @returns	Delete the account of the logged in user
 */
async function deleteUser(username) {
	try {
		return await User.deleteOne({ username });
	} catch (error) {
		throw error;
	}
}

module.exports = {
	registerUser,
	loginUser,
	deleteUser,
};
