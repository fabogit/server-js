const express = require('express');
const router = express.Router();

const { authenticateUser } = require("../middlewares/jwt.middleware");

router.get('/', function(req, res, next) {
  res.sendStatus(200);
});

router.post('/testjwt', authenticateUser, async function (request, response, next) {
	try {
		response.json({ message: 'User', user: request.user });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
