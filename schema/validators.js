const { userIdSchema, userValSchema, usernameSchema, updateUserBody } = require("./users.schema");
const {
	ticketBodyPostValSchema,
	ticketBodyPostMessValSchema,
	ticketQueryValSchema,
	ticketParamValSchema,
	ticketBodyPutValSchema
} = require("./tickets.schema");

module.exports = {
	userIdSchema,
	user: userValSchema,
	username: usernameSchema,
	updateUserBody,
	ticketBodyPostValSchema,
	ticketBodyPostMessValSchema,
	ticketQueryValSchema,
	ticketParamValSchema,
	ticketBodyPutValSchema
};
