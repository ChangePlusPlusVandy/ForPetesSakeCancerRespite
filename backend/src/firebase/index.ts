import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import CONFIG from "../Config";
import { User } from "../models/User";
import { Request } from "express";

const app = initializeApp({
	credential: cert(CONFIG.firebaseCert as any),
});

const auth = getAuth(app);

const getToken = (req: Request) => {
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

	if (!mongoDBUser) {
		const name = decodedValue.name;
		const email = decodedValue.email;
		const user = User.build({
			name,
			email,
		});
		await user.save();
		return getUserFromToken(token);
	}

	return getUserFromToken(token);
};

export {
	auth,
	getUserFromToken,
	getToken,
	getFromUserTokenAndAddIfNotFound,
	getFirebaseUser,
};
