const { userValSchema, usernameSchema } = require('./users.schema');
const { ticketValSchema } = require('./tickets.schema');

module.exports = {
	user: userValSchema,
	username: usernameSchema,
	ticket: ticketValSchema
};