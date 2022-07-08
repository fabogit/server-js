const express = require('express');
const {  } = require('../controllers/ticket.controller');
const router = express.Router();

// TODO
router.get('/', (request, response, next) => {
	if(!isAdmin){
		// user is not admin, GET ONLY USER TICKETS -> getUserTickets()
	}
	//  user is admin, GET ALL USERS TICKETS -> getAllUsersTickets()

	try {
		const data = 5;
		response.send(data);
	} catch (error) {
		next((err));
	}
});


// TODO
router.post('/:username', async (request, response, next) => {
	try {
		const data =  await testTicketSave(request.body.username, request.body.description, request.body.completed);
		response.send(data);
	} catch (error) {
		next((err));
	}
});
router.put('/');


router.get('/:username', async function (req, res, next) {
	try {
		const userData = await findUser(req.params.username);
		//  find tickets
		res.json({ message: 'User found', user: 1 });
	} catch (error) {
		next(error);
	}
});


// paginated result => MyModel.find(query, fields, { skip: req.query.skip, limit: req.query.limit }, function(err, results) { ... })

// DOIN	`GET` 		`/tickets`						-> fetch user tickets /paginated result
// TODO	`POST`		`/tickets/:username`	-> ticket creation
// TODO	`GET`			`/tickets`						-> USER get user tickets, ADMIN get all tickets
// TODO	`GET`			`/tickets/:id`				-> get ticket by id
// TODO	`PUT`			`/tickets/:id`				-> ADMIN update ticket status
// TODO	`DELETE`	`/tickets/:id`				-> ADMIN delete ticket

module.exports = router;
