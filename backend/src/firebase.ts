import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import CONFIG from "./Config";
// const serviceAccountKey = require("./serviceAccountKey.json");

const app = initializeApp({
  credential: cert(CONFIG.firebaseCert as any),
});

const auth = getAuth(app);

export default auth;

// export default {
// 	verifyIdToken: (param1) => {return true}
// }