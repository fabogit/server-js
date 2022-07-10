const Joi = require("joi");

const ticketValSchema = Joi.object(
	{
		username: Joi.string().min(4).required(),
		description: Joi.string().min(10).required(),
		isCompleted: Joi.boolean(),
		// mongo auto timestamp
		createdAt: Joi.date(),
		updatedAt: Joi.date(),
	});

const ticketQueryValSchema = Joi.object(
	{
		skip: Joi.number().min(1),
		limit: Joi.number().min(1)
	});

module.exports = {
	ticketValSchema,
	ticketQueryValSchema
};
