require('dotenv').config();

database = {
	uri: process.env.MONGO_URI,
	host: process.env.MONGO_HOST,
	port: process.env.MONGO_PORT,
	name: process.env.MONGO_NAME,
	user: process.env.MONGO_USER,
	password: process.env.MONGO_PASSWORD,
}

node = {
	port: process.env.PORT,
	host: process.env.HOST
}

module.exports = {
	database
};