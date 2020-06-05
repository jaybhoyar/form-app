var jwt = require("jsonwebtoken");

module.exports = {
	generateJwt: async (user, next) => {
		try {
			var payload = { userId: user._id };
			var token = await jwt.sign(payload, process.env.SECRET);
			return token;
		} catch (error) {
			next(error);
		}
	},
};
