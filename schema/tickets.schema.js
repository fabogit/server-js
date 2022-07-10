const Joi = require("joi");

const ticketBodyValSchema = Joi.object(
	{
		description: Joi.string().min(10).required(),
		isCompleted: Joi.boolean(),
		// mongo auto timestamp
		createdAt: Joi.date(),
		updatedAt: Joi.date(),
	});

const ticketQueryValSchema = Joi.object(
	{
		page: Joi.number().min(1),
		limit: Joi.number().min(1).max(50)
	});

const ticketParamValSchema = Joi.object(
	{
		ticketId: Joi.string().hex().length(24)
	});

module.exports = {
	ticketBodyValSchema,
	ticketQueryValSchema,
	ticketParamValSchema
};
