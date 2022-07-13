const Joi = require("joi");

const userIdSchema = Joi.string().hex().length(24);
const usernameSchema = Joi.string().min(3).required();
const passwordSchema = Joi.string().min(4).required();

// user login/register schema
const userValSchema = Joi.object({
	username: usernameSchema,
	password: passwordSchema,
	isAdmin: Joi.boolean(),
});

const updateUserBody = Joi.object({
	userId: userIdSchema,
	username: usernameSchema,
	password: passwordSchema,
});

module.exports = {
	userValSchema,
	usernameSchema,
	updateUserBody,
	userIdSchema
};
