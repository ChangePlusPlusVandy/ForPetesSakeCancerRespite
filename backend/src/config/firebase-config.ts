const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const serviceAccountKey = require("./serviceAccountKey.json");

const app = initializeApp({
  credential: cert(serviceAccountKey),
});

const auth = getAuth(app);

export default auth;

// export default {
// 	verifyIdToken: (param1) => {return true}
// };