import mongoose from "mongoose";

export interface IContent {
	title: string;
	description: string;
	images: string[];
	videos: string[];
}
export interface ICourse extends mongoose.Document {
	title: string;
	description: string;
	price: number;
	images: string[];
	creator: mongoose.Schema.Types.ObjectId;
	content: IContent[];
}

const courseContent = new mongoose.Schema<IContent>({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	images: {
		type: [String],
		required: true,
		default: ["some default image"],
	},
	videos: {
		type: [String],
		required: true,
		default: ["some default image"],
	},
});

const courseSchema = new mongoose.Schema<ICourse>({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	price: {
		type: Number,
		required: true,
		trim: true,
	},
	images: {
		type: [String],
		required: true,
		default: ["some default image"],
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	content: {
		type: [courseContent],
		default: [],
		required: true,
	},
});

const CourseModel = mongoose.model<ICourse>("Course", courseSchema);

export default CourseModel;
