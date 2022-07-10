const express = require('express');

const { testTickets, createTicket, adminGetAllTickets } = require('../controllers/ticket.controller');
const ErrorCode = require('../middlewares/http-error.middleware');
const { validate } = require('../middlewares/validation.middleware');

const router = express.Router();

// TODO
router.get('/', validate('query', 'ticketPg'), (request, response, next) => {
	if (!request.user.isAdmin) {
		// user is not admin, GET ONLY USER TICKETS -> getUserTickets()
		try {
			const data = 5;
			response.send(data);
		} catch (error) {
			next((error));
		}
	}

	if (request.user.isAdmin) {
		//  user is admin, GET ALL USERS TICKETS -> getAllUsersTickets()
		try {
			const data = adminGetAllTickets(request.query.skip, request.query.limit);
			response.send(data);
		} catch (error) {
			next((error));
		}
	}

});


// TODO
router.post('/', async (request, response, next) => {
	try {
		if (request.user.username != request.body.username) {
			throw new ErrorCode(401, 'ticket.username and user.username are not the same');
		}
		const ticket = await createTicket(request.body.username, request.body.description, request.body.completed);
		response.json({ message: 'Ticket created', ticket });
	} catch (error) {
		next((error));
	}
});
router.put('/');


router.get('/test', async function (request, response, next) {
	try {
		const tickets = await testTickets();
		//  find tickets
		response.json({ message: 'User found', tickets });
	} catch (error) {
		next(error);
	}
});


// paginated result => MyModel.find(query, fields, { skip: req.query.skip, limit: req.query.limit }, function(err, results) { ... })

// DOIN	`GET` 		`/tickets`						-> fetch user tickets /paginated result
// TODO	`POST`		`/tickets/`						-> ticket creation
// TODO	`GET`			`/tickets`						-> USER get user tickets, ADMIN get all tickets
// TODO	`GET`			`/tickets/:id`				-> get ticket by id
// TODO	`PUT`			`/tickets/:id`				-> ADMIN update ticket status
// TODO	`DELETE`	`/tickets/:id`				-> ADMIN delete ticket

module.exports = router;
