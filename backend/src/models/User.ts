import mongoose from "mongoose";
const { scryptSync, randomBytes } = require("crypto")
// required properties to create new user
interface UserAttrs {
	name: String,
    email: String,
	username: String,
	phone: Number,
	groupchats?: [],
	follower?: [],
	following?: []
}

// describe user model interface
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

// describe user properties interface
interface UserDoc extends mongoose.Document {
	name: String,
    email: String,
	username: String,
	phone: Number,
	groupchats: [],
	follower: [],
	following: []
}

const userSchema = new mongoose.Schema({
	  name: String,
	  email: String,
	  username: String,
	  phone: Number,
	  groupchats: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GroupChats' }]
	  },
	  follower: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
	  },
	  following: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
	  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
	if(!attrs.groupchats)
	{
		attrs.groupchats = [];
	}
    return new User(attrs)
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
export { User };
