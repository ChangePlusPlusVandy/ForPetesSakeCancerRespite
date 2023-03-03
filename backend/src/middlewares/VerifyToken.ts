// Imports the Firebase auth
// Splits the authorization header ("Bearer <token>")
// into an array and takes the second element, which is the token

import { auth, getTokenFromReq, getUserFromToken } from "../firebase";

const VerifyToken = async (req, res, next) => {
	try {
		const token = getTokenFromReq(req);

		// Verifies the token and decodes it to get associated user data
		// and stores it in req.user to be accessed by other routes

		req.user = await getUserFromToken(token);
		return next();
	} catch (e) {
		return res
			.status(401)
			.json({ message: "Unauthorized/invalid credentials" });
	}
};

export default VerifyToken;
