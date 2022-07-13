const Joi = require("joi");

// ticket creation schema
const ticketBodyPostValSchema = Joi.object({
  description: Joi.string().min(10).required(),
  isCompleted: Joi.boolean(),
  // mongo auto timestamp
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

const ticketBodyPutValSchema = Joi.object({
  description: Joi.string().min(10),
  isCompleted: Joi.boolean().required(),
});

// ticket update schema
const ticketBodyPostMessValSchema = Joi.object({
  // userId: Joi.string().hex().length(24).required(),
  message: Joi.string().min(3).required(),
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
  ticketQueryValSchema,
  ticketParamValSchema,
  ticketBodyPostValSchema,
  ticketBodyPostMessValSchema,
	ticketBodyPutValSchema
};
