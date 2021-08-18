import {
  CreateGroupRequest,
  CreateGroupResponse,
  PasswordResetRequest,
  PasswordResetResponse,
  StatusUpdateRequest,
  StatusUpdateResponse,
} from "../@types";
import axiosInstance from "./axios-instance";
import { Group } from "../@types";
import { handleError } from "./utils";

/**
 * Creates a group
 */
export const createGroup = (group: Group) =>
  axiosInstance.post<any>("/group/createGroup/", group).catch(handleError);

export const createNewGroup = (group: CreateGroupRequest) =>
  axiosInstance.post<any>("/group/createGroup/", group).catch(handleError);

/**
 * Gets a group by id
 */
export const getGroup = (newName: string) =>{
  console.log(newName)
  return axiosInstance
    .get<Group>("/group/getgroup/name", { params: { name: newName } })
    .catch(handleError);
}

export const getGroupMembers = (groupName: string) =>{
  return axiosInstance
    .get<Group>("/group/getgroupmembers/name", { params: { name: groupName } })
    .catch(handleError);
}


/**
 * Gets a page of groups
 */
export const getGroups = () =>
  axiosInstance.get<Group[]>(`/group/getallgroups/`).catch(handleError);

/**
 * Updates a group by id
 */
export const updateGroup = (group: Group) =>
  axiosInstance.put<Group>("/group/", group).catch(handleError);

/**
 * Updates a group's status
 */
export const updateGroupStatus = (data: StatusUpdateRequest) =>
  axiosInstance
    .put<StatusUpdateResponse>("/group/status/", data)
    .catch(handleError);

/**
 * Updates a group's password'
 */
export const changePassword = (passwordResetRequest: PasswordResetRequest) =>
  axiosInstance
    .post<PasswordResetResponse>("/group/changePassword", passwordResetRequest)
    .catch(handleError);

/**
 * Deletes a group by id
 */
export const deleteGroup = (id: string) =>
  axiosInstance.delete('/group/deleteGroupById', { data: { id: id } })
  .catch(handleError);