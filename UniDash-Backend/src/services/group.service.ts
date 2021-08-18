import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import bcrypt from "bcryptjs";
import { Group, NewGroup } from "../models/group.model";
import dotenv from "dotenv";
import config from "../config.json";
import { userInfo } from "os";
import { getByEmail, getById } from "./user.service";
import { UserMinimal } from "../models/user.model";
import { getGroup } from "../controllers/group.controller";
const db = require("../_helpers/database");
const Group = db.Group;
const ObjectId = require("mongodb").ObjectId;

dotenv.config();

export const addGroup = async (groupParam: NewGroup) => {
  if (await Group.findOne({ name: groupParam.name })) {
    throw 'Name "' + groupParam.name + '" is already in use';
  }
  const group = new Group(groupParam);

  return await group.save();
};


export const updateMembers = async (name: String, members: UserMinimal[]) => {
  console.log('new members ', members)
  return await Group.findOneAndUpdate(
    { name: name },
    { $set: { members: members } },
    function (err: string, result: string) {
      if (err) {
        console.log("Error updating object: " + err);
        throw "Error updating user";
      } else {
        console.log("" + result + " document(s) updated");
      }
    }
  );
};

export const getByName = async (name: string) => {
  return await Group.findOne({ name: name });
};

// export const getGroupMembers = async (group: Group) => {
//   group.members.map(async (id: String) => {
//     const curMem = await getByEmail(id);
//     console.log(curMem)
//     members.push(curMem)
//   })
//   console.log(members)
//   return members
// };


export const getAllGroups = async () => {
  return await Group.find();
};

export const deleteGroupById = async (id: string) => {
  let deleted: boolean = false;
  console.log("delete id: ", id);
  const result = await Group.findByIdAndDelete(id, function (err: any) {
    if (err) {
      console.log(err);
      return false;
    } else {
      console.log("Successful deletion");
      deleted = true;
      return true;
    }
  });
  console.log(deleted) 
  return deleted;
};

// export const updateGroupName = async (name: string, newName: string) => {
//   let updated: boolean = false
//   await Group.updateOne(
//     { name: name },
//     { $set: { name: newName } },
//     function (err: string, result: string) {
//       if (err) {
//         console.log("Error updating object: " + err);
//         throw "Error updating group";
//       } else {
//         updated = true;
//         console.log("" + result + " document(s) updated");
//       }
//     }
//   );

//   let successful: string = "Group successfully updated"
//   let failed: string = "Group failed to updated"

//   return updated ? successful : failed;
// };
