import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import CONFIG from "../Config";
import { User } from "../models/User";
import { Request } from "express";

const app = initializeApp({
	credential: cert(CONFIG.firebaseCert as any),
});

const auth = getAuth(app);

const getTokenFromReq = (req: Request) => {
	return req.headers.authorization.split(" ")[1];
};

const getFirebaseUser = async (token: string) => {
	const decodedValue = await auth.verifyIdToken(token);
	if (!decodedValue) {
		throw new Error("Invalid Token");
	}

	return decodedValue;
};

const getUserFromToken = async (token: string) => {
	const decodedValue = await getFirebaseUser(token);

	let mongoDBUser: any = await User.findOne({ email: decodedValue.email });

	if (!mongoDBUser) {
		throw new Error("User not found");
	}

	mongoDBUser = JSON.parse(JSON.stringify(mongoDBUser));

	mongoDBUser.firebase = decodedValue;

	return mongoDBUser;
};

const getFromUserTokenAndAddIfNotFound = async (token: string) => {
	const decodedValue = await getFirebaseUser(token);

	let mongoDBUser: any = await User.findOne({ email: decodedValue.email });

	// const name = decodedValue.name;
	const email = decodedValue.email;
	// const username = decodedValue.username;
	// const phone = decodedValue.phone;

	if (!mongoDBUser) {
		const user = new User({
			// name,
			email,
			// username,
			// phone,
		});
		await user.save();
		return getUserFromToken(token);
	}
	else {
		// update the user data if it is different
		// if (name !== mongoDBUser.name) {
		// 	mongoDBUser.name = name;
		// }
		// if (email !== mongoDBUser.email) {
		// 	mongoDBUser.email = email;
		// }
		// if (username !== mongoDBUser.username) {
		// 	mongoDBUser.username = username;
		// }
		// if (phone !== mongoDBUser.phone) {
		// 	mongoDBUser.phone = phone;
		// }
		// await mongoDBUser.save();

		return getUserFromToken(token);
	}
};

export {
	auth,
	getUserFromToken,
	getTokenFromReq,
	getFromUserTokenAndAddIfNotFound,
	getFirebaseUser,
};
