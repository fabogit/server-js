const Joi = require("joi");
const ErrorCode = require("./http-error.middleware");

const inputSchemas = require("../schema/validators");

// Validate request based on inputSchemas
function validate(type, validator) {
	return async function (req, res, next) {
		let requestType;
		if (type == "query") {
			requestType = req.query;
		}
		if (type == "body") {
			requestType = req.body;
		}
		if (type == "params") {
			requestType = req.params;
		}
		try {
			const validatedData = await inputSchemas[validator].validateAsync(
				requestType
			);
			requestType = validatedData;
			next();
		} catch (err) {
			// Pass validation err to next
			if (err.isJoi) return next(new ErrorCode(422, err.message));
			next(err);
		}
	};
}

module.exports = {
	validate,
};
