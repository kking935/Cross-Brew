import axiosInstance from './axios-instance';
import { Page, Role } from '../@types';
import { handleError } from './utils';

/**
 * Gets a page of roles
 */
export const getRolePage = (page: number, size: number, sortFld: string) =>
    axiosInstance.get<Page<Role>>(
        `/api/role/page?page=${page}&size=${size}&sortFld=${sortFld}`
    ).catch(handleError);

/**
* Creates a role 
*/
export const createRole = (role: Role) =>
    axiosInstance.post<Role>(
        '/api/role/', role
    ).catch(handleError);


/**
* Gets a role by id
*/
export const getRole = (id: number) =>
    axiosInstance.get<Role>(
        `/api/role/${id}`
    ).catch(handleError);

/**
* Updates a role by id
*/
export const updateRole = (role: Role) =>
    axiosInstance.put<Role>(
        '/api/role/', role
    ).catch(handleError);

/**
* Deletes a role by name
*/
export const deleteRole = (name: string) =>
    axiosInstance.delete(
        `/api/role/deleteByName/${name}`
    ).catch(handleError);
