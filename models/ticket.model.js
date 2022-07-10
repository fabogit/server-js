const mongoose = require("mongoose");

var TicketSchema = new mongoose.Schema({
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
	isCompleted: {
		type: Boolean,
		required: false,
		default: false,
	},
}, {
	timestamps: true
});

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;
