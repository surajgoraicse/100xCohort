import jwt from "jsonwebtoken";
import { Document, model, Schema } from "mongoose";
const accessTokenSecret =
	process.env.ACCESS_TOKEN_SECRET || "thisissomejwtaccesstokensecret";

export interface IUser extends Document {
	username: string;
	email: string;
	fullname: string;
	password: string;
	role: "user" | "admin";
	profileImage: string;
	createdAt: Date;
	updatedAt: Date;
	genereateAccessToken(): string;
}

const userSchema = new Schema<IUser>(
	{
		username: {
			type: String,
			lowercase: true,
			trim: true,
			unique: true,
			required: [true, "username has to be unique"],
		},

		email: {
			type: String,
			lowercase: true,
			trim: true,
			unique: [true, "email has to be unique"],
			required: [true, "Please provide email"],
			match: [/^[\w.-]+@[\w.-]+\.[a-z]{2,4}$/, "invalid email format"],
		},
		fullname: {
			type: String,
			lowercase: true,
			trim: true,
			required: [true, "Please provide fullname"],
		},

		profileImage: {
			type: String,
			default: "some random image",
			lowercase: true,
			trim: true,
		},

		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
	},
	{ timestamps: true }
);

// function to genereate access token

userSchema.methods.generateRefreshToken = (
	username: string,
	email: string,
	role: "user" | "admin"
): string | null => {
	try {
		const token = jwt.sign({ username, email, role }, accessTokenSecret, {
			expiresIn: "10d",
			issuer: "surajgorai",
		});
		return token;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const UserModel = model<IUser>("User", userSchema);
export default UserModel;

