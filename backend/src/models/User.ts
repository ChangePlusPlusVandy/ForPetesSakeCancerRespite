import mongoose from "mongoose";
const { scryptSync, randomBytes } = require("crypto");
// required properties to create new user
// interface UserAttrs {
// 	name: String,
//     email: String,
// 	username: String,
// 	phone: Number,
// 	groupchats?: []
// }

// // describe user model interface
// interface UserModel extends mongoose.Model<UserDoc> {
//     build(attrs)
// }

// // describe user properties interface
// interface UserDoc extends mongoose.Document {
// 	name: String,
//     email: String,
// 	username: String,
// 	phone: Number,
// 	groupchats: []
// }

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	username: String,
	phone: String,
	bio: String,
	groupchats: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "GroupChats" }],
	},
});

// userSchema.statics.build = (attrs) => {
// 	if(!attrs.groupchats)
// 	{
// 		attrs.groupchats = [];
// 	}
//     return new User(attrs)
// };

userSchema.pre("save", function (next) {
	if (!this.groupchats) {
		this.groupchats = [];
	}
	if(!this.bio)
	{
		this.bio = "";
	}
	next();
});

userSchema.methods.removeSensitiveData = function ()
{
	let jsonObj = JSON.parse(JSON.stringify(this));
	jsonObj.email = undefined;
	jsonObj.phone = undefined;
	jsonObj.groupchats = undefined;
	return jsonObj;
}

const User = mongoose.model("User", userSchema);
export { User };
