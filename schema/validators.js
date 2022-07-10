const { userValSchema, usernameSchema } = require('./users.schema');
const { ticketValSchema, ticketQueryValSchema } = require('./tickets.schema');

module.exports = {
	user: userValSchema,
	username: usernameSchema,
	ticket: ticketValSchema,
	ticketPg : ticketQueryValSchema
};