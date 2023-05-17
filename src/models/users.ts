import { Schema, model } from 'mongoose';

const providerSchema: Schema = new Schema({
	name: {
		type: String,
		enum: ['GOOGLE', 'MOBILE'],
		required: true,
	},
	uid: {
		type: String,
		required: true,
	},
	data: Object,
});

providerSchema.index({ name: 1, uid: 1 }, { unique: true });

const experienceSchema: Schema = new Schema({
	yearsOfExperience: {
		type: Number,
	},
});

const serviceSchema: Schema = new Schema({
	name: {
		type: String,
	},
	experience: [experienceSchema],
});

const addressSchema: Schema = new Schema({
	street: String,
	houseNo: String,
	pincode: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	tag: {
		type: String,
	},
});

const userSchema: Schema = new Schema({
	name: {
		type: String,
	},
	image: {
		type: String,
	},
	gender: {
		type: String,
		enum: ['MALE', 'FEMALE', 'OTHERS'],
	},
	isDisabled: {
		type: Boolean,
		default: false,
	},
	email: String,
	DOB: String,
	mobile: String,
	price: Number,
	rating: Number,
	addresses: [addressSchema],
	providedServices: [serviceSchema],
	providers: {
		type: [providerSchema],
		required: true,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
});

export default model('healthcare', userSchema);
