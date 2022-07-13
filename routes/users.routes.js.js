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
	updateUser,
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
			return response.json({
				message: "User created",
				user: request.body.username,
			});
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

// TODO update user
router.put(
	"/:userId",
	validate("params", "userIdSchema"),
	validate("body", "updateUser"),
	authenticateUser,
	async function (request, response, next) {
		// TODO update here
		try {
			const loggedInUser = request.user.userId;
			if (loggedInUser == request.params.userId) {
				const newUsername = request.body.newUsername;
				const newPassword = request.body.newPassword;
				const modifiedUser = await updateUser(newUsername, newPassword);
				return response.json({ message: "User updated", modifiedUser });
			}
		} catch (error) {
			next(error);
		}
	}
);

// DONE delete user
router.delete(
	"/:userId",
	validate("params", "userIdSchema"),
	authenticateUser,
	async (request, response, next) => {
		try {
			// TODO test
			const userToDelete = request.params.userId.toString();
			const loggedInUser = request.user.userId.toString();
			if (loggedInUser == userToDelete) {
				const result = await deleteUser(userToDelete);
				return response.json({ message: "User deleted", user: result });
			} else {
				return response.json({ message: "Unable to delete user" });
			}
		} catch (error) {
			next(error);
		}
	}
);

// DONE logout user
router.get("/logout", authenticateUser, (request, response, next) => {
	try {
		// TODO client remove token
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
