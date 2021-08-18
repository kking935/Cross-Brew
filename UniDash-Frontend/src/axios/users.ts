import {
	CreateUserRequest,
	CreateUserResponse,
	PasswordResetRequest,
	PasswordResetResponse,
	StatusUpdateRequest,
	StatusUpdateResponse,
	UpdateUser,
	UserDetails,
} from './../@types/index.d';
import axiosInstance from './axios-instance';
import { User, Page } from '../@types';
import { handleError } from './utils';

/**
 * Creates a user
 */
export const createUser = (user: User) =>
	axiosInstance.post<any>('/user/register/', user).catch(handleError);

export const createNewUser = (user: CreateUserRequest) =>
	axiosInstance.post<any>('/user/register/', user).catch(handleError);

/**
 * Gets a user by id
 */
export const getUser = (userEmail: string) =>
	axiosInstance
		.get<UserDetails>('/user/getuser/email', {
			params: { email: userEmail },
		})
		.catch(handleError);

/**
 * Gets a page of users
 */
export const getUsers = () =>
	axiosInstance.get<UserDetails[]>(`/user/getallusers/`).catch(handleError);

/**
 * Updates a user's status
 */
export const updateUser = (user: UpdateUser) =>
	axiosInstance
		.put<UpdateUser>('/user/updateRoles/', user)
		.catch(handleError);

/**
 * Updates a user's password'
 */
export const changePassword = (passwordResetRequest: PasswordResetRequest) =>
	axiosInstance
		.post<PasswordResetResponse>(
			'/user/changePassword',
			passwordResetRequest
		)
		.catch(handleError);

/**
 * Deletes a user by email
 */
export const deleteUser = (id: string) =>
	axiosInstance
		.delete('/user/deleteUserById', { data: { id: id } })
		.catch(handleError);
