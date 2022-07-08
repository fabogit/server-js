const express = require('express');
const router = express.Router();

const validateBody = require('../middlewares/validation.middleware')
const { serializeUser, authenticateUser } = require("../middlewares/jwt.middleware");
const { loginUser, registerUser } = require('../controllers/user.controller.js');


router.post('/register', validateBody('user'), async function (request, response, next) {
	try {
		const user = await registerUser(request.body.username, request.body.password, request.body.isAdmin);
		response.json({ message: 'User created', loginUser });
	} catch (error) {
		next(error);
	}
});

router.post('/login', validateBody('user'), async function (request, response, next) {
	try {
		const user = await loginUser(request.body.username, request.body.password);

		// serialize user
		const accessToken = serializeUser(user)

		response.json({ message: 'User logged in', accessToken, user });
	} catch (error) {
		next(error);
	}
});

router.post('/logout', (request, response, next) => {
	try {
		response.json({ message: 'Loggin out user', user: user.username });
	} catch (error) {
		next(error);
	}
});

router.post('/testjwt', authenticateUser, async function (request, response, next) {
	try {
		response.json({ message: 'User', user: request.user });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
