const Joi = require("joi");

// ticket creation schema
const ticketBodyValSchema = Joi.object({
	description: Joi.string().min(10).required(),
	isCompleted: Joi.boolean(),
	// mongo auto timestamp
	createdAt: Joi.date(),
	updatedAt: Joi.date(),
});

// pagination schema
const ticketQueryValSchema = Joi.object({
	page: Joi.number().min(1),
	limit: Joi.number().min(1).max(50),
});

// the tiketId param
const ticketParamValSchema = Joi.object({
	ticketId: Joi.string().hex().length(24),
});

module.exports = {
	ticketBodyValSchema,
	ticketQueryValSchema,
	ticketParamValSchema,
};
