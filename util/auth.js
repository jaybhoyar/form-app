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
	validateJwt: async (req, res, next) => {
		try {
			var token = req.headers["authorization"] || "";
			if (!token) {
				return res.status(401).json({ message: "token required" });
			}
			var payload = await jwt.verify(token, process.env.SECRET);
			req.userId = payload.userId;
			next();
		} catch (error) {
			return res
				.status(401)
				.json({ error: error.message || "something went wrong" });
		}
	},
};
