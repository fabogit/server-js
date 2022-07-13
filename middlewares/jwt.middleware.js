const jwt = require('jsonwebtoken');

// serialize user
function serializeUser(user) {
	try {
		const userJwt = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET	);
		return userJwt;
	} catch (error) {
		throw error;
	}
}

// deserialize jwt
function authenticateUser(request, response, next) {
	const authHeader = request.headers['authorization'];
	// token || undefined if !authHeader
	const token = authHeader && authHeader.split(' ')[1];
	// DEBUG console.log(token);
	if (token == null) return response.sendStatus(401).json({ message: 'Null or invalid jwt' });
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return response.sendStatus(403).json({message: 'Forbidden or insufficient permissions'});
		// create user if token is valid
		// TODO only userId & isAdmin
		// FIXME return only necessary informations
		request.user = user;
		next();
	});
}

// TODO refresh token

module.exports = {
	serializeUser,
	authenticateUser
};