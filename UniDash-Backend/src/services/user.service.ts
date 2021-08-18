import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import bcrypt from "bcryptjs";
import { LoginRequest, NewUser, UpdateRoles } from "../models/user.model";
import dotenv from "dotenv";
import config from "../config.json";
const db = require("../_helpers/database");
const User = db.User;
const ObjectId = require("mongodb").ObjectId;

dotenv.config();

export const addUser = async (userParam: NewUser) => {
  if (await User.findOne({ email: userParam.email })) {
    throw 'Email "' + userParam.email + '" is already in use';
  }
  const user = new User(userParam);
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }
  user.status = "Pending";

  return await user.save();
};

export const authenticate = async ({ email, password }: LoginRequest) => {
  console.log(email);
  console.log(password);
  const user = await User.findOne({ email: email });
  if (!user) {
    console.log("email doesnt exist");
  } else if (bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign(
      { sub: user.id, exp: new Date().getTime() + 3600, id: user.id },
      config.secret
    );
    return {
      ...userWithoutHash,
      token,
    };
  }
  else {
    console.log('Incorrect password')
  }
};

export const getById = async (id: String) => {
  console.log(id);
  return await User.findById({ id: ObjectId.createFromHexString(id) }).select(
    "-hash"
  );
};

export const getByEmail = async (userEmail: String) => {
  console.log(userEmail);
  return await User.findOne({ email: userEmail }).select("-hash");
};

export const getDrivers = async () => {
  return await User.find(
    { "roles": "driver" },
    function(err: any, result: any) {
      if (err) {
        console.log(err)
        return err;
      } else {
        return result;
      }
    }
  ).select("-hash");
};

export const getAllUsers = async () => {
  return await User.find().select("-hash");
};

// export const updateStatus = async (token: string, status: string) => {
//   console.log("body: ", status);
//   jwt.verify(token, config.secret, (err: any) => {
//     if (err) {
//       console.log(err);
//       //If error send Forbidden (403)
//       console.log("ERROR: Could not connect to the protected route");
//       throw "JWT Authentication failed";
//     } else {
//       //If token is successfully verified, we can send the autorized data
//       console.log("SUCCESS: Connected to protected route");
//     }
//   });
//   const decodedJwt: any = jwt_decode(token);
//   console.log(decodedJwt);
//   console.log(status);
//   if (decodedJwt == null) {
//     throw "JWT Error";
//   }

//   var ObjectID = require("mongodb").ObjectID;

//   await User.updateOne(
//     { _id: ObjectID(decodedJwt.id) },
//     { $set: { status: status } },
//     function (err: string, result: string) {
//       if (err) {
//         console.log("Error updating object: " + err);
//         throw "Error updating user";
//       } else {
//         console.log("" + result + " document(s) updated");
//       }
//     }
//   );

//   let result: string = "Good news, you passed!";
//   if (status == "Failed") {
//     result = "Bad news, you failed!";
//   }
//   return result;
// };

export const deleteUserById = async (id: string) => {
  console.log("delete id: ", id);
  return await User.findByIdAndDelete(id);
};

export const updateRoles = async (token: string, updateRequest: UpdateRoles) => {
  jwt.verify(token, config.secret, (err: any) => {
    if (err) {
      console.log(err);
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      throw "JWT Authentication failed";
    } else {
      //If token is successfully verified, we can send the autorized data
      console.log("SUCCESS: Connected to protected route");
    }
  });
  const decodedJwt: any = jwt_decode(token);
  console.log(decodedJwt);
  if (decodedJwt == null) {
    throw "JWT Error";
  }

  console.log(updateRequest.roles)
  var ObjectID = require("mongodb").ObjectID;

  await User.updateOne(
    { _id: ObjectID(updateRequest.id) },
    { $set: { roles: updateRequest.roles } },
    function (err: string, result: string) {
      if (err) {
        console.log("Error updating object: " + err);
        throw "Error updating user";
      } else {
        console.log("" + result + " document(s) updated");
      }
    }
  );

  let result: string = "Update Successful";
  return result;
};
