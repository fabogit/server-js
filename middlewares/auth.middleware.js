const User = require("../models/user.model");

async function isAuthorized(req, res, next) {
	await User.findOne({username: req.body.user.username}).exec(function (error, user) {
			if (error) {
					return next(error);
			} else {
					if (user === null) {
							var err = new Error('Not authorized! Go back!');
							err.status = 401;
							return next(err);
					} else {
							return next();
					}
			}
	});
}

module.exports = isAuthorized;