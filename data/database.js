const mongoose = require('mongoose');
require('dotenv').config();

// Set up default mongoose connection
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {}, () => console.log('Db Connected'));

// Get the default connection
const connection = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = connection;

// https://www.npmjs.com/package/mongoose
// const connection = mongoose.createConnection(mongoUri);
// const MyModel = connection.model('ModelName', schema);

// const model = new MyModel;
// model.save(); // works