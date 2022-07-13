const { userValSchema, usernameSchema } = require("./users.schema");
const {
	ticketBodyPostValSchema,
	ticketBodyPostMessValSchema,
	ticketQueryValSchema,
	ticketParamValSchema,
	ticketBodyPutValSchema
} = require("./tickets.schema");

module.exports = {
	user: userValSchema,
	username: usernameSchema,
	ticketBodyPostValSchema,
	ticketBodyPostMessValSchema,
	ticketQueryValSchema,
	ticketParamValSchema,
	ticketBodyPutValSchema
};
