const connection = require('../data/database');
const Ticket = require('../models/ticket.model');

async function testTicket() {
	return await Ticket.find();
}

async function createTicket(username, description, completed = false) {
	return await Ticket.create({ username: username, description: description, completed: completed });
}

function getUserTickets() {

}

function getTicketById() {

}

function getAllUsersTickets() {

}

function adminUpdateTicket() {

}

function adminDeleteTicket() {

}


module.exports = {
	testTicket,
	createTicket,
	getAllUsersTickets
};