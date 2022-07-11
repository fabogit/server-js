const express = require("express");
const router = express.Router();

const { validate } = require("../middlewares/validation.middleware");
const {
	serializeUser,
	authenticateUser,
} = require("../middlewares/jwt.middleware");
const {
	loginUser,
	registerUser,
	deleteUser,
} = require("../controllers/user.controller.js");

// DONE register user
router.post(
	"/",
	validate("body", "user"),
	async function (request, response, next) {
		try {
			const user = await registerUser(
				request.body.username,
				request.body.password,
				request.body.isAdmin
			);
			// TODO filter out password ecc..
			return response.json({ message: "User created", user });
		} catch (error) {
			next(error);
		}
	}
);

// DONE login user
router.post(
	"/login",
	validate("body", "user"),
	async function (request, response, next) {
		try {
			const user = await loginUser(
				request.body.username,
				request.body.password
			);
			if (!user) {
				return response.json({ message: "User not found" });
			}
			// serialize user
			const accessToken = serializeUser(user);

			// User Access Jwt
			return response.json({ message: "User logged in", accessToken });
		} catch (error) {
			next(error);
		}
	}
);

// DONE
router.delete("/remove", authenticateUser, async (request, response, next) => {
	try {
		const usernameToDelete = request.body.username;
		const loggedInUser = request.user.username;
		if (loggedInUser == usernameToDelete) {
			const result = await deleteUser(usernameToDelete);
			// TODO delete client jwt
			return response.json({ message: "User deleted", user: result });
		} else {
			return response.json({ message: "Unable to delete user" });
		}
	} catch (error) {
		next(error);
	}
});

// DONE
router.get("/logout", authenticateUser, (request, response, next) => {
	try {
		// TODO Client side remove token
		// request.headers.authorization = null;
		if (request.user) {
			return response.json({
				message: "Loggin out user",
				user: request.user.username,
			});
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
