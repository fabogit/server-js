const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const errorHandlerMiddleware = require("./middlewares/error.middleware");
const jwtMiddleware = require("./middlewares/jwt.middleware");

const testRouter = require("./routes/test");
const usersRouter = require("./routes/users.routes.js");
const ticketsRouter = require("./routes/tickets.routes.js");
const connectDB = require("./data/database");

const app = express();

const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
// TODO enable for client forms?
// app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", testRouter);
app.use("/users", usersRouter);
app.use("/tickets", jwtMiddleware.authenticateUser, ticketsRouter);
// error handling
app.use(errorHandlerMiddleware);

const bootstrap = () => {
	try {
		connectDB();
		app.listen(port, () => {
			console.log(`Server running @ http://localhost:${port}`);
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};
bootstrap();
