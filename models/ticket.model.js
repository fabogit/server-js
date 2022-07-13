const mongoose = require("mongoose");

// TODO add field -> comunications[{date, username/uId, content}]

const TicketSchema = new mongoose.Schema({
	username: {
		type: String,
		ref: 'User',
		required: true,
		trim: true,
	},
	userId: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
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
	comunications: [{
		date: {
			type: Date,
			required: true,
		},
		userId: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		username: {
			type: String,
			ref: 'User',
			required: true,
		},
		message: {
			type: String,
			required: true,
		}
	}]
}, {
	timestamps: true
});

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;
