const Ticket = require("../models/ticket.model");

/**
 * Create a new ticket
 * @param {string} username - ticket creator username
 * @param {ObjectId} userId - ticket creator userId
 * @param {string} description - description of the ticket
 * @param {boolean} isCompleted - true/false if the ticket stauts is open/closed (defaulted to false)
 * @returns	A ticket Object
 */
async function createTicket(username, userId, description, isCompleted) {
  try {
    return await Ticket.create({ username, userId, description, isCompleted });
  } catch (error) {
    throw error;
  }
}

// TODO create comunications
/**
 *
 * @param {*} ticketId
 * @param {*} username
 * @param {*} userId
 * @param {*} content
 */
async function createTicketMessage(ticketId, username, userId, message) {
  try {
    // update ticket comunications, push to array
    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        $push: {
          comunications: { date: new Date(), userId, username, message },
        },
      },
      { new: true }
    );
    return updatedTicket;
  } catch (error) {
    throw error;
  }
}

/**
 * Get all tickets for the query parameter, set paginated result based on the limit params
 * @param {Object} query - Object used to filter the result
 * @param {number} limit - How many result to fetch for every page (max value 50)
 * @param {number} skip - Number of documents to skip to return the requested data paginated
 * @returns The total numbers of documents and the documents filterd based on the query parameter
 */
async function getTickets(query, limit, skip) {
  try {
    // count how many and fetch filtering based on username/admin
    const countPromise = Ticket.find(query).count();
    const ticketsPromise = Ticket.find(query)
      //Sort by Date DESC
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const [count, tickets] = await Promise.all([countPromise, ticketsPromise]);
    return { count, tickets };
  } catch (error) {
    throw error;
  }
}

/**
 * Retrive a single ticket by _id
 * @param {ObjectId} ticketId - the ticket _id field
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

// TODO TEST
/**
 * Update if ticket isCompleted
 * @param {ObjectId} ticketId - the ticket _id field
 * @param {boolean} status - The new value of the isCompleted field
 * @returns the updated ticket object
 */
async function adminUpdateTicket(ticketId, status) {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { isCompleted: status },
      { new: true }
    );
    return ticket;
  } catch (error) {
    throw error;
  }
}

// TODO TEST
/**
 * Delete a ticket
 * @param {ObjectId} ticketId - the ticket _id field
 * @returns MongoDb operation outcome response
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
  createTicketMessage,
  getTickets,
  getTicketById,
  getTickets,
  adminUpdateTicket,
  adminDeleteTicket,
};
