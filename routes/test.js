const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middlewares/jwt.middleware");
const User = require("../models/user.model");
const { validate } = require("../middlewares/validation.middleware");
const { getTickets } = require('../controllers/ticket.controller');

router.get("/", function (req, res, next) {
	res.sendStatus(200);
});

router.get(
	"/all-users",
	authenticateUser,
	async function (request, response, next) {
		try {
			const data = await User.find();
			return response.json(data);
		} catch (error) {
			next(error);
		}
	}
);

router.get(
	"/tickets-free",
	// validate("query", "ticketQueryValSchema"),
	async (request, response, next) => {
		let query = {};
		// if (!request.user.isAdmin) {
		// 	const userId = request.user.userId;
		// 	query = { userId: userId };
		// }
		//  user is admin, GET ALL USERS TICKETS -> no query filter
		try {
			// handle pagination
			let page = +request.query.page || 1; // start from 1
			const limit = +request.query.limit || 20;
			const skip = (page - 1) * limit; // page starts from 1

			const { count, tickets } = await getTickets(query, limit, skip);
			if (!count) {
				return response.status(404).json({ message: "Cannot find tickets" });
			}
			const pagesCount = count / limit;

			// TODO !PAGE LIMIT
			if (tickets.length == 0) {
				return response.status(404).json({
					message: `No available tickets for page number ${page}, page max value ${pagesCount}, total items ${count}`,
				});
			}
			if (page > pagesCount) {
				// return response.status(404).json({ message: `Page out of bound, total items ${count}, page max value ${pagesCount}` });
			}
			const pagination = {
				page,
				totalItems: count,
				itemsPerPage: limit,
				totalPages: pagesCount,
			};
			return response.json({ pagination, tickets });
		} catch (error) {
			next(error);
		}
	}
);


module.exports = router;
