import mongoose from "mongoose";
const { scryptSync, randomBytes } = require("crypto")

// required properties to create new user
interface UserAttrs {
	name: String,
    email: String,
    password: String,
    token: String
}

// describe user model interface
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

// describe user properties interface
interface UserDoc extends mongoose.Document {
	name: String,
    email: String,
    password: String,
    token: String
}

const userSchema = new mongoose.Schema({
	  name: String,
	  email: String,
	  password: String,
      token: String
});

// hash password on save
userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
		const salt = randomBytes(16).toString("hex");
		const buf = scryptSync(this.get('password'), salt, 64) as Buffer;
		const hashed = `${buf.toString('hex')}.${salt}`;
        this.set('password', hashed);
    }
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
export { User };