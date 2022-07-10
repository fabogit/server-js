

login/signup
auth/roles:
an user can read and create his tickets,
an admin can read all users tickets and update the completed field


access token:

```
Bearer pasteheretheAccessTokenFrom/users/login
```

- open api

DONE	`POST`		`/users/register`
DONE	`POST`		`/users/login`
TODO	`DELETE`	`/users/logout`		-> Remove jwt client side

- auth api

DOIN	`GET` 		`/tickets`			-> fetch user tickets /paginated result
DOIN	`GET`		`/tickets`			-> ADMIN get all tickets
TODO	`POST`		`/tickets`			-> ticket creation
TODO	`GET`		`/tickets/:id`		-> get ticket by id
TODO	`PUT`		`/tickets/:id`		-> ADMIN update ticket status
TODO	`DELETE`	`/tickets/:id`		-> ADMIN delete ticket


# data

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
  	completed: boolean(default: false)
  }
```

to gen token

`node` -> `require('crypto').randomBytes(64).toString('hex')`


# Setup

- Create `tsconfig.json` file

```
npx tsc --init
```
- Initialize nodejs application and fill needed fields

```
npm init
```
- Create source code folder and server entrypoint @`/src/app.ts`

```
mkdir ./src/ && touch ./src/app.ts
```

- Install Dependencies

```
npm i express
```

- Install ts devDependencies (`ts-node-dev` to run server like `nodemon`)

```
npm i -D typescript @types/node @types/express ts-node-dev
```

- Add script to package.json (watch mode and restart on save)

```
  "scripts": {
	"dev": "ts-node-dev --respawn --transpile-only src/app.ts"
  },
```
- Install Swagger Dependencies

```
npm i swagger-jsdoc swagger-ui-express
```

```
npm i --save-dev @types/swagger-jsdoc @types/swagger-ui-express
```

in `tsconfig.json` set  `"resolveJsonModule": true`

- Start server (npm start)

```
npm run dev
```
