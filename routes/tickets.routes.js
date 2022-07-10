const express = require("express");

const {
	createTicket,
	getTickets,
	getTicketById,
	adminUpdateTicket,
	adminDeleteTicket,
} = require("../controllers/ticket.controller");

const { validate } = require("../middlewares/validation.middleware");

const router = express.Router();

// DONE
router.get(
	"/",
	validate("query", "ticketQueryValSchema"),
	async (request, response, next) => {
		let queryUsername = {};

		if (!request.user.isAdmin) {
			queryUsername = { username: request.user.username };
		}

		//  user is admin, GET ALL USERS TICKETS -> no query filter
		try {
			// handle pagination
			const page = +request.query.page || 1; // start from 1
			const limit = +request.query.limit || 20;
			const skip = (page - 1) * limit; // page starts from 1

			const { count, tickets } = await getTickets(queryUsername, limit, skip);
			if (!count) response.status(404).json({ message: "Cannot find tickets" });

			const pagesCount = count / limit;
			//! SET PAGE LIMIT
			// if (page > pagesCount) response.status(404).json({ message: `Page out of bound, max page available ${parseInt(pagesCount)}` });

			const pagination = {
				page,
				totalItems: count,
				itemsPerPage: limit,
				totalPages: pagesCount,
			};
			response.json({ pagination, tickets });
		} catch (error) {
			next(error);
		}
	}
);

// DONE
router.get(
	"/:ticketId",
	validate("params", "ticketParamValSchema"),
	async (request, response, next) => {
		try {
			const ticketId = request.params.ticketId;
			const ticket = await getTicketById(ticketId);
			response.json({ message: `TicketId _id:${ticketId} retrived `, ticket });
		} catch (error) {
			next(error);
		}
	}
);

// DONE
router.post(
	"/",
	validate("body", "ticketBodyValSchema"),
	async (request, response, next) => {
		try {
			// get name from jwt
			const username = request.user.username;
			const ticket = await createTicket(
				username,
				request.body.description,
				request.body.isCompleted
			);
			response.json({ message: `Ticket created by user ${username}`, ticket });
		} catch (error) {
			next(error);
		}
	}
);

// FIXME TEST, validation
router.put(
	"/:ticketId",
	validate("body", "ticketBodyValSchema"),
	async (request, response, next) => {
		try {
			if (request.user.isAdmin) {
				const ticketId = request.params.ticketId;
				const ticket = await adminUpdateTicket(
					ticketId,
					request.body.description,
					request.body.isCompleted
				);
				response.json({
					message: `Ticket ${ticketId} updated by admin ${request.user.username}`,
					ticket,
				});
			} else {
				response
					.status(400)
					.json({ message: "Only admins can update tickets" });
			}
		} catch (error) {
			next(error);
		}
	}
);

// FIXME TEST, validation
router.delete(
	"/:ticketId",
	validate("body", "ticketBodyValSchema"),
	async (request, response, next) => {
		try {
			if (request.user.isAdmin) {
				const ticketId = request.params.ticketId;
				const ticket = await adminDeleteTicket(ticketId);
				response.json({
					message: `Ticket ${ticketId} deleted by admin ${request.user.username}`,
					ticket,
				});
			} else {
				response
					.status(400)
					.json({ message: "Only admins can update tickets" });
			}
		} catch (error) {
			next(error);
		}
	}
);

// TODO might want to get all ticket for a username (admin filter by username/ clientside filtering)

module.exports = router;
