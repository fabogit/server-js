const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var TicketSchema = new Schema({
	username: {
		type: String,
		ref: 'User',
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		required: true,
		default: false,
	},
}, {
	timestamps: true
});

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;
