const Joi = require("joi");

const ticketValSchema = Joi.object(
	{
		username: Joi.string().min(5).required(),
		description: Joi.string().min(10).required(),
		isCompleted: Joi.boolean().required(),
		createdAt: Joi.date(),
		updatedAt: Joi.date(),
	});

module.exports = ticketValSchema;
