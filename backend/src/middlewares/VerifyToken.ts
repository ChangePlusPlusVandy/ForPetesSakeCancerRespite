// Imports the Firebase auth
// Splits the authorization header ("Bearer <token>")
// into an array and takes the second element, which is the token

import auth from "../config/firebase-config";

const VerifyToken = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];

        // Verifies the token and decodes it to get associated user data
        // and stores it in req.user to be accessed by other routes
        const decodeValue = await auth.verifyIdToken(token);
        if (decodeValue) {
            req.user = decodeValue;
            return next();
        }
    } catch (e) {
        return res.status(401).json({ message: "Unauthorized/invalid credentials" });
    }
};

export default VerifyToken;