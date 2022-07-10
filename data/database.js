const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(mongoUri);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		throw new Error(error.message)
	}
};

module.exports = connectDB;
