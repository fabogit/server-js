function handleErrors(error, req, res, next) {
	console.log(` ERROR → ${error}`);

	return res.status(error.status || 500).json({message: error.message});
}

module.exports = handleErrors;