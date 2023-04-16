import mongoose from "mongoose";
const { scryptSync, randomBytes } = require("crypto");
// required properties to create new user

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	username: String,
	phone: String,
	bio: String,
	groupchats: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "GroupChats" }],
	},
	profile_picture: String,
	follower: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	},
	following: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	},
	newsletter: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Newsletter" }],
	},
});

userSchema.pre("save", function (next) {
	if (!this.groupchats) {
		this.groupchats = [];
	}
	if (!this.bio) {
		this.bio = "";
	}
	next();
});

userSchema.methods.removeSensitiveData = function () {
	let jsonObj = JSON.parse(JSON.stringify(this));
	jsonObj.email = undefined;
	jsonObj.phone = undefined;
	jsonObj.groupchats = undefined;
	return jsonObj;
};

const User = mongoose.model("User", userSchema);
export { User };
