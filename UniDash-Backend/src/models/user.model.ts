import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	status: string;
	collegeId: string;
	phoneNumberCode: string;
	phoneNumber: string;
	ratingFromRiders: string;
	ratingFromDrivers: string;
	ratingTotal: string;
	privacyPolicyAgreeDateTime: string;
	roles: string[];
	userDetail: string;
};

export type NewUser = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	collegeId: string;
	phoneNumberCode: string;
	phoneNumber: string;
	password: string;
	hash: '';
};

export type UserMinimal = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	collegeId: string;
	phoneNumberCode: string;
	phoneNumber: string;
};

export type UpdateRoles = {
	id: string;
	roles: string[];
};

export interface LoginRequest {
	email: string;
	password: string;
}

const schema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	hash: { type: String, required: true },
	collegeId: { type: String, required: true },
	phoneNumberCode: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	ratingFromRiders: { type: String, required: false, default: '0' },
	ratingFromDrivers: { type: String, required: false, default: '0' },
	ratingTotal: { type: String, required: false, default: '0' },
	privacyPolicyAgreeDateTime: {
		type: String,
		required: false,
		default: new Date(),
	},
	roles: { type: [String], required: false, default: ['rider'] },
	userDetail: { type: String, required: false, default: '' },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);

export type UserRequest = {
	user: User;
};
