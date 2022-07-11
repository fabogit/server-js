const Joi = require("joi");

const usernameSchema = Joi.string().min(3).required();

// user login/register schema
const userValSchema = Joi.object({
	username: usernameSchema,
	password: Joi.string().min(4).required(),
	isAdmin: Joi.boolean(),
});

module.exports = {
	userValSchema,
	usernameSchema,
};
