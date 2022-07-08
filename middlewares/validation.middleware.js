const Joi = require('joi');
const ErrorCode = require('./http-error.middleware');

const inputSchemas = require('../schema/validators')

// Validate request body based on inputSchemas
module.exports = function (validator) {
	return async function (req, res, next) {
		try {
			const validatedBody = await inputSchemas[validator].validateAsync(req.body);
			req.body = validatedBody;
			next();
		} catch (err) {
			// Pass validation err to next
			if (err.isJoi)
				return next(new ErrorCode(422, err.message));
			next(err);
		}
	};
};