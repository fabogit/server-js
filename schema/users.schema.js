const Joi = require("joi");

const usernameSchema = Joi.string().min(3).required();

const userValSchema = Joi.object(
	{
		username: usernameSchema,
		password: Joi.string().min(5).required(),
		isAdmin: Joi.boolean()
	});


module.exports = {
	userValSchema,
	usernameSchema
};
