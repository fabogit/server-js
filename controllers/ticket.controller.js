const Ticket = require("../models/ticket.model");

/**
 * Create a new ticket
 * @param {string} username - the user who created the ticke
 * @param {string} description - description of the ticket
 * @param {boolean} isCompleted - true/false if the ticket stauts is open/closed (defaulted to false)
 * @returns	A ticket Object
 */
async function createTicket(username, description, isCompleted) {
	try {
		return await Ticket.create({ username, description, isCompleted });
	} catch (error) {
		throw error;
	}
}

/**
 * Get all tickets for the query parameter, set paginated result based on the limit params
 * @param {Object} query - Object used to filter the result
 * @param {number} limit - How many result to fetch for every page
 * @param {number} skip - Number of documents to skip to return the requested data paginated
 * @returns The total numbers of documents and the documents filterd based on the query parameter
 */
async function getTickets(query, limit, skip) {
	try {
		// count how many and fetch filtering based on username/admin
		const countPromise = Ticket.find(query).count();
		const ticketsPromise = Ticket.find(query).limit(limit).skip(skip);

		const [count, tickets] = await Promise.all([countPromise, ticketsPromise]);
		return { count, tickets };
	} catch (error) {
		throw error;
	}
}

/**
 * Retrive a ticket by its id
 * @param {MongoObjectId} ticketId - the ticket _id
 * @returns	A single ticket corresponding the passed ticketId
 */
async function getTicketById(ticketId) {
	try {
		const ticket = await Ticket.findById({ _id: ticketId });
		return ticket;
	} catch (error) {
		throw error;
	}
}

// TODO DOCS
/**
 *
 * @param {*} ticketId
 * @param {*} update
 * @param {*} status
 * @returns
 */
async function adminUpdateTicket(ticketId, update, status) {
	try {
		const ticket = await Ticket.updateOne(
			{ _id: ticketId },
			{ description: update, isCompleted: status }
		);
		return ticket;
	} catch (error) {
		throw error;
	}
}

// TODO TEST, DOCS
/**
 *
 * @param {*} ticketId
 * @returns
 */
async function adminDeleteTicket(ticketId) {
	try {
		const ticket = await Ticket.deleteOne({ _id: ticketId });
		return ticket;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	createTicket,
	getTickets,
	getTicketById,
	getTickets,
	adminUpdateTicket,
	adminDeleteTicket,
};
