# Use case

- main page allow to login/register/logout

- on login ui will load all user available tickets (might add filter to show only the open/closed), data is paginated

- users can create a new ticket

- single tickets can be selected to show full details, admin users can update/delete tickets

auth/roles:

an user can read and create his tickets,

an admin can read all users tickets and update the completed field


access token:

```
Bearer pasteheretheAccessTokenFrom/users/login
```

# API

## open api

-	`POST`		`/users/`			-> Register a new user

-	`PUT`		`/users/:userId`	-> logged in user can update username/password // TODO

-	`DELETE`	`/users/`			-> Delete a user if is currently logged in

-	`GET`		`/users/login`		-> Log in the user and create the access token

-	`GET`		`/users/logout`		-> Remove jwt client side || DELETE session ?

## auth api, access token needed

-	`GET` 		`/tickets`				-> fetch user tickets /paginated result, ADMINS will get all tickets

-	`POST`		`/tickets`				-> user ticket creation

-	`GET`		`/tickets/:id`			-> get ticket by id

-	`PUT`		`/tickets/:id`			-> ADMINS update ticket status

-	`DELETE`	`/tickets/:id`			-> ADMINS delete ticket

- 	`POST`		`/messages/:ticketId`	-> ADMINS and the ticket owner can create messages


# data schema

collections:

```
users: {
	username: string,
	password: string,
	isAdmin: boolean
	}
```

```
tickets: {
	username: string,
 	description: string,
  	isCompleted: boolean(default: false)

	comunications: [
		{
		date: Date
		userId: ObjectId,
		username: string
		message: string
	}, ...
	],
  	createdAt: Date
  	updatedAt: Date
	}
```

to gen token

`node` -> `require('crypto').randomBytes(64).toString('hex')`
