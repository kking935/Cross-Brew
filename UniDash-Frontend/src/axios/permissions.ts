import axiosInstance from './axios-instance';
import { Page, Permission } from '../@types';
import { handleError } from './utils';

/**
 * Gets a page of permissions
 */
export const getPermissionPage = (page: number, size: number, sortFld: string) =>
    axiosInstance.get<Page<Permission>>(
        `/api/permission/page?page=${page}&size=${size}&sortFld=${sortFld}`
    ).catch(handleError);

/**
* Creates a permission 
*/
export const createPermission = (permission: Permission) =>
    axiosInstance.post<Permission>(
        '/api/permission/', permission
    ).catch(handleError);


/**
* Gets a permission by id
*/
export const getPermission = (id: number) =>
    axiosInstance.get<Permission>(
        `/api/permission/${id}`
    ).catch(handleError);

/**
* Updates a permission by id
*/
export const updatePermission = (permission: Permission) =>
    axiosInstance.put<Permission>(
        '/api/permission/', permission
    ).catch(handleError);

/**
* Deletes a permission by name
*/
export const deletePermission = (name: string) =>
    axiosInstance.delete(
        `/api/permission/deleteByName/${name}`
    ).catch(handleError);
