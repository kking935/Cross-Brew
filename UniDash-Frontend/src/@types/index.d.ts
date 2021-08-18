export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	collegeId: string;
	phoneNumberCode: string;
	phoneNumber: string;
	roles: string[];
}

export type UserMinimal = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	roles: string[];
}

export type UserDetails = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	collegeId: string;
	phoneNumberCode: string;
	phoneNumber: string;
	ratingFromRiders: string;
	ratingFromDrivers: string;
	ratingTotal: string;
	privacyPolicyAgreeDateTime: string;
	roles: string[];
	userDetail: string;
}

export type UpdateUser = {
	id: string;
	roles: string[];
}

export type Group = {
	id: string;
	name: string;
	members: UserMinimal[];
}

export type GroupMinimal = {
	id: string; 
	name: string;
}

export type UpdateGroup = {
	id: string;
	name: string;
}

export interface CreateUserRequest {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	collegeId: string;
    phoneNumberCode: string;
    phoneNumber: string;
}

export interface CreateUserResponse {
	message: string;
}

export interface StatusUpdateRequest {
	status: string;
}

export interface StatusUpdateResponse {
	message: string;
}

export interface CreateGroupRequest {
	name: string;
}

export interface CreateGroupResponse {
	message: string;
}

export interface Role {
	id: string;
	name: string;
	description: string;
	// permissions: List<Long>;
}

export interface Permission {
	id: string;
	name: string;
	description: string;
}

export interface Page<T> {
	list: T[];
	page: number;
	total: number;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string;
}

export interface PasswordResetRequest {
	userEmail: string;
	oldPassword: string;
	newPassword: string;
}

export interface PasswordResetResponse {
	res: string;
}

export interface DecodedToken {
	sub: string;
	iat: number;
	exp: number;
	permissions: string[];
	id: number | undefined;
	firstName: string;
	lastName: string;
}

export type PARecord = {
	title: string;
	price: number;
	description: string;
	image: string;
	createdBy: User;
	createdDate: Date;
};

export type DarkModeProps = {
	darkMode: boolean;
	darkToggle: CheckboxProps;
};
