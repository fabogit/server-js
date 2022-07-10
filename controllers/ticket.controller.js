const Ticket = require('../models/ticket.model');

async function createTicket(username, description, isCompleted) {
	try {
		return await Ticket.create({ username, description, isCompleted });
	} catch (error) {
		throw error;
	}
}

function getTicketById(ticketId) {
	try {
		return "test"
	} catch (error) {
		throw error;
	}
}

async function getUserTickets(username, skip, limit) {
	try {
		const userTickets = await Ticket.find({ username }, {}, { skip, limit });
		return userTickets;
	} catch (error) {
		throw error;
	}
}


async function adminGetAllTickets(skip, limit) {
	try {
		const userTickets = await Ticket.find({}, {}, { skip, limit });
		return userTickets;
	} catch (error) {
		throw error;
	}
}

function adminUpdateTicket() {

}

function adminDeleteTicket() {

}

async function testTickets() {
	try {
		const tickets = await Ticket.find();
		return tickets;
	} catch (error) {
		throw error;
	}
}


module.exports = {
	createTicket,
	getTicketById,
	getUserTickets,
	adminGetAllTickets,
	testTickets
};