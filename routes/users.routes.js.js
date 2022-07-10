const express = require('express');
const router = express.Router();

const { validate } = require('../middlewares/validation.middleware')
const { serializeUser, authenticateUser } = require("../middlewares/jwt.middleware");
const { loginUser, registerUser } = require('../controllers/user.controller.js');


router.post('/register', validate('body', 'user'), async function (request, response, next) {
	try {
		const user = await registerUser(request.body.username, request.body.password, request.body.isAdmin);
		response.json({ message: 'User created', user });
	} catch (error) {
		next(error);
	}
});

router.post('/login', validate('body', 'user'), async function (request, response, next) {
	try {
		const user = await loginUser(request.body.username, request.body.password);
		if(!user){
			response.json({message: 'User not found'})
		}
		// serialize user
		const accessToken = serializeUser(user)

		response.json({ message: 'User logged in', accessToken });
	} catch (error) {
		next(error);
	}
});

router.get('/logout',authenticateUser, (request, response, next) => {
	try {
		// TODO Client side remove token
		if(request.user){
			response.json({ message: 'Loggin out user', user: request.user.username });
			request.headers.authorization = null
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
