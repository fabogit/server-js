const { userValSchema, usernameSchema } = require('./users.schema');
const { ticketBodyValSchema, ticketQueryValSchema, ticketParamValSchema } = require('./tickets.schema');

module.exports = {
	user: userValSchema,
	username: usernameSchema,
	ticketBodyValSchema,
	ticketQueryValSchema,
	ticketParamValSchema
};